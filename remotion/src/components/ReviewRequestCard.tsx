import React from "react";
import { colors, fonts } from "../theme";

interface ReviewRequestCardProps {
  customerName: string;
}

/**
 * The "Hey {customer}, how'd we do?" SMS request that goes out
 * automatically after each completed job.
 */
export const ReviewRequestCard: React.FC<ReviewRequestCardProps> = ({ customerName }) => {
  return (
    <div
      style={{
        backgroundColor: colors.accent,
        color: colors.paper,
        padding: "14px 18px",
        borderRadius: 22,
        borderBottomRightRadius: 6,
        fontFamily: fonts.sans,
        fontSize: 15,
        lineHeight: 1.4,
        maxWidth: "85%",
        marginLeft: "auto",
      }}
    >
      Hey {customerName}, hope the job went well! Mind leaving a quick review?
      <br />
      <span style={{ opacity: 0.85, fontSize: 13, display: "block", marginTop: 6 }}>
        👍 → google.com/r/...
      </span>
    </div>
  );
};
