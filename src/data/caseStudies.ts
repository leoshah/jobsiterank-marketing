export type CaseCategory =
  | "text-back"
  | "re-activation"
  | "ai-receptionist"
  | "reviews"
  | "leads";

export interface CategoryMeta {
  key: CaseCategory;
  label: string;
  short: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { key: "text-back", label: "Missed-call-text-back", short: "Text-back" },
  { key: "re-activation", label: "Re-activation campaign", short: "Re-activation" },
  { key: "ai-receptionist", label: "AI receptionist", short: "AI receptionist" },
  { key: "reviews", label: "Reviews & replies", short: "Reviews" },
  { key: "leads", label: "Lead generation", short: "Leads" },
];

export interface BeforeAfter {
  label: string;
  delta: string;
  detail: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface TimelineEntry {
  week: string;
  label: string;
  detail: string;
}

export interface IntakeFact {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  category: CaseCategory;
  fileNum: string;
  business: string;
  trade: string;
  city: string;
  state: string;
  engagement: string;
  cardHook: string;
  cardMetricValue: string;
  cardMetricLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  intakeFacts: IntakeFact[];
  beforeAfter: BeforeAfter[];
  metrics: Metric[];
  timeline: TimelineEntry[];
  quote: string;
  quoteAuthor: string;
  quoteAttribution: string;
  quoteInitials: string;
  representative?: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  // ───────── Text-back (4) ─────────
  {
    slug: "plumbing-geeks-pasadena",
    category: "text-back",
    fileNum: "002",
    business: "Plumbing Geeks",
    trade: "Plumbing · res & commercial",
    city: "Pasadena",
    state: "CA",
    engagement: "6 months & counting",
    cardHook: "Killed $2,400/mo HomeAdvisor spend in three weeks. Phone hasn't quit since.",
    cardMetricValue: "3.4×",
    cardMetricLabel: "Inbound calls / month",
    titleStart: "Plumbing Geeks",
    titleAccent: "cuts the apps. Owns the phone.",
    intro: "Six-person plumbing crew fighting for visibility against four older Pasadena shops with 10× their review count. We rebuilt the site, wired up missed-call-text-back to the main line, and ran the citation push. Within three weeks they'd cut the lead-gen apps entirely.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · res & commercial" },
      { label: "Service area", value: "Pasadena + 12 SGV cities" },
      { label: "Engagement", value: "Bundle + Reputation desk" },
      { label: "Length", value: "6 months & counting" },
    ],
    beforeAfter: [
      { label: "Lead-gen spend", delta: "−100%", detail: "$2,400 / mo on HomeAdvisor → $0" },
      { label: "Inbound calls", delta: "+240%", detail: "47 / mo → 160 / mo by month 6" },
      { label: "Map pack ranking", delta: "→ #1", detail: "Off-map → #1 for \"plumber pasadena\"" },
    ],
    metrics: [
      { value: "3.4×", label: "Inbound calls / month" },
      { value: "#1", label: "Map pack, \"plumber pasadena\"" },
      { value: "84", label: "Directories synced" },
      { value: "$0", label: "Spent on lead-gen apps" },
      { value: "112", label: "New Google reviews, 6 mo" },
      { value: "22", label: "Repeat-customer jobs / quarter" },
    ],
    timeline: [
      { week: "Week 0", label: "Audit + intake", detail: "Pulled current GBP, audited NAP across 80+ directories. Found 31% of inbound calls were going unanswered after 5pm." },
      { week: "Week 1–2", label: "Site rebuild + missed-call-text-back", detail: "Shipped a mobile-first site with sticky call button. Wired Twilio to the main line — every missed call now triggers a 12-second SMS." },
      { week: "Week 3–4", label: "Citation push + reviews", detail: "Synced NAP to 84 directories. Stood up review automation tied to job completion. First week generated 18 new Google reviews." },
      { week: "Week 6–8", label: "Map pack lift", detail: "Crossed into the local 3-pack for \"plumber pasadena\" and \"emergency plumber pasadena.\" Inbound calls 2.1× baseline." },
      { week: "Week 12–24", label: "Compounding", detail: "Map pack #1 for both terms. Marco cut HomeAdvisor entirely. Quarterly customer touch program drove 22 repeat-customer jobs in Q1." },
    ],
    quote: "The first week the missed-call texts went live we booked four after-hours emergency jobs. That paid for the bundle for the next six months. Everything since then has been profit.",
    quoteAuthor: "Marco D.",
    quoteAttribution: "Owner · Plumbing Geeks · Pasadena",
    quoteInitials: "MD",
  },
  {
    slug: "mile-high-pipeworks-denver",
    category: "text-back",
    fileNum: "003",
    business: "Mile-High Pipeworks",
    trade: "Plumbing · res & emergency",
    city: "Denver",
    state: "CO",
    engagement: "5 months",
    cardHook: "Recovered 41% of after-hours calls during frozen-pipe season.",
    cardMetricValue: "+38",
    cardMetricLabel: "Booked jobs / mo from auto-text",
    titleStart: "Mile-High Pipeworks",
    titleAccent: "stops bleeding leads to voicemail.",
    intro: "Family-owned Denver plumbing shop watching half their after-hours frozen-pipe calls vanish into voicemail every January. We wired missed-call-text-back to four phone lines on day one. By week two, 41% of after-hours callers were booking via SMS instead of dialing the next plumber.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · res & emergency" },
      { label: "Service area", value: "Denver metro + foothills" },
      { label: "Engagement", value: "Bundle only" },
      { label: "Length", value: "5 months" },
    ],
    beforeAfter: [
      { label: "After-hours rescue rate", delta: "0% → 41%", detail: "Voicemails ignored → texts replied to within 2 minutes" },
      { label: "Avg jobs / month", delta: "+38", detail: "94 / mo baseline → 132 / mo" },
      { label: "Voicemail-to-booked-job rate", delta: "+47pp", detail: "11% → 58% with text-back active" },
    ],
    metrics: [
      { value: "41%", label: "After-hours calls rescued" },
      { value: "+38", label: "Booked jobs / mo from auto-text" },
      { value: "$14.7k", label: "Added monthly revenue (est.)" },
      { value: "<12s", label: "Median text response time" },
      { value: "4", label: "Lines wired to one inbox" },
      { value: "0", label: "Missed voicemails by month 2" },
    ],
    timeline: [
      { week: "Week 0", label: "Phone audit", detail: "Pulled 30 days of call logs. Found 312 unanswered calls in the prior month, 71% after 6pm." },
      { week: "Week 1", label: "Twilio wiring", detail: "Connected all four lines through the JobsiteRank inbox. Tested with three test numbers before going live." },
      { week: "Week 2", label: "Auto-text live", detail: "First Saturday: 18 missed calls, 14 replies, 9 booked jobs. Owner texted us at 11pm to thank us." },
      { week: "Week 6", label: "Site refresh", detail: "Rebuilt the site with sticky call button. Mobile bookings doubled in the next 30 days." },
      { week: "Month 5", label: "Steady state", detail: "Text-back is now answering ~30% of total inbound. Owner moved on-call rotation off employees onto the auto-system." },
    ],
    quote: "We were losing $40k a winter to voicemail and didn't even know it. The text-back caught all of it. My techs aren't getting woken up at 11pm anymore either — the system buys us until morning.",
    quoteAuthor: "Karen M.",
    quoteAttribution: "Co-owner · Mile-High Pipeworks · Denver",
    quoteInitials: "KM",
    representative: true,
  },
  {
    slug: "gulfshore-plumbing-tampa",
    category: "text-back",
    fileNum: "004",
    business: "Gulfshore Plumbing Co.",
    trade: "Plumbing · res & emergency",
    city: "Tampa",
    state: "FL",
    engagement: "4 months",
    cardHook: "Hurricane-flood plumbing emergencies captured at 2× the prior rate.",
    cardMetricValue: "2.1×",
    cardMetricLabel: "Storm-call capture vs prior season",
    titleStart: "Gulfshore Plumbing Co.",
    titleAccent: "books the storm emergencies before competitors do.",
    intro: "Tampa plumbing shop competing against six larger companies during hurricane season. Phones ring constantly during a storm — flooded homes, sewage backups, broken water heaters — but most calls go unanswered while crews are already in basements. We deployed text-back system-wide. Storm-call conversion doubled by week three.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · res & emergency" },
      { label: "Service area", value: "Hillsborough + Pinellas counties" },
      { label: "Engagement", value: "Bundle only" },
      { label: "Length", value: "4 months · pre-season launch" },
    ],
    beforeAfter: [
      { label: "Storm-call conversion", delta: "2.1×", detail: "23% answered & booked → 48% via auto-text + callback" },
      { label: "Service calls / week (peak)", delta: "+47", detail: "32 / wk baseline → 79 / wk peak storm" },
      { label: "Lost-call rate", delta: "−68%", detail: "59% of storm calls dropped → 19%" },
    ],
    metrics: [
      { value: "2.1×", label: "Storm-call conversion" },
      { value: "47", label: "More service calls booked / week" },
      { value: "$0", label: "Spent on Angi during peak" },
      { value: "8s", label: "Avg auto-text response time" },
      { value: "92%", label: "Reply rate to first text" },
      { value: "1.2 hr", label: "Avg time to dispatched truck" },
    ],
    timeline: [
      { week: "Week 0", label: "Pre-season audit", detail: "Reviewed prior storm-season call logs. 1,400+ calls during peak weeks, 59% unanswered. Estimated $180k in lost service revenue." },
      { week: "Week 1", label: "Site + texting live", detail: "New site with storm-emergency landing page + auto-text. Tested with team across 3 phone lines." },
      { week: "Week 2", label: "First storm test", detail: "Severe weather Friday night → 87 calls in 4 hours. 81 got texts back, 64 replied, 38 trucks dispatched by Monday." },
      { week: "Month 2", label: "Refining the script", detail: "Tweaked auto-text to ask for address + photo of the damage upfront. Cut average phone-tag down to one round." },
      { week: "Month 4", label: "Hurricane peak", detail: "Booked 79 service calls in the highest week. Old peak record was 32. Crew added a second emergency truck to keep up." },
    ],
    quote: "Before this, every storm felt like Christmas morning we couldn't get to the presents. Phones ringing nonstop and nobody can pick up. Now the text-back catches them while we're literally bailing out a basement.",
    quoteAuthor: "Jamal R.",
    quoteAttribution: "Owner · Gulfshore Plumbing Co. · Tampa",
    quoteInitials: "JR",
    representative: true,
  },
  {
    slug: "bluebonnet-plumbing-austin",
    category: "text-back",
    fileNum: "005",
    business: "Bluebonnet Plumbing",
    trade: "Plumbing · residential",
    city: "Austin",
    state: "TX",
    engagement: "7 months",
    cardHook: "Solo plumber scaled bookings without hiring a dispatcher.",
    cardMetricValue: "+62%",
    cardMetricLabel: "Booked jobs / month",
    titleStart: "Bluebonnet Plumbing",
    titleAccent: "scales without a dispatcher.",
    intro: "Austin solo plumber working 60-hour weeks, missing 40% of incoming calls because he was under sinks. Hated the idea of hiring an office assistant. Wanted the text-back system to be the dispatcher. We built it that way.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Austin + Round Rock + Cedar Park" },
      { label: "Engagement", value: "Bundle + AI receptionist" },
      { label: "Length", value: "7 months" },
    ],
    beforeAfter: [
      { label: "Booked jobs / month", delta: "+62%", detail: "21 / mo → 34 / mo (solo, no hire)" },
      { label: "Calls answered or replied", delta: "60% → 96%", detail: "Hands-free triage via text + AI fallback" },
      { label: "Hours saved on dispatch", delta: "~14 hr / wk", detail: "Time back on the job site, not on the phone" },
    ],
    metrics: [
      { value: "+62%", label: "Booked jobs / month" },
      { value: "34", label: "Avg jobs / mo (solo)" },
      { value: "96%", label: "Calls answered or replied" },
      { value: "$0", label: "Spent on a dispatcher" },
      { value: "14 hr", label: "Saved per week" },
      { value: "$3.1k", label: "Avg added revenue / week" },
    ],
    timeline: [
      { week: "Week 0", label: "Workflow audit", detail: "Tracked one week of his calls — 47 inbound, only 28 answered, 12 voicemails returned. 7 booked." },
      { week: "Week 2", label: "Text-back live", detail: "Auto-text + Calendly integration. Customer can book a slot directly from SMS." },
      { week: "Week 6", label: "AI receptionist added", detail: "Trained the AI on his standard objections (price, scheduling, scope). Handles 70% of qualifying calls." },
      { week: "Month 4", label: "Capacity hit", detail: "Booking 34 jobs / mo solo. Started a waitlist for non-emergency drain work." },
      { week: "Month 7", label: "Hiring decision", detail: "Hired an apprentice to keep up with demand. Still no office staff — system runs intake." },
    ],
    quote: "I'm allergic to having an office. The text-back plus the AI is basically a dispatcher I don't have to manage. Booked twice the work this year, no payroll added.",
    quoteAuthor: "Mike T.",
    quoteAttribution: "Owner · Bluebonnet Plumbing · Austin",
    quoteInitials: "MT",
    representative: true,
  },

  // ───────── Re-activation (3) ─────────
  {
    slug: "saguaro-plumbing-phoenix",
    category: "re-activation",
    fileNum: "006",
    business: "Saguaro Plumbing Co.",
    trade: "Plumbing · residential",
    city: "Phoenix",
    state: "AZ",
    engagement: "3 months",
    cardHook: "Texted 1,800 dormant past customers. Booked 87 jobs in 14 days.",
    cardMetricValue: "$71k",
    cardMetricLabel: "Revenue from one re-activation campaign",
    titleStart: "Saguaro Plumbing Co.",
    titleAccent: "wakes up 1,800 dormant customers.",
    intro: "Phoenix plumbing shop sitting on 1,800+ past customers in their CRM and never marketing back to them. We ran a single re-activation campaign before monsoon season — \"summer plumbing tune-up, $89\" — and booked 87 jobs in two weeks.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Phoenix + Scottsdale + Tempe" },
      { label: "Engagement", value: "Bundle + Reputation desk" },
      { label: "Length", value: "3 months" },
    ],
    beforeAfter: [
      { label: "Past customer marketing", delta: "0 → 1,800", detail: "First time ever messaging the back-catalog" },
      { label: "Revenue from one campaign", delta: "$71k", detail: "87 jobs · $816 avg ticket" },
      { label: "Cost per booked job", delta: "$3.40", detail: "vs $112 / lead they were paying Angi" },
    ],
    metrics: [
      { value: "1,800", label: "Past customers reached" },
      { value: "87", label: "Jobs booked in 14 days" },
      { value: "$71k", label: "Revenue from the campaign" },
      { value: "$3.40", label: "Cost per booked job" },
      { value: "23%", label: "SMS reply rate" },
      { value: "5%", label: "Click → booked-job rate" },
    ],
    timeline: [
      { week: "Week 0", label: "CRM cleanup", detail: "Imported 1,800 customer records. Deduped, validated phones, removed opt-outs. Clean list of 1,612 reachable." },
      { week: "Week 1", label: "Campaign drafted", detail: "Two-touch SMS: offer text + reminder 4 days later if no reply. Tested copy on 50 records first." },
      { week: "Week 2", label: "Send", detail: "Sent on a Tuesday morning. 23% replied within 24 hours. Booked 51 jobs by Friday." },
      { week: "Week 3", label: "Follow-up wave", detail: "Reminder text to non-responders. Booked another 36 jobs. Cut off at 87 to keep crew capacity sane." },
      { week: "Month 3", label: "Ongoing cadence", detail: "Set the system to fire seasonal campaigns every 90 days automatically. Owner stopped touching it." },
    ],
    quote: "I'd been sitting on those 1,800 customers for years. Felt rude to text them. Turns out 87 of them were waiting for someone to remind them. Best $71k week we've ever had.",
    quoteAuthor: "Diego L.",
    quoteAttribution: "Owner · Saguaro Plumbing Co. · Phoenix",
    quoteInitials: "DL",
    representative: true,
  },
  {
    slug: "tarheel-plumbing-charlotte",
    category: "re-activation",
    fileNum: "007",
    business: "Tarheel Plumbing Co.",
    trade: "Plumbing · residential",
    city: "Charlotte",
    state: "NC",
    engagement: "4 months",
    cardHook: "Maintenance-plan re-up campaign converted 31% of lapsed customers.",
    cardMetricValue: "31%",
    cardMetricLabel: "Lapsed maintenance plan conversion",
    titleStart: "Tarheel Plumbing Co.",
    titleAccent: "rebuilds a maintenance book in one quarter.",
    intro: "Charlotte plumbing shop had 940 customers on annual drain & water-heater maintenance plans 3 years ago. Today: 412. Asked us to bring them back. We ran a 3-touch re-activation campaign with a friction-free renewal link. 31% reactivated.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Charlotte + Concord + Gastonia" },
      { label: "Engagement", value: "Bundle only" },
      { label: "Length", value: "4 months" },
    ],
    beforeAfter: [
      { label: "Maintenance plans active", delta: "412 → 575", detail: "+163 reactivated lapsed customers" },
      { label: "Recurring annual revenue", delta: "+$48,900", detail: "163 plans × $300 avg" },
      { label: "Reply rate to campaign", delta: "44%", detail: "Across 3 SMS touches over 12 days" },
    ],
    metrics: [
      { value: "528", label: "Lapsed customers contacted" },
      { value: "163", label: "Plans reactivated" },
      { value: "31%", label: "Conversion rate" },
      { value: "$48.9k", label: "Added recurring revenue" },
      { value: "12 days", label: "Campaign run length" },
      { value: "$1.10", label: "Cost per reactivation" },
    ],
    timeline: [
      { week: "Week 0", label: "Plan list pulled", detail: "Exported 528 customers whose plans had lapsed in the past 36 months. Validated phone numbers." },
      { week: "Week 1", label: "Touch 1 sent", detail: "Friendly check-in SMS with one-tap renewal link. 19% replied or renewed within 48 hours." },
      { week: "Week 2", label: "Touch 2 sent", detail: "Reminder + a small incentive ($25 off first drain flush). Another 9% renewed." },
      { week: "Week 3", label: "Touch 3 sent", detail: "Final ask, simpler copy. Picked up another 3%. Owner cut off the campaign there." },
      { week: "Month 4", label: "Locked in", detail: "Recurring revenue stabilized at +$48.9k/yr. Set the system to re-target plan lapses every quarter." },
    ],
    quote: "We thought those customers were gone for good. Turns out half of them had just forgotten. Three texts and a $25 incentive brought back $49k a year of revenue.",
    quoteAuthor: "Reggie F.",
    quoteAttribution: "Owner · Tarheel Plumbing · Charlotte",
    quoteInitials: "RF",
    representative: true,
  },
  {
    slug: "wasatch-pipeworks-salt-lake",
    category: "re-activation",
    fileNum: "008",
    business: "Wasatch Pipeworks",
    trade: "Plumbing + tankless · residential",
    city: "Salt Lake City",
    state: "UT",
    engagement: "6 months",
    cardHook: "Mined past customers for whole-home re-pipe upsell. $165k in 90 days.",
    cardMetricValue: "$165k",
    cardMetricLabel: "Re-pipe revenue from past-customer mining",
    titleStart: "Wasatch Pipeworks",
    titleAccent: "turns past service tickets into re-pipe contracts.",
    intro: "SLC plumbing shop expanded into whole-home re-pipe last year and was buying $130 leads from home-services marketplaces. Their CRM had 2,100 past customers — every single one a homeowner with a known plumbing history. We ran a targeted re-activation. $165k in re-pipe revenue in 90 days, zero ad spend.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing + tankless · residential" },
      { label: "Service area", value: "Salt Lake + Davis + Utah counties" },
      { label: "Engagement", value: "Bundle + AI receptionist" },
      { label: "Length", value: "6 months" },
    ],
    beforeAfter: [
      { label: "Re-pipe lead source", delta: "$130 / lead → $0", detail: "Killed paid lead-gen marketplaces entirely" },
      { label: "Re-pipe contracts signed", delta: "+23", detail: "From past-customer SMS sequence alone" },
      { label: "Avg ticket from re-activation", delta: "$7,174", detail: "Re-pipe contracts skew bigger than service" },
    ],
    metrics: [
      { value: "$165k", label: "Re-pipe revenue, 90 days" },
      { value: "23", label: "Contracts signed from campaign" },
      { value: "2,100", label: "Past customers segmented" },
      { value: "$0", label: "Paid leads bought" },
      { value: "5.2%", label: "Reply-to-quote rate" },
      { value: "29%", label: "Quote-to-close rate" },
    ],
    timeline: [
      { week: "Week 0", label: "Segment the book", detail: "Filtered past customers by age of home, prior galvanized-pipe service history, and previous spend. Top 600 became the re-pipe list." },
      { week: "Week 2", label: "First touch", detail: "Educational SMS: \"your home's plumbing is due for review — want a free re-pipe estimate?\" 5.2% replied yes." },
      { week: "Week 4", label: "AI handoff", detail: "AI receptionist scheduled the in-home estimates and pre-qualified on home age + plumbing material." },
      { week: "Month 2", label: "First closes", detail: "14 contracts signed in week 6. Avg ticket $7.2k." },
      { week: "Month 3", label: "Compounding", detail: "9 more closes from referrals of the first batch. Total to date: 23 contracts, $165k revenue." },
    ],
    quote: "Every house we've serviced in the last decade is a re-pipe lead sitting in a database. Once we figured out how to text them, the cost per acquisition dropped to basically zero.",
    quoteAuthor: "Ana K.",
    quoteAttribution: "Founder · Wasatch Pipeworks · SLC",
    quoteInitials: "AK",
    representative: true,
  },

  // ───────── Hybrid text-back + re-activation (1) ─────────
  {
    slug: "rose-city-plumbing-portland",
    category: "text-back",
    fileNum: "009",
    business: "Rose City Plumbing",
    trade: "Plumbing · residential",
    city: "Portland",
    state: "OR",
    engagement: "5 months",
    cardHook: "Combined text-back + sewer-line re-activation — $112k extra Q.",
    cardMetricValue: "$112k",
    cardMetricLabel: "Added Q1 revenue (combined)",
    titleStart: "Rose City Plumbing",
    titleAccent: "stacks text-back with a sewer-line campaign.",
    intro: "Portland plumbing shop wanted both: rescue inbound calls AND mine their book for sewer-line replacement candidates (homes 50+ yrs old in the database). We ran both systems in parallel. Q1 ended +$112k vs prior year.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Portland + Beaverton + Vancouver WA" },
      { label: "Engagement", value: "Bundle + Reputation desk" },
      { label: "Length", value: "5 months" },
    ],
    beforeAfter: [
      { label: "Q1 revenue (YoY)", delta: "+$112k", detail: "$340k → $452k" },
      { label: "After-hours capture", delta: "0% → 38%", detail: "Text-back caught calls outside 8-5" },
      { label: "Sewer-line closes", delta: "+14", detail: "From the re-activation push" },
    ],
    metrics: [
      { value: "+$112k", label: "Q1 revenue, YoY" },
      { value: "38%", label: "After-hours rescue rate" },
      { value: "14", label: "Sewer-line jobs from campaign" },
      { value: "11s", label: "Avg auto-text time" },
      { value: "$8,200", label: "Avg sewer-line ticket" },
      { value: "0", label: "Paid leads bought all quarter" },
    ],
    timeline: [
      { week: "Week 0", label: "Two-track plan", detail: "Track A: text-back across all lines. Track B: segment 1,200 customers in homes built before 1975 for sewer-line outreach." },
      { week: "Week 2", label: "Text-back live", detail: "Caught 47 after-hours calls in first week. 18 became booked jobs by Monday." },
      { week: "Week 4", label: "Sewer-line campaign", detail: "Educational SMS to the 1,200 with root-intrusion angle. 9% requested a camera inspection." },
      { week: "Month 2", label: "Closes start", detail: "First 8 sewer-line jobs closed. Avg ticket $8.2k." },
      { week: "Month 5", label: "Q1 wrap", detail: "Combined campaigns + organic = $112k YoY lift. Owner expanded the campaign to the 1975–1990 cohort next." },
    ],
    quote: "The text-back is the floor — it catches everyone trying to reach us. The re-activation is the ceiling — it makes the database actually work for us. Together they made our biggest quarter ever.",
    quoteAuthor: "Sarah B.",
    quoteAttribution: "Owner · Rose City Plumbing · Portland",
    quoteInitials: "SB",
    representative: true,
  },

  // ───────── AI Receptionist (3) ─────────
  {
    slug: "honkytonk-plumbing-nashville",
    category: "ai-receptionist",
    fileNum: "010",
    business: "Honkytonk Plumbing Co.",
    trade: "Plumbing · res & light commercial",
    city: "Nashville",
    state: "TN",
    engagement: "4 months",
    cardHook: "Cut $4,200/mo answering-service payroll. AI handles 78% of calls.",
    cardMetricValue: "−$4.2k",
    cardMetricLabel: "Monthly answering-service cost cut",
    titleStart: "Honkytonk Plumbing Co.",
    titleAccent: "fires the answering service.",
    intro: "Nashville plumbing shop paying $4,200/mo for an outsourced answering service that mostly took messages and forgot to pass them along. We replaced it with the AI receptionist. Booking accuracy up, costs down 100%.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · res & light commercial" },
      { label: "Service area", value: "Nashville + Franklin + Brentwood" },
      { label: "Engagement", value: "Bundle + AI receptionist" },
      { label: "Length", value: "4 months" },
    ],
    beforeAfter: [
      { label: "Answering service cost", delta: "−$4,200/mo", detail: "Replaced with $197 AI receptionist" },
      { label: "Booking accuracy", delta: "+34pp", detail: "62% (human service) → 96% (AI)" },
      { label: "Calls handled / month", delta: "+19%", detail: "AI doesn't take lunch or sick days" },
    ],
    metrics: [
      { value: "$4,003", label: "Net savings / month" },
      { value: "78%", label: "Calls handled by AI alone" },
      { value: "96%", label: "Booking accuracy rate" },
      { value: "0", label: "Missed messages, month 3" },
      { value: "24/7", label: "Coverage, no extra cost" },
      { value: "$48k", label: "Annualized savings" },
    ],
    timeline: [
      { week: "Week 0", label: "Service audit", detail: "Reviewed 90 days of answering service messages. Found 17% had wrong contact info, 9% never reached the shop at all." },
      { week: "Week 1", label: "AI training", detail: "Trained the AI on shop's hours, service area, common objections (\"how much for a drain clean?\"), and emergency triage rules." },
      { week: "Week 2", label: "Parallel test", detail: "Ran AI alongside answering service for 5 days. AI booked 23/26, service booked 14/26." },
      { week: "Week 3", label: "Service cancelled", detail: "Pulled the plug on the outsourced answering service. AI took 100% of off-hours calls." },
      { week: "Month 4", label: "Tuning", detail: "Adjusted AI script monthly based on call recordings. Booking accuracy now 96%, owner stopped reviewing transcripts daily." },
    ],
    quote: "We were paying four grand a month for someone who'd lose half our messages. The AI books the appointment, sends me the address, and tells the customer when to expect us. I can sleep again.",
    quoteAuthor: "Trent O.",
    quoteAttribution: "Owner · Honkytonk Plumbing · Nashville",
    quoteInitials: "TO",
    representative: true,
  },
  {
    slug: "neon-drain-las-vegas",
    category: "ai-receptionist",
    fileNum: "011",
    business: "Neon Drain Co.",
    trade: "Plumbing · drain & sewer",
    city: "Las Vegas",
    state: "NV",
    engagement: "5 months",
    cardHook: "Filtered 40% time-waster calls before they hit the owner's phone.",
    cardMetricValue: "−40%",
    cardMetricLabel: "Time-waster calls filtered",
    titleStart: "Neon Drain Co.",
    titleAccent: "filters time-wasters before they hit the truck.",
    intro: "Vegas drain specialist getting buried in price-shopper calls and DIY-question calls that ate hours per day. AI receptionist now qualifies, prices, and books — only the worth-it calls reach the owner.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · drain & sewer specialty" },
      { label: "Service area", value: "Las Vegas + Henderson + N Las Vegas" },
      { label: "Engagement", value: "Bundle + AI receptionist" },
      { label: "Length", value: "5 months" },
    ],
    beforeAfter: [
      { label: "Time-waster calls", delta: "−40%", detail: "AI filters DIY questions and price-only shoppers" },
      { label: "Hours saved / week", delta: "+11", detail: "Owner back to focusing on jobs, not phone screening" },
      { label: "Booked-call quality", delta: "+27%", detail: "Avg ticket on booked calls $312 → $397" },
    ],
    metrics: [
      { value: "−40%", label: "Time-wasters filtered out" },
      { value: "+11 hr", label: "Owner time / week" },
      { value: "$397", label: "Avg booked-call ticket" },
      { value: "94%", label: "Customers report \"satisfied\" with AI" },
      { value: "$197", label: "Cost / mo" },
      { value: "0", label: "Missed emergencies, 5 mo" },
    ],
    timeline: [
      { week: "Week 0", label: "Call analysis", detail: "Reviewed 200 inbound calls. 38% were tire-kickers, 12% were DIY help-line questions, 50% were real prospects." },
      { week: "Week 1", label: "Triage logic built", detail: "Trained AI to recognize emergency keywords (flooding, sewage, burst), price-shopper patterns, and qualifying questions." },
      { week: "Week 2", label: "Live", detail: "AI handles every call first. Emergency → instant text to owner. Real prospects → booked. Tire-kickers → polite redirect." },
      { week: "Month 2", label: "Refining the boundary", detail: "Adjusted threshold so more borderline calls escalated to owner — caught a few jobs the AI was over-filtering." },
      { week: "Month 5", label: "Steady", detail: "Owner now takes 60% fewer calls but books more revenue. Sleeping through the night again." },
    ],
    quote: "Half my day used to be telling people their toilet's not actually broken. Now the AI does that politely and sends me only the people who'll write me a check.",
    quoteAuthor: "Lou P.",
    quoteAttribution: "Owner · Neon Drain Co. · Las Vegas",
    quoteInitials: "LP",
    representative: true,
  },
  {
    slug: "lake-effect-plumbing-minneapolis",
    category: "ai-receptionist",
    fileNum: "012",
    business: "Lake Effect Plumbing",
    trade: "Plumbing · res & emergency",
    city: "Minneapolis",
    state: "MN",
    engagement: "3 months",
    cardHook: "AI handled the polar-vortex burst-pipe spike — no overtime, no missed calls.",
    cardMetricValue: "0",
    cardMetricLabel: "Missed calls during polar vortex",
    titleStart: "Lake Effect Plumbing",
    titleAccent: "rides out the polar vortex without breaking.",
    intro: "Minneapolis plumbing outfit gets crushed every January when temps drop to -30°F and pipes start bursting. Phones ring 5×. Past years they paid 1.5× overtime to office staff. This year they let the AI receptionist absorb the spike. Zero overtime spend. Zero missed calls.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · res & emergency" },
      { label: "Service area", value: "Twin Cities + suburbs" },
      { label: "Engagement", value: "Bundle + AI receptionist" },
      { label: "Length", value: "3 months · Q1 cold-snap window" },
    ],
    beforeAfter: [
      { label: "Overtime spend", delta: "−100%", detail: "$8,400 (prior year polar vortex) → $0" },
      { label: "Missed calls during peak", delta: "0", detail: "vs ~190 missed in same week prior year" },
      { label: "Avg call wait time", delta: "0s", detail: "AI picks up on first ring, no queue" },
    ],
    metrics: [
      { value: "0", label: "Missed calls, peak week" },
      { value: "$8,400", label: "OT savings, single cold snap" },
      { value: "1,140", label: "Calls handled by AI in 7 days" },
      { value: "417", label: "Burst-pipe jobs booked that week" },
      { value: "94%", label: "Caller satisfaction (post-call survey)" },
      { value: "<3s", label: "Avg pickup time" },
    ],
    timeline: [
      { week: "Week 0 · pre-cold", label: "Cold-snap drill", detail: "Loaded AI with seasonal scripts, emergency protocols (burst pipes, frozen lines, sewer freeze), and same-day-vs-tomorrow triage rules." },
      { week: "Day 1 of vortex", label: "Spike hits", detail: "Calls jumped 6× normal. AI absorbed the entire wave. First emergency text to owner came at 4:13am — beat the office opening by 4 hours." },
      { week: "Day 3", label: "Surveillance", detail: "Owner spot-checked 50 random call recordings. AI booking accuracy 94%, customer tone overwhelmingly positive." },
      { week: "Day 7", label: "Post-mortem", detail: "1,140 calls handled, 417 jobs booked, $0 in office overtime. Owner texted us: \"this paid for the next decade of subscription.\"" },
      { week: "Month 3", label: "Now baseline", detail: "AI receptionist is now the default first-line for all calls year-round, not just cold snaps." },
    ],
    quote: "Last polar vortex I paid my office manager $8,400 in overtime to answer phones for 7 days. This year the AI did it and didn't complain once. Best $197 I spend.",
    quoteAuthor: "Pat S.",
    quoteAttribution: "Owner · Lake Effect Plumbing · Minneapolis",
    quoteInitials: "PS",
    representative: true,
  },

  // ───────── Reviews & replies (2) ─────────
  {
    slug: "peach-state-plumbing-atlanta",
    category: "reviews",
    fileNum: "013",
    business: "Peach State Plumbing",
    trade: "Plumbing · residential",
    city: "Atlanta",
    state: "GA",
    engagement: "8 months",
    cardHook: "From 38 reviews to 412 in 8 months. Map pack #1 in 4 zip codes.",
    cardMetricValue: "+374",
    cardMetricLabel: "New Google reviews, 8 months",
    titleStart: "Peach State Plumbing",
    titleAccent: "stacks 374 reviews. Buys the map pack.",
    intro: "Atlanta plumber with 38 lifetime Google reviews competing against shops with 600+. Knew reviews drove map-pack ranking but never had time to ask. We turned the asking on, and the Reputation desk handled every reply. 374 new reviews in 8 months.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "ATL metro + 4 surrounding counties" },
      { label: "Engagement", value: "Bundle + Reputation desk" },
      { label: "Length", value: "8 months" },
    ],
    beforeAfter: [
      { label: "Google reviews total", delta: "38 → 412", detail: "+374 in 8 months" },
      { label: "Avg star rating", delta: "4.6 → 4.9", detail: "More reviews + faster issue resolution" },
      { label: "Map pack rank", delta: "Page 2 → #1 in 4 zips", detail: "\"plumber atlanta\" + 3 city variants" },
    ],
    metrics: [
      { value: "412", label: "Total Google reviews" },
      { value: "+374", label: "Added in 8 months" },
      { value: "4.9★", label: "Avg rating (was 4.6)" },
      { value: "67%", label: "Customers who left a review" },
      { value: "100%", label: "Reviews responded to within 24 hours" },
      { value: "#1", label: "Map pack, \"plumber atlanta\"" },
    ],
    timeline: [
      { week: "Week 0", label: "Review request audit", detail: "Found they were asking ~5% of customers for reviews, with no follow-up. Mostly via email no one read." },
      { week: "Week 1", label: "Auto-text live", detail: "Every closed job triggers an SMS within 4 hours: \"how'd we do? one tap to leave a Google review.\" First week: 23 new reviews." },
      { week: "Month 2", label: "Reputation desk on", detail: "Our team began replying to every review within 24 hours. Negative reviews escalated to owner with a draft response." },
      { week: "Month 5", label: "Map pack lift", detail: "Crossed into #1 for primary keyword in their core zip. Two more zips followed by month 7." },
      { week: "Month 8", label: "Compounding", detail: "Reviews now generating 2× the lead volume of paid ads they ran prior. Cancelled the Angi subscription." },
    ],
    quote: "We always knew reviews mattered. We never had time. Now we don't have to think about it — every customer gets asked, every reply gets handled. The map pack came as a bonus.",
    quoteAuthor: "Tasha W.",
    quoteAttribution: "Owner · Peach State Plumbing · Atlanta",
    quoteInitials: "TW",
    representative: true,
  },
  {
    slug: "tideway-plumbing-long-island",
    category: "reviews",
    fileNum: "014",
    business: "Tideway Plumbing",
    trade: "Plumbing · residential",
    city: "Long Island",
    state: "NY",
    engagement: "6 months",
    cardHook: "Reputation desk caught and resolved 12 negative reviews before they killed conversion.",
    cardMetricValue: "12",
    cardMetricLabel: "Negative reviews caught & resolved",
    titleStart: "Tideway Plumbing",
    titleAccent: "turns angry customers into 5-star repairs.",
    intro: "Long Island plumber with a 4.2 star rating dragged down by a handful of unresolved 1-star reviews. Reputation desk triaged each one within 24 hours, fixed the underlying issue, and got 9 of 12 to update their reviews to 5 stars.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Nassau + Suffolk counties" },
      { label: "Engagement", value: "Bundle + Reputation desk" },
      { label: "Length", value: "6 months" },
    ],
    beforeAfter: [
      { label: "Star rating", delta: "4.2 → 4.8", detail: "After resolving 9 of 12 legacy 1-star reviews" },
      { label: "Negative review response time", delta: "−96%", detail: "5 days avg → 4 hours avg" },
      { label: "Inbound conversion rate", delta: "+22%", detail: "Higher star rating = more clicks-to-call" },
    ],
    metrics: [
      { value: "4.8★", label: "Current rating (was 4.2)" },
      { value: "12", label: "Negative reviews triaged" },
      { value: "9", label: "Updated to 5 stars after resolution" },
      { value: "4 hr", label: "Avg negative-review response time" },
      { value: "100%", label: "Reviews replied to within 24 hours" },
      { value: "+22%", label: "Click-to-call lift on map pack" },
    ],
    timeline: [
      { week: "Week 0", label: "Reputation audit", detail: "Pulled 18 months of reviews. Identified 12 unresolved 1- and 2-star complaints, mostly about scheduling miscommunications." },
      { week: "Week 1", label: "Triage protocol", detail: "Reputation desk started responding to every review within 4 hours. Owner approved each negative response before it went live." },
      { week: "Month 2", label: "Outreach to 1-star customers", detail: "Personally followed up with each 1-star reviewer. Offered free service call to re-do or refund." },
      { week: "Month 4", label: "Updates rolling in", detail: "9 of the 12 customers updated their reviews to 5 stars after resolution. 2 deleted their reviews. 1 didn't respond." },
      { week: "Month 6", label: "Sustained", detail: "Star rating now 4.8. Inbound clicks from map pack up 22% — directly attributable to the rating improvement." },
    ],
    quote: "Those old 1-star reviews were a tax on every new customer who searched for us. The Reputation desk turned the bad ones into our best testimonials. Don't know why I waited so long.",
    quoteAuthor: "Vinny C.",
    quoteAttribution: "Owner · Tideway Plumbing · Long Island",
    quoteInitials: "VC",
    representative: true,
  },

  // ───────── Leads (1) ─────────
  {
    slug: "bayou-city-pipeworks-houston",
    category: "leads",
    fileNum: "015",
    business: "Bayou City Pipeworks",
    trade: "Plumbing · residential",
    city: "Houston",
    state: "TX",
    engagement: "5 months",
    cardHook: "Map-pack ranking + landing page rebuild = +89 monthly leads.",
    cardMetricValue: "+89",
    cardMetricLabel: "New monthly leads from organic",
    titleStart: "Bayou City Pipeworks",
    titleAccent: "owns the map pack in 9 zip codes.",
    intro: "Houston plumbing shop competing in a brutal market. Site looked dated, GBP was incomplete, citations were missing. Standard playbook: rebuild, fix, push. Lead volume tripled in five months.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Houston + Sugar Land + Pearland" },
      { label: "Engagement", value: "Bundle only" },
      { label: "Length", value: "5 months" },
    ],
    beforeAfter: [
      { label: "Monthly leads (organic)", delta: "+89", detail: "44 / mo baseline → 133 / mo by month 5" },
      { label: "Map pack ranking", delta: "→ #1 in 9 zips", detail: "Was off-map in 6 of those 9" },
      { label: "Cost per lead", delta: "$87 → $11", detail: "After cancelling paid lead-gen" },
    ],
    metrics: [
      { value: "+89", label: "Monthly leads from organic" },
      { value: "9", label: "Zip codes ranking #1 map pack" },
      { value: "$11", label: "Effective cost per lead" },
      { value: "$0", label: "Lead-gen app spend" },
      { value: "78", label: "Citations added or fixed" },
      { value: "3.4×", label: "Total lead volume vs baseline" },
    ],
    timeline: [
      { week: "Week 0", label: "Audit", detail: "Site Lighthouse score 47. GBP missing 4 service categories. NAP inconsistent across 38 directories." },
      { week: "Week 2", label: "Site rebuild", detail: "New mobile-first site, sticky call button, service-area pages for 12 zips. Lighthouse: 96." },
      { week: "Week 4", label: "Citation push", detail: "Synced NAP to 80+ directories. Fixed 38 inconsistencies, added service categories, corrected hours." },
      { week: "Month 3", label: "Map pack lift", detail: "Crossed into top 3 in 6 zips. Lead volume up 87%." },
      { week: "Month 5", label: "Compounding", detail: "Top 3 map pack in 9 zips, #1 in primary. 133 organic leads in month 5 vs 44 baseline." },
    ],
    quote: "We tried two agencies before this and got nowhere. The bundle just shipped the basics correctly — fast site, clean citations, real service-area pages. Leads tripled.",
    quoteAuthor: "Carlos M.",
    quoteAttribution: "Owner · Bayou City Pipeworks · Houston",
    quoteInitials: "CM",
    representative: true,
  },
];
