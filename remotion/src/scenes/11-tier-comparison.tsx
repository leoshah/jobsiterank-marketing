import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneShell } from "../components/SceneShell";
import { TierCard } from "../components/TierCard";
import type { VideoProps } from "../config";

interface TierCloseSceneProps {
  videoProps: VideoProps;
  voPath?: string | null;
}

/**
 * Scene 11 — Tier comparison + CTA close (10s, 300 frames).
 *
 * Beats:
 *   0.0  → cream bg, headline center fades in
 *   0.5  → tier cards slide in from below (Never Miss a Lead, Local Authority)
 *   5.0  → cards stay; CTA card cross-fades over the top half
 *   10.0 → end (final video frame)
 */
export const TierCloseScene: React.FC<TierCloseSceneProps> = ({ videoProps, voPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const business = videoProps.business;
  const scene = videoProps.scenes.tierClose;

  const headlineFade = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const cardEnter = (delaySeconds: number) => {
    const localFrame = frame - Math.round((0.5 + delaySeconds) * fps);
    const y = spring({ frame: localFrame, fps, config: { damping: 18, stiffness: 90 }, from: 60, to: 0 });
    const opacity = interpolate(localFrame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return { transform: `translateY(${y}px)`, opacity };
  };

  // CTA card overlay starts at 5.5s
  const ctaStart = Math.round(5.5 * fps);
  const ctaOpacity = interpolate(frame, [ctaStart, ctaStart + 18], [0, 1], { extrapolateRight: "clamp" });
  const ctaScale = spring({
    frame: frame - ctaStart,
    fps,
    config: { damping: 16, stiffness: 100 },
    from: 0.94,
    to: 1,
  });

  // Tier cards slide aside / blur to push attention to CTA card
  const tiersBackgroundOpacity = interpolate(frame, [ctaStart, ctaStart + 18], [1, 0.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell sceneId="tierClose" props={videoProps} voPath={voPath} background={colors.cream}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${colors.mint} 0%, transparent 60%)`,
        }}
      />

      {/* Headline strip */}
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
          ★ Pricing
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
          Two plans.{" "}
          <span style={{ color: colors.accentDark }}>Free website with both.</span>
        </h1>
      </div>

      {/* Tier cards */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 320,
          display: "flex",
          justifyContent: "center",
          gap: 32,
          opacity: tiersBackgroundOpacity,
        }}
      >
        <div style={cardEnter(0)}>
          <TierCard
            name="Never Miss a Lead"
            tagline="Catch every missed call. Stack every review."
            pricePerMonth={scene.tier1Price}
            features={[
              "Free conversion-focused website",
              "Missed-call text-back (under 30s)",
              "Dedicated business number",
              "Two-way SMS inbox",
              "Review request automation",
              "Smart routing (happy → Google)",
            ]}
          />
        </div>
        <div style={cardEnter(0.2)}>
          <TierCard
            name="Local Authority"
            tagline="The full system. We own the local map."
            pricePerMonth={scene.tier2Price}
            badge="Flagship"
            highlight
            features={[
              "Everything in Never Miss a Lead",
              "Google Business Profile optimization",
              "GBP posts (2×/wk)",
              "Online directory listings",
              "Review responses by our team",
              "Full branded mobile CRM",
              "Quarterly re-activation campaigns",
            ]}
          />
        </div>
      </div>

      {/* CTA end card */}
      {frame >= ctaStart && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            opacity: ctaOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: colors.ink,
              color: colors.paper,
              padding: "60px 80px",
              borderRadius: 32,
              boxShadow: "0 36px 72px -16px rgba(15, 23, 42, 0.55)",
              textAlign: "center",
              maxWidth: 920,
              transform: `scale(${ctaScale})`,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: colors.accent,
                  color: colors.paper,
                  fontFamily: fonts.display,
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                JR
              </span>
              <span
                style={{
                  fontFamily: fonts.display,
                  fontSize: 26,
                  fontWeight: 600,
                  color: colors.paper,
                  letterSpacing: "-0.015em",
                }}
              >
                JobsiteRank
              </span>
            </div>
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: 76,
                fontWeight: 600,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: colors.paper,
                margin: 0,
              }}
            >
              Ready to stop missing jobs,{" "}
              <span style={{ color: colors.accent }}>{business.ownerFirstName}?</span>
            </h2>
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: 22,
                lineHeight: 1.5,
                color: "rgba(255, 255, 255, 0.75)",
                marginTop: 24,
                marginBottom: 0,
              }}
            >
              Twenty-minute demo. We pull up your Google Business Profile live.
            </p>
            <div
              style={{
                marginTop: 36,
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                backgroundColor: colors.accent,
                color: colors.paper,
                padding: "18px 36px",
                borderRadius: 9999,
                fontFamily: fonts.sans,
                fontSize: 22,
                fontWeight: 700,
                boxShadow: "0 16px 36px -10px rgba(16, 185, 129, 0.5)",
              }}
            >
              Book a demo at {scene.ctaUrl}
              <span style={{ fontSize: 22 }}>→</span>
            </div>
          </div>
        </div>
      )}
    </SceneShell>
  );
};
