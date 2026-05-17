import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneShell } from "../components/SceneShell";
import { DirectoryLogo } from "../components/DirectoryLogo";
import type { VideoProps } from "../config";

interface DirectoriesSceneProps {
  videoProps: VideoProps;
  voPath?: string | null;
}

/**
 * Scene 07 — Online directory listings (8s, 240 frames).
 *
 * Beats:
 *   0.0  → cream bg, headline center
 *   1.0  → first logo (Yelp) bounces in
 *   1.7  → Apple Maps
 *   2.4  → Bing
 *   3.1  → Nextdoor
 *   4.5  → "+ many more" label fades in below
 *   8.0  → end
 */
export const DirectoriesScene: React.FC<DirectoriesSceneProps> = ({ videoProps, voPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const business = videoProps.business;
  const scene = videoProps.scenes.directories;

  const headlineFade = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const logoEnter = (atSeconds: number) => {
    const localFrame = frame - atSeconds * fps;
    const scale = spring({
      frame: localFrame,
      fps,
      config: { damping: 11, stiffness: 130 },
      from: 0,
      to: 1,
    });
    const opacity = spring({
      frame: localFrame,
      fps,
      config: { damping: 16, stiffness: 110 },
      from: 0,
      to: 1,
    });
    return { transform: `scale(${scale})`, opacity };
  };

  const moreOpacity = interpolate(frame, [4.5 * fps, 4.5 * fps + 16], [0, 1], { extrapolateRight: "clamp" });
  const platforms = scene.visiblePlatforms;
  const beats = [1.0, 1.7, 2.4, 3.1, 3.7, 4.4];

  return (
    <SceneShell sceneId="directories" props={videoProps} voPath={voPath} background={colors.cream}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${colors.mint} 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 120px",
          gap: 60,
        }}
      >
        {/* Headline */}
        <div style={{ textAlign: "center", opacity: headlineFade, maxWidth: 1100 }}>
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
            ★ Online directory listings
          </div>
          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: colors.ink,
              marginTop: 22,
              marginBottom: 0,
            }}
          >
            Listed everywhere {business.city} customers
            <span style={{ display: "block", color: colors.accentDark }}>
              actually search for plumbers.
            </span>
          </h1>
        </div>

        {/* Logo cascade */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 60,
            flexWrap: "wrap",
          }}
        >
          {platforms.map((platform, i) => (
            <div key={platform} style={logoEnter(beats[i] ?? 5)}>
              <DirectoryLogo platform={platform} />
            </div>
          ))}
        </div>

        {/* "+ more" */}
        <div
          style={{
            opacity: moreOpacity,
            fontFamily: fonts.sans,
            fontSize: 18,
            color: colors.slate[500],
            fontWeight: 500,
          }}
        >
          + more sites where customers hunt for service
        </div>
      </div>
    </SceneShell>
  );
};
