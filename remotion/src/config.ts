/**
 * JobsiteRank walkthrough — personalization config + scripts.
 *
 * Single source of truth for everything that varies prospect-to-prospect:
 * business identity, scene-specific data, voiceover scripts, captions,
 * and SFX cues. Both `generate-vo.ts` and the Remotion composition
 * consume the same `defaultProps`.
 *
 * Override on render:
 *   npx remotion render Walkthrough out/x.mp4 \
 *     --props='{"business":{"name":"Acme","city":"Tucson"}}'
 *
 * Override on VO generation:
 *   npm run vo -- --props=./prospects/acme.json
 *
 * Per-scene `script` is the SINGLE source of truth for both the spoken
 * VO and the on-screen caption text. Edit it in one place; both update.
 *
 * Templating: scripts and string fields support {dot.path} tokens
 * (e.g., "{business.name}") resolved at render time.
 */

import { z } from "zod";

const VoiceConfigSchema = z.object({
  voiceId: z.string().default("pNInz6obpgDQGcFmaJgB"),
  modelId: z
    .enum(["eleven_multilingual_v2", "eleven_turbo_v2_5"])
    .default("eleven_multilingual_v2"),
  stability: z.number().min(0).max(1).default(0.5),
  similarityBoost: z.number().min(0).max(1).default(0.75),
  style: z.number().min(0).max(1).default(0.0),
  speakerBoost: z.boolean().default(true),
});

const SfxClipSchema = z.object({
  file: z.string(),
  atSecondInScene: z.number(),
  volumeDb: z.number().default(-6),
});

const CaptionOverrideSchema = z.object({
  fromSecondInScene: z.number(),
  durationSeconds: z.number(),
  text: z.string(),
});

const SceneAudioSchema = z.object({
  script: z.string(),
  sfx: z.array(SfxClipSchema).max(2).default([]),
  captionsOverride: z.array(CaptionOverrideSchema).optional(),
});

const BusinessSchema = z.object({
  name: z.string().default("Plumbing Geeks"),
  ownerFirstName: z.string().default("Marco"),
  monogram: z.string().default("PG"),
  city: z.string().default("Pasadena"),
  state: z.string().default("CA"),
  phone: z.string().default("(818) 555-0142"),
  websiteDomain: z.string().default("plumbinggeeks.com"),
  yearsInBusiness: z.number().int().default(12),
  serviceArea: z.string().default("Greater Pasadena"),
});

const MusicSchema = z.object({
  file: z.string().default("music/bed-default.wav"),
  bedVolumeDb: z.number().default(-22),
  duckUnderVoDb: z.number().default(-32),
  duckAttackMs: z.number().int().default(180),
  duckReleaseMs: z.number().int().default(420),
});

const ColdOpenSchema = SceneAudioSchema.extend({
  callerLabel: z.string().default("Unknown"),
  missedAt: z.string().default("4:23 PM"),
});

const TextBackSchema = SceneAudioSchema.extend({
  customerName: z.string().default("Karen"),
  jobType: z.string().default("Water heater leaking everywhere"),
  address: z.string().default("1432 Linda Vista"),
  jobAmount: z.number().default(1840),
  etaMinutes: z.number().int().default(35),
  autoTextSeconds: z.number().int().default(28),
  customerPhoneMasked: z.string().default("(626) ▓▓▓-0142"),
  missedAt: z.string().default("4:23 PM"),
});

const DedicatedNumberSchema = SceneAudioSchema.extend({
  displayNumber: z.string().default("(626) 555-0199"),
  conversationLines: z
    .array(z.string())
    .default([
      "Hey it's {business.name} — got your ETA?",
      "On the way, 25 min out.",
      "Perfect, thanks.",
    ]),
});

const WebsiteSchema = SceneAudioSchema.extend({
  heroHeadline: z.string().default("{business.city}'s most-called plumber"),
  heroSubhead: z.string().default("Same-day service · Licensed · 4.9★"),
  ctaPhone: z.string().default("(626) 555-0199"),
});

const ReviewsSchema = SceneAudioSchema.extend({
  reviewerName: z.string().default("Sarah K."),
  reviewBody: z
    .string()
    .default(
      "Showed up in 30 min, fixed my heater same day. Calling them for everything from now on."
    ),
  startingReviewCount: z.number().int().default(127),
  endingReviewCount: z.number().int().default(184),
  startingRating: z.number().default(4.6),
  endingRating: z.number().default(4.9),
});

const GbpSchema = SceneAudioSchema.extend({
  categoryPrimary: z.string().default("Plumber"),
  categoriesSecondary: z
    .array(z.string())
    .default(["Drainage service", "Water heater installation"]),
  photoCount: z.number().int().default(48),
  threePackPosition: z.number().int().default(1),
});

const DirectoriesSchema = SceneAudioSchema.extend({
  visiblePlatforms: z
    .array(z.enum(["Yelp", "Apple Maps", "Bing", "Nextdoor", "Yellow Pages", "Foursquare"]))
    .default(["Yelp", "Apple Maps", "Bing", "Nextdoor"]),
});

const ReviewResponsesSchema = SceneAudioSchema.extend({
  incomingReview: z
    .string()
    .default("Great work on the water heater. Saved my Saturday."),
  reply: z
    .string()
    .default(
      "Thanks Sarah — glad we could get you back in hot water same day. Call us anytime."
    ),
});

const SampleLeadSchema = z.object({
  name: z.string(),
  job: z.string(),
  stage: z.enum(["new", "quoted", "scheduled", "done"]),
  amount: z.number().optional(),
});

