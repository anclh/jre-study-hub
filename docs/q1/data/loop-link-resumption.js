/* Loop eastern link / NM land resumption Q1 pack — loaded by ../app.js */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "loop-link-resumption-2026-10-30",
  title: "Eastern Loop Link Land Resumption & Formed Land · City of Jade",
  titleZh: "河套東面連接／北都收地熟地",
  tip: "先只睇 Data File，15 分鐘內 sort／highlight，自己寫完先睇範例。",
  task: {
    role: "You are an Administrative Officer in the Development Bureau of the City of Jade. The Permanent Secretary has asked you to prepare an internal discussion paper (about 500–800 words) for senior management.",
    bullets: [
      "Identify two major problems arising from uneven land resumption and slow conversion to formed (ready) sites for the eastern Loop connecting road and nearby Northern Metropolis parcels, and explain their implications; and",
      "Compare the main options already floated, then recommend feasible measures with concrete delivery arrangements.",
    ],
    note: "Write in clear formal English. Do not merely paraphrase background material. Use only the Data File.",
  },
  docs: [
    {
      id: "A",
      title: "Background brief — Development Bureau & Lands Department (Sep 2026)",
      paras: [
        "City of Jade’s Northern Metropolis programme includes an eastern connecting road to the Loop innovation park. About 38 hectares still require statutory land resumption and clearance before main works can proceed on schedule for a 2030 opening target.",
        "Gazettal and resumption notices cover most of the corridor, yet conversion from resumed lots to formed land with access and utilities lags: only 41% of the corridor is works-ready, versus a 70% internal milestone for end-2026.",
      ],
      bullets: [
        "Households and small workshops still on site: ~920 households; ~210 operating firms (mostly logistics and light industry).",
        "Median time gazette→possession (similar NM corridors, 2023–25): 14 months; this corridor currently tracking 19 months.",
        "Formed-land handovers to works departments YTD: 3 of 8 planned packages.",
      ],
    },
    {
      id: "B",
      title: "Resumption & ready-site snapshot (Lands / CEDD interface, FY2025/26 YTD)",
      table: {
        headers: ["Stage", "Target", "Actual", "Note"],
        rows: [
          ["Lots under notice", "100%", "94%", "Residual private lots in negotiation"],
          ["Possession taken", "85%", "62%", "Objections and compensation disputes"],
          ["Formed / ready sites", "70%", "41%", "Utilities and access incomplete"],
          ["Compensation take-up (households)", "90%", "71%", "Rehousings slots tight in two districts"],
          ["Firm relocation packages signed", "80%", "54%", "SMEs cite unclear timelines"],
        ],
      },
    },
    {
      id: "C",
      title: "Jade Corridor Residents & Traders Alliance — open letter extract",
      quote: [
        "Do not measure progress by how many lots you gazette. Publish a resumption-to-formed-land timetable we can trust, finish compensation and rehousing before clearance surges, and name who owns cross-departmental slips—otherwise ‘Northern Metropolis delivery’ is just another policy-delivery gap.",
      ],
      bullets: [
        "Demand district-level ready-site KPIs and compensation take-up dashboards.",
        "Oppose accelerating clearance without rehousing and SME relocation slots.",
        "Ask for a single lead bureau with recovery triggers when the timetable slips.",
      ],
    },
    {
      id: "D",
      title: "District Councils / contractor note",
      bullets: [
        "Main-works tenderers warn that awarding contracts before formed-land packages are ready inflates claims and idle plant costs.",
        "Some district voices prefer slowing the road to protect brownfield operators’ livelihoods.",
        "Others urge faster clearance to unlock housing and Loop jobs, accepting higher short-term disruption.",
      ],
    },
    {
      id: "E",
      title: "Treasury / Financial Services Bureau note (Oct 2026)",
      bullets: [
        "Large permanent top-ups to ex-gratia ceilings face resistance this cycle.",
        "Time-limited funding of HK$180–260 million over three years for rehousing facilitation, SME relocation grants and utilities advance works is more acceptable if recurrent admin stays lean.",
        "Prefer locking disbursement of works packages to ready-site milestones over open-ended contingency for claims.",
        "Any enhanced compensation must be targeted, time-bound and audited for take-up.",
      ],
    },
    {
      id: "F",
      title: "Internal options paper (Planning & Lands Branch, Oct 2026)",
      options: [
        {
          name: "Option 1 — Accelerate clearance and award main works now",
          text: "Push remaining possession and award the main contract in Q1 2027 on current site readiness. Fast political signal for NM connectivity; high claim/idle-cost risk and community backlash if compensation take-up stays at 71%.",
        },
        {
          name: "Option 2 — Lock resumption to formed-land milestones + named lead",
          text: "Keep the 2030 opening target but release works packages only when each segment hits ready-site criteria; publish a joint timetable with Development Bureau as lead and quarterly recovery triggers. Stronger delivery quality; may slip intermediate dates unless utilities are advanced.",
        },
        {
          name: "Option 3 — Compensation & relocation surge (limited works pause)",
          text: "Six-month surge on rehousing slots and SME relocation grants (~HK$200m time-limited), pause non-critical clearance, then resume. Raises take-up and trust; alone does not fix utilities/access bottlenecks on formed land.",
        },
      ],
      closing:
        "Bureau note: a hybrid (Option 2 milestones + a targeted Option 3 surge on compensation/relocation) may fit Doc E better than Option 1 alone, and answers Doc C’s delivery-gap critique.",
    },
    {
      id: "G",
      title: "Delivery & coordination snapshot (DevB internal, 2025/26)",
      bullets: [
        "Three bureaux/departments touch the corridor; only 2 of 6 quarterly joint meetings issued a written recovery action when KPIs slipped.",
        "Utilities advance works funded but not sequenced to resumption packages in 3 of 5 segments.",
        "Public dashboard shows gazettal counts, not formed-land or compensation take-up.",
      ],
    },
  ],
  learnPoints: [
    "**開場定 criteria**：按時交出熟地／就緒路段、提高補償吸納與安置、控索償／經常風險 — weighing 圍住呢三條。",
    "**兩個問題要「現象 → 邊啲人 → 點解急」**：用 Doc A–B／G（41% ready、71% take-up、跨部門會議），唔好抄北都口號。",
    "**Option 比較**：同一套 criteria；主動回應 Doc C（怕淨係憲報）同 Doc E（唔想永久加碼）。",
    "**推薦要組合 + 落地**：邊個局牽頭、分階段、季度 KPI（formed land %、compensation take-up、tender-ready packages）。",
    "**結尾短**：殘餘風險一句（司法覆核／索償），唔再開新題。",
  ],
  model: {
    to: "Permanent Secretary, Development Bureau",
    from: "[AO]",
    subject: "Eastern Loop link resumption — problems and recommended package",
    date: "30 October 2026",
    sections: [
      {
        h: "1. Opening",
        html: "<p>Gazettal for the eastern Loop link is largely in place, yet formed-land readiness and compensation take-up lag internal milestones. Any response should raise the share of works-ready sites, lift household and firm settlement rates, and contain claim costs within tight fiscal limits.</p>",
      },
      {
        h: "2. Problems and implications",
        html: "<p><strong>Resumption without ready sites.</strong> Possession stands at 62% and formed/ready sites at 41% against a 70% end-2026 milestone, with gazette→possession tracking about 19 months versus 14 months on peer corridors (Docs A–B). Implications: main works risk idle plant and claims; housing and Loop job pledges slip; public trust reads this as a policy-delivery gap.</p><p><strong>Thin settlement and weak join-up.</strong> Household compensation take-up is 71% and firm packages 54%; joint meetings seldom issue recovery actions when KPIs slip (Docs B, G). Implications: clearance surges invite dispute; SMEs cannot plan relocation; cross-departmental coordination stays symbolic.</p>",
      },
      {
        h: "3. Options",
        html: "<p><strong>Option 1</strong> (clear and award now) is fast but clashes with Treasury claim discipline and community take-up (Docs C, E). <strong>Option 2</strong> (milestone lock + named lead) best matches delivery criteria. <strong>Option 3</strong> (compensation surge) raises trust but alone does not form land. A hybrid of 2 with a targeted 3 surge fits best.</p>",
      },
      {
        h: "4. Recommendation",
        html: "<p>Adopt ready-site gates before each works package, publish a joint resumption-to-formed-land timetable with Development Bureau as lead and quarterly recovery triggers, and run a time-limited rehousing/SME relocation surge within the HK$180–260 million envelope. Report compensation take-up and ready-site KPIs by district within six months. Phase: immediate dashboard + utilities sequencing; Q1–Q2 surge; review at 12 months against formed-land %, take-up, and tender-ready packages.</p>",
      },
      {
        h: "5. Closing",
        html: "<p>Residual risk is short-term date slips and judicial-review noise; mitigate with transparent recovery plans rather than awarding main works on unready segments.</p>",
      },
    ],
  },
});
