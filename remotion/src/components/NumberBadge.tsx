import React from "react";
import { colors, fonts } from "../theme";

interface NumberBadgeProps {
  number: string;
  caption?: string;
}

export const NumberBadge: React.FC<NumberBadgeProps> = ({ number, caption = "Your business number" }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 6,
        backgroundColor: colors.ink,
        color: colors.paper,
        padding: "16px 26px",
        borderRadius: 18,
        boxShadow: "0 12px 32px -10px rgba(15, 23, 42, 0.45)",
      }}
    >
      <span
        style={{
          fontFamily: fonts.sans,
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: colors.accentSoft,
          fontWeight: 600,
        }}
      >
        {caption}
      </span>
      <span
        style={{
          fontFamily: fonts.display,
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: "-0.01em",
        }}
      >
        {number}
      </span>
    </div>
  );
};
