import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

interface BadgePopProps {
  primary: string;
  secondary: string;
  badgeText: string;
  appearAtFrame: number;
}

/**
 * The "Job booked in 3 min · +$1,840 job" footer badge from
 * src/pages/index.astro:187-193. Pops in with a spring scale + fade.
 */
export const BadgePop: React.FC<BadgePopProps> = ({
  primary,
  secondary,
  badgeText,
  appearAtFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - appearAtFrame;
  const scale = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
    from: 0.92,
    to: 1,
  });
  const opacity = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        marginTop: 24,
        paddingTop: 18,
        borderTop: `1px solid ${colors.slate[200]}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "center",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 16,
            fontWeight: 600,
            color: colors.ink,
            lineHeight: 1.2,
          }}
        >
          {primary}
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            color: colors.slate[500],
            marginTop: 3,
          }}
        >
          {secondary}
        </div>
      </div>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          backgroundColor: colors.mint,
          color: colors.accentDark,
          padding: "6px 14px",
          borderRadius: 9999,
          fontFamily: fonts.sans,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {badgeText}
      </span>
    </div>
  );
};
