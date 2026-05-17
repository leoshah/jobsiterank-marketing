import React from "react";
import { useCurrentFrame } from "remotion";
import { colors } from "../theme";

/**
 * Three-dot typing indicator. Each dot pulses on a 1.2s cycle.
 */
export const TypingIndicator: React.FC = () => {
  const frame = useCurrentFrame();
  const cyclePos = (frame % 36) / 36;

  const dotOpacity = (delay: number) => {
    const t = (cyclePos + delay) % 1;
    return 0.3 + 0.7 * Math.max(0, Math.sin(t * Math.PI));
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        backgroundColor: colors.slate[100],
        padding: "10px 14px",
        borderRadius: 22,
        borderBottomLeftRadius: 6,
      }}
    >
      {[0, 0.18, 0.36].map((delay, i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: 9999,
            backgroundColor: colors.slate[500],
            opacity: dotOpacity(delay),
          }}
        />
      ))}
    </div>
  );
};
