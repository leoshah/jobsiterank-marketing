import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneShell } from "../components/SceneShell";
import { GBPCard } from "../components/GBPCard";
import { ThreePackResult } from "../components/ThreePackResult";
import type { VideoProps } from "../config";

interface GbpSceneProps {
  videoProps: VideoProps;
  voPath?: string | null;
}

/**
 * Scene 06 — GBP optimization + 2x/wk posts (10s, 300 frames).
 *
 * Beats:
 *   0.0  → cream bg, GBP card enters left (initially "unoptimized")
 *   1.5  → optimization flags appear one by one inside card
 *   4.5  → 3-pack card slides in right showing prospect at #3
 *   6.5  → prospect jumps to #1 in 3-pack with mint pulse
 *   8.0  → "#1 in 3-pack" big tag overlay
 *  10.0  → end
 */
export const GbpScene: React.FC<GbpSceneProps> = ({ videoProps, voPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const business = videoProps.business;
  const scene = videoProps.scenes.gbp;

  const cardEnter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100 },
    from: 40,
    to: 0,
  });
  const cardOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });

  const threePackEnter = spring({
    frame: frame - Math.round(4.5 * fps),
    fps,
    config: { damping: 16, stiffness: 100 },
    from: 40,
    to: 0,
  });
  const threePackOpacity = interpolate(frame, [4.5 * fps, 4.5 * fps + 14], [0, 1], { extrapolateRight: "clamp" });

  const flagBeat = (atSeconds: number) => {
    const localFrame = frame - atSeconds * fps;
    const opacity = spring({ frame: localFrame, fps, config: { damping: 18, stiffness: 110 }, from: 0, to: 1 });
    return opacity;
  };

  // After 6.5s, prospect jumps to #1 — flip the array.
  const isPromoted = frame >= 6.5 * fps;
  const threePackEntries = isPromoted
    ? [
        { position: 1, name: business.name, rating: 4.9, reviewCount: 184, highlight: true },
        { position: 2, name: "City Plumbing & Drain", rating: 4.6, reviewCount: 98 },
        { position: 3, name: "Reliable Plumbers Inc.", rating: 4.4, reviewCount: 73 },
      ]
    : [
        { position: 1, name: "City Plumbing & Drain", rating: 4.6, reviewCount: 98 },
        { position: 2, name: "Reliable Plumbers Inc.", rating: 4.4, reviewCount: 73 },
        { position: 3, name: business.name, rating: 4.5, reviewCount: 127, highlight: true },
      ];

  const visibleFlags: string[] = [];
  if (frame >= 1.5 * fps * flagBeat(1.5)) visibleFlags.push("Categories tuned");
  if (flagBeat(2.2) > 0.5) visibleFlags.push("Photos refreshed");
  if (flagBeat(3.0) > 0.5) visibleFlags.push("Q&A populated");
  if (flagBeat(3.7) > 0.5) visibleFlags.push("Posts 2×/wk");

  // Show big "#1" tag after promotion
  const tagOpacity = interpolate(frame, [8.0 * fps, 8.0 * fps + 14], [0, 1], { extrapolateRight: "clamp" });

  return (
    <SceneShell sceneId="gbp" props={videoProps} voPath={voPath} background={colors.cream}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${colors.mint} 0%, transparent 60%)`,
        }}
      />

      {/* Headline strip across top */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          right: 120,
          textAlign: "center",
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
          ★ Google Business Profile
        </div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 64,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: colors.ink,
            marginTop: 18,
            marginBottom: 0,
          }}
        >
          We optimize your map listing,{" "}
          <span style={{ color: colors.accentDark }}>then post weekly until you're #1.</span>
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 320,
          bottom: 80,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: 60,
        }}
      >
        {/* GBP card */}
        <div style={{ display: "grid", placeItems: "center", opacity: cardOpacity, transform: `translateX(${-cardEnter}px)` }}>
          <GBPCard
            businessName={business.name}
            city={business.city}
            state={business.state}
            monogram={business.monogram}
            rating={isPromoted ? 4.9 : 4.5}
            reviewCount={isPromoted ? 184 : 127}
            primaryCategory={scene.categoryPrimary}
            secondaryCategories={scene.categoriesSecondary}
            photoCount={scene.photoCount}
            postsThisWeek={2}
            optimizedFlags={visibleFlags}
          />
        </div>

        {/* 3-pack */}
        <div
          style={{
            display: "grid",
            placeItems: "center",
            opacity: threePackOpacity,
            transform: `translateX(${threePackEnter}px)`,
            position: "relative",
          }}
        >
          <ThreePackResult
            query={`plumber near ${business.city}`}
            entries={threePackEntries}
          />

          {/* Big #1 tag overlay */}
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -20,
              backgroundColor: colors.accent,
              color: colors.paper,
              padding: "12px 24px",
              borderRadius: 9999,
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "-0.01em",
              boxShadow: "0 18px 40px -12px rgba(16, 185, 129, 0.5)",
              opacity: tagOpacity,
              transform: `scale(${0.85 + tagOpacity * 0.15})`,
            }}
          >
            ↑ #1 in 3-pack
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
