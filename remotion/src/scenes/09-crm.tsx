import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneShell } from "../components/SceneShell";
import { CRMDashboard } from "../components/CRMDashboard";
import type { VideoProps } from "../config";

interface CrmSceneProps {
  videoProps: VideoProps;
  voPath?: string | null;
}

/**
 * Scene 09 — Full CRM + lead pipeline (12s, 360 frames).
 *
 * Beats:
 *   0.0  → cream bg with headline strip across top
 *   0.5  → CRM dashboard slides up from below into view
 *   2.5  → KPI counters animate up from 0 → final values
 *   8.0  → callout pill highlights "Branded mobile CRM" beat
 *  12.0  → end
 */
export const CrmScene: React.FC<CrmSceneProps> = ({ videoProps, voPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const business = videoProps.business;

  const headlineFade = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const dashEnter = spring({
    frame: frame - Math.round(0.5 * fps),
    fps,
    config: { damping: 18, stiffness: 90 },
    from: 60,
    to: 0,
  });
  const dashOpacity = interpolate(frame, [Math.round(0.5 * fps), Math.round(1.4 * fps)], [0, 1], {
    extrapolateRight: "clamp",
  });

  const calloutOpacity = interpolate(frame, [8 * fps, 8 * fps + 14], [0, 1], { extrapolateRight: "clamp" });
  const calloutY = interpolate(frame, [8 * fps, 8 * fps + 14], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell sceneId="crm" props={videoProps} voPath={voPath} background={colors.cream}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${colors.mint} 0%, transparent 50%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          right: 120,
          textAlign: "center",
          opacity: headlineFade,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: colors.mint,
            color: colors.accentDark,
            padding: "8px 18px",
            borderRadius: 9999,
            fontFamily: fonts.sans,
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          ★ Full branded CRM
        </div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 60,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: colors.ink,
            marginTop: 18,
            marginBottom: 0,
          }}
        >
          Every lead, every text, every job —{" "}
          <span style={{ color: colors.accentDark }}>in one pipeline.</span>
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          opacity: dashOpacity,
          transform: `translateY(${dashEnter}px)`,
        }}
      >
        <CRMDashboard
          videoProps={videoProps}
          countersStartFrame={Math.round(2.5 * fps)}
          countersDurationFrames={Math.round(2.5 * fps)}
        />
      </div>

      {/* Callout pill at bottom — "Branded mobile CRM" */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: `translateX(-50%) translateY(${calloutY}px)`,
          opacity: calloutOpacity,
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: colors.ink,
          color: colors.paper,
          padding: "16px 26px",
          borderRadius: 9999,
          boxShadow: "0 16px 36px -10px rgba(15, 23, 42, 0.4)",
          fontFamily: fonts.sans,
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: 28,
            height: 28,
            borderRadius: 8,
            backgroundColor: colors.accent,
            color: colors.paper,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {business.monogram}
        </span>
        Branded mobile CRM · works on {business.ownerFirstName}'s phone
      </div>
    </SceneShell>
  );
};
