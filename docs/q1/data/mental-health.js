/* Youth / community mental health Q1 pack — loaded by ../app.js */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "mental-health-2026-10-26",
  title: "Youth Mental Health Access · City of Jade",
  titleZh: "青少年精神健康／輪候",
  tip: "先只睇 Data File，15 分鐘內 sort／highlight，自己寫完先睇範例。",
  task: {
    role: "You are an Administrative Officer in the Labour and Welfare Bureau of the City of Jade. The Permanent Secretary has asked you to prepare an internal discussion paper (about 500–800 words) for senior management.",
    bullets: [
      "Identify two major problems arising from strained youth mental-health services, and explain their implications; and",
      "Compare the main options already floated, then recommend feasible measures with concrete delivery arrangements.",
    ],
    note: "Write in clear formal English. Do not merely paraphrase background material. Use only the Data File.",
  },
  docs: [
    {
      id: "A",
      title: "Background brief — Hospital Authority & Education Bureau (Sep 2026)",
      paras: [
        "City of Jade’s specialist psychiatric outpatient waiting time for non-urgent youth (aged 12–24) rose from a median of 42 weeks (2022) to 68 weeks (2025). School counsellors report a 31% rise in referrals for anxiety and self-harm risk over the same period.",
        "About 19% of secondary students screened positive for moderate-to-severe distress in the 2025 Education Bureau well-being survey (n=48,000), up from 14% in 2021. Public specialist capacity grew only 6% in staffed sessions over four years.",
      ],
      bullets: [
        "NGO community counselling median wait: 11 weeks (urban districts), 18 weeks (new towns).",
        "Emergency department attendances tagged mental-health among ages 12–24: +24% (2023→2025).",
        "HA estimates ~180 additional psychiatrist sessions/week needed to cut non-urgent youth waits to under 40 weeks by 2029 under current demand.",
      ],
    },
    {
      id: "B",
      title: "Service utilisation snapshot (HA / SWD, FY2024/25)",
      table: {
        headers: ["Channel", "Users (12–24)", "YoY change", "Note"],
        rows: [
          ["HA psychiatric OPD (new)", "6,420", "+9%", "Long wait; high DNA rate 18%"],
          ["NGO purchased counselling", "11,860", "+22%", "Contracts near full utilisation"],
          ["School counselling contacts", "94,300", "+15%", "Often 1 counsellor : 800+ students"],
          ["24-hr crisis hotline", "38,100", "+28%", "Peak after exam periods"],
        ],
      },
    },
    {
      id: "C",
      title: "Youth Mental Health Alliance (NGO coalition) — open letter extract",
      quote: [
        "Families are stuck between a two-year specialist queue and schools that can only offer short supportive talks. We need funded community stepped care within 4 weeks of referral, not another app that dumps severe cases back onto overloaded NGOs without clinical backup.",
      ],
      bullets: [
        "Demand ring-fenced purchase-of-service (POS) for counselling and family support in every district.",
        "Oppose diverting all growth to digital-only channels for moderate/severe cases.",
        "Ask for clear escalation pathways from schools and NGOs into HA within 14 days for high-risk youth.",
      ],
    },
    {
      id: "D",
      title: "Parents’ Concern Group & private-sector note",
      bullets: [
        "Middle-income parents report HK$800–1,500 per private psychology session; many drop out after 3–4 visits.",
        "Chamber of Private Clinics warns that expanding NGO POS without quality audits risks uneven standards.",
        "Some parent groups prefer new HA youth clinics over ‘outsourcing care’.",
      ],
    },
    {
      id: "E",
      title: "Treasury / Financial Services Bureau note (Oct 2026)",
      bullets: [
        "Additional recurrent spending above HK$350 million a year for new HA specialist posts faces strong resistance this fiscal cycle.",
        "Time-limited capital or one-off digital platform spend of HK$80–120 million over three years is more acceptable if recurrent add-ons stay below HK$200 million.",
        "POS expansion of ~HK$120–160 million recurrent is preferred to permanent specialist headcount if outcomes and unit costs are published.",
        "Any school counsellor ratio reform must show phased district pilots and measurable wait-time KPIs.",
      ],
    },
    {
      id: "F",
      title: "Internal options paper (Health Branch, Oct 2026)",
      options: [
        {
          name: "Option 1 — Scale NGO purchase-of-service + district hubs",
          text: "Add ~HK$140 million recurrent POS for counselling, peer support and family work; co-locate ‘youth hubs’ in 8 districts with social workers and visiting psychiatric nurses. Fastest capacity lift; depends on NGO workforce and quality control.",
        },
        {
          name: "Option 2 — New HA youth psychiatric clinics (4 clusters)",
          text: "Create dedicated youth clinics aiming to cut specialist waits. Strong clinical brand and parent preference. High recurrent cost (~HK$280–320 million) and 3–5 year recruitment lag for psychiatrists.",
        },
        {
          name: "Option 3 — Digital stepped-care platform + school counsellor boost",
          text: "Guided self-help / chat triage app (capital ~HK$90 million) plus hire 120 additional school counsellors over 3 years (~HK$95 million recurrent when fully staffed). Good for mild cases; Alliance fears dumping of complex cases without escalation.",
        },
      ],
      closing:
        "Bureau note: a hybrid (POS hubs for moderate need + limited HA sessions for high risk + carefully gated digital/school front door) may fit Doc E better than Option 2 alone.",
    },
    {
      id: "G",
      title: "Education Bureau staffing snapshot (2025/26)",
      bullets: [
        "Average secondary school counsellor ratio: 1 : 820 students (target previously floated: 1 : 400).",
        "Only 38% of schools report a written escalation protocol to HA / SWD for high-risk students.",
        "Exam-season spike: counselling appointment requests rise ~45% in April–June.",
      ],
    },
  ],
  learnPoints: [
    "**開場定 criteria**：縮短有效介入時間、保護高風險、控經常開支 — 後面 weighing 圍住呢三條。",
    "**兩個問題要「現象 → 邊啲人 → 點解急」**：輪候／缺口用 Doc A–B 數字，唔好抄背景散文。",
    "**Option 比較**：同一套 criteria 打；主動回應 Doc C（怕純數碼）同 Doc E（經常開支上限）。",
    "**推薦要組合 + 落地**：邊個做、分階段、pilot 區、2–3 個 KPI；同財政信封對齊。",
    "**結尾短**：殘餘風險一句，唔再開新題。",
  ],
  model: {
    to: "Permanent Secretary, Labour and Welfare Bureau",
    from: "[AO]",
    subject: "Youth mental-health access — problems and recommended package",
    date: "26 October 2026",
    sections: [
      {
        h: "1. Opening",
        html: "<p>Youth mental-health demand has outpaced specialist and school capacity, leaving long waits and weak escalation. Any response should shorten time to appropriate care for moderate and high-risk cases, protect the most vulnerable, and stay within tight recurrent limits.</p>",
      },
      {
        h: "2. Two major problems and implications",
        html:
          "<p><strong>Problem 1 — Specialist and community queues that leave distress untreated for months.</strong><br>Non-urgent youth psychiatric outpatient waits lengthened from 42 to 68 weeks (2022–2025), while NGO counselling still averages 11–18 weeks and contracts are near full (Docs A, B). Implications are clinical and fiscal: delayed care raises crisis hotline and A&amp;E pressure (+24% tagged attendances), and DNA rates of 18% waste scarce slots.</p>" +
          "<p><strong>Problem 2 — Thin school front door and unclear escalation for high-risk students.</strong><br>Counsellor ratios average 1:820 against a floated 1:400 target; only 38% of schools have written escalation protocols (Doc G). Combined with a rise in moderate-to-severe distress screens (14%→19%), schools absorb volume they cannot safely hold. The implication is a <strong>safety and equity gap</strong>: exam-season spikes and uneven private affordability (Doc D) push risk onto families least able to pay.</p>",
      },
      {
        h: "3. Comparison of options",
        html:
          "<p><strong>Option 1 (POS + district hubs)</strong> scores highest on near-term capacity and cost fit: ~HK$140 million recurrent sits inside Treasury’s preference for POS over large HA headcount (Docs E, F). It answers Alliance demand for community stepped care, but needs quality audits and psychiatric-nurse backup so severe cases are not stranded.</p>" +
          "<p><strong>Option 2 (new HA youth clinics)</strong> matches parent preference and clinical branding, yet ~HK$280–320 million recurrent and multi-year recruitment clash with Doc E. It should be a longer-term complement, not the Year-1 centrepiece.</p>" +
          "<p><strong>Option 3 (digital + school counsellors)</strong> helps mild cases and front-door access (capital ~HK$90 million; ~HK$95 million recurrent when staffed) but, as Doc C warns, fails if complex cases lack a 14-day escalation path into HA. Alone it does not cut 68-week specialist waits.</p>",
      },
      {
        h: "4. Recommendation",
        html:
          "<p>Adopt a <strong>hybrid, sequenced package</strong> weighted to Option 1, with a gated slice of Option 3 and a limited HA high-risk track.</p>" +
          "<p><strong>Phase 1 (Years 1–2):</strong> Expand POS and open 8 district youth hubs with visiting psychiatric nurses; publish unit costs and outcomes. Require every secondary school to adopt a written escalation protocol; pilot counsellor ratio improvement in the 2 new-town districts with longest NGO waits. Launch a digital triage / guided self-help front door <em>only</em> for mild cases, with automatic flagging to hubs/HA for high risk within 14 days.</p>" +
          "<p><strong>Phase 2 (Years 3–5):</strong> Add targeted HA youth sessions where hub data show persistent specialist bottlenecks — not four full new clinics up front.</p>" +
          "<p><strong>KPIs:</strong> (i) median time from school/NGO referral to first appropriate session for moderate cases; (ii) share of high-risk cases reaching HA within 14 days; (iii) POS spend vs outcomes and DNA rate at hubs.</p>",
      },
      {
        h: "5. Residual risks",
        html: "<p>NGO workforce shortages could slow hub rollout; digital triage must not become a dumping ground. Both should sit on a joint LWB–Health–EDB board with a mid-Phase-1 review.</p>",
      },
    ],
  },
});
