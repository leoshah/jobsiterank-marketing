import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";

interface BookingCounterProps {
  endBookings: number;
  endRevenueLabel: string;
  rampStartFrame: number;
  rampDurationFrames: number;
}

/**
 * Big two-stat counter for re-activation results: bookings + revenue.
 */
export const BookingCounter: React.FC<BookingCounterProps> = ({
  endBookings,
  endRevenueLabel,
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
  const displayBookings = Math.round(endBookings * progress);

  // Revenue ramp: parse "$71k" → 71, animate up, re-format.
  const numericMatch = endRevenueLabel.match(/(\d+(?:\.\d+)?)/);
  const numericTarget = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const displayRevenueValue = (numericTarget * progress).toFixed(numericTarget < 10 ? 1 : 0);
  const displayRevenue = endRevenueLabel.replace(/\d+(?:\.\d+)?/, displayRevenueValue);

  return (
    <div
      style={{
        backgroundColor: colors.ink,
        color: colors.paper,
        borderRadius: 22,
        padding: 32,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 32,
        boxShadow: "0 24px 60px -16px rgba(15, 23, 42, 0.4)",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: colors.accentSoft,
          }}
        >
          New bookings
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1,
            color: colors.paper,
            marginTop: 8,
            letterSpacing: "-0.03em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayBookings}
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
          in 2 weeks
        </div>
      </div>
      <div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: colors.accentSoft,
          }}
        >
          Revenue
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1,
            color: colors.accent,
            marginTop: 8,
            letterSpacing: "-0.03em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayRevenue}
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
          on existing customer list
        </div>
      </div>
    </div>
  );
};
