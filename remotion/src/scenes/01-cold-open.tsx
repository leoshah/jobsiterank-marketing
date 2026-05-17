import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneShell } from "../components/SceneShell";
import { IncomingCallCard } from "../components/IncomingCallCard";
import { PhoneFrame } from "../components/PhoneFrame";
import { PhoneHeader } from "../components/PhoneHeader";
import type { VideoProps } from "../config";

interface ColdOpenSceneProps {
  videoProps: VideoProps;
  voPath?: string | null;
}

/**
 * Scene 01 — Cold open (8s, 240 frames @ 30fps).
 *
 * Beats:
 *   0.0  → ink background fades in with subtle red gradient
 *   0.5  → phone enters, ringing card pulses
 *   3.5  → call missed (red dot, badge state)
 *   5.0  → big stat overlay slides in:
 *          "1 in 4 calls go to voicemail"
 *          subline: "every one is a job lost"
 *   8.0  → cut to scene 2
 */
export const ColdOpenScene: React.FC<ColdOpenSceneProps> = ({ videoProps, voPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const business = videoProps.business;
  const scene = videoProps.scenes.coldOpen;

  const phoneEnter = spring({
    frame: frame - 12,
    fps,
    config: { damping: 18, stiffness: 90 },
    from: 0.94,
    to: 1,
  });
  const phoneOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const statSlideIn = spring({
    frame: frame - 5 * fps,
    fps,
    config: { damping: 18, stiffness: 100 },
    from: 30,
    to: 0,
  });
  const statOpacity = interpolate(frame, [5 * fps, 5 * fps + 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <SceneShell sceneId="coldOpen" props={videoProps} voPath={voPath} background={colors.ink}>
      <AbsoluteFill
        style={{
          backgroundColor: colors.ink,
          background: `radial-gradient(ellipse at 70% 30%, rgba(220, 38, 38, 0.18), transparent 60%), ${colors.ink}`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          alignItems: "center",
          padding: "0 120px",
          gap: 80,
        }}
      >
        {/* Left — narrative copy */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(220, 38, 38, 0.18)",
              color: "#FCA5A5",
              padding: "8px 18px",
              borderRadius: 9999,
              fontFamily: fonts.sans,
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            ● The problem
          </div>

          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: colors.paper,
              marginTop: 28,
              marginBottom: 0,
            }}
          >
            Every missed call is{" "}
            <span style={{ color: "#FCA5A5" }}>a job your competitor books.</span>
          </h1>

          {/* Stat overlay */}
          <div
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 24,
              opacity: statOpacity,
              transform: `translateY(${statSlideIn}px)`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 110,
                fontWeight: 700,
                lineHeight: 1,
                color: colors.paper,
                letterSpacing: "-0.04em",
              }}
            >
              1 in 4
            </div>
            <div
              style={{
                fontFamily: fonts.sans,
                fontSize: 22,
                color: "rgba(255, 255, 255, 0.65)",
                lineHeight: 1.35,
                maxWidth: 320,
              }}
            >
              calls to {business.name} used to go to voicemail. Every one was lost revenue.
            </div>
          </div>
        </div>

        {/* Right — phone with ringing-then-missed call */}
        <div style={{ display: "grid", placeItems: "center", opacity: phoneOpacity, transform: `scale(${phoneEnter})` }}>
          <PhoneFrame widthPx={460} heightPx={820}>
            <PhoneHeader
              monogram={business.monogram}
              businessName={business.name}
              city={business.city}
              state={business.state}
              clockText={scene.missedAt}
            />

            <div style={{ marginTop: 60 }}>
              <IncomingCallCard
                callerLabel="Unknown"
                callerSubLabel={scene.missedAt}
                ringStartFrame={Math.round(0.5 * fps)}
                missAtFrame={Math.round(3.5 * fps)}
              />
            </div>

            {/* Subtle "phone idle" placeholder beneath */}
            <div
              style={{
                marginTop: "auto",
                paddingTop: 18,
                borderTop: `1px solid ${colors.slate[200]}`,
                fontFamily: fonts.sans,
                fontSize: 12,
                color: colors.slate[400],
                textAlign: "center",
              }}
            >
              Phone idle · no callback queued
            </div>
          </PhoneFrame>
        </div>
      </div>
    </SceneShell>
  );
};
