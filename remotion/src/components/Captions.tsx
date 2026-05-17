import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { interpolate, splitIntoCaptionLines } from "../lib/interpolate";
import type { VideoProps, SceneId } from "../config";

interface CaptionsProps {
  sceneId: SceneId;
  props: VideoProps;
  position?: "lower" | "middle";
}

/**
 * Renders bottom-third caption overlay synced to scene timing.
 *
 * Behavior:
 * - Reads the current scene's `script` (after {token} interpolation).
 * - If `captionsOverride` is set on the scene, uses those exact timings.
 * - Otherwise auto-splits the script at sentence boundaries and
 *   distributes evenly across the scene's frame range.
 *
 * Visually matches `tag-pill-dark` from the site (ink-soft pill,
 * white text, font-display 600, rounded-full).
 */
export const Captions: React.FC<CaptionsProps> = ({ sceneId, props, position = "lower" }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scene = props.scenes[sceneId];
  const interpolatedScript = interpolate(scene.script, props as unknown as Record<string, unknown>);

  const segments = scene.captionsOverride
    ? scene.captionsOverride.map((c) => ({
        startFrame: Math.round(c.fromSecondInScene * fps),
        endFrame: Math.round((c.fromSecondInScene + c.durationSeconds) * fps),
        text: interpolate(c.text, props as unknown as Record<string, unknown>),
      }))
    : autoTimeLines(interpolatedScript, durationInFrames, fps);

  const active = segments.find((s) => frame >= s.startFrame && frame < s.endFrame);
  if (!active) return null;

  const positionalStyles: React.CSSProperties =
    position === "middle"
      ? { top: "50%", transform: "translate(-50%, -50%)" }
      : { bottom: "8%", transform: "translateX(-50%)" };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        ...positionalStyles,
        maxWidth: "80%",
        backgroundColor: "rgba(14, 27, 34, 0.7)",
        color: colors.paper,
        fontFamily: fonts.display,
        fontWeight: 600,
        fontSize: 30,
        lineHeight: 1.25,
        padding: "14px 28px",
        borderRadius: 9999,
        textAlign: "center",
        letterSpacing: "-0.01em",
      }}
    >
      {active.text}
    </div>
  );
};

interface TimedSegment {
  startFrame: number;
  endFrame: number;
  text: string;
}

function autoTimeLines(text: string, durationInFrames: number, fps: number): TimedSegment[] {
  const lines = splitIntoCaptionLines(text);
  if (lines.length === 0) return [];

  // Reserve the first ~0.4s and last ~0.3s of the scene as buffer so
  // captions don't slam in at frame 0 or persist past scene end.
  const headBuffer = Math.round(0.4 * fps);
  const tailBuffer = Math.round(0.3 * fps);
  const usable = Math.max(durationInFrames - headBuffer - tailBuffer, durationInFrames * 0.5);

  // Weight each line by character count so longer lines hold longer.
  const totalChars = lines.reduce((s, l) => s + l.length, 0);
  let cursor = headBuffer;
  return lines.map((line) => {
    const share = (line.length / totalChars) * usable;
    const start = cursor;
    const end = Math.min(durationInFrames - 1, cursor + Math.round(share));
    cursor = end;
    return { startFrame: start, endFrame: end, text: line };
  });
}
