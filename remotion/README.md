# JobsiteRank — Remotion subproject

Code-rendered, data-driven product walkthrough video. Lives in `/remotion`, isolated from the Astro site so the marketing build pipeline is unaffected.

## Setup

```sh
cd remotion
npm install
cp .env.local.example .env.local
# edit .env.local — paste your ELEVENLABS_API_KEY
npm run init:audio   # creates silent placeholder WAVs for SFX + music bed
```

## Workflow

```sh
# 1. Generate VO from script copy in src/config.ts (sequential ElevenLabs calls).
#    Cached per-scene by hash of (voice settings + interpolated final script).
npm run vo

# 2. Open the Studio for visual iteration.
npm run studio              # http://localhost:3000

# 3. Render specific scene or full walkthrough.
npm run render:scene-02     # 12 sec anchor scene → out/scene-02.mp4
npm run render              # full ~106s → out/walkthrough.mp4
npm run still               # PNG snapshot at frame 180 → out/still.png
```

## Per-prospect personalization

`src/config.ts` exports `defaultProps`. Every personalizable string + number lives there. Override on render:

```sh
# Inline JSON override
npx remotion render Walkthrough out/acme.mp4 \
  --props='{"business":{"name":"Acme Plumbing","city":"Tucson"}}'

# JSON file (for batch rendering)
npx remotion render Walkthrough out/acme.mp4 --props=./prospects/acme.json
```

The same `--props` flag works on `generate-vo.ts`:

```sh
npm run vo -- --props=./prospects/acme.json
```

VO is cached per-scene by hash of `voice_settings + interpolated_script`. If a scene's script contains no `{business.*}` interpolation, the same MP3 is shared across all prospects (no API call). Roughly 36% of API calls are saved on a typical batch.

## generate-vo.ts flags

| Flag | Effect |
|---|---|
| `--preview <sceneId>` | Generate one scene + auto-play it locally for QA |
| `--props <path>` | Deep-merge a JSON file over `defaultProps` |
| `--force` | Re-generate every scene even if cached |
| `--dry-run` | Print what would be generated + estimated cost. No API calls |
| `--clean` | Delete cache entries that no longer match any current scene's hash |

Cost: full 11-scene render is ~$0.30 at ElevenLabs Creator tier (~1.6KB of total text).

## Audio architecture

- **VO**: per scene, mounted from `public/audio/vo/{voiceId-short}/scene-NN-{hash}.wav`. Cache lookup via `index.json` written by `generate-vo.ts`.
- **SFX**: 0–2 clips per scene, configured in `src/config.ts` under `scenes.<id>.sfx[]`. Files live in `public/sfx/`.
- **Music bed**: one composition-level track in `public/music/bed-default.wav`, ducked under VO via frame-driven volume interpolation.

Phase 1 ships **silent placeholder WAVs** for SFX + music. Run `npm run init:audio` to generate them. Replace with real CC0 clips when ready (see `public/sfx/SOURCES.md`).

## Voice options

Default: **Adam** (`pNInz6obpgDQGcFmaJgB`) — deep, authoritative American male, late 30s. Best fit for owner-to-owner trades pitch.

Alternates (sample in ElevenLabs dashboard then update `voice.voiceId` in config):

- **Brian** (`nPczCjzI2devNBz1zQrb`) — conversational peer-tone
- **Josh** (`TxGEqnHWrfWFTfGW9XjX`) — warm narration

Model: `eleven_multilingual_v2` (best quality). Switch to `eleven_turbo_v2_5` for ~half cost/latency.

## File map

```
remotion/
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── .env.local            (gitignored — contains ELEVENLABS_API_KEY)
├── scripts/
│   ├── generate-vo.ts    ElevenLabs CLI
│   └── init-placeholder-audio.ts  silent WAV generator
├── public/
│   ├── audio/vo/         (gitignored — VO cache)
│   ├── sfx/              SFX clips (placeholders in Phase 1)
│   └── music/            music bed
└── src/
    ├── Root.tsx          composition registration
    ├── config.ts         PERSONALIZATION + SCRIPTS (single source of truth)
    ├── theme.ts          re-exports from ../lib/design-tokens
    ├── fonts.ts          Google Fonts loaders for Bricolage + DM Sans
    ├── compositions/
    │   └── Walkthrough.tsx
    ├── scenes/
    │   └── 02-text-back.tsx  (Phase 1 anchor)
    ├── components/       PhoneFrame, SMSBubble, Captions, etc.
    └── lib/
        └── interpolate.ts  template substitution helper
```

## Final MP4 destination

After `npm run render`, manually copy `out/walkthrough.mp4` → `../public/walkthrough.mp4`. The Astro home page (Phase 4) loads it as `<video>`.
