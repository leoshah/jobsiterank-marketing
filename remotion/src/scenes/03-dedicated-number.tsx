import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { interpolate as interpolateTpl } from "../lib/interpolate";
import { SceneShell } from "../components/SceneShell";
import { PhoneFrame } from "../components/PhoneFrame";
import { PhoneHeader } from "../components/PhoneHeader";
import { NumberBadge } from "../components/NumberBadge";
import { SMSBubble } from "../components/SMSBubble";
import type { VideoProps } from "../config";

interface DedicatedNumberSceneProps {
  videoProps: VideoProps;
  voPath?: string | null;
}

/**
 * Scene 03 — Dedicated number + 2-way SMS inbox (10s, 300 frames).
 *
 * Beats:
 *   0.0  → cream bg, headline + branded number badge enter from left
 *   0.7  → phone enters from right
 *   1.5  → first conversation bubble (outbound)
 *   3.0  → reply (inbound)
 *   4.5  → response (outbound)
 *   6.0  → second conversation thread fades in below first
 *  10.0  → end
 */
export const DedicatedNumberScene: React.FC<DedicatedNumberSceneProps> = ({ videoProps, voPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const business = videoProps.business;
  const scene = videoProps.scenes.dedicatedNumber;

  const headlineFade = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const phoneEnter = spring({
    frame: frame - Math.round(0.7 * fps),
    fps,
    config: { damping: 16, stiffness: 100 },
    from: 40,
    to: 0,
  });
  const phoneOpacity = interpolate(frame, [Math.round(0.7 * fps), Math.round(1.4 * fps)], [0, 1], {
    extrapolateRight: "clamp",
  });

  const beat = (atSeconds: number) => {
    const localFrame = frame - atSeconds * fps;
    const opacity = spring({
      frame: localFrame,
      fps,
      config: { damping: 18, stiffness: 100 },
      from: 0,
      to: 1,
    });
    const translateY = interpolate(opacity, [0, 1], [10, 0]);
    return { opacity, transform: `translateY(${translateY}px)` };
  };

  const lines = scene.conversationLines.map((line) =>
    interpolateTpl(line, videoProps as unknown as Record<string, unknown>)
  );

  return (
    <SceneShell sceneId="dedicatedNumber" props={videoProps} voPath={voPath} background={colors.cream}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 75% 50%, ${colors.mint} 0%, transparent 55%)`,
          pointerEvents: "none",
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
        <div style={{ opacity: headlineFade }}>
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
            ★ Branded business number
          </div>
          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 80,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: colors.ink,
              marginTop: 28,
              marginBottom: 0,
            }}
          >
            One number for {business.name}.
            <span style={{ display: "block", color: colors.accentDark }}>One inbox for every text.</span>
          </h1>

          <div style={{ marginTop: 36 }}>
            <NumberBadge number={scene.displayNumber} caption={`${business.name} · live`} />
          </div>

          <p
            style={{
              fontFamily: fonts.sans,
              fontSize: 22,
              lineHeight: 1.5,
              color: colors.slate[600],
              marginTop: 28,
              maxWidth: 540,
            }}
          >
            Port your old number or pick a new one. Either way it stays yours forever — even if you cancel us.
          </p>
        </div>

        <div style={{ display: "grid", placeItems: "center", opacity: phoneOpacity, transform: `translateX(${phoneEnter}px)` }}>
          <PhoneFrame widthPx={460} heightPx={820}>
            <PhoneHeader
              monogram={business.monogram}
              businessName={business.name}
              city={business.city}
              state={business.state}
              clockText="2:14 PM"
            />

            <div
              style={{
                fontFamily: fonts.sans,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: colors.slate[400],
                marginBottom: 14,
              }}
            >
              Inbox · 2 active
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={beat(1.5)}>
                <SMSBubble direction="outbound" text={lines[0] ?? "Hi"} timestampLabel={`${business.ownerFirstName} · 2:14 PM`} />
              </div>
              <div style={beat(3.0)}>
                <SMSBubble direction="inbound" text={lines[1] ?? "..."} timestampLabel="Customer · 2:14 PM" />
              </div>
              <div style={beat(4.5)}>
                <SMSBubble direction="outbound" text={lines[2] ?? "Thanks"} timestampLabel={`${business.ownerFirstName} · 2:15 PM`} />
              </div>
            </div>

            {/* Second conversation thread (preview / archived) */}
            <div
              style={{
                marginTop: "auto",
                paddingTop: 16,
                borderTop: `1px solid ${colors.slate[200]}`,
                ...beat(6.0),
              }}
            >
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: colors.slate[400],
                  marginBottom: 10,
                }}
              >
                Earlier today
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 0",
                }}
              >
                <div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: colors.ink }}>A. Patel</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 11, color: colors.slate[500] }}>
                    "On the way, ETA 35 min" · 11:42 AM
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 11,
                    color: colors.accentDark,
                    fontWeight: 600,
                  }}
                >
                  ✓ booked
                </span>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </SceneShell>
  );
};
