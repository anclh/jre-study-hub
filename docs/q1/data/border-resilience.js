/* Border resilience / peak crowd response Q1 pack — loaded by ../app.js */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "border-resilience-2026-10-29",
  title: "Border Resilience & Peak Crowd Response · City of Jade",
  titleZh: "口岸韌性／跨境高峰應變",
  tip: "先只睇 Data File，15 分鐘內 sort／highlight，自己寫完先睇範例。",
  task: {
    role: "You are an Administrative Officer seconded to the Cross-Boundary Coordination Office jointly supported by the Security Bureau and the Transport and Logistics Bureau of the City of Jade. The Permanent Secretary (Security) has asked you to prepare an internal discussion paper (about 500–800 words) for senior management ahead of a Chief Secretary–chaired peak-response debrief.",
    bullets: [
      "Identify two major problems arising from ad hoc peak-crowd mobilisation at a major land boundary control point, and explain their implications; and",
      "Compare the main options already floated, then recommend feasible measures with concrete delivery arrangements (who / when / resources / KPIs).",
    ],
    note: "Write in clear formal English. Do not merely paraphrase background material. Use only the Data File.",
  },
  docs: [
    {
      id: "A",
      title: "Background brief — Security Bureau & Transport and Logistics Bureau (Oct 2026)",
      paras: [
        "Northgate Land Boundary Control Point (NLBCP) is City of Jade’s busiest land port. Illustrative daily passenger throughput on ordinary weekdays is about 118,000; festival and long-weekend peaks regularly exceed 210,000. With Northern Metropolis new towns and the one-hour living circle, cross-boundary commuting has become more everyday, so peak windows are more frequent than a decade ago.",
        "Over the Halloween window (30 Oct–1 Nov 2025), NLBCP activated a one-off cross-bureau mobilisation. Clearance and public-transport diversion largely held, but command chains, trigger thresholds, and published ‘smoothness’ metrics were not standardised for reuse.",
      ],
      bullets: [
        "NLBCP share of City land-boundary passenger trips (2025): ~41%.",
        "Cross-boundary weekday trips with Northern Metropolis origin/destination: up ~28% vs 2022 (illustrative).",
        "Freight vs passenger channel split at NLBCP: dedicated freight lanes handle ~9,400 vehicle movements/day; passenger halls are the binding constraint on festival nights.",
      ],
    },
    {
      id: "B",
      title: "Peak window snapshot — NLBCP (30 Oct–1 Nov 2025, illustrative)",
      table: {
        headers: ["Metric", "Ordinary Sat peak", "Halloween window peak", "Note"],
        rows: [
          ["Passenger throughput (3-day)", "~340,000", "~612,000", "+80% vs ordinary weekend block"],
          ["Immigration clearance P50 wait", "18 min", "47 min", "Hall B outbound worst"],
          ["Immigration clearance P90 wait", "35 min", "112 min", "Exceeds informal 60-min comfort band"],
          ["Bus / rail diversion on-time", "91%", "74%", "Last-mile coaches most delayed"],
          ["Overtime hours (Immigration + Police + TD)", "baseline", "+18,400 hrs", "Much of it unplanned roster stretch"],
          ["Staffing gap vs planned surge roster", "—", "12% short", "Leave + concurrent events"],
        ],
      },
    },
    {
      id: "C",
      title: "Northgate District Council / traveller groups — open letter extract",
      quote: [
        "Residents and frequent cross-boundary workers accept festival crowds, but not opaque waiting and last-minute coach diversions announced only on social media. Publish wait-time percentiles and diversion plans before the peak, name who can authorise on-site changes within minutes, and stop treating every holiday as a surprise.",
      ],
      bullets: [
        "Demand standing contingency arrangements with published smoothness KPIs (P50/P90 wait; diversion on-time).",
        "Oppose relying solely on celebrity one-off mobilisation without a reusable SOP.",
        "Ask for 72-hour post-peak public briefings after major windows.",
      ],
    },
    {
      id: "D",
      title: "Frontline / department notes (Immigration, Police, Transport Department)",
      bullets: [
        "Immigration warns that compressing P90 waits without surge booths and roster buffers risks clearance quality and staff safety.",
        "Police note that crowd diversion works only when transport partners pre-position coaches/rail relief before queues form outside the hall.",
        "Transport Department can divert, but last-mile capacity and park-and-ride fill within 90 minutes if messaging starts after P50 already exceeds 40 minutes.",
        "Co-location arrangement at a sister port reduces dual checks for some travellers, but NLBCP’s dual-hall layout still creates outbound bottlenecks on festival nights.",
      ],
    },
    {
      id: "E",
      title: "Treasury / Efficiency Unit note (Oct 2026)",
      bullets: [
        "One-off overtime packages after each festival are harder to defend than a capped annual peak-response envelope with clear triggers.",
        "Time-limited funding of about HK$45–60 million over two years for roster buffers, temporary booths, and real-time wait displays is more acceptable if recurrent headcount stays lean.",
        "Prefer institutionalising SOPs and publishing KPIs over permanent new posts without workload evidence.",
        "Any CS-level standing coordination cell should be light-touch: activate on triggers, not a new permanent bureaucracy.",
      ],
    },
    {
      id: "F",
      title: "Internal options paper (Cross-Boundary Coordination Office, Oct 2026)",
      options: [
        {
          name: "Option 1 — Continue festival-by-festival mobilisation",
          text: "Retain ad hoc Security + Transport & Logistics surge teams when forecasts spike. Low design cost; repeats Halloween-window friction (unclear on-site discretion, late diversion, no published KPIs).",
        },
        {
          name: "Option 2 — Standing peak-response SOP + smoothness KPIs",
          text: "Codify triggers (e.g. forecast >180,000/day or P50 >30 min), a short command chain with on-site discretion, pre-booked diversion capacity, and public P50/P90 + diversion on-time KPIs with 72-hour post-peak briefs. Needs drill calendar and modest capital for displays/temporary booths (~HK$50m / 2 years).",
        },
        {
          name: "Option 3 — Infrastructure-first expansion only",
          text: "Accelerate hall expansion and extra rail/coach berths at NLBCP (~multi-year capital). Addresses structural throughput but does not fix near-term festival windows or command clarity; alone leaves 2026–27 peaks exposed.",
        },
      ],
      closing:
        "Office note: a hybrid of Option 2 with selective Option 3 planning (berth/display quick wins) fits Doc E better than Option 1, and answers Doc C’s demand for reusable smoothness metrics without waiting for full hall expansion.",
    },
    {
      id: "G",
      title: "Delivery & drill snapshot (internal, 2025/26)",
      bullets: [
        "Only 2 of 5 major land ports have a written peak-crowd SOP with named on-site decision-makers.",
        "Average time from P50 breach (>40 min) to public diversion notice: 52 minutes (target informal: 15).",
        "Post-peak public KPI brief published within 72 hours: 0 of 4 major 2025 holiday windows.",
      ],
    },
  ],
  learnPoints: [
    "**開場定 criteria**：縮短可預見高峰輪候、清晰指揮／現場授權、可公布暢順 KPI、控經常開支 — weighing 圍住呢幾條。",
    "**兩個問題要「現象 → 邊啲人 → 點解急」**：用 Doc B／G 數字（P50/P90、疏導準點、SOP 覆蓋），唔好抄口號。",
    "**Option 比較**：同一套 criteria；主動回應 Doc C（要制度化＋KPI）同 Doc E（唔想每次 overtime 包／新常額）。",
    "**推薦要組合 + 落地**：邊個局／辦公室、觸發條件、演練月曆、2–3 個 KPI（P50/P90、疏導準點、72h brief）。",
    "**結尾短**：殘餘風險一句（查驗質素／現場彈性），唔再開新題。",
  ],
  model: {
    to: "Permanent Secretary, Security Bureau (copy: Permanent Secretary, Transport and Logistics Bureau)",
    from: "[AO]",
    subject: "Northgate peak-crowd response — problems and recommended standing arrangements",
    date: "29 October 2026",
    sections: [
      {
        h: "1. Opening",
        html: "<p>Festival peaks at Northgate Land Boundary Control Point are no longer rare shocks: everyday cross-boundary travel linked to the Northern Metropolis makes high-throughput windows more frequent. Any response should cut foreseeable waits, clarify who decides on site, publish measurable smoothness indicators, and stay within a capped peak-response envelope.</p>",
      },
      {
        h: "2. Problems and implications",
        html: "<p><strong>Ad hoc mobilisation without reusable command rules.</strong> The Halloween window pushed three-day throughput to about 612,000 and P90 waits to 112 minutes, while diversion notices lagged P50 breaches by roughly 52 minutes and overtime jumped by over 18,000 hours (Docs B, G). Implications: frequent travellers and district residents face opaque queues; frontline staff absorb unplanned roster stretch; political trust in ‘smooth clearance’ erodes when every holiday is improvised.</p><p><strong>No published smoothness KPIs or standing SOP coverage.</strong> Only two of five major land ports have a written peak-crowd SOP with named decision-makers, and none of the four major 2025 holiday windows issued a 72-hour public KPI brief (Doc G). Implications: CS-level coordination stays reactive; Transport diversion starts after queues already spill outside halls; Treasury faces repeated one-off overtime claims instead of a trigger-based envelope (Doc E).</p>",
      },
      {
        h: "3. Options",
        html: "<p><strong>Option 1</strong> (festival-by-festival mobilisation) is familiar but recreates Halloween-window friction and fails Doc C’s demand for reusable metrics. <strong>Option 2</strong> (standing SOP + smoothness KPIs + short command chain) best matches wait reduction, clarity, and Treasury comfort, though it needs drills and modest display/booth spend. <strong>Option 3</strong> (infrastructure-first expansion) helps structural capacity but leaves 2026–27 peaks exposed. A hybrid of Option 2 with selective quick-win berth/display works from Option 3 fits the criteria best.</p>",
      },
      {
        h: "4. Recommendation",
        html: "<p>Institutionalise a standing peak-response SOP for NLBCP: forecast/P50 triggers, a short command chain with on-site discretion for Immigration/Police/TD leads, and pre-booked coach–rail diversion. Security Bureau and Transport and Logistics Bureau to own day-to-day execution; Chief Secretary’s Office to convene only when triggers escalate. Publish P50/P90 wait and diversion on-time KPIs, with a public brief within 72 hours after each major window. Fund a two-year capped envelope (~HK$50 million) for roster buffers, temporary booths, and real-time wait displays rather than open-ended posts. Phase: issue SOP and drill calendar within eight weeks; pilot on the next three holiday peaks; review at 12 months against P90 comfort bands, diversion notice latency, and overtime vs envelope.</p>",
      },
      {
        h: "5. Closing",
        html: "<p>Residual risk is over-compressing waits at the expense of clearance quality, or over-centralising decisions; mitigate by retaining on-site discretion within the SOP and pairing KPIs with safety/quality checks—not speed alone.</p>",
      },
    ],
  },
});
