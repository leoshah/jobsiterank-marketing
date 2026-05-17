import React from "react";
import { colors, fonts } from "../theme";

interface PhoneHeaderProps {
  monogram: string;
  businessName: string;
  city: string;
  state: string;
  clockText: string;
}

export const PhoneHeader: React.FC<PhoneHeaderProps> = ({
  monogram,
  businessName,
  city,
  state,
  clockText,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 18,
        marginBottom: 22,
        borderBottom: `1px solid ${colors.slate[200]}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: 44,
            height: 44,
            borderRadius: 9999,
            backgroundColor: colors.mint,
            color: colors.accentDark,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {monogram}
        </div>
        <div>
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 18,
              fontWeight: 600,
              color: colors.ink,
              lineHeight: 1.1,
            }}
          >
            {businessName}
          </div>
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              color: colors.slate[500],
              marginTop: 3,
            }}
          >
            Live · {city}, {state}
          </div>
        </div>
      </div>
      <span
        style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          color: colors.slate[400],
        }}
      >
        {clockText}
      </span>
    </div>
  );
};
