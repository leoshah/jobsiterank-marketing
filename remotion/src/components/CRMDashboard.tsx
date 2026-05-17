import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import type { VideoProps } from "../config";

interface CRMDashboardProps {
  videoProps: VideoProps;
  /** Frame at which KPI counters begin animating up. */
  countersStartFrame: number;
  countersDurationFrames: number;
}

/**
 * Full CRM dashboard mockup. Direct port of src/pages/index.astro:230-388
 * (same KPI strip, 4-column pipeline, activity feed) with frame-driven
 * KPI counters and lead-card slide-in animation.
 */
export const CRMDashboard: React.FC<CRMDashboardProps> = ({
  videoProps,
  countersStartFrame,
  countersDurationFrames,
}) => {
  const frame = useCurrentFrame();
  const business = videoProps.business;
  const scene = videoProps.scenes.crm;

  const counterProgress = interpolate(
    frame,
    [countersStartFrame, countersStartFrame + countersDurationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const animateNum = (target: number) => Math.round(target * counterProgress);

  const stages: Array<{ id: "new" | "quoted" | "scheduled" | "done"; label: string }> = [
    { id: "new", label: "New" },
    { id: "quoted", label: "Quoted" },
    { id: "scheduled", label: "Scheduled" },
    { id: "done", label: "Done" },
  ];

  const stageCounts = {
    new: 7,
    quoted: 4,
    scheduled: 9,
    done: scene.jobsToday,
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: colors.paper,
        border: `1px solid ${colors.slate[200]}`,
        borderRadius: 18,
        boxShadow: "0 24px 60px -16px rgba(15, 23, 42, 0.22)",
        overflow: "hidden",
        width: 1480,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 22px",
          borderBottom: `1px solid ${colors.slate[200]}`,
          backgroundColor: colors.cream,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: colors.ink,
              color: colors.accent,
              display: "grid",
              placeItems: "center",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {business.monogram}
          </div>
          <div>
            <div
              style={{
                fontFamily: fonts.sans,
                fontSize: 16,
                fontWeight: 600,
                color: colors.ink,
              }}
            >
              {business.name} · Pipeline
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.slate[500], marginTop: 2 }}>
              Tuesday · April 14
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Dot bg={colors.mint} fg={colors.accentDark}>●</Dot>
          <Dot bg={colors.slate[100]} fg={colors.slate[500]}>⌕</Dot>
          <Dot bg={colors.ink} fg={colors.paper}>{business.ownerFirstName.slice(0, 1)}M</Dot>
        </div>
      </div>

      {/* KPI strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 1,
          backgroundColor: colors.slate[200],
          borderBottom: `1px solid ${colors.slate[200]}`,
        }}
      >
        <KPI label="Jobs today" value={animateNum(scene.jobsToday).toString()} sub="↑ 3 vs avg" subColor={colors.accentDark} />
        <KPI label="Calls captured" value={animateNum(scene.callsCaptured).toString()} sub={`${animateNum(scene.callsViaTextBack)} via text-back`} subColor={colors.accentDark} />
        <KPI label="New reviews" value={`+${animateNum(scene.reviewsToday)}`} sub="★ all 5-star" subColor={colors.warning} />
        <KPI label="Booked revenue" value={scene.bookedRevenueLabel} sub="today" subColor={colors.accentDark} />
      </div>

      {/* Pipeline + activity feed */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
        {/* Pipeline */}
        <div
          style={{
            padding: 22,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 14,
            backgroundColor: "#FBFBF8",
          }}
        >
          {stages.map((stage) => {
            const stageLeads = scene.sampleLeads.filter((l) => l.stage === stage.id);
            return (
              <div key={stage.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: colors.slate[600],
                    }}
                  >
                    {stage.label}
                  </span>
                  <span
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: 11,
                      fontWeight: 600,
                      color: stage.id === "done" ? colors.paper : colors.slate[500],
                      backgroundColor: stage.id === "done" ? colors.accent : colors.paper,
                      padding: "3px 9px",
                      borderRadius: 9999,
                    }}
                  >
                    {stageCounts[stage.id]}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {stageLeads.map((lead) => (
                    <LeadCard key={lead.name} lead={lead} stage={stage.id} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Activity feed */}
        <div style={{ padding: 22, borderLeft: `1px solid ${colors.slate[200]}` }}>
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: colors.slate[600],
              marginBottom: 14,
            }}
          >
            Live activity
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
            <ActivityItem icon="SMS" iconBg={colors.mint} iconFg={colors.accentDark} text="Auto-text sent to A. Patel" when="Just now" />
            <ActivityItem icon="★" iconBg="rgba(245, 158, 11, 0.15)" iconFg={colors.warning} text="New 5-star review · J. Lopez" when="8 min ago" />
            <ActivityItem icon="$" iconBg="rgba(16, 185, 129, 0.15)" iconFg={colors.accentDark} text="Job booked · D. Wong" when="22 min ago" />
            <ActivityItem icon="✆" iconBg={colors.slate[100]} iconFg={colors.slate[500]} text="Call from M. Soriano" when="35 min ago" />
            <ActivityItem icon="SMS" iconBg={colors.mint} iconFg={colors.accentDark} text="Reply received · R. Foster" when="1 hr ago" />
          </ul>
        </div>
      </div>
    </div>
  );
};

const Dot: React.FC<{ bg: string; fg: string; children: React.ReactNode }> = ({ bg, fg, children }) => (
  <span
    style={{
      width: 32,
      height: 32,
      borderRadius: 9999,
      backgroundColor: bg,
      color: fg,
      display: "grid",
      placeItems: "center",
      fontFamily: fonts.sans,
      fontSize: 12,
      fontWeight: 700,
    }}
  >
    {children}
  </span>
);

const KPI: React.FC<{ label: string; value: string; sub: string; subColor: string }> = ({
  label,
  value,
  sub,
  subColor,
}) => (
  <div style={{ backgroundColor: colors.paper, padding: 18 }}>
    <div
      style={{
        fontFamily: fonts.sans,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: colors.slate[500],
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: 30,
        fontWeight: 700,
        color: colors.ink,
        marginTop: 6,
        letterSpacing: "-0.02em",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value}
    </div>
    <div style={{ fontFamily: fonts.sans, fontSize: 11, color: subColor, fontWeight: 600, marginTop: 4 }}>
      {sub}
    </div>
  </div>
);

const LeadCard: React.FC<{
  lead: { name: string; job: string; amount?: number };
  stage: "new" | "quoted" | "scheduled" | "done";
}> = ({ lead, stage }) => {
  const isDone = stage === "done";
  const statusByStage: Record<typeof stage, { text: string; color: string }> = {
    new: { text: "Auto-text sent", color: colors.accentDark },
    quoted: { text: lead.amount ? `$${lead.amount.toLocaleString()}` : "—", color: colors.ink },
    scheduled: { text: "Today · 2:00 PM", color: colors.ink },
    done: { text: "★ 5-star · auto-asked", color: colors.warning },
  };
  const status = statusByStage[stage];

  return (
    <div
      style={{
        backgroundColor: isDone ? colors.mint : colors.paper,
        border: `1px solid ${isDone ? colors.accentSoft : colors.slate[200]}`,
        borderRadius: 10,
        padding: 12,
      }}
    >
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 12,
          fontWeight: 700,
          color: colors.ink,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {lead.name}
      </div>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 11,
          color: colors.slate[500],
          marginTop: 3,
        }}
      >
        {lead.job}
      </div>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 10,
          fontWeight: 600,
          color: status.color,
          marginTop: 4,
        }}
      >
        {status.text}
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{ icon: string; iconBg: string; iconFg: string; text: string; when: string }> = ({
  icon,
  iconBg,
  iconFg,
  text,
  when,
}) => (
  <li style={{ display: "flex", gap: 10 }}>
    <span
      style={{
        flexShrink: 0,
        width: 30,
        height: 30,
        borderRadius: 9999,
        backgroundColor: iconBg,
        color: iconFg,
        display: "grid",
        placeItems: "center",
        fontFamily: fonts.sans,
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      {icon}
    </span>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 13,
          color: colors.ink,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text}
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 11, color: colors.slate[500], marginTop: 2 }}>
        {when}
      </div>
    </div>
  </li>
);
