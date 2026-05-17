import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

interface IncomingCallCardProps {
  callerLabel: string;
  callerSubLabel: string;
  /** Frame at which the call starts ringing within this scene's timeline. */
  ringStartFrame: number;
  /** Frame at which the call is marked as missed. */
  missAtFrame: number;
}

/**
 * iOS-style incoming-call card. Pulses while ringing, then snaps to
 * a "Missed call" state with a small red dot.
 */
export const IncomingCallCard: React.FC<IncomingCallCardProps> = ({
  callerLabel,
  callerSubLabel,
  ringStartFrame,
  missAtFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ringingPhase = frame >= ringStartFrame && frame < missAtFrame;
  const missedPhase = frame >= missAtFrame;

  const ringPulse = ringingPhase
    ? 1 + 0.06 * Math.sin(((frame - ringStartFrame) / fps) * Math.PI * 4)
    : 1;

  const enterScale = spring({
    frame: frame - ringStartFrame,
    fps,
    config: { damping: 14, stiffness: 110 },
    from: 0.94,
    to: 1,
  });

  const missedFade = missedPhase
    ? interpolate(frame - missAtFrame, [0, 8], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: colors.paper,
        borderRadius: 28,
        padding: 24,
        display: "flex",
        alignItems: "center",
        gap: 20,
        boxShadow: "0 24px 60px -16px rgba(15, 23, 42, 0.4)",
        border: `1px solid ${colors.slate[200]}`,
        transform: `scale(${enterScale * ringPulse})`,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 9999,
          backgroundColor: missedPhase ? "#FEE2E2" : colors.mint,
          color: missedPhase ? "#DC2626" : colors.accentDark,
          display: "grid",
          placeItems: "center",
          fontSize: 26,
          transition: "background-color 200ms",
        }}
      >
        ✆
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 18,
            fontWeight: 600,
            color: colors.ink,
            lineHeight: 1.2,
          }}
        >
          {callerLabel}
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            color: colors.slate[500],
            marginTop: 4,
          }}
        >
          {missedPhase ? `Missed · ${callerSubLabel}` : callerSubLabel}
        </div>
      </div>
      {missedPhase && (
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 9999,
            backgroundColor: "#DC2626",
            opacity: missedFade,
            boxShadow: `0 0 0 4px rgba(220, 38, 38, ${missedFade * 0.2})`,
          }}
        />
      )}
    </div>
  );
};
