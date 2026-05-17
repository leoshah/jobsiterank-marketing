import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Series,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  SCENE_DURATIONS_FRAMES,
  SCENE_ORDER,
  type SceneId,
  type VideoProps,
} from "../config";
import { ColdOpenScene } from "../scenes/01-cold-open";
import { TextBackScene } from "../scenes/02-text-back";
import { DedicatedNumberScene } from "../scenes/03-dedicated-number";
import { WebsiteScene } from "../scenes/04-website";
import { ReviewsScene } from "../scenes/05-reviews";
import { GbpScene } from "../scenes/06-gbp";
import { DirectoriesScene } from "../scenes/07-directories";
import { ReviewResponsesScene } from "../scenes/08-review-responses";
import { CrmScene } from "../scenes/09-crm";
import { ReactivationScene } from "../scenes/10-reactivation";
import { TierCloseScene } from "../scenes/11-tier-comparison";
import { colors } from "../theme";
import voIndex from "../../public/audio/vo/index.json";

type WalkthroughProps = VideoProps;

/** Cross-fade window in frames at each scene boundary. */
const TRANSITION_FRAMES = 9; // 0.3s @ 30fps

const TIER_1_BG = colors.cream;
const COLD_OPEN_BG = colors.ink;

/** Background color of each scene — used to know what to fade through. */
const SCENE_BG: Record<SceneId, string> = {
  coldOpen: COLD_OPEN_BG,
  textBack: TIER_1_BG,
  dedicatedNumber: TIER_1_BG,
  website: TIER_1_BG,
  reviews: TIER_1_BG,
  gbp: TIER_1_BG,
  directories: TIER_1_BG,
  reviewResponses: TIER_1_BG,
  crm: TIER_1_BG,
  reactivation: TIER_1_BG,
  tierClose: TIER_1_BG,
};

const lookupVoPath = (sceneId: SceneId): string | null => {
  const entry = (voIndex as Record<string, string | undefined>)[sceneId];
  if (!entry) return null;
  return staticFile(entry);
};

/**
 * Final composition.
 *
 * - Each scene wraps in a SceneTransitionWrapper that cross-fades
 *   in over TRANSITION_FRAMES at the start of the scene and out
 *   over TRANSITION_FRAMES at the end.
 * - Music bed mounts at composition level and frame-driven volume
 *   curve ducks it under VO regions of each scene.
 */
export const Walkthrough: React.FC<WalkthroughProps> = (videoProps) => {
  const musicSrc = staticFile(videoProps.music.file);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.paper }}>
      <Series>
        {SCENE_ORDER.map((sceneId) => (
          <Series.Sequence
            key={sceneId}
            durationInFrames={SCENE_DURATIONS_FRAMES[sceneId]}
          >
            <SceneTransitionWrapper sceneId={sceneId}>
              <ScenePicker
                sceneId={sceneId}
                videoProps={videoProps}
                voPath={lookupVoPath(sceneId)}
              />
            </SceneTransitionWrapper>
          </Series.Sequence>
        ))}
      </Series>

      {/* Music bed — composition-wide with sidechain ducking under VO. */}
      <MusicBed src={musicSrc} videoProps={videoProps} />
    </AbsoluteFill>
  );
};

interface SceneTransitionWrapperProps {
  sceneId: SceneId;
  children: React.ReactNode;
}

const SceneTransitionWrapper: React.FC<SceneTransitionWrapperProps> = ({ sceneId, children }) => {
  const frame = useCurrentFrame();
  const sceneDuration = SCENE_DURATIONS_FRAMES[sceneId];

  // Fade in over first TRANSITION_FRAMES, fade out over last TRANSITION_FRAMES.
  const fadeIn = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [sceneDuration - TRANSITION_FRAMES, sceneDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_BG[sceneId] }}>
      <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

interface ScenePickerProps {
  sceneId: SceneId;
  videoProps: VideoProps;
  voPath: string | null;
}

const ScenePicker: React.FC<ScenePickerProps> = ({ sceneId, videoProps, voPath }) => {
  switch (sceneId) {
    case "coldOpen":
      return <ColdOpenScene videoProps={videoProps} voPath={voPath} />;
    case "textBack":
      return <TextBackScene videoProps={videoProps} voPath={voPath} />;
    case "dedicatedNumber":
      return <DedicatedNumberScene videoProps={videoProps} voPath={voPath} />;
    case "website":
      return <WebsiteScene videoProps={videoProps} voPath={voPath} />;
    case "reviews":
      return <ReviewsScene videoProps={videoProps} voPath={voPath} />;
    case "gbp":
      return <GbpScene videoProps={videoProps} voPath={voPath} />;
    case "directories":
      return <DirectoriesScene videoProps={videoProps} voPath={voPath} />;
    case "reviewResponses":
      return <ReviewResponsesScene videoProps={videoProps} voPath={voPath} />;
    case "crm":
      return <CrmScene videoProps={videoProps} voPath={voPath} />;
    case "reactivation":
      return <ReactivationScene videoProps={videoProps} voPath={voPath} />;
    case "tierClose":
      return <TierCloseScene videoProps={videoProps} voPath={voPath} />;
  }
};

interface MusicBedProps {
  src: string;
  videoProps: VideoProps;
}

const MusicBed: React.FC<MusicBedProps> = ({ src, videoProps }) => {
  const frame = useCurrentFrame();
  const dbToGain = (db: number) => Math.pow(10, db / 20);
  const bedGain = dbToGain(videoProps.music.bedVolumeDb);
  const duckGain = dbToGain(videoProps.music.duckUnderVoDb);

  // Build a list of [start, end] frame ranges where VO is playing.
  // VO covers the FULL scene duration when a VO entry exists in index.json.
  const fps = 30;
  const voRanges: Array<[number, number]> = [];
  let cursor = 0;
  for (const sceneId of SCENE_ORDER) {
    const dur = SCENE_DURATIONS_FRAMES[sceneId];
    if (lookupVoPath(sceneId)) {
      voRanges.push([cursor, cursor + dur]);
    }
    cursor += dur;
  }

  // Find current ducking factor with attack/release shaped windows.
  const attackFrames = Math.round((videoProps.music.duckAttackMs / 1000) * fps);
  const releaseFrames = Math.round((videoProps.music.duckReleaseMs / 1000) * fps);

  let inDuckRegion = false;
  let duckProgress = 0;
  for (const [start, end] of voRanges) {
    if (frame >= start && frame < end) {
      inDuckRegion = true;
      duckProgress = Math.min((frame - start) / Math.max(attackFrames, 1), 1);
      break;
    }
    if (frame >= end && frame < end + releaseFrames) {
      inDuckRegion = true;
      duckProgress = 1 - (frame - end) / releaseFrames;
      break;
    }
  }

  const volume = inDuckRegion
    ? bedGain + (duckGain - bedGain) * duckProgress
    : bedGain;

  return <Audio src={src} volume={Math.max(0, volume)} loop />;
};
