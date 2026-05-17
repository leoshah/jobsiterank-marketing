import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { interpolate as interpolateTpl } from "../lib/interpolate";
import { SceneShell } from "../components/SceneShell";
import { PhoneFrame } from "../components/PhoneFrame";
import { WebsitePreview } from "../components/WebsitePreview";
import type { VideoProps } from "../config";

interface WebsiteSceneProps {
  videoProps: VideoProps;
  voPath?: string | null;
}

/**
 * Scene 04 — Free conversion-focused website (8s, 240 frames).
 *
 * Beats:
 *   0.0  → cream bg, headline left
 *   0.5  → phone enters with site loading
 *   2.5  → "tap" pulse animates over CTA button
 *   4.0  → "Call connected" overlay slides in across phone
 *   8.0  → end
 */
export const WebsiteScene: React.FC<WebsiteSceneProps> = ({ videoProps, voPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const business = videoProps.business;
  const scene = videoProps.scenes.website;

  const headlineFade = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const phoneEnter = spring({
    frame: frame - Math.round(0.5 * fps),
    fps,
    config: { damping: 16, stiffness: 100 },
    from: 40,
    to: 0,
  });
  const phoneOpacity = interpolate(frame, [Math.round(0.5 * fps), Math.round(1.2 * fps)], [0, 1], {
    extrapolateRight: "clamp",
  });

  const tapPulseStart = Math.round(2.5 * fps);
  const tapPulseFrame = frame - tapPulseStart;
  const tapScale = tapPulseFrame >= 0 && tapPulseFrame < 30 ? 1 + 0.18 * Math.sin((tapPulseFrame / 30) * Math.PI) : 1;
  const tapOpacity = tapPulseFrame >= 0 && tapPulseFrame < 30 ? 1 - tapPulseFrame / 30 : 0;

  const callOverlayStart = Math.round(4.0 * fps);
  const callOverlayProgress = interpolate(frame, [callOverlayStart, callOverlayStart + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heroHeadline = interpolateTpl(scene.heroHeadline, videoProps as unknown as Record<string, unknown>);

  return (
    <SceneShell sceneId="website" props={videoProps} voPath={voPath} background={colors.cream}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 25% 60%, ${colors.mint} 0%, transparent 55%)`,
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
            ★ Free with every plan
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
            A website built for one thing:
            <span style={{ display: "block", color: colors.accentDark }}>getting the call.</span>
          </h1>
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
            Mobile-first. Loads in under a second. Tap-to-call front and center. Built around what {business.city} customers actually do on their phone.
          </p>
        </div>

        <div style={{ display: "grid", placeItems: "center", opacity: phoneOpacity, transform: `translateX(${phoneEnter}px)`, position: "relative" }}>
          <PhoneFrame widthPx={460} heightPx={820}>
            <WebsitePreview
              businessName={business.name}
              monogram={business.monogram}
              city={business.city}
              heroHeadline={heroHeadline}
              heroSubhead={scene.heroSubhead}
              ctaPhone={scene.ctaPhone}
            />
          </PhoneFrame>

          {/* Tap pulse over the CTA */}
          {tapPulseFrame >= 0 && tapPulseFrame < 30 && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "62%",
                width: 60,
                height: 60,
                borderRadius: 9999,
                border: `3px solid ${colors.accent}`,
                transform: `translate(-50%, -50%) scale(${tapScale})`,
                opacity: tapOpacity,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Call connected overlay */}
          {callOverlayProgress > 0 && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) scale(${0.92 + callOverlayProgress * 0.08})`,
                backgroundColor: colors.accent,
                color: colors.paper,
                padding: "20px 32px",
                borderRadius: 22,
                fontFamily: fonts.sans,
                fontWeight: 700,
                fontSize: 24,
                boxShadow: "0 30px 60px -15px rgba(16, 185, 129, 0.6)",
                opacity: callOverlayProgress,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <span style={{ fontSize: 28 }}>✆</span>
              Call connected
            </div>
          )}
        </div>
      </div>
    </SceneShell>
  );
};
