import React from "react";
import { colors, fonts } from "../theme";

interface ThreePackEntry {
  position: number;
  name: string;
  rating: number;
  reviewCount: number;
  highlight?: boolean;
}

interface ThreePackResultProps {
  query: string;
  entries: ThreePackEntry[];
}

/**
 * Mock Google Maps "local 3-pack" result. The highlighted entry is
 * the prospect — pulses with mint accent.
 */
export const ThreePackResult: React.FC<ThreePackResultProps> = ({ query, entries }) => {
  return (
    <div
      style={{
        backgroundColor: colors.paper,
        border: `1px solid ${colors.slate[200]}`,
        borderRadius: 18,
        boxShadow: "0 18px 44px -16px rgba(15, 23, 42, 0.18)",
        overflow: "hidden",
        width: 540,
      }}
    >
      {/* Search bar */}
      <div
        style={{
          padding: "14px 18px",
          borderBottom: `1px solid ${colors.slate[200]}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ color: colors.slate[400] }}>⌕</span>
        <span
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            color: colors.ink,
            fontWeight: 500,
          }}
        >
          {query}
        </span>
      </div>

      {/* Map placeholder strip */}
      <div
        style={{
          height: 70,
          background: `linear-gradient(135deg, #E0F2FE, ${colors.mint}, ${colors.cream})`,
          borderBottom: `1px solid ${colors.slate[200]}`,
          position: "relative",
        }}
      >
        {entries.map((e, i) => (
          <div
            key={e.position}
            style={{
              position: "absolute",
              left: `${20 + i * 30}%`,
              top: "30%",
              width: 22,
              height: 28,
              backgroundColor: e.highlight ? colors.accent : colors.slate[400],
              clipPath: "path('M11 0 C5 0 0 5 0 11 C0 18 11 28 11 28 C11 28 22 18 22 11 C22 5 17 0 11 0 Z')",
            }}
          />
        ))}
      </div>

      {/* Result rows */}
      <div>
        {entries.map((e) => (
          <div
            key={e.position}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 18px",
              borderTop: `1px solid ${colors.slate[100]}`,
              backgroundColor: e.highlight ? colors.mint : colors.paper,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 9999,
                backgroundColor: e.highlight ? colors.accent : colors.slate[200],
                color: e.highlight ? colors.paper : colors.slate[700],
                display: "grid",
                placeItems: "center",
                fontFamily: fonts.sans,
                fontWeight: 700,
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              {e.position}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  fontWeight: 700,
                  color: colors.ink,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {e.name}
              </div>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 12,
                  color: colors.slate[500],
                  marginTop: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ color: colors.warning }}>★</span>
                <span>{e.rating.toFixed(1)}</span>
                <span>({e.reviewCount})</span>
              </div>
            </div>
            {e.highlight && (
              <span
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: colors.accentDark,
                  backgroundColor: colors.paper,
                  padding: "4px 8px",
                  borderRadius: 9999,
                  border: `1px solid ${colors.accentSoft}`,
                }}
              >
                You
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