const CrmSchema = SceneAudioSchema.extend({
  jobsToday: z.number().int().default(14),
  callsCaptured: z.number().int().default(28),
  callsViaTextBack: z.number().int().default(21),
  reviewsToday: z.number().int().default(5),
  bookedRevenueLabel: z.string().default("$8.2k"),
  sampleLeads: z.array(SampleLeadSchema).default([
    { name: "A. Patel", job: "Water heater leak", stage: "new" },
    { name: "M. Soriano", job: "Drain backup", stage: "new" },
    { name: "L. Hernández", job: "Re-pipe estimate", stage: "quoted", amount: 7400 },
    { name: "D. Wong", job: "Tankless install", stage: "scheduled" },
    { name: "R. Foster", job: "Sewer camera", stage: "scheduled" },
    { name: "J. Lopez", job: "$1,840 · paid", stage: "done", amount: 1840 },
  ]),
});

const ReactivationSchema = SceneAudioSchema.extend({
  listSize: z.number().int().default(1800),
  bookings: z.number().int().default(87),
  revenueLabel: z.string().default("$71k"),
  campaignWindow: z.string().default("two weeks"),
});

const TierCloseSchema = SceneAudioSchema.extend({
  tier1Price: z.number().int().default(297),
  tier2Price: z.number().int().default(497),
  ctaUrl: z.string().default("jobsiterank.com"),
});

export const VideoPropsSchema = z.object({
  business: BusinessSchema.default({}),
  voice: VoiceConfigSchema.default({}),
  music: MusicSchema.default({}),
  scenes: z.object({
    coldOpen: ColdOpenSchema.default({
      script:
        "Every missed call is a job your competitor is about to book. For {business.name} in {business.city}, that used to mean lost revenue every single day.",
      sfx: [{ file: "phone-ring.wav", atSecondInScene: 0.5, volumeDb: -8 }],
    }),
    textBack: TextBackSchema.default({
      script:
        "Now, the second a call goes unanswered, JobsiteRank fires an automatic text from {business.name} in under thirty seconds. The customer replies. The job gets booked. No voicemail. No lost revenue.",
      sfx: [{ file: "sms-chime.wav", atSecondInScene: 2.0, volumeDb: -6 }],
    }),
    dedicatedNumber: DedicatedNumberSchema.default({
      script:
        "{business.name} gets a dedicated business number. Every text comes into one inbox, on your phone, with full conversation history.",
      sfx: [],
    }),
    website: WebsiteSchema.default({
      script:
        "Plus a free, conversion-focused website built for one thing: getting {business.city} customers to tap call.",
      sfx: [],
    }),
    reviews: ReviewsSchema.default({
      script:
        "After every job, the system asks for a review automatically. Happy customers get routed to Google. Unhappy ones come straight to {business.ownerFirstName}, privately. Your star count climbs.",
      sfx: [{ file: "success-ding.wav", atSecondInScene: 8.0, volumeDb: -10 }],
    }),
    gbp: GbpSchema.default({
      script:
        "We optimize your Google Business Profile end to end and post twice a week. {business.name} climbs the local map until you're sitting in the three-pack.",
      sfx: [],
    }),
    directories: DirectoriesSchema.default({
      script:
        "Then we get {business.name} listed everywhere {business.city} customers actually search — Yelp, Apple Maps, Bing, and the rest.",
      sfx: [],
    }),
    reviewResponses: ReviewResponsesSchema.default({
      script:
        "Every review that comes in gets a thoughtful, on-brand reply written by our team. {business.ownerFirstName} doesn't lift a finger.",
      sfx: [],
    }),
    crm: CrmSchema.default({
      script:
        "Every lead, every text, every job — in one branded pipeline on {business.ownerFirstName}'s phone. Today: fourteen jobs, twenty-eight calls captured, eighty-two hundred dollars booked.",
      sfx: [{ file: "cash-register.wav", atSecondInScene: 9.5, volumeDb: -8 }],
    }),
    reactivation: ReactivationSchema.default({
      script:
        "Every quarter we re-engage {business.name}'s past customers with one targeted SMS. The bookings roll in for two weeks straight.",
      sfx: [],
    }),
    tierClose: TierCloseSchema.default({
      script:
        "Two plans. Free website with both. Two ninety-seven a month to never miss a lead. Four ninety-seven for the full system. Book your demo at jobsiterank.com.",
      sfx: [],
    }),
  }).default({}),
});

export type VideoProps = z.infer<typeof VideoPropsSchema>;
export type SceneId = keyof VideoProps["scenes"];

export const defaultProps: VideoProps = VideoPropsSchema.parse({});

export const SCENE_DURATIONS_SECONDS: Record<SceneId, number> = {
  coldOpen: 8,
  textBack: 12,
  dedicatedNumber: 10,
  website: 8,
  reviews: 12,
  gbp: 10,
  directories: 8,
  reviewResponses: 8,
  crm: 12,
  reactivation: 8,
  tierClose: 10,
};

export const FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

export const SCENE_DURATIONS_FRAMES: Record<SceneId, number> = Object.fromEntries(
  Object.entries(SCENE_DURATIONS_SECONDS).map(([id, sec]) => [id, sec * FPS])
) as Record<SceneId, number>;

export const TOTAL_FRAMES = Object.values(SCENE_DURATIONS_FRAMES).reduce(
  (sum, f) => sum + f,
  0
);

export const SCENE_ORDER: SceneId[] = [
  "coldOpen",
  "textBack",
  "dedicatedNumber",
  "website",
  "reviews",
  "gbp",
  "directories",
  "reviewResponses",
  "crm",
  "reactivation",
  "tierClose",
];
