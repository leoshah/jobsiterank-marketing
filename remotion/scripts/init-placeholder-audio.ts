/**
 * Generates silent WAV placeholder files for SFX + music bed so the
 * Remotion bundle can resolve every <Audio src> path before real CC0
 * clips are sourced.
 *
 * WAV format is trivial enough to construct from scratch in pure
 * Node — 44-byte RIFF header + N samples of PCM 16-bit zeros — which
 * means no native deps and no ffmpeg requirement on the host.
 *
 * Run via: npm run init:audio
 *
 * Replace any of these files with real CC0 audio when ready —
 * filenames stay stable so config.ts doesn't need changes.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, "..", "public");

interface PlaceholderSpec {
  relativePath: string;
  durationSeconds: number;
}

const placeholders: PlaceholderSpec[] = [
  { relativePath: "sfx/phone-ring.wav", durationSeconds: 1.0 },
  { relativePath: "sfx/sms-chime.wav", durationSeconds: 0.8 },
  { relativePath: "sfx/success-ding.wav", durationSeconds: 0.9 },
  { relativePath: "sfx/cash-register.wav", durationSeconds: 1.2 },
  { relativePath: "music/bed-default.wav", durationSeconds: 110 },
];

/**
 * Builds a valid silent WAV file (PCM 16-bit, mono, 22050 Hz).
 * Header layout per RIFF/WAVE spec.
 */
function buildSilentWav(durationSeconds: number): Buffer {
  const sampleRate = 22050;
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const numSamples = Math.round(durationSeconds * sampleRate);
  const dataSize = numSamples * blockAlign;
  const fileSize = 36 + dataSize;

  const buffer = Buffer.alloc(44 + dataSize);
  let offset = 0;

  // RIFF header
  buffer.write("RIFF", offset); offset += 4;
  buffer.writeUInt32LE(fileSize, offset); offset += 4;
  buffer.write("WAVE", offset); offset += 4;

  // fmt subchunk
  buffer.write("fmt ", offset); offset += 4;
  buffer.writeUInt32LE(16, offset); offset += 4;          // subchunk1 size = 16 for PCM
  buffer.writeUInt16LE(1, offset); offset += 2;           // audio format = 1 (PCM)
  buffer.writeUInt16LE(numChannels, offset); offset += 2;
  buffer.writeUInt32LE(sampleRate, offset); offset += 4;
  buffer.writeUInt32LE(byteRate, offset); offset += 4;
  buffer.writeUInt16LE(blockAlign, offset); offset += 2;
  buffer.writeUInt16LE(bitsPerSample, offset); offset += 2;

  // data subchunk
  buffer.write("data", offset); offset += 4;
  buffer.writeUInt32LE(dataSize, offset); offset += 4;
  // Remaining bytes are already zero from Buffer.alloc → silence.

  return buffer;
}

function main() {
  console.log(`Writing silent placeholders to ${PUBLIC_DIR}`);
  for (const spec of placeholders) {
    const fullPath = resolve(PUBLIC_DIR, spec.relativePath);
    mkdirSync(dirname(fullPath), { recursive: true });
    const wav = buildSilentWav(spec.durationSeconds);
    writeFileSync(fullPath, wav);
    const sizeKb = (wav.length / 1024).toFixed(1);
    console.log(`  ✓ ${spec.relativePath}  (${spec.durationSeconds}s, ${sizeKb} KB)`);
  }
  console.log("Done. Replace any of these with real CC0 clips when ready.");
}

main();
