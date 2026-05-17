import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneShell } from "../components/SceneShell";
import { BookingCounter } from "../components/BookingCounter";
import type { VideoProps } from "../config";

interface ReactivationSceneProps {
  videoProps: VideoProps;
  voPath?: string | null;
}

/**
 * Scene 10 — Quarterly re-activation (8s, 240 frames).
 *
 * Beats:
 *   0.0  → cream bg, headline left
 *   0.5  → "1,800 dormant customers" big stat appears
 *   1.5  → SMS-fan animation: bubbles burst out
 *   3.5  → counter card slides in right (still at 0)
 *   4.0  → counter ramps up: 0 → 87 bookings, $0 → $71k
 *   8.0  → end
 */
export const ReactivationScene: React.FC<ReactivationSceneProps> = ({ videoProps, voPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const business = videoProps.business;
  const scene = videoProps.scenes.reactivation;

  const headlineFade = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const listOpacity = interpolate(frame, [0.5 * fps, 0.5 * fps + 14], [0, 1], { extrapolateRight: "clamp" });

  const counterEnter = spring({
    frame: frame - Math.round(3.5 * fps),
    fps,
    config: { damping: 18, stiffness: 100 },
    from: 40,
    to: 0,
  });
  const counterOpacity = interpolate(frame, [3.5 * fps, 3.5 * fps + 14], [0, 1], { extrapolateRight: "clamp" });

  // SMS bubble fan — render 8 bubbles bursting out at varying angles
  const burstStart = Math.round(1.5 * fps);
  const burstFrame = frame - burstStart;
  const bubbles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <SceneShell sceneId="reactivation" props={videoProps} voPath={voPath} background={colors.cream}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 30% 40%, ${colors.mint} 0%, transparent 50%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "0 120px",
          gap: 80,
        }}
      >
        {/* Left — list + bubble burst */}
        <div style={{ position: "relative", height: "70%" }}>
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
              ★ Quarterly re-activation
            </div>
            <h1
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 70,
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: colors.ink,
                marginTop: 22,
                marginBottom: 0,
              }}
            >
              Wake up{" "}
              <span style={{ color: colors.accentDark }}>your dormant customer list.</span>
            </h1>
          </div>

          {/* The "1,800 customers" stat card */}
          <div
            style={{
              marginTop: 32,
              opacity: listOpacity,
              backgroundColor: colors.paper,
              border: `1px solid ${colors.slate[200]}`,
              borderRadius: 18,
              padding: "20px 24px",
              boxShadow: "0 12px 32px -10px rgba(15, 23, 42, 0.18)",
              maxWidth: 460,
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: fonts.sans,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: colors.slate[500],
              }}
            >
              {business.name} customer list
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1,
                color: colors.ink,
                marginTop: 8,
                letterSpacing: "-0.03em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {scene.listSize.toLocaleString()}
            </div>
            <div
              style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                color: colors.slate[600],
                marginTop: 6,
              }}
            >
              past customers · last serviced 6+ months ago
            </div>
          </div>

          {/* SMS bubble burst */}
          {burstFrame >= 0 &&
            bubbles.map((b) => {
              const angle = (b / bubbles.length) * Math.PI * 0.7 - Math.PI * 0.05;
              const distance = Math.min(Math.max(burstFrame - b * 2, 0), 40) * 6;
              const opacity = burstFrame > b * 2 ? Math.max(0, 1 - (burstFrame - b * 2 - 30) / 30) : 0;
              return (
                <div
                  key={b}
                  style={{
                    position: "absolute",
                    left: "60%",
                    top: "50%",
                    width: 28,
                    height: 22,
                    borderRadius: 14,
                    borderBottomLeftRadius: 4,
                    backgroundColor: colors.accent,
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
                    opacity,
                  }}
                />
              );
            })}
        </div>

        {/* Right — counter card */}
        <div style={{ display: "grid", placeItems: "center", opacity: counterOpacity, transform: `translateX(${counterEnter}px)` }}>
          <BookingCounter
            endBookings={scene.bookings}
            endRevenueLabel={scene.revenueLabel}
            rampStartFrame={Math.round(4.0 * fps)}
            rampDurationFrames={Math.round(3.0 * fps)}
          />
        </div>
      </div>
    </SceneShell>
  );
};
