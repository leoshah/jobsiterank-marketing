import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneShell } from "../components/SceneShell";
import { PhoneFrame } from "../components/PhoneFrame";
import { PhoneHeader } from "../components/PhoneHeader";
import { ReviewRequestCard } from "../components/ReviewRequestCard";
import { GoogleReviewCard } from "../components/GoogleReviewCard";
import { StarCounter } from "../components/StarCounter";
import type { VideoProps } from "../config";

interface ReviewsSceneProps {
  videoProps: VideoProps;
  voPath?: string | null;
}

/**
 * Scene 05 — Review automation + smart routing (12s, 360 frames).
 *
 * Beats:
 *   0.0  → cream bg, headline left, phone enters right
 *   1.0  → "Job complete · J. Lopez" notification at top of phone
 *   2.5  → review-request SMS sent (auto-text bubble)
 *   4.5  → smart-routing label slides in: "Happy → Google"
 *   6.0  → 5-star Google review card pops onto phone
 *   8.0  → review counter starts climbing 127 → 184, rating 4.6 → 4.9
 *  12.0  → end
 */
export const ReviewsScene: React.FC<ReviewsSceneProps> = ({ videoProps, voPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const business = videoProps.business;
  const scene = videoProps.scenes.reviews;

  const reviewerInitials = scene.reviewerName
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const headlineFade = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const phoneEnter = spring({
    frame: frame - 12,
    fps,
    config: { damping: 18, stiffness: 100 },
    from: 0.94,
    to: 1,
  });
  const phoneOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const beat = (atSeconds: number) => {
    const localFrame = frame - atSeconds * fps;
    const opacity = spring({
      frame: localFrame,
      fps,
      config: { damping: 18, stiffness: 100 },
      from: 0,
      to: 1,
    });
    const translateY = interpolate(opacity, [0, 1], [12, 0]);
    return { opacity, transform: `translateY(${translateY}px)` };
  };

  const routingTagOpacity = interpolate(frame, [4.5 * fps, 4.5 * fps + 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <SceneShell sceneId="reviews" props={videoProps} voPath={voPath} background={colors.cream}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 75% 40%, ${colors.mint} 0%, transparent 55%)`,
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
            ★ Review automation
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
            After every job,
            <span style={{ display: "block", color: colors.accentDark }}>your star count climbs.</span>
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
            Auto-ask after every job. Happy customers get routed to Google. Unhappy ones come straight to {business.ownerFirstName}, privately.
          </p>

          {/* Counter at the bottom */}
          <div style={{ marginTop: 36 }}>
            <StarCounter
              startCount={scene.startingReviewCount}
              endCount={scene.endingReviewCount}
              startRating={scene.startingRating}
              endRating={scene.endingRating}
              rampStartFrame={Math.round(8.0 * fps)}
              rampDurationFrames={Math.round(3.5 * fps)}
            />
          </div>
        </div>

        <div style={{ display: "grid", placeItems: "center", opacity: phoneOpacity, transform: `scale(${phoneEnter})`, position: "relative" }}>
          <PhoneFrame widthPx={460} heightPx={820}>
            <PhoneHeader
              monogram={business.monogram}
              businessName={business.name}
              city={business.city}
              state={business.state}
              clockText="5:42 PM"
            />

            {/* Job complete notification */}
            <div style={beat(1.0)}>
              <div
                style={{
                  backgroundColor: colors.mint,
                  border: `1px solid ${colors.accentSoft}`,
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ color: colors.accentDark, fontSize: 18 }}>✓</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: colors.ink }}>
                    Job complete · J. Lopez
                  </div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.slate[500] }}>
                    Water heater · $1,840 · paid
                  </div>
                </div>
              </div>
            </div>

            {/* Review request SMS */}
            <div style={beat(2.5)}>
              <ReviewRequestCard customerName={scene.reviewerName.split(" ")[0]} />
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  color: colors.slate[400],
                  textAlign: "right",
                  marginTop: 5,
                }}
              >
                Auto-text · 5:43 PM
              </div>
            </div>

            {/* Smart routing tag */}
            <div
              style={{
                marginTop: 14,
                opacity: routingTagOpacity,
                display: "flex",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: colors.slate[100],
                  color: colors.accentDark,
                  padding: "5px 12px",
                  borderRadius: 9999,
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                ✓ Happy → Google
              </span>
            </div>

            {/* 5-star review */}
            <div style={{ marginTop: 18, ...beat(6.0) }}>
              <GoogleReviewCard
                reviewerName={scene.reviewerName}
                reviewerInitials={reviewerInitials}
                reviewBody={scene.reviewBody}
                whenLabel="just now"
                starsFilled={5}
              />
            </div>
          </PhoneFrame>
        </div>
      </div>
    </SceneShell>
  );
};
