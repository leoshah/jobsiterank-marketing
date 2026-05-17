import React from "react";
import { colors, shadows } from "../theme";

interface PhoneFrameProps {
  children: React.ReactNode;
  widthPx?: number;
  heightPx?: number;
}

/**
 * Ports the hero phone mockup from src/pages/index.astro:135-196.
 * Outer ink frame rounded-[2.5rem] p-3, inner paper rounded-[2rem] p-5.
 * Includes the soft mint glow ring around the device.
 */
export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  widthPx = 460,
  heightPx = 820,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: widthPx,
        height: heightPx,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -32,
          background: `radial-gradient(circle at 30% 30%, ${colors.accentSoft}, transparent 70%)`,
          borderRadius: 64,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: colors.ink,
          borderRadius: 48,
          padding: 14,
          boxShadow: shadows.xl,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: colors.paper,
            borderRadius: 36,
            padding: 28,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
