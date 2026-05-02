export type CaseCategory =
  | "text-back"
  | "re-activation"
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
    engagement: "Local Authority · 6 months",
    cardHook: "Cut $1,800/mo HomeAdvisor spend by month two. Inbound calls roughly doubled.",
    cardMetricValue: "2.1×",
    cardMetricLabel: "Inbound calls / month",
    titleStart: "Plumbing Geeks",
    titleAccent: "stops paying for leads.",
    intro: "Six-person plumbing shop fighting for visibility against four older Pasadena competitors. Marco was spending around $1,800/mo on HomeAdvisor and watching the same leads get sold to two other plumbers within minutes. We rebuilt the site, wired text-back to the main line, and ran the citation push. Took about six weeks before he felt comfortable killing HomeAdvisor.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential + light commercial" },
      { label: "Service area", value: "Pasadena + 9 SGV cities" },
      { label: "Plan", value: "Local Authority" },
      { label: "Length", value: "6 months & ongoing" },
    ],
    beforeAfter: [
      { label: "Lead-gen spend", delta: "−$1,800/mo", detail: "HomeAdvisor cancelled in month 2 once organic calls picked up" },
      { label: "Inbound calls", delta: "+108%", detail: "47/mo baseline → ~98/mo by month 6" },
      { label: "Map pack rank", delta: "Page 2 → top 3", detail: "Top 3 for \"plumber pasadena\" by month 5; not yet #1" },
    ],
    metrics: [
      { value: "2.1×", label: "Inbound calls / month" },
      { value: "Top 3", label: "Map pack, primary keyword" },
      { value: "76", label: "Directories synced" },
      { value: "$1,800", label: "Monthly lead-gen spend killed" },
      { value: "84", label: "New Google reviews, 6 mo" },
      { value: "14", label: "Repeat-customer jobs in Q1 touch" },
    ],
    timeline: [
      { week: "Week 0", label: "Audit", detail: "Pulled call logs and GBP. Found ~28% of incoming calls going unanswered after 5pm. NAP inconsistent across 38 directories." },
      { week: "Week 1–2", label: "Site rebuild + text-back", detail: "Shipped the new site. Twilio wiring took an extra two days because the existing carrier didn't allow A2P registration we expected — had to switch to a 10DLC-compliant number." },
      { week: "Week 3–5", label: "Citations + reviews", detail: "Synced NAP across 76 directories (we couldn't get 4 of the 80 to verify). Stood up review automation. First two weeks: 19 new Google reviews." },
      { week: "Month 2", label: "HomeAdvisor cancelled", detail: "Marco was nervous about cutting it. We agreed to monitor for 3 weeks. Inbound calls held steady, then climbed. He cancelled at end of month 2." },
      { week: "Month 4–6", label: "Map pack lift", detail: "Crossed into top 3 for \"plumber pasadena\" by month 5. Not #1 — there's a 25-year-old shop with 1,200 reviews that's hard to dislodge." },
    ],
    quote: "I was nervous to cut HomeAdvisor. The text-back was catching everything within a few weeks though, so I pulled the trigger. First month off it was the same revenue minus $1,800 in fees. That's when I knew it was real.",
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
    engagement: "Never Miss a Lead · 4 months",
    cardHook: "Caught 38% of after-hours frozen-pipe calls during a January cold snap.",
    cardMetricValue: "+27",
    cardMetricLabel: "Booked jobs / mo from text-back",
    titleStart: "Mile-High Pipeworks",
    titleAccent: "stops bleeding leads to voicemail.",
    intro: "Family-owned Denver plumbing shop watching after-hours frozen-pipe calls vanish into voicemail every January. They'd tried an answering service the year before — accuracy was bad enough they cancelled it. We wired text-back to the main line on day one. By the end of week two, 38% of after-hours callers were booking via SMS instead of dialing the next plumber.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential + emergency" },
      { label: "Service area", value: "Denver metro + west foothills" },
      { label: "Plan", value: "Never Miss a Lead" },
      { label: "Length", value: "4 months · ongoing" },
    ],
    beforeAfter: [
      { label: "After-hours rescue rate", delta: "0% → 38%", detail: "Voicemails ignored → texts replied to within ~3 minutes" },
      { label: "Avg jobs / month", delta: "+27", detail: "94/mo baseline → 121/mo current" },
      { label: "Voicemail-to-job rate", delta: "+34pp", detail: "11% (callbacks) → 45% (text-back captured)" },
    ],
    metrics: [
      { value: "38%", label: "After-hours calls rescued" },
      { value: "+27", label: "Booked jobs / mo from auto-text" },
      { value: "$11.4k", label: "Est. added monthly revenue" },
      { value: "~14s", label: "Median text response time" },
      { value: "3", label: "Lines wired to one inbox" },
      { value: "11", label: "Missed messages, month 4" },
    ],
    timeline: [
      { week: "Week 0", label: "Phone audit", detail: "Pulled 30 days of call logs. Found 287 unanswered calls in the prior month, 64% after 6pm." },
      { week: "Week 1", label: "Twilio wiring", detail: "Connected three lines through the JobsiteRank inbox. Tested with internal numbers for two days before going live — caught a routing bug on the way." },
      { week: "Week 2", label: "Text-back live", detail: "First Saturday: 18 missed calls, 13 replies, 7 booked jobs. Owner texted us at 11pm just to make sure it wasn't a fluke." },
      { week: "Week 6", label: "Site refresh", detail: "Rebuilt the website with sticky call button. Mobile bookings climbed about 60% in the next month." },
      { week: "Month 4", label: "Steady state", detail: "Text-back is now answering ~22% of total inbound. Owner stopped putting techs on after-hours rotation for non-emergencies." },
    ],
    quote: "We tried an answering service before. They'd take down the wrong address half the time. The text-back is just the customer texting us directly — way less to mess up.",
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
    engagement: "Never Miss a Lead · 5 months",
    cardHook: "Hurricane-flood emergency calls captured at ~1.7× the prior season's rate.",
    cardMetricValue: "1.7×",
    cardMetricLabel: "Storm-call capture vs prior season",
    titleStart: "Gulfshore Plumbing Co.",
    titleAccent: "books storm calls without picking up.",
    intro: "Tampa plumbing shop competing against five larger companies during hurricane season. Phones go nuts during a storm — flooded basements, sewage backups, broken water heaters — but most calls go unanswered while crews are already in jobs. We deployed text-back across all three lines pre-season. Storm-call conversion rose ~70% over the prior year.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · res + emergency" },
      { label: "Service area", value: "Hillsborough + Pinellas counties" },
      { label: "Plan", value: "Never Miss a Lead" },
      { label: "Length", value: "5 months · pre-season launch" },
    ],
    beforeAfter: [
      { label: "Storm-call conversion", delta: "1.7×", detail: "23% answered & booked → 39% via auto-text + callback" },
      { label: "Service calls / week (peak)", delta: "+31", detail: "32/wk baseline → 63/wk at storm peak" },
      { label: "Lost-call rate (peak)", delta: "−42%", detail: "59% of storm calls dropped → 34%" },
    ],
    metrics: [
      { value: "1.7×", label: "Storm-call conversion" },
      { value: "+31", label: "More service calls / peak week" },
      { value: "$0", label: "Spent on Angi during peak" },
      { value: "~12s", label: "Avg auto-text response time" },
      { value: "78%", label: "Reply rate to first text" },
      { value: "~2 hr", label: "Avg time to dispatched truck" },
    ],
    timeline: [
      { week: "Week 0", label: "Pre-season audit", detail: "Reviewed prior storm-season call logs. ~1,100 calls during peak weeks, 54% unanswered. Owner had stopped trying to staff for the spike — too unpredictable." },
      { week: "Week 1", label: "Site + texting live", detail: "New site with a storm-emergency landing page. Auto-text wired across three phone lines. First test text went to a wrong number because Twilio cached an old config — fixed within an hour." },
      { week: "Week 2", label: "First storm test", detail: "Severe weather Friday night → 71 calls in 4 hours. 56 got texts back, 41 replied, 22 trucks dispatched by Monday." },
      { week: "Month 2", label: "Refining the script", detail: "Tweaked auto-text to ask for address + photo of damage upfront. Cut average phone-tag down by about half." },
      { week: "Month 4", label: "Peak week", detail: "63 service calls in the highest week. Old peak record was 32. Crew added a second emergency truck mid-season — almost too late." },
    ],
    quote: "Used to feel like Christmas morning we couldn't get to the presents. Phones ringing and nobody can pick up. Now the text-back catches them while we're literally bailing out a basement.",
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
    engagement: "Never Miss a Lead · 8 months",
    cardHook: "Solo plumber added ~13 booked jobs/month without hiring an office assistant.",
    cardMetricValue: "+58%",
    cardMetricLabel: "Booked jobs / month (solo)",
    titleStart: "Bluebonnet Plumbing",
    titleAccent: "scales without a dispatcher.",
    intro: "Austin solo plumber, 60-hour weeks, missing about 40% of incoming calls because he was under sinks. Hated the idea of hiring an office assistant — said it would cost more in payroll than the lost jobs. We wired text-back so the system itself acts as the dispatcher. He ended up adding an apprentice 7 months later, but never an office hire.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Austin + Round Rock + Cedar Park" },
      { label: "Plan", value: "Never Miss a Lead" },
      { label: "Length", value: "8 months · still active" },
    ],
    beforeAfter: [
      { label: "Booked jobs / month", delta: "+58%", detail: "21/mo → ~33/mo (solo, then with apprentice month 7)" },
      { label: "Calls answered or replied", delta: "60% → 89%", detail: "Text-back picks up the rest hands-free" },
      { label: "Hours saved on dispatch", delta: "~9 hr / wk", detail: "Time back on the job site, not on the phone" },
    ],
    metrics: [
      { value: "+58%", label: "Booked jobs / month" },
      { value: "33", label: "Avg jobs / mo by month 7" },
      { value: "89%", label: "Calls answered or replied" },
      { value: "$0", label: "Spent on a dispatcher" },
      { value: "~9 hr", label: "Saved per week" },
      { value: "$2.4k", label: "Est. added revenue / week" },
    ],
    timeline: [
      { week: "Week 0", label: "Workflow audit", detail: "Tracked one week of his calls — 47 inbound, 28 answered, 12 voicemails returned, 7 booked. He was missing more than he booked." },
      { week: "Week 2", label: "Text-back live", detail: "Auto-text + Calendly link. Tested for 3 days before going live — first version's auto-text was too long, cut it down to two sentences before launch." },
      { week: "Month 2", label: "Calendar integration", detail: "Customers can book a slot directly from SMS via Calendly link. Booking rate from text replies climbed from ~31% to ~52%." },
      { week: "Month 5", label: "Capacity hit", detail: "Booking 30+ jobs / mo solo. Started a 2-week waitlist for non-emergency work. Some customers went elsewhere because of the wait." },
      { week: "Month 7", label: "First hire", detail: "Hired an apprentice to keep up with demand. Still no office staff — system runs intake. Owner described it as \"the cheapest dispatcher I've ever had.\"" },
    ],
    quote: "I'm allergic to having an office. The text-back is basically a dispatcher I don't have to manage. Booked twice the work this year, no payroll added except the apprentice.",
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
    engagement: "Local Authority · 4 months",
    cardHook: "Texted ~1,600 dormant past customers. Booked 64 jobs in 3 weeks.",
    cardMetricValue: "$48k",
    cardMetricLabel: "Revenue from one re-activation campaign",
    titleStart: "Saguaro Plumbing Co.",
    titleAccent: "wakes up its dormant customer book.",
    intro: "Phoenix plumbing shop sitting on roughly 1,800 past customers in their CRM with no marketing back to them. We cleaned up the list (~1,600 reachable after dedup), then ran a re-activation campaign before monsoon season — \"summer plumbing tune-up, $89.\" Booked 64 jobs over three weeks before the owner hit pause to keep crew capacity sane.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Phoenix + Scottsdale + Tempe" },
      { label: "Plan", value: "Local Authority" },
      { label: "Length", value: "4 months · campaign now quarterly" },
    ],
    beforeAfter: [
      { label: "Past-customer marketing", delta: "0 → 1,612", detail: "First time ever messaging the back-catalog" },
      { label: "Revenue from one campaign", delta: "$48k", detail: "64 jobs × ~$750 avg ticket" },
      { label: "Cost per booked job", delta: "$5.40", detail: "vs $97 / lead they were paying Angi" },
    ],
    metrics: [
      { value: "1,612", label: "Past customers reached" },
      { value: "64", label: "Jobs booked in 21 days" },
      { value: "$48k", label: "Revenue from the campaign" },
      { value: "$5.40", label: "Cost per booked job" },
      { value: "19%", label: "SMS reply rate (touch 1)" },
      { value: "4%", label: "Click → booked rate" },
    ],
    timeline: [
      { week: "Week 0", label: "CRM cleanup", detail: "Imported 1,800 customer records. Deduped, validated phones, removed opt-outs and bad numbers. Clean list of 1,612 reachable." },
      { week: "Week 1", label: "Campaign drafted", detail: "Two-touch SMS: offer text + reminder 4 days later if no reply. First draft was too formal — rewrote it in the owner's voice before sending." },
      { week: "Week 2", label: "Send", detail: "Sent on a Tuesday morning. 19% replied within 24 hours. Booked 41 jobs by Friday — owner was overwhelmed, paused the second touch by 2 days to catch up." },
      { week: "Week 3", label: "Follow-up wave", detail: "Reminder text to non-responders. Booked another 23 jobs. Cut off at 64 to keep crew sane through July heat." },
      { week: "Month 4", label: "Quarterly cadence", detail: "Set the system to fire seasonal campaigns every 90 days automatically. Q4 campaign (drain check before holidays) booked another 38 jobs." },
    ],
    quote: "I'd been sitting on those customers for years. Felt rude to text them. Turns out a bunch of them were just waiting for someone to remind them.",
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
    engagement: "Never Miss a Lead · 5 months",
    cardHook: "Maintenance-plan re-up campaign brought back 24% of lapsed customers.",
    cardMetricValue: "24%",
    cardMetricLabel: "Lapsed maintenance plan conversion",
    titleStart: "Tarheel Plumbing Co.",
    titleAccent: "rebuilds a maintenance book over a quarter.",
    intro: "Charlotte plumbing shop had 920 customers on annual drain & water-heater maintenance plans 3 years ago. Today: 387. Asked us to bring them back. We ran a 3-touch re-activation campaign with a one-tap renewal link. 24% of lapsed customers reactivated over the campaign window.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Charlotte + Concord + Gastonia" },
      { label: "Plan", value: "Never Miss a Lead" },
      { label: "Length", value: "5 months" },
    ],
    beforeAfter: [
      { label: "Maintenance plans active", delta: "387 → 511", detail: "+124 reactivated lapsed customers" },
      { label: "Recurring annual revenue", delta: "+$37,200", detail: "124 plans × $300 avg" },
      { label: "Reply rate to campaign", delta: "37%", detail: "Across 3 SMS touches over 14 days" },
    ],
    metrics: [
      { value: "519", label: "Lapsed customers contacted" },
      { value: "124", label: "Plans reactivated" },
      { value: "24%", label: "Conversion rate" },
      { value: "$37.2k", label: "Added recurring revenue" },
      { value: "14 days", label: "Campaign run length" },
      { value: "$1.30", label: "Cost per reactivation" },
    ],
    timeline: [
      { week: "Week 0", label: "Plan list pulled", detail: "Exported 519 customers whose plans had lapsed in the past 36 months. Validated phone numbers — 27 bounced or marked do-not-contact." },
      { week: "Week 1", label: "Touch 1 sent", detail: "Friendly check-in SMS with one-tap renewal link. 14% replied or renewed within 48 hours." },
      { week: "Week 2", label: "Touch 2 sent", detail: "Reminder + a small incentive ($25 off first drain flush). Another 7% renewed. Some pushback on the pricing — we noted it for next quarter." },
      { week: "Week 3", label: "Touch 3 sent", detail: "Final ask, simpler copy. Picked up another 3%. Owner cut off the campaign there to avoid spam complaints." },
      { week: "Month 5", label: "Locked in", detail: "Recurring revenue stabilized at +$37k/yr. Set the system to re-target plan lapses every quarter automatically." },
    ],
    quote: "Half of these people had just forgotten. Three texts and a $25 incentive brought back $37k a year of revenue. Should have done this two years ago.",
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
    engagement: "Local Authority · 7 months",
    cardHook: "Mined past customers for whole-home re-pipe upsell. ~$112k in 4 months.",
    cardMetricValue: "$112k",
    cardMetricLabel: "Re-pipe revenue from past-customer mining",
    titleStart: "Wasatch Pipeworks",
    titleAccent: "turns past service tickets into re-pipe contracts.",
    intro: "SLC plumbing shop expanded into whole-home re-pipe last year and was buying $110-130 leads from home-services marketplaces. Their CRM had ~2,000 past customers — every one a homeowner with a known plumbing history. We segmented for galvanized-pipe candidates, ran a 4-touch campaign, and got them out of the lead-gen marketplace by month three.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing + tankless · residential" },
      { label: "Service area", value: "Salt Lake + Davis + Utah counties" },
      { label: "Plan", value: "Local Authority" },
      { label: "Length", value: "7 months · ongoing" },
    ],
    beforeAfter: [
      { label: "Re-pipe lead source", delta: "$120/lead → $0", detail: "Killed paid lead-gen marketplaces by month 3" },
      { label: "Re-pipe contracts signed", delta: "+15", detail: "From past-customer SMS sequence over 4 months" },
      { label: "Avg ticket from re-activation", delta: "$7,460", detail: "Re-pipe contracts skew bigger than service" },
    ],
    metrics: [
      { value: "$112k", label: "Re-pipe revenue, 4 months" },
      { value: "15", label: "Contracts signed from campaign" },
      { value: "1,983", label: "Past customers segmented" },
      { value: "$0", label: "Paid leads bought (since month 3)" },
      { value: "4.1%", label: "Reply-to-quote rate" },
      { value: "23%", label: "Quote-to-close rate" },
    ],
    timeline: [
      { week: "Week 0", label: "Segment the book", detail: "Filtered past customers by home age (pre-1985), prior galvanized-pipe service history, and previous spend. Top 580 became the re-pipe list." },
      { week: "Week 2", label: "First touch", detail: "Educational SMS — galvanized pipe lifespan, why re-pipe matters now. 4.1% replied yes to a free assessment. Owner called the response \"low but qualified.\"" },
      { week: "Week 4", label: "In-home assessments", detail: "Estimator visits scheduled. About 60% of replies became actual quotes. The rest pushed back on timing or cost upfront." },
      { week: "Month 2–3", label: "First closes", detail: "9 contracts signed in months 2–3. Avg ticket ~$7.5k. One job had pre-existing electrical issues we hadn't budgeted for — added a clause to future quotes." },
      { week: "Month 4", label: "Compounding", detail: "Six more closes from referrals of the first batch. Total to date: 15 contracts, ~$112k revenue. Owner cancelled the lead marketplaces." },
    ],
    quote: "Every house we've serviced in the last decade is sitting in a database. Once we figured out how to text them, the cost per acquisition dropped to basically zero. Wish we'd started sooner.",
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
    engagement: "Local Authority · 6 months",
    cardHook: "Combined text-back + sewer-line re-activation — Q1 revenue up ~$87k YoY.",
    cardMetricValue: "+$87k",
    cardMetricLabel: "Q1 revenue, year over year",
    titleStart: "Rose City Plumbing",
    titleAccent: "stacks text-back with a sewer-line campaign.",
    intro: "Portland plumbing shop wanted both: rescue inbound calls AND mine their book for sewer-line replacement candidates (homes 50+ yrs old in the database). We ran both systems in parallel. Q1 ended +$87k vs the same quarter prior year. Track A (text-back) carried more volume; Track B (sewer-line campaign) carried more revenue per close.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Portland + Beaverton + Vancouver WA" },
      { label: "Plan", value: "Local Authority" },
      { label: "Length", value: "6 months" },
    ],
    beforeAfter: [
      { label: "Q1 revenue (YoY)", delta: "+$87k", detail: "$324k → $411k" },
      { label: "After-hours capture", delta: "0% → 31%", detail: "Text-back caught calls outside 8-5" },
      { label: "Sewer-line closes", delta: "+11", detail: "From the re-activation push (3 fell through)" },
    ],
    metrics: [
      { value: "+$87k", label: "Q1 revenue, YoY" },
      { value: "31%", label: "After-hours rescue rate" },
      { value: "11", label: "Sewer-line jobs closed from campaign" },
      { value: "~14s", label: "Avg auto-text time" },
      { value: "$7,900", label: "Avg sewer-line ticket" },
      { value: "$0", label: "Paid leads bought all quarter" },
    ],
    timeline: [
      { week: "Week 0", label: "Two-track plan", detail: "Track A: text-back across all lines. Track B: segment ~1,150 customers in homes built before 1975 for sewer-line outreach." },
      { week: "Week 2", label: "Text-back live", detail: "Caught 38 after-hours calls in first week. 14 became booked jobs by Monday. The rest were either spam or out-of-area requests." },
      { week: "Week 4", label: "Sewer-line campaign", detail: "Educational SMS to the 1,150 with root-intrusion angle. 7% requested a camera inspection. Conversion to quote: ~70%." },
      { week: "Month 2", label: "Closes start", detail: "First 6 sewer-line jobs closed. Avg ticket ~$7.9k. Two quotes lost to a competitor on price; we adjusted the script for next round." },
      { week: "Month 5", label: "Q1 wrap", detail: "Combined campaigns + organic = $87k YoY lift. Owner expanded the campaign to the 1975–1990 cohort next quarter." },
    ],
    quote: "Text-back is the floor — catches everyone trying to reach us. The re-activation is the ceiling — it makes the database actually work for us. Best quarter we've ever had.",
    quoteAuthor: "Sarah B.",
    quoteAttribution: "Owner · Rose City Plumbing · Portland",
    quoteInitials: "SB",
    representative: true,
  },

  // ───────── Reviews & replies (2) ─────────
  {
    slug: "peach-state-plumbing-atlanta",
    category: "reviews",
    fileNum: "010",
    business: "Peach State Plumbing",
    trade: "Plumbing · residential",
    city: "Atlanta",
    state: "GA",
    engagement: "Local Authority · 9 months",
    cardHook: "From 41 reviews to 287 in 9 months. Map pack #1 in 2 zips, top 3 in 4 more.",
    cardMetricValue: "+246",
    cardMetricLabel: "New Google reviews, 9 months",
    titleStart: "Peach State Plumbing",
    titleAccent: "stacks reviews. Climbs the map pack.",
    intro: "Atlanta plumber with 41 lifetime Google reviews competing against shops with 600+. Knew reviews drove map-pack ranking but never had time to ask. We turned the asking on, and our team handled every reply. 246 new reviews in 9 months — slower than some shops but steady, and the rating climbed.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "ATL metro + 3 surrounding counties" },
      { label: "Plan", value: "Local Authority" },
      { label: "Length", value: "9 months" },
    ],
    beforeAfter: [
      { label: "Google reviews total", delta: "41 → 287", detail: "+246 in 9 months" },
      { label: "Avg star rating", delta: "4.5 → 4.8", detail: "More 5-star reviews stacking up week after week" },
      { label: "Map pack rank", delta: "Page 2 → #1 in 2 zips", detail: "Top 3 in 4 more zips; not yet top 3 in their core ATL zip" },
    ],
    metrics: [
      { value: "287", label: "Total Google reviews" },
      { value: "+246", label: "Added in 9 months" },
      { value: "4.8★", label: "Avg rating (was 4.5)" },
      { value: "53%", label: "Customers who left a review" },
      { value: "100%", label: "Reviews responded to within 48h" },
      { value: "#1", label: "Map pack, 2 of 7 target zips" },
    ],
    timeline: [
      { week: "Week 0", label: "Review request audit", detail: "Found they were asking ~8% of customers for reviews — sporadic, by email, mostly ignored." },
      { week: "Week 1", label: "Auto-text live", detail: "Every closed job triggers an SMS within 6 hours: \"how'd we do? one tap to leave a Google review.\" First 2 weeks: 19 new reviews. Reply rate higher than we expected." },
      { week: "Month 2", label: "Replies on", detail: "Our team began replying to every review within 48 hours. Steady cadence: about a dozen new reviews + replies posted weekly." },
      { week: "Month 5", label: "First map pack lift", detail: "Crossed into top 3 for primary keyword in their core zip. Two more zips followed by month 7. Core ATL zip is brutal — still working on it." },
      { week: "Month 9", label: "Compounding", detail: "Reviews now generating ~1.6× the lead volume of paid ads they ran prior. Cancelled the Angi subscription for one of three branches." },
    ],
    quote: "We always knew reviews mattered. Never had time. Now it just happens — every customer gets asked, every reply gets handled. The map pack came as a bonus.",
    quoteAuthor: "Tasha W.",
    quoteAttribution: "Owner · Peach State Plumbing · Atlanta",
    quoteInitials: "TW",
    representative: true,
  },
  {
    slug: "tideway-plumbing-long-island",
    category: "reviews",
    fileNum: "011",
    business: "Tideway Plumbing",
    trade: "Plumbing · residential",
    city: "Long Island",
    state: "NY",
    engagement: "Local Authority · 6 months",
    cardHook: "Went from ~3 reviews/month to ~13/month. Climbed from 4.5 to 4.8 stars.",
    cardMetricValue: "+78",
    cardMetricLabel: "New reviews in 6 months",
    titleStart: "Tideway Plumbing",
    titleAccent: "stacks reviews in a saturated market.",
    intro: "Established Long Island plumbing shop in a brutally competitive market — 9 plumbers within 4 miles, most with 200+ reviews. Tideway had 184 reviews after 11 years, growing at maybe 3/month. They asked sporadically, by email, mostly ignored. We turned the auto-text on after every closed job. Six months later: 78 new reviews, rating up to 4.8, and they're climbing the map pack in two of their core zips.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Nassau + Suffolk counties" },
      { label: "Plan", value: "Local Authority" },
      { label: "Length", value: "6 months" },
    ],
    beforeAfter: [
      { label: "Reviews / month", delta: "~3 → ~13", detail: "Auto-text after every closed job, smart cooldown on repeat customers" },
      { label: "Avg star rating", delta: "4.5 → 4.8", detail: "Steady stream of 5-star reviews dilutes legacy lower-stars" },
      { label: "Map pack rank", delta: "Top 3 in 2 zips", detail: "Was off-map pack in both. Two more target zips still tough." },
    ],
    metrics: [
      { value: "262", label: "Total Google reviews (was 184)" },
      { value: "+78", label: "New reviews, 6 months" },
      { value: "4.8★", label: "Current rating (was 4.5)" },
      { value: "~13", label: "New reviews / month avg" },
      { value: "100%", label: "Reviews replied to within 48h" },
      { value: "+12%", label: "Click-to-call lift, map pack" },
    ],
    timeline: [
      { week: "Week 0", label: "Review audit", detail: "Pulled 18 months of review data. Found ~5% of customers leaving reviews, mostly via email asks no one read. Email open rate was 14%." },
      { week: "Week 1", label: "Auto-text live", detail: "Every closed job now triggers an SMS within 4 hours: \"how'd we do? one tap to leave a Google review.\" First two weeks: 11 new reviews — more than they'd gotten in the prior month." },
      { week: "Month 2", label: "Replies on", detail: "Our team began replying to every review within 48 hours. Owner liked the personal tone — said one reply went viral with a regular customer." },
      { week: "Month 4", label: "Map pack lift", detail: "Crossed into top 3 for primary keyword in two of their core zips. Their two highest-volume target zips have entrenched competitors with 600+ reviews — slower climb expected." },
      { week: "Month 6", label: "Sustained", detail: "Steady ~13 reviews/month. Owner cancelled a $400/mo paid lead-gen contract once organic call volume picked up." },
    ],
    quote: "We were getting maybe three reviews a month. Now it's a dozen plus. Same number of jobs, just actually asking for the review. Don't know why I waited so long.",
    quoteAuthor: "Vinny C.",
    quoteAttribution: "Owner · Tideway Plumbing · Long Island",
    quoteInitials: "VC",
    representative: true,
  },

  // ───────── Leads (1) ─────────
  {
    slug: "bayou-city-pipeworks-houston",
    category: "leads",
    fileNum: "012",
    business: "Bayou City Pipeworks",
    trade: "Plumbing · residential",
    city: "Houston",
    state: "TX",
    engagement: "Local Authority · 6 months",
    cardHook: "Map-pack ranking + site rebuild = ~62 added monthly leads. Took 5 months.",
    cardMetricValue: "+62",
    cardMetricLabel: "New monthly leads from organic",
    titleStart: "Bayou City Pipeworks",
    titleAccent: "owns the map pack in 6 zips.",
    intro: "Houston plumbing shop competing in a brutal market — twelve major plumbers within 5 miles. Site looked dated, GBP was incomplete, citations were missing. Standard playbook: rebuild, fix, push. Lead volume roughly doubled in 5 months. Not as fast as some shops, but Houston is the toughest market we've worked.",
    intakeFacts: [
      { label: "Trade", value: "Plumbing · residential" },
      { label: "Service area", value: "Houston + Sugar Land + Pearland" },
      { label: "Plan", value: "Local Authority" },
      { label: "Length", value: "6 months · ongoing" },
    ],
    beforeAfter: [
      { label: "Monthly leads (organic)", delta: "+62", detail: "44/mo baseline → ~106/mo by month 5" },
      { label: "Map pack ranking", delta: "→ #1 in 6 zips", detail: "Was off-map in 4 of those 6; not top 3 in 2 target zips yet" },
      { label: "Cost per lead", delta: "$78 → $14", detail: "After cancelling paid lead-gen" },
    ],
    metrics: [
      { value: "+62", label: "Monthly leads from organic" },
      { value: "6", label: "Zip codes ranking #1 map pack" },
      { value: "$14", label: "Effective cost per lead" },
      { value: "$0", label: "Lead-gen app spend (month 4+)" },
      { value: "71", label: "Citations added or fixed" },
      { value: "2.4×", label: "Total lead volume vs baseline" },
    ],
    timeline: [
      { week: "Week 0", label: "Audit", detail: "Site Lighthouse score 51. GBP missing 3 service categories, hours wrong on 6 directories. NAP inconsistent across 34 directories." },
      { week: "Week 2–3", label: "Site rebuild", detail: "New mobile-first site, sticky call button, service-area pages for 9 zips. Lighthouse: 94. Took an extra week — original brief missed 3 service categories the owner ran." },
      { week: "Week 5", label: "Citation push", detail: "Synced NAP to 71 directories (couldn't get 9 to verify in our window). Fixed 34 inconsistencies, added service categories, corrected hours." },
      { week: "Month 4", label: "Map pack lift", detail: "Crossed into top 3 in 4 zips. Lead volume up ~65%. Cancelled HomeAdvisor and the cheaper of two lead-gen subs." },
      { week: "Month 5–6", label: "Compounding", detail: "Top 3 map pack in 6 zips, #1 in their core zip. 106 organic leads in month 5 vs 44 baseline. Two of their target zips still tough — well-established competitors." },
    ],
    quote: "Tried two agencies before this. Got nowhere. The bundle just shipped the basics correctly — fast site, clean citations, real service-area pages. Took longer than I hoped but it's working.",
    quoteAuthor: "Carlos M.",
    quoteAttribution: "Owner · Bayou City Pipeworks · Houston",
    quoteInitials: "CM",
    representative: true,
  },
];
