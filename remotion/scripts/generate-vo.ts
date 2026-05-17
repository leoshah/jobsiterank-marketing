/**
 * Generates per-scene voiceover audio via the ElevenLabs API.
 *
 * Usage:
 *   npm run vo                        # generate all scenes (cached unless changed)
 *   npm run vo -- --preview textBack  # one scene + auto-play locally
 *   npm run vo -- --props ./prospects/acme.json  # override props
 *   npm run vo -- --force             # re-generate all even if cached
 *   npm run vo -- --dry-run           # estimate cost, no API calls
 *   npm run vo -- --clean             # prune orphan cache entries
 *
 * Cache strategy: per-scene SHA-256 over (voice settings + interpolated
 * final script). Identical text + voice → same hash → cache hit. Edit
 * one scene's script and only that scene re-generates.
 *
 * Output:
 *   public/audio/vo/{voiceIdShort}/scene-NN-{hash}.wav
 *   public/audio/vo/index.json   ({ sceneId: relativePath })
 */

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { config as loadEnv } from "dotenv";

import {
  defaultProps,
  SCENE_ORDER,
  VideoPropsSchema,
  type SceneId,
  type VideoProps,
} from "../src/config";
import { interpolate } from "../src/lib/interpolate";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REMOTION_ROOT = resolve(__dirname, "..");
const PUBLIC_VO_DIR = resolve(REMOTION_ROOT, "public", "audio", "vo");

loadEnv({ path: resolve(REMOTION_ROOT, ".env.local") });

interface CliFlags {
  preview: SceneId | null;
  propsPath: string | null;
  force: boolean;
  dryRun: boolean;
  clean: boolean;
}

function parseFlags(argv: string[]): CliFlags {
  const flags: CliFlags = {
    preview: null,
    propsPath: null,
    force: false,
    dryRun: false,
    clean: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--preview") {
      const next = argv[i + 1];
      if (!next || !SCENE_ORDER.includes(next as SceneId)) {
        throw new Error(`--preview requires a scene ID. Valid: ${SCENE_ORDER.join(", ")}`);
      }
      flags.preview = next as SceneId;
      i++;
    } else if (arg === "--props") {
      flags.propsPath = argv[++i] ?? null;
    } else if (arg.startsWith("--props=")) {
      flags.propsPath = arg.slice("--props=".length);
    } else if (arg === "--force") {
      flags.force = true;
    } else if (arg === "--dry-run") {
      flags.dryRun = true;
    } else if (arg === "--clean") {
      flags.clean = true;
    }
  }
  return flags;
}

function loadProps(propsPath: string | null): VideoProps {
  if (!propsPath) return defaultProps;
  const fullPath = resolve(process.cwd(), propsPath);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const overrides = require(fullPath);
  return VideoPropsSchema.parse(deepMerge(defaultProps, overrides));
}

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (Array.isArray(base) || Array.isArray(override)) return (override ?? base) as T;
  if (typeof base !== "object" || base === null) return (override ?? base) as T;
  if (typeof override !== "object" || override === null) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(override)) {
    out[k] = deepMerge(
      (base as Record<string, unknown>)[k] as never,
      v as never
    );
  }
  return out as T;
}

function sceneCacheKey(props: VideoProps, sceneId: SceneId): string {
  const scene = props.scenes[sceneId];
  const interpolated = interpolate(scene.script, props as unknown as Record<string, unknown>);
  const v = props.voice;
  const seed =
    [
      v.voiceId,
      v.modelId,
      v.stability,
      v.similarityBoost,
      v.style,
      v.speakerBoost,
      interpolated,
    ].join("|");
  return createHash("sha256").update(seed).digest("hex").slice(0, 16);
}

function voiceDirShort(voiceId: string): string {
  return voiceId.slice(0, 8);
}

function relativeOutputPath(props: VideoProps, sceneId: SceneId, hash: string): string {
  const sceneIndex = SCENE_ORDER.indexOf(sceneId) + 1;
  const padded = String(sceneIndex).padStart(2, "0");
  return `audio/vo/${voiceDirShort(props.voice.voiceId)}/scene-${padded}-${hash}.wav`;
}

interface GenerationResult {
  sceneId: SceneId;
  status: "cached" | "generated" | "skipped" | "would-generate";
  characters: number;
  relativePath: string;
}

