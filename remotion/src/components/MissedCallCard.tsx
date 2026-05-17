import React from "react";
import { colors, fonts } from "../theme";

interface MissedCallCardProps {
  phoneNumber: string;
  timeText: string;
}

export const MissedCallCard: React.FC<MissedCallCardProps> = ({ phoneNumber, timeText }) => {
  return (
    <div
      style={{
        backgroundColor: colors.slate[50],
        borderRadius: 14,
        padding: 14,
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span style={{ color: colors.slate[400], fontSize: 18 }}>✆</span>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            fontWeight: 500,
            color: colors.ink,
            lineHeight: 1.2,
          }}
        >
          Missed call · {phoneNumber}
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            color: colors.slate[500],
            marginTop: 3,
          }}
        >
          No voicemail · {timeText}
        </div>
      </div>
    </div>
  );
};
