import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";

interface StarCounterProps {
  startCount: number;
  endCount: number;
  startRating: number;
  endRating: number;
  /** Frame at which the count begins climbing within this scene's timeline. */
  rampStartFrame: number;
  rampDurationFrames: number;
}

/**
 * Animated counter showing the review count + rating climbing.
 */
export const StarCounter: React.FC<StarCounterProps> = ({
  startCount,
  endCount,
  startRating,
  endRating,
  rampStartFrame,
  rampDurationFrames,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [rampStartFrame, rampStartFrame + rampDurationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const displayCount = Math.round(startCount + (endCount - startCount) * progress);
  const displayRating = (startRating + (endRating - startRating) * progress).toFixed(1);

  return (
    <div
      style={{
        backgroundColor: colors.paper,
        border: `1px solid ${colors.slate[200]}`,
        borderRadius: 18,
        padding: "18px 22px",
        display: "flex",
        alignItems: "center",
        gap: 22,
        boxShadow: "0 6px 20px -8px rgba(15, 23, 42, 0.12)",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: colors.slate[500],
            textTransform: "uppercase",
          }}
        >
          Reviews
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 38,
            fontWeight: 700,
            lineHeight: 1,
            color: colors.ink,
            marginTop: 4,
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayCount.toLocaleString()}
        </div>
      </div>
      <div style={{ width: 1, height: 40, backgroundColor: colors.slate[200] }} />
      <div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: colors.slate[500],
            textTransform: "uppercase",
          }}
        >
          Rating
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 6,
            marginTop: 4,
          }}
        >
          <span
            style={{
              fontFamily: fonts.display,
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1,
              color: colors.ink,
              letterSpacing: "-0.02em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {displayRating}
          </span>
          <span style={{ fontSize: 18, color: colors.warning }}>★</span>
        </div>
      </div>
    </div>
  );
};
