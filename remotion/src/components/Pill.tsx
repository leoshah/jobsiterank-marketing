import React from "react";
import { colors, fonts, radii } from "../theme";

type Variant = "default" | "accent" | "dark" | "eyebrowMint";

interface PillProps {
  children: React.ReactNode;
  variant?: Variant;
  fontSizePx?: number;
}

const variantStyles: Record<Variant, React.CSSProperties> = {
  default: {
    backgroundColor: colors.slate[100],
    color: colors.slate[700],
  },
  accent: {
    backgroundColor: colors.mint,
    color: colors.accentDark,
  },
  dark: {
    backgroundColor: colors.ink,
    color: colors.paper,
  },
  eyebrowMint: {
    backgroundColor: colors.mint,
    color: colors.accentDark,
  },
};

export const Pill: React.FC<PillProps> = ({
  children,
  variant = "default",
  fontSizePx = 14,
}) => {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: fonts.sans,
        fontWeight: 600,
        fontSize: fontSizePx,
        padding: `${fontSizePx * 0.4}px ${fontSizePx * 0.95}px`,
        borderRadius: radii.full,
        ...variantStyles[variant],
      }}
    >
      {children}
    </span>
  );
};
