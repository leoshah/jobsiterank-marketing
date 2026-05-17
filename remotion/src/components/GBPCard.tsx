import React from "react";
import { colors, fonts } from "../theme";

interface GBPCardProps {
  businessName: string;
  city: string;
  state: string;
  monogram: string;
  rating: number;
  reviewCount: number;
  primaryCategory: string;
  secondaryCategories: string[];
  photoCount: number;
  postsThisWeek?: number;
  optimizedFlags?: string[];
}

/**
 * Mock Google Business Profile card. Closer to the GBP knowledge-panel
 * look than the Maps result card.
 */
export const GBPCard: React.FC<GBPCardProps> = ({
  businessName,
  city,
  state,
  monogram,
  rating,
  reviewCount,
  primaryCategory,
  secondaryCategories,
  photoCount,
  postsThisWeek = 2,
  optimizedFlags = [],
}) => {
  return (
    <div
      style={{
        backgroundColor: colors.paper,
        border: `1px solid ${colors.slate[200]}`,
        borderRadius: 18,
        boxShadow: "0 16px 40px -16px rgba(15, 23, 42, 0.18)",
        overflow: "hidden",
        width: 460,
      }}
    >
      {/* Header / business identity */}
      <div style={{ padding: "20px 22px", borderBottom: `1px solid ${colors.slate[200]}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: colors.ink,
              color: colors.accent,
              display: "grid",
              placeItems: "center",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            {monogram}
          </div>
          <div>
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 22,
                fontWeight: 700,
                lineHeight: 1.1,
                color: colors.ink,
                letterSpacing: "-0.01em",
              }}
            >
              {businessName}
            </div>
            <div
              style={{
                fontFamily: fonts.sans,
                fontSize: 13,
                color: colors.slate[500],
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ color: colors.warning, fontSize: 13 }}>
                {"★".repeat(Math.round(rating))}
              </span>
              <span>{rating.toFixed(1)}</span>
              <span>·</span>
              <span>({reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: "16px 22px", display: "flex", flexWrap: "wrap", gap: 6 }}>
        <span
          style={{
            fontFamily: fonts.sans,
            fontSize: 11,
            fontWeight: 700,
            backgroundColor: colors.ink,
            color: colors.paper,
            padding: "5px 11px",
            borderRadius: 9999,
          }}
        >
          {primaryCategory}
        </span>
        {secondaryCategories.map((cat) => (
          <span
            key={cat}
            style={{
              fontFamily: fonts.sans,
              fontSize: 11,
              fontWeight: 600,
              backgroundColor: colors.slate[100],
              color: colors.slate[600],
              padding: "5px 11px",
              borderRadius: 9999,
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Stat row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "0 22px 16px",
          gap: 12,
        }}
      >
        <Stat label="Service area" value={`${city}, ${state}`} />
        <Stat label="Photos" value={`${photoCount}`} />
        <Stat label="Posts / week" value={`${postsThisWeek}×`} />
      </div>

      {/* Optimized flags */}
      {optimizedFlags.length > 0 && (
        <div
          style={{
            padding: "12px 22px",
            backgroundColor: colors.cream,
            borderTop: `1px solid ${colors.slate[200]}`,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            fontFamily: fonts.sans,
            fontSize: 11,
            fontWeight: 600,
            color: colors.accentDark,
          }}
        >
          {optimizedFlags.map((flag) => (
            <span
              key={flag}
              style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
            >
              ✓ {flag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div
      style={{
        fontFamily: fonts.sans,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: colors.slate[500],
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: fonts.sans,
        fontSize: 13,
        fontWeight: 600,
        color: colors.ink,
        marginTop: 3,
      }}
    >
      {value}
    </div>
  </div>
);
