/* New industrialisation / I&T early adoption Q1 pack — loaded by ../app.js */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "new-industrial-2026-10-29",
  title: "New Industrialisation & I&T Early Adoption · City of Jade",
  titleZh: "新型工業化／創科落地",
  tip: "先只睇 Data File，15 分鐘內 sort／highlight，自己寫完先睇範例。",
  task: {
    role: "You are an Administrative Officer in the Innovation and Technology Bureau of the City of Jade. The Permanent Secretary has asked you to prepare an internal discussion paper (about 500–800 words) for senior management.",
    bullets: [
      "Identify two major problems arising from weak early adoption and uneven industrialisation of applied research, and explain their implications; and",
      "Compare the main options already floated, then recommend feasible measures with concrete delivery arrangements.",
    ],
    note: "Write in clear formal English. Do not merely paraphrase background material. Use only the Data File.",
  },
  docs: [
    {
      id: "A",
      title: "Background brief — Innovation and Technology Bureau & Trade and Industry Department (Sep 2026)",
      paras: [
        "City of Jade has run a New Industrialisation Funding Scheme since late 2024 and a New Industry Acceleration Scheme for scale-up projects. Illustrative ceilings cited in Bureau materials are about HK$2.8 million for early-stage factory/smart-line upgrades and about HK$15 million for acceleration-class projects with co-investment.",
        "Despite open calls, early adoption of advanced manufacturing tools among SMEs remains patchy: many awards fund equipment purchase, while scene validation on live production lines and post-grant commercialisation are weakly tracked.",
      ],
      bullets: [
        "Applied research outputs from public labs: ~1,140 disclosures (2025); licensing deals closed: 86 (~7.5%).",
        "SME manufacturers reporting any Industry 4.0 line in regular use: 18% (urban) vs 9% (new towns).",
        "Talent retained in subsidised I&T posts 18 months after hire: 61%; outflow often to the Mainland or finance.",
      ],
    },
    {
      id: "B",
      title: "Scheme utilisation snapshot (ITB / TID, FY2024/25–FY2025/26 YTD)",
      table: {
        headers: ["Channel", "Awards / projects", "Disbursed", "Note"],
        rows: [
          ["New Industrialisation Funding (small)", "412 awards", "HK$0.78 bn", "Avg ~HK$1.9m; uptake below projected SME slots"],
          ["New Industry Acceleration", "47 projects", "HK$0.41 bn", "Co-investment required; 11 delayed on scene validation"],
          ["Shared pilot-plant / demo-line bookings", "1,860 days", "—", "Wait 3–7 months in peak sectors"],
          ["Technology transfer office licences", "86 deals", "—", "Median time disclosure→licence: 19 months"],
          ["I&T talent subsidy exits (18m)", "39%", "—", "Retention KPI not yet published by firm size"],
        ],
      },
    },
    {
      id: "C",
      title: "Jade Manufacturers Alliance (SME chamber) — open letter extract",
      quote: [
        "Schemes exist on paper, but disbursement is slow, forms still favour firms with consultants, and nobody checks whether machines run after the photo-op. Tie the next tranche to scene validation and shared pilot-plant hours, not higher ceilings alone—and publish uptake by firm size so micro-firms are not left behind.",
      ],
      bullets: [
        "Demand milestone-based disbursement and published uptake/retention dashboards.",
        "Oppose raising headline grant ceilings without co-investment and quality checks.",
        "Ask for ring-fenced shared pilot-plant capacity for micro and small manufacturers.",
      ],
    },
    {
      id: "D",
      title: "University / R&D lab directors’ note",
      bullets: [
        "Labs warn that pushing commercialisation KPIs without IP clarity and industry co-investment produces ‘forced licences’ with little factory uptake.",
        "Some directors prefer more basic research funding over industrialisation grants.",
        "Cross-boundary talent and equipment movement still faces procedural friction for joint trials.",
      ],
    },
    {
      id: "E",
      title: "Treasury / Financial Services Bureau note (Oct 2026)",
      bullets: [
        "Further permanent expansion of grant ceilings beyond current envelopes faces resistance this cycle.",
        "Time-limited top-ups of HK$180–250 million over three years for shared pilot plants and scene-validation audits are more acceptable if recurrent admin stays lean.",
        "Prefer reallocating underspent award slots and linking disbursement to verified milestones over new open-ended headcount.",
        "Any talent-retention top-up must be time-bound with clear exit and clawback rules.",
      ],
    },
    {
      id: "F",
      title: "Internal options paper (Industry Branch, Oct 2026)",
      options: [
        {
          name: "Option 1 — Raise grant ceilings and simplify forms",
          text: "Lift small-scheme ceilings toward ~HK$3.5m and cut application fields by ~30%. Fast political signal; risks soft-money awards without better scene validation or co-investment.",
        },
        {
          name: "Option 2 — Milestone disbursement + shared pilot plants",
          text: "Keep ceilings near current levels (~HK$2.8m / ~HK$15m class) but release 40% of funds only after verified scene validation; add shared pilot-plant capacity (~HK$200m capital over 3 years). Stronger delivery quality; needs audit capacity and may slow headline award counts.",
        },
        {
          name: "Option 3 — Talent retention + tech-transfer hybrid",
          text: "18–24 month retention covenants and housing/career top-ups for subsidised I&T hires (~HK$90m pilot), plus TTO licensing KPIs and SME matchmaking. Addresses outflow and weak licensing; alone does not fix factory-floor early adoption gaps.",
        },
      ],
      closing:
        "Bureau note: a hybrid (milestone disbursement + shared pilot capacity + targeted retention/TTO KPIs) may fit Doc E better than Option 1 alone, and answers Doc C’s ‘policy without delivery’ critique.",
    },
    {
      id: "G",
      title: "Delivery & audit snapshot (ITB internal, 2025/26)",
      bullets: [
        "Only 34% of small-scheme awardees have a documented post-install scene-validation visit within 9 months.",
        "Average time from award letter to first disbursement: 5.2 months (target 3).",
        "Micro-firm (<20 staff) share of awards: 22% vs 41% of eligible manufacturing stock.",
      ],
    },
  ],
  learnPoints: [
    "**開場定 criteria**：提高真實早期採用／場景驗證、加強商業化與人才留任、控經常開支 — weighing 圍住呢三條。",
    "**兩個問題要「現象 → 邊啲人 → 點解急」**：用 Doc A–B／G 數字（吸納、撥款、驗證覆蓋），唔好抄口號。",
    "**Option 比較**：同一套 criteria；主動回應 Doc C（怕淨加上限）同 Doc E（唔想永久加碼）。",
    "**推薦要組合 + 落地**：邊個局／署、分階段、pilot 行業、2–3 個 KPI（驗證率、吸納 by firm size、18m retention）。",
    "**結尾短**：殘餘風險一句（審計／人手），唔再開新題。",
  ],
  model: {
    to: "Permanent Secretary, Innovation and Technology Bureau",
    from: "[AO]",
    subject: "New industrialisation early adoption — problems and recommended package",
    date: "29 October 2026",
    sections: [
      {
        h: "1. Opening",
        html: "<p>Grant schemes for new industrialisation exist, yet early adoption on the factory floor, scene validation after award, and talent retention remain uneven. Any response should raise verified uptake among SMEs, strengthen commercialisation pathways, and stay within tight recurrent limits.</p>",
      },
      {
        h: "2. Problems and implications",
        html: "<p><strong>Weak post-award validation.</strong> Only about one-third of small-scheme awardees receive a documented scene-validation visit within nine months, while first disbursement averages over five months (Docs B, G). Implications: public money may fund equipment that sits idle; micro-firms (22% of awards vs 41% of stock) fall further behind; political trust in ‘I&amp;T delivery’ erodes.</p><p><strong>Thin commercialisation and retention.</strong> Licensing closes on roughly 7.5% of disclosures, and 39% of subsidised I&amp;T hires exit by 18 months (Doc A). Implications: lab gains stay off the line; co-investment stays hesitant; acceleration projects slip when talent leaves mid-pilot.</p>",
      },
      {
        h: "3. Options",
        html: "<p><strong>Option 1</strong> (higher ceilings / simpler forms) is visible but risks soft money without validation (Doc C, E). <strong>Option 2</strong> (milestone disbursement + shared pilot plants) best matches delivery criteria and Treasury comfort, though award counts may slow. <strong>Option 3</strong> (retention + TTO KPIs) tackles outflow and licensing but alone does not fix factory uptake. A hybrid of 2 with selected 3 elements fits the criteria best.</p>",
      },
      {
        h: "4. Recommendation",
        html: "<p>Adopt milestone-based disbursement (hold ~40% pending verified scene validation), expand shared pilot-plant capacity under the existing ~HK$2.8m / ~HK$15m class envelopes, and run a time-limited retention/TTO KPI pilot. ITB to publish uptake and 18-month retention by firm size within six months; Trade and Industry Department to ring-fence micro-firm pilot-plant slots. Phase: Q1 design + audit protocol; Q2–Q3 pilot in two manufacturing clusters; review at 12–18 months against validation coverage, micro-firm uptake, and retention KPIs.</p>",
      },
      {
        h: "5. Closing",
        html: "<p>Residual risk is audit capacity and short-term slower headline awards; mitigate with a small dedicated validation team rather than new open-ended grant ceilings.</p>",
      },
    ],
  },
});
