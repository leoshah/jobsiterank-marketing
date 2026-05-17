import React from "react";
import { colors, fonts } from "../theme";

interface GoogleReviewCardProps {
  reviewerName: string;
  reviewerInitials: string;
  reviewBody: string;
  whenLabel?: string;
  starsFilled?: number;
}

/**
 * Mock Google review card — shown inside the phone after a happy
 * customer is routed via smart routing.
 */
export const GoogleReviewCard: React.FC<GoogleReviewCardProps> = ({
  reviewerName,
  reviewerInitials,
  reviewBody,
  whenLabel = "just now",
  starsFilled = 5,
}) => {
  return (
    <div
      style={{
        backgroundColor: colors.paper,
        border: `1px solid ${colors.slate[200]}`,
        borderRadius: 18,
        padding: 18,
        boxShadow: "0 8px 24px -10px rgba(15, 23, 42, 0.18)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 9999,
            backgroundColor: "#1A73E8",
            color: colors.paper,
            display: "grid",
            placeItems: "center",
            fontFamily: fonts.sans,
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {reviewerInitials}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: fonts.sans,
              fontWeight: 600,
              fontSize: 14,
              color: colors.ink,
            }}
          >
            {reviewerName}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 3,
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: colors.warning,
                letterSpacing: "0.05em",
              }}
            >
              {"★".repeat(starsFilled)}
              {"☆".repeat(5 - starsFilled)}
            </span>
            <span style={{ fontSize: 11, color: colors.slate[500] }}>{whenLabel}</span>
          </div>
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 11,
            color: colors.slate[400],
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          GOOGLE
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
        {reviewBody}
      </div>
    </div>
  );
};
