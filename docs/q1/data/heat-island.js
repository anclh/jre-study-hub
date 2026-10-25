/* Heat-island Q1 practice pack — loaded by ../app.js */
window.Q1_CASE_PACK = {
  id: "heat-island-2026-10-25",
  title: "Urban Heat Island · City of Jade",
  titleZh: "城市熱島／極端酷熱",
  tip: "先只睇 Data File，15 分鐘內 sort／highlight，自己寫完先睇範例。",
  task: {
    role: "You are an Administrative Officer in the Environment and Climate Bureau of the City of Jade. The Permanent Secretary has asked you to prepare an internal discussion paper (about 500–800 words) for senior management.",
    bullets: [
      "Identify two major problems arising from intensifying urban heat, and explain their implications; and",
      "Compare the main options already floated, then recommend feasible measures with concrete delivery arrangements.",
    ],
    note: "Write in clear formal English. Do not merely paraphrase background material. Use only the Data File.",
  },
  docs: [
    {
      id: "A",
      title: "Planning Department: Urban Heat Snapshot (extract, 2025)",
      paras: [
        "City of Jade’s built-up core has warmed faster than the New Territories fringe. Between 1995 and 2025, mean summer daytime temperature in dense urban districts rose by +2.1°C, versus +0.9°C in peri-urban areas (Planning Dept Urban Climate Monitoring Network).",
      ],
      bullets: [
        "Five “extreme heat corridors” (Old Town South, Harbourfront East, Industrial Belt West, Transit Hub North, Riverside Market) cover 18% of the urban population but account for 41% of heat-related ambulance call-outs in July–August 2025.",
        "Tree canopy cover in these five corridors averages 7.4%, against a city-wide average of 16.2% and a Government 2035 target of 20%.",
        "Over 62% of residential buildings in Old Town South and Riverside Market were completed before 1985 and lack central cooling or adequate insulation.",
        "Night-time temperatures in the five corridors remain ≥28°C for an average of 19 nights in July 2025 (up from 8 nights in July 2010).",
      ],
      closing:
        "Without intervention, “very hot days” (max ≥33°C) in the urban core are projected to rise from 42 days/year (2020–24 average) to 65–75 days/year by 2035 under a medium-emissions path.",
    },
    {
      id: "B",
      title: "Hospital Authority / Department of Health joint brief (Aug 2025)",
      paras: ["Heat-related morbidity has become a recurring summer pressure:"],
      table: {
        headers: ["Indicator", "Jul–Aug 2023", "Jul–Aug 2024", "Jul–Aug 2025"],
        rows: [
          ["A&E attendances coded heat illness / dehydration", "1,840", "2,310", "3,120"],
          ["Heat-related hospital admissions (age ≥65)", "410", "520", "710"],
          ["Excess all-cause deaths on days ≥33°C (est.)", "+4.2%", "+5.1%", "+6.8%"],
        ],
        highlightCol: 3,
      },
      bullets: [
        "Persons aged ≥65 and outdoor workers (construction, logistics, street cleansing) account for ~68% of heat-related A&E cases.",
        "Of elderly admissions in Jul–Aug 2025, 54% lived in pre-1985 walk-up or public rental blocks without air-conditioning in the main living area.",
        "Districts overlapping the five heat corridors show heat-admission rates 2.3× the city average.",
        "DH warns continued growth would strain summer A&E capacity and raise avoidable mortality — a reputational and duty-of-care risk for Government.",
      ],
    },
    {
      id: "C",
      title: "Letter from Jade Elderly Rights Alliance (NGO) (Sep 2025)",
      quote: [
        "We write on behalf of more than 40 neighbourhood elderly centres.",
        "Last summer, several of our members were admitted after nights when indoor temperature in their flats stayed above 30°C. Many cannot afford to run air-conditioners for long hours; electricity tariffs rose again this year. Cooling centres open only in the daytime and are often a bus ride away.",
        "We urge the Government to treat extreme heat as a public health emergency for the elderly, not merely an environmental amenity issue. Priority should go to: (i) targeted cooling support for low-income elderly in heat corridors; (ii) overnight shelter options during heatwaves; and (iii) greening and shade on the streets where elderly actually walk.",
        "Cosmetic tree-planting on main roads while side streets remain bare will not save lives.",
      ],
    },
    {
      id: "D",
      title: "Jade Chamber of Small Business: position note (Oct 2025)",
      paras: [
        "The Chamber represents ~12,000 SMEs, many in street-level retail and light industry within the five heat corridors.",
      ],
      bullets: [
        "Mandatory cool-roof / façade retrofit for commercial premises: upfront costs HK$80,000–250,000 per shop unit; many leaseholders cannot recover this within remaining lease terms.",
        "Daytime construction bans / restricted outdoor work hours: logistics SMEs estimate 8–15% revenue loss in peak summer if a hard midday stoppage is imposed without compensation.",
        "Greening that removes kerbside parking or narrows carriageways hurts footfall for small shops.",
        "Does not oppose voluntary incentives, shade on public land, or assistance for elderly — rejects one-size-fits-all mandates that transfer climate costs onto the smallest firms.",
      ],
      closing:
        "Asks that any package be phased, incentive-led where private costs arise, and piloted before city-wide rules.",
    },
    {
      id: "E",
      title: "Treasury Branch fiscal note (confidential extract, Oct 2025)",
      bullets: [
        "New recurrent spending above HK$400 million/year requires offsetting savings or LegCo-ready justifications.",
        "Capital envelope up to HK$1.8 billion over 5 years can be considered for heat-adaptation works if prioritised, shovel-ready, and measurable.",
        "Electricity subsidy expansions are sticky; Treasury prefers time-limited, means-tested, geographically targeted support.",
        "Any scheme creating new statutory duties must include enforcement resourcing — Environment Bureau building-climate enforcement headcount is thin.",
      ],
      closing:
        "Bottom line: prefer targeted capital + limited recurrent; sequence early years within the HK$1.8 bn capital envelope.",
    },
    {
      id: "F",
      title: "Options paper (Environment and Climate Bureau internal, Oct 2025)",
      options: [
        {
          name: "Option 1 — “Cool Corridors” capital programme",
          text: "Focus public works on the five extreme heat corridors: street trees / shade canopies, cool pavement pilots, pocket parks, and retrofitting selected public rental / elderly housing common areas. Estimated capital: HK$1.2–1.5 bn over 5 years. Limited new recurrent if maintenance absorbed by existing departments. Strong spatial targeting; slower relief for private indoor heat.",
        },
        {
          name: "Option 2 — Means-tested Heat Relief Subsidy + expanded cooling centres",
          text: "Summer electricity top-up for low-income elderly / CSSA households in heat corridors (~HK$180–220 m recurrent in a hot year), plus overnight cooling centres in community halls during heat warnings. Fast relief for vulnerable persons; does little to reduce the heat island; fiscal recurrent pressure (Doc E caution).",
        },
        {
          name: "Option 3 — Mandatory cool-roof / reflective façade + midday outdoor-work restrictions",
          text: "Strong long-run mitigation signal. High SME pushback (Doc D); enforcement capacity gap; legal and transition design needed. Could be softened to new buildings + major renovations first, with incentives for existing SMEs.",
        },
      ],
      closing:
        "Bureau note: a hybrid (targeted capital from Option 1 + tightly scoped relief from Option 2 + phased, non-punitive standards later) is also on the table, if it respects Doc E limits and addresses Doc D objections.",
    },
    {
      id: "G",
      title: "Labour Department / Construction Industry Council snapshot (Jul 2025)",
      bullets: [
        "On Very Hot Weather Warning days, reported heat stress incidents among construction workers rose 37% year-on-year (Jul 2025 vs Jul 2024).",
        "CIC survey: 71% of contractors support clearer rest-break guidance and shaded rest areas; only 22% support a blanket midday work stoppage without cost-sharing or schedule flexibility.",
        "Outdoor cleansing and delivery workers (often subcontracted) have weaker rest facilities than large construction sites.",
      ],
    },
  ],
  learnPoints: [
    "**開場一句定 criteria**：問題（極端熱）+ 目標（保脆弱群體健康、控財政、減對 SME 衝擊）— 後面 weighing 全部圍住呢三條。",
    "**兩個問題要「現象 → 邊啲人／錢／社會 → 點解急」**：唔好抄 Doc A 背景；用數字做證據，但每段只抽 1–2 個最有力嘅。",
    "**Option 比較係得分位**：同一套 criteria（效果／成本／持份者／可行性）逐個打；主動回應 Doc D 反對（強制 retrofit／午間停工），唔好當睇唔到。",
    "**推薦要「組合 + 落地」**：講邊個做、分階段、pilot 範圍、2–3 個 KPI；同 Doc E 財政上限對齊。",
    "**結尾短**：殘餘風險一句就夠，唔好再開新題。",
  ],
  model: {
    to: "Permanent Secretary, Environment and Climate Bureau",
    from: "[AO]",
    subject: "Intensifying urban heat in City of Jade — problems and recommended package",
    date: "25 October 2026",
    sections: [
      {
        h: "1. Opening",
        html: "<p>Extreme heat is concentrating in a few dense corridors and driving avoidable illness among elderly residents and outdoor workers. Any response should protect vulnerable groups, stay within tight fiscal limits, and avoid shifting disproportionate costs onto small firms.</p>",
      },
      {
        h: "2. Two major problems and implications",
        html:
          "<p><strong>Problem 1 — Spatially concentrated heat exposure with inadequate shade and overnight recovery.</strong><br>Five corridors hold 18% of the urban population but generated 41% of heat-related ambulance call-outs last July–August, while canopy cover there averages only 7.4% against a 16.2% city average (Doc A). Night-time temperatures stay at or above 28°C for many more nights than a decade ago, so bodies cannot recover. The implication is not even city-wide warming but a <strong>place-based public safety gap</strong>: without corridor-focused works, projected growth to 65–75 very hot days by 2035 will keep loading the same streets and the same ambulance routes.</p>" +
          "<p><strong>Problem 2 — Health and duty-of-care pressure on elderly and outdoor workers, with weak indoor coping.</strong><br>Heat-related A&amp;E attendances rose from 1,840 (Jul–Aug 2023) to 3,120 (2025); elderly admissions tracked the same climb, and about 68% of heat A&amp;E cases are aged ≥65 or outdoor workers (Doc B). Over half of elderly heat admissions lived in older blocks without adequate living-area cooling. NGOs report daytime-only cooling centres that are hard to reach, and construction heat incidents are up sharply (Docs C, G). Implications are fiscal and political as well as human: rising summer A&amp;E pressure, avoidable mortality among frail elderly, and reputational risk if Government is seen to treat heat as landscaping rather than health protection.</p>",
      },
      {
        h: "3. Comparison of options",
        html:
          "<p><strong>Option 1 (Cool Corridors capital programme)</strong> scores high on effectiveness against Problem 1: it puts trees, shade, cool surfaces and selected public-housing common-area upgrades where call-outs and low canopy coincide. Capital of about HK$1.2–1.5 billion over five years fits inside the HK$1.8 billion envelope Treasury can contemplate, with limited new recurrent cost if maintenance stays with existing departments (Docs E, F). Stakeholder fit is better than mandates: works are largely on public land. Feasibility risk is delivery speed and the fact that capital greening alone does little for private indoor heat tonight.</p>" +
          "<p><strong>Option 2 (means-tested heat relief + overnight cooling centres)</strong> maps cleanly onto Problem 2 and NGO demands (Doc C). It can cut electricity stress for low-income elderly in the corridors and offer overnight refuge during warnings. Effectiveness for acute vulnerability is high; effect on the heat island itself is low. Cost is the weakness: roughly HK$180–220 million recurrent in a hot year sits awkwardly against Treasury’s preference for time-limited, targeted support and its caution on new recurrent commitments above HK$400 million a year (Doc E). Feasible if tightly geographic, means-tested, and capped — not if framed as an open city-wide entitlement.</p>" +
          "<p><strong>Option 3 (mandatory cool roofs / façades + midday outdoor-work stoppages)</strong> has long-run mitigation logic but fails the near-term political and delivery test. SMEs cite retrofit costs of HK$80,000–250,000 per shop unit and 8–15% summer revenue loss from hard midday stoppages; only a minority of contractors support blanket stoppages without flexibility (Docs D, G). Enforcement capacity for building-related climate rules is already thin (Doc E). Imposing Option 3 city-wide now would invite sustained Chamber opposition and weak compliance, while delaying capital relief that corridors need this decade.</p>",
      },
      {
        h: "4. Recommendation",
        html:
          "<p>Adopt a <strong>hybrid, sequenced package</strong> weighted to Option 1, with a tightly scoped slice of Option 2, and defer hard mandates.</p>" +
          "<p><strong>Phase 1 (Years 1–2) — Pilot Cool Corridors in Old Town South and Riverside Market</strong> (highest elderly heat-admission overlap). Deliver shade canopies, street trees, cool pavement pilots, and efficient cooling / insulation upgrades in selected public rental and elderly-housing common areas. Open overnight cooling places in community halls on Very Hot Weather Warning nights. Launch a <strong>time-limited, means-tested summer electricity top-up</strong> only for low-income elderly / CSSA households inside the five corridors (cap and review after two summers). Issue enhanced rest-break and shaded-rest guidance for outdoor work with industry, rather than a blanket midday ban.</p>" +
          "<p><strong>Phase 2 (Years 3–5) — Scale corridor works to all five heat corridors</strong> within the HK$1.2–1.5 billion capital path. For private stock, start with <strong>incentives and standards for new buildings and major renovations only</strong>; revisit mandatory retrofit for existing SME premises only after pilot evidence and a funded transition scheme — directly addressing Doc D.</p>" +
          "<p><strong>Why this balance:</strong> it attacks the spatial driver (Problem 1) with capital that Treasury can fund, gives fast health protection where Doc B/C show harm (Problem 2), and avoids the SME collision and enforcement gap in full Option 3.</p>" +
          "<p><strong>KPIs (review after each summer):</strong><br>(i) heat-related A&amp;E rate in pilot corridors vs 2025 baseline;<br>(ii) share of pilot-corridor street length with continuous daytime shade / canopy;<br>(iii) take-up and fiscal outturn of the means-tested top-up (households helped; spend vs cap).</p>",
      },
      {
        h: "5. Residual risks",
        html: "<p>Delivery slippage on underground utilities could slow canopy works; overnight centres need clear staffing protocols. Both should be flagged in the Phase 1 project board. A full mandatory commercial retrofit remains a later lever, not a Year-1 centrepiece.</p>",
      },
    ],
  },
};
