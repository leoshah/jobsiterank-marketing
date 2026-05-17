import React from "react";
import { colors, fonts } from "../theme";

interface TierCardProps {
  name: string;
  tagline: string;
  pricePerMonth: number;
  features: string[];
  badge?: string;
  highlight?: boolean;
}

/**
 * Pricing tier card. Direct port of src/pages/index.astro:480-511.
 * The "Flagship" tier card gets a green badge + slight emerald glow.
 */
export const TierCard: React.FC<TierCardProps> = ({
  name,
  tagline,
  pricePerMonth,
  features,
  badge,
  highlight = false,
}) => {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: colors.paper,
        border: `1px solid ${highlight ? colors.accentSoft : colors.slate[200]}`,
        borderRadius: 24,
        padding: 36,
        boxShadow: highlight
          ? "0 28px 64px -16px rgba(16, 185, 129, 0.25)"
          : "0 12px 32px -12px rgba(15, 23, 42, 0.12)",
        width: 460,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: -16,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: colors.accent,
            color: colors.paper,
            padding: "6px 16px",
            borderRadius: 9999,
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          {badge}
        </div>
      )}

      <h3
        style={{
          fontFamily: fonts.display,
          fontSize: 26,
          fontWeight: 600,
          color: colors.ink,
          margin: 0,
          letterSpacing: "-0.015em",
        }}
      >
        {name}
      </h3>
      <p
        style={{
          fontFamily: fonts.sans,
          fontSize: 15,
          color: colors.slate[600],
          marginTop: 8,
          marginBottom: 0,
        }}
      >
        {tagline}
      </p>

      <div style={{ marginTop: 24, display: "flex", alignItems: "baseline", gap: 6 }}>
        <span
          style={{
            fontFamily: fonts.display,
            fontSize: 60,
            fontWeight: 700,
            color: colors.ink,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          ${pricePerMonth}
        </span>
        <span style={{ fontFamily: fonts.sans, fontSize: 16, color: colors.slate[500] }}>/ month</span>
      </div>

      <ul
        style={{
          marginTop: 28,
          marginBottom: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
        }}
      >
        {features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span
              style={{
                flexShrink: 0,
                width: 22,
                height: 22,
                marginTop: 2,
                borderRadius: 9999,
                backgroundColor: colors.mint,
                color: colors.accentDark,
                display: "grid",
                placeItems: "center",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              ✓
            </span>
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: 15,
                color: colors.slate[700],
                lineHeight: 1.45,
              }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
