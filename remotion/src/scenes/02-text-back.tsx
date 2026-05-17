import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { colors, fonts } from "../theme";
import { interpolate as interpolateValue } from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";
import { PhoneHeader } from "../components/PhoneHeader";
import { MissedCallCard } from "../components/MissedCallCard";
import { SMSBubble } from "../components/SMSBubble";
import { BadgePop } from "../components/BadgePop";
import { SceneShell } from "../components/SceneShell";
import type { VideoProps } from "../config";

interface TextBackSceneProps {
  videoProps: VideoProps;
  voPath?: string | null;
}

/**
 * Scene 02 — Missed-call text-back. The anchor scene of the walkthrough.
 *
 * Visual: ports the hero phone mockup from src/pages/index.astro:135-196.
 * Animation timing follows the existing 12s CSS keyframe sequence at
 * src/pages/index.astro:606-622, but rebuilt as frame-based Remotion
 * springs (12s scene = 360 frames at 30fps).
 *
 * Beat schedule (in seconds, mapped to frames at fps=30):
 *   0.0  → scene fade-in
 *   0.0  → phone header visible
 *   0.5  → missed-call card animates in
 *   2.0  → outbound auto-text "Hey this is {business} — sorry I missed..."
 *          (SFX sms-chime fires here)
 *   4.0  → inbound customer reply with address + emergency
 *   6.0  → outbound owner reply with ETA
 *   8.5  → "Job booked in 3 min · +$1,840 job" badge pop
 *   12.0 → scene end
 */
export const TextBackScene: React.FC<TextBackSceneProps> = ({ videoProps, voPath }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = videoProps.scenes.textBack;
  const business = videoProps.business;

  const sceneFadeIn = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
    from: 0,
    to: 1,
    durationInFrames: 12,
  });

  // Each chat element appears at its beat with a fade+rise spring.
  const beat = (atSeconds: number) => {
    const localFrame = frame - atSeconds * fps;
    const opacity = spring({
      frame: localFrame,
      fps,
      config: { damping: 18, stiffness: 100 },
      from: 0,
      to: 1,
    });
    const translateY = interpolateValue(opacity, [0, 1], [10, 0]);
    return { opacity, transform: `translateY(${translateY}px)` };
  };

  return (
    <SceneShell sceneId="textBack" props={videoProps} voPath={voPath} background={colors.cream}>
      <AbsoluteFill style={{ opacity: sceneFadeIn }}>
        {/* Soft mint glow background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 30% 50%, ${colors.mint} 0%, transparent 55%)`,
            pointerEvents: "none",
          }}
        />

        {/* Two-column layout: left copy, right phone */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            padding: "0 120px",
            gap: 80,
          }}
        >
          {/* Left side — narrative anchor copy */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: colors.mint,
                color: colors.accentDark,
                padding: "8px 18px",
                borderRadius: 9999,
                fontFamily: fonts.sans,
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              ★ Missed-call text-back
            </div>
            <h1
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 84,
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: colors.ink,
                marginTop: 28,
                marginBottom: 0,
              }}
            >
              The second a call goes unanswered,
              <br />
              <span style={{ color: colors.accentDark }}>
                we text the customer back.
              </span>
            </h1>
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: 26,
                lineHeight: 1.5,
                color: colors.slate[600],
                marginTop: 28,
                maxWidth: 620,
              }}
            >
              Under 30 seconds, every time. {business.name} stops losing jobs to voicemail.
            </p>
          </div>

          {/* Right side — animated phone mockup */}
          <div style={{ display: "grid", placeItems: "center" }}>
            <PhoneFrame widthPx={460} heightPx={820}>
              <PhoneHeader
                monogram={business.monogram}
                businessName={business.name}
                city={business.city}
                state={business.state}
                clockText={scene.missedAt}
              />

              <div style={beat(0.5)}>
                <MissedCallCard
                  phoneNumber={scene.customerPhoneMasked}
                  timeText={scene.missedAt}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginTop: 4,
                }}
              >
                <div style={beat(2.0)}>
                  <SMSBubble
                    direction="outbound"
                    text={`Hey, this is ${business.name} — sorry I missed your call. What's the address & what's going on?`}
                    timestampLabel={`Auto-text · ${scene.missedAt}`}
                  />
                </div>
                <div style={beat(4.0)}>
                  <SMSBubble
                    direction="inbound"
                    text={`${scene.address}. ${scene.jobType}. Can you come now??`}
                    timestampLabel={`${scene.customerName} · 4:25 PM`}
                  />
                </div>
                <div style={beat(6.0)}>
                  <SMSBubble
                    direction="outbound"
                    text={`On the way. ETA ${scene.etaMinutes} min. Shut off the water at the wall valve if you can.`}
                    timestampLabel={`${business.ownerFirstName} · 4:26 PM`}
                  />
                </div>
              </div>

              <BadgePop
                primary="Job booked in 3 min"
                secondary="Zero touches from you"
                badgeText={`+$${scene.jobAmount.toLocaleString()} job`}
                appearAtFrame={Math.round(8.5 * fps)}
              />
            </PhoneFrame>
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