async function callElevenLabs(
  apiKey: string,
  props: VideoProps,
  text: string
): Promise<Buffer> {
  const v = props.voice;
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${v.voiceId}/stream?output_format=pcm_22050`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/wav",
    },
    body: JSON.stringify({
      text,
      model_id: v.modelId,
      voice_settings: {
        stability: v.stability,
        similarity_boost: v.similarityBoost,
        style: v.style,
        use_speaker_boost: v.speakerBoost,
      },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`ElevenLabs ${res.status}: ${errText}`);
  }
  const pcm = Buffer.from(await res.arrayBuffer());
  return wrapPcmAsWav(pcm, 22050, 1, 16);
}

function wrapPcmAsWav(
  pcm: Buffer,
  sampleRate: number,
  numChannels: number,
  bitsPerSample: number
): Buffer {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcm.length;
  const out = Buffer.alloc(44 + dataSize);
  let off = 0;
  out.write("RIFF", off); off += 4;
  out.writeUInt32LE(36 + dataSize, off); off += 4;
  out.write("WAVE", off); off += 4;
  out.write("fmt ", off); off += 4;
  out.writeUInt32LE(16, off); off += 4;
  out.writeUInt16LE(1, off); off += 2;
  out.writeUInt16LE(numChannels, off); off += 2;
  out.writeUInt32LE(sampleRate, off); off += 4;
  out.writeUInt32LE(byteRate, off); off += 4;
  out.writeUInt16LE(blockAlign, off); off += 2;
  out.writeUInt16LE(bitsPerSample, off); off += 2;
  out.write("data", off); off += 4;
  out.writeUInt32LE(dataSize, off); off += 4;
  pcm.copy(out, 44);
  return out;
}

function playLocally(absPath: string) {
  const platform = process.platform;
  if (platform === "win32") {
    spawn("powershell", [
      "-NoProfile",
      "-Command",
      `(New-Object Media.SoundPlayer '${absPath}').PlaySync()`,
    ], { stdio: "inherit" });
  } else if (platform === "darwin") {
    spawn("afplay", [absPath], { stdio: "inherit" });
  } else {
    spawn("aplay", [absPath], { stdio: "inherit" });
  }
}

async function processScene(
  apiKey: string,
  props: VideoProps,
  sceneId: SceneId,
  flags: CliFlags
): Promise<GenerationResult> {
  const scene = props.scenes[sceneId];
  const interpolated = interpolate(scene.script, props as unknown as Record<string, unknown>);
  const hash = sceneCacheKey(props, sceneId);
  const relPath = relativeOutputPath(props, sceneId, hash);
  const absPath = resolve(REMOTION_ROOT, "public", relPath);

  if (existsSync(absPath) && !flags.force) {
    return { sceneId, status: "cached", characters: interpolated.length, relativePath: relPath };
  }

  if (flags.dryRun) {
    return { sceneId, status: "would-generate", characters: interpolated.length, relativePath: relPath };
  }

  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY missing. Add it to remotion/.env.local.");
  }

  mkdirSync(dirname(absPath), { recursive: true });
  const wav = await callElevenLabs(apiKey, props, interpolated);
  writeFileSync(absPath, wav);
  return { sceneId, status: "generated", characters: interpolated.length, relativePath: relPath };
}

function writeIndex(props: VideoProps, results: GenerationResult[]) {
  const indexPath = resolve(PUBLIC_VO_DIR, "index.json");
  const existing: Record<string, string> = existsSync(indexPath)
    ? JSON.parse(require("node:fs").readFileSync(indexPath, "utf8"))
    : {};
  for (const r of results) {
    if (r.status === "cached" || r.status === "generated") {
      existing[r.sceneId] = r.relativePath;
    }
  }
  writeFileSync(indexPath, JSON.stringify(existing, null, 2) + "\n");
}

function cleanOrphans(props: VideoProps) {
  const validHashes = new Set(
    SCENE_ORDER.map((id) => sceneCacheKey(props, id))
  );
  const voiceDir = resolve(PUBLIC_VO_DIR, voiceDirShort(props.voice.voiceId));
  if (!existsSync(voiceDir)) return;
  const entries = readdirSync(voiceDir);
  let removed = 0;
  for (const filename of entries) {
    const m = filename.match(/^scene-\d+-([0-9a-f]{16})\.wav$/);
    if (!m) continue;
    if (!validHashes.has(m[1])) {
      rmSync(resolve(voiceDir, filename));
      removed++;
    }
  }
  console.log(`Removed ${removed} orphan cache entry(ies).`);
}

function estimateCostUsd(totalChars: number): number {
  // ElevenLabs Creator tier: ~$0.18 per 1k characters (rough public pricing).
  return (totalChars / 1000) * 0.18;
}

async function main() {
  const flags = parseFlags(process.argv.slice(2));
  const props = loadProps(flags.propsPath);
  const apiKey = process.env.ELEVENLABS_API_KEY ?? "";

  if (flags.clean) {
    cleanOrphans(props);
    return;
  }

  const targets: SceneId[] = flags.preview ? [flags.preview] : [...SCENE_ORDER];

  console.log(`Voice: ${props.voice.voiceId} · model: ${props.voice.modelId}`);
  console.log(`Scenes: ${targets.join(", ")}`);
  if (flags.dryRun) console.log("(dry run — no API calls)");
  console.log("");

  const results: GenerationResult[] = [];
  const t0 = Date.now();
  for (const sceneId of targets) {
    process.stdout.write(`  ${sceneId.padEnd(18)} `);
    try {
      const r = await processScene(apiKey, props, sceneId, flags);
      const tag =
        r.status === "cached" ? "cached" :
        r.status === "would-generate" ? `would-generate (${r.characters} chars)` :
        `generated (${r.characters} chars · ~$${estimateCostUsd(r.characters).toFixed(3)})`;
      console.log(tag);
      results.push(r);
    } catch (err) {
      console.log(`ERROR: ${(err as Error).message}`);
      throw err;
    }
  }

  if (!flags.dryRun) writeIndex(props, results);

  const generated = results.filter((r) => r.status === "generated");
  const cached = results.filter((r) => r.status === "cached");
  const totalChars = generated.reduce((s, r) => s + r.characters, 0);
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log("");
  console.log(`Summary: ${generated.length} generated, ${cached.length} cached, ${elapsed}s.`);
  if (generated.length > 0) {
    console.log(`Characters charged: ${totalChars} (~$${estimateCostUsd(totalChars).toFixed(3)})`);
  }

  if (flags.preview && results[0]?.status === "generated") {
    const absPath = resolve(REMOTION_ROOT, "public", results[0].relativePath);
    console.log(`\nPlaying ${results[0].relativePath} ...`);
    playLocally(absPath);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
