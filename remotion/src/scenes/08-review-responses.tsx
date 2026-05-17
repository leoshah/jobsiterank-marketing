import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneShell } from "../components/SceneShell";
import { GoogleReviewCard } from "../components/GoogleReviewCard";
import { TypingIndicator } from "../components/TypingIndicator";
import type { VideoProps } from "../config";

interface ReviewResponsesSceneProps {
  videoProps: VideoProps;
  voPath?: string | null;
}

/**
 * Scene 08 — Review responses by team (8s, 240 frames).
 *
 * Beats:
 *   0.0  → cream bg, headline left
 *   0.5  → original review card slides in right
 *   2.5  → "Drafting reply..." typing indicator appears below review
 *   4.5  → reply card pops in (typed indicator vanishes)
 *   6.5  → "Posted ✓" badge attaches to reply
 *   8.0  → end
 */
export const ReviewResponsesScene: React.FC<ReviewResponsesSceneProps> = ({ videoProps, voPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const business = videoProps.business;
  const scene = videoProps.scenes.reviewResponses;

  const headlineFade = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const reviewEnter = spring({
    frame: frame - Math.round(0.5 * fps),
    fps,
    config: { damping: 16, stiffness: 100 },
    from: 40,
    to: 0,
  });
  const reviewOpacity = interpolate(frame, [Math.round(0.5 * fps), Math.round(1.2 * fps)], [0, 1], {
    extrapolateRight: "clamp",
  });

  const showTyping = frame >= 2.5 * fps && frame < 4.5 * fps;
  const replyOpacity = interpolate(frame, [4.5 * fps, 4.5 * fps + 14], [0, 1], { extrapolateRight: "clamp" });
  const replyScale = spring({
    frame: frame - Math.round(4.5 * fps),
    fps,
    config: { damping: 14, stiffness: 110 },
    from: 0.95,
    to: 1,
  });

  const postedOpacity = interpolate(frame, [6.5 * fps, 6.5 * fps + 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <SceneShell sceneId="reviewResponses" props={videoProps} voPath={voPath} background={colors.cream}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 70% 40%, ${colors.mint} 0%, transparent 60%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          alignItems: "center",
          padding: "0 120px",
          gap: 80,
        }}
      >
        {/* Left — copy */}
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
            ★ Review responses
          </div>
          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 78,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: colors.ink,
              marginTop: 28,
              marginBottom: 0,
            }}
          >
            Every review,
            <span style={{ display: "block", color: colors.accentDark }}>thoughtfully replied to.</span>
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
            Our team writes the reply. On-brand, in your voice. {business.ownerFirstName} doesn't lift a finger.
          </p>
        </div>

        {/* Right — review + reply stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 600 }}>
          {/* Original review */}
          <div style={{ opacity: reviewOpacity, transform: `translateX(${reviewEnter}px)` }}>
            <GoogleReviewCard
              reviewerName="Sarah K."
              reviewerInitials="SK"
              reviewBody={scene.incomingReview}
              whenLabel="2h ago"
              starsFilled={5}
            />
          </div>

          {/* Drafting indicator */}
          {showTyping && (
            <div style={{ marginLeft: 50 }}>
              <TypingIndicator />
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  color: colors.slate[500],
                  marginTop: 6,
                }}
              >
                JobsiteRank team drafting reply...
              </div>
            </div>
          )}

          {/* Posted reply */}
          {frame >= 4.5 * fps && (
            <div
              style={{
                marginLeft: 50,
                opacity: replyOpacity,
                transform: `scale(${replyScale})`,
                transformOrigin: "top left",
              }}
            >
              <div
                style={{
                  backgroundColor: colors.paper,
                  border: `1px solid ${colors.slate[200]}`,
                  borderRadius: 18,
                  padding: 18,
                  boxShadow: "0 8px 24px -10px rgba(15, 23, 42, 0.18)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9999,
                      backgroundColor: colors.ink,
                      color: colors.accent,
                      display: "grid",
                      placeItems: "center",
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {business.monogram}
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.ink }}>
                      {business.name} replied
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 11, color: colors.slate[500] }}>just now</div>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: colors.slate[700],
                  }}
                >
                  {scene.reply}
                </div>

                {/* Posted badge */}
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    right: 16,
                    opacity: postedOpacity,
                    backgroundColor: colors.accent,
                    color: colors.paper,
                    padding: "4px 12px",
                    borderRadius: 9999,
                    fontFamily: fonts.sans,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    boxShadow: "0 6px 16px -4px rgba(16, 185, 129, 0.5)",
                  }}
                >
                  ✓ posted
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SceneShell>
  );
};
