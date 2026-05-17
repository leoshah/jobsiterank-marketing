import React from "react";
import { colors, fonts } from "../theme";

interface WebsitePreviewProps {
  businessName: string;
  monogram: string;
  city: string;
  heroHeadline: string;
  heroSubhead: string;
  ctaPhone: string;
}

/**
 * Mock conversion-focused plumbing website rendered inside the phone.
 * Visual mirrors what the JobsiteRank service would actually deliver:
 * sticky header w/ phone, big hero headline, click-to-call CTA, single
 * trust strip below.
 */
export const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  businessName,
  monogram,
  city,
  heroHeadline,
  heroSubhead,
  ctaPhone,
}) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.paper,
        margin: -28,
        marginTop: 0,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
      }}
    >
      {/* Sticky site header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: `1px solid ${colors.slate[200]}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: colors.ink,
              color: colors.accent,
              display: "grid",
              placeItems: "center",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {monogram}
          </div>
          <div
            style={{
              fontFamily: fonts.sans,
              fontWeight: 600,
              fontSize: 14,
              color: colors.ink,
            }}
          >
            {businessName}
          </div>
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontWeight: 600,
            fontSize: 12,
            color: colors.accentDark,
          }}
        >
          ☰
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          padding: "26px 22px 18px",
          backgroundColor: colors.cream,
          flex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: colors.mint,
            color: colors.accentDark,
            padding: "5px 11px",
            borderRadius: 9999,
            fontFamily: fonts.sans,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          ★ 4.9 in {city}
        </div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: colors.ink,
            marginTop: 14,
            marginBottom: 0,
          }}
        >
          {heroHeadline}
        </h1>
        <p
          style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            lineHeight: 1.45,
            color: colors.slate[600],
            marginTop: 10,
            marginBottom: 0,
          }}
        >
          {heroSubhead}
        </p>

        {/* Tap-to-call CTA */}
        <div
          style={{
            marginTop: 22,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <button
            type="button"
            style={{
              backgroundColor: colors.accent,
              color: colors.paper,
              border: "none",
              borderRadius: 9999,
              padding: "16px 18px",
              fontFamily: fonts.sans,
              fontSize: 16,
              fontWeight: 700,
              boxShadow: "0 12px 28px -8px rgba(16, 185, 129, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 17 }}>✆</span>
            Tap to call · {ctaPhone}
          </button>
          <button
            type="button"
            style={{
              backgroundColor: colors.paper,
              color: colors.ink,
              border: `1px solid ${colors.slate[200]}`,
              borderRadius: 9999,
              padding: "12px 18px",
              fontFamily: fonts.sans,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Get a quote
          </button>
        </div>
      </div>

      {/* Trust strip */}
      <div
        style={{
          padding: "12px 20px",
          backgroundColor: colors.paper,
          borderTop: `1px solid ${colors.slate[200]}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: fonts.sans,
          fontSize: 11,
          color: colors.slate[500],
        }}
      >
        <span>★ ★ ★ ★ ★ 4.9 · 184 reviews</span>
        <span style={{ color: colors.accentDark, fontWeight: 600 }}>Licensed</span>
      </div>
    </div>
  );
};
