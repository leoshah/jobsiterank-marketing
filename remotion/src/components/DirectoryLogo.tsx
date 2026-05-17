import React from "react";
import { colors, fonts } from "../theme";

type Platform = "Yelp" | "Apple Maps" | "Bing" | "Nextdoor" | "Yellow Pages" | "Foursquare";

interface DirectoryLogoProps {
  platform: Platform;
  showName?: boolean;
}

interface LogoSpec {
  letter: string;
  bg: string;
  fg: string;
}

const SPECS: Record<Platform, LogoSpec> = {
  Yelp: { letter: "Y", bg: "#D32323", fg: "#FFFFFF" },
  "Apple Maps": { letter: "", bg: "#FFFFFF", fg: "#1C1C1E" },
  Bing: { letter: "b", bg: "#008373", fg: "#FFFFFF" },
  Nextdoor: { letter: "N", bg: "#00A263", fg: "#FFFFFF" },
  "Yellow Pages": { letter: "YP", bg: "#FFD400", fg: "#1C1C1E" },
  Foursquare: { letter: "4", bg: "#F94877", fg: "#FFFFFF" },
};

/**
 * Stylized directory-platform logo. Avoids replicating real trademarks
 * exactly — instead uses a recognizable initial + the brand's
 * dominant color as a visual stand-in. Good enough for a 1-second beat.
 */
export const DirectoryLogo: React.FC<DirectoryLogoProps> = ({ platform, showName = true }) => {
  const spec = SPECS[platform];

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 28,
          backgroundColor: spec.bg,
          color: spec.fg,
          display: "grid",
          placeItems: "center",
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 64,
          letterSpacing: "-0.04em",
          boxShadow: "0 12px 28px -10px rgba(15, 23, 42, 0.25)",
          border: platform === "Apple Maps" ? `1px solid ${colors.slate[200]}` : "none",
        }}
      >
        {platform === "Apple Maps" ? <AppleMapsGlyph /> : spec.letter}
      </div>
      {showName && (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 18,
            fontWeight: 600,
            color: colors.ink,
          }}
        >
          {platform}
        </div>
      )}
    </div>
  );
};

const AppleMapsGlyph: React.FC = () => (
  <svg viewBox="0 0 64 64" width={70} height={70} aria-hidden="true">
    <circle cx="32" cy="32" r="26" fill="#0A84FF" />
    <path d="M32 16 L40 32 L32 28 L24 32 Z" fill="#FFFFFF" />
    <path d="M32 48 L24 32 L32 36 L40 32 Z" fill="#FF453A" />
  </svg>
);
