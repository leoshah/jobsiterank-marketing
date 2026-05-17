import React from "react";
import { colors, fonts } from "../theme";

interface SMSBubbleProps {
  direction: "outbound" | "inbound";
  text: string;
  timestampLabel: string;
}

export const SMSBubble: React.FC<SMSBubbleProps> = ({ direction, text, timestampLabel }) => {
  const isOutbound = direction === "outbound";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isOutbound ? "flex-end" : "flex-start",
      }}
    >
      <div style={{ maxWidth: "85%" }}>
        <div
          style={{
            backgroundColor: isOutbound ? colors.accent : colors.slate[100],
            color: isOutbound ? colors.paper : colors.ink,
            padding: "12px 16px",
            borderRadius: 22,
            borderBottomRightRadius: isOutbound ? 6 : 22,
            borderBottomLeftRadius: isOutbound ? 22 : 6,
            fontFamily: fonts.sans,
            fontSize: 15,
            lineHeight: 1.35,
          }}
        >
          {text}
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 11,
            color: colors.slate[400],
            marginTop: 5,
            textAlign: isOutbound ? "right" : "left",
          }}
        >
          {timestampLabel}
        </div>
      </div>
    </div>
  );
};
