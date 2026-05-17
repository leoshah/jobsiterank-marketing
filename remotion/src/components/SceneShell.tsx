import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import type { SceneId, VideoProps } from "../config";
import { Captions } from "./Captions";

interface SceneShellProps {
  sceneId: SceneId;
  props: VideoProps;
  voPath?: string | null;
  background?: string;
  showCaptions?: boolean;
  children: React.ReactNode;
}

const dbToGain = (db: number) => Math.pow(10, db / 20);

/**
 * Wraps every scene with consistent layout, audio mounts, and captions.
 *
 * - VO: <Audio> mounted at scene start if `voPath` is provided.
 * - SFX: 0–2 <Audio> mounts from scene.sfx[], offset by atSecondInScene
 *   via a wrapping <Sequence>.
 * - Captions: bottom-third overlay synced to script timing.
 */
export const SceneShell: React.FC<SceneShellProps> = ({
  sceneId,
  props,
  voPath,
  background = "#FAFAF7",
  showCaptions = true,
  children,
}) => {
  const scene = props.scenes[sceneId];
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: background }}>
      {children}
      {showCaptions && <Captions sceneId={sceneId} props={props} />}
      {voPath && <Audio src={voPath} volume={1} />}
      {scene.sfx.map((clip, i) => {
        const src = staticFile(`sfx/${clip.file}`);
        const delayFrames = Math.max(0, Math.round(clip.atSecondInScene * fps));
        return (
          <Sequence key={`${clip.file}-${i}`} from={delayFrames}>
            <Audio src={src} volume={dbToGain(clip.volumeDb)} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
