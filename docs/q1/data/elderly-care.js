/* Elderly community care Q1 pack — loaded by ../app.js */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "elderly-care-2026-10-28",
  title: "Elderly Community Care & Residential Waiting Lists · City of Jade",
  titleZh: "長者社區照顧／院舍輪候",
  tip: "先只睇 Data File，15 分鐘內 sort／highlight，自己寫完先睇範例。",
  task: {
    role: "You are an Administrative Officer in the Labour and Welfare Bureau of the City of Jade. The Permanent Secretary has asked you to prepare an internal discussion paper (about 500–800 words) for senior management.",
    bullets: [
      "Identify two major problems arising from strained elderly community and home-care services, and explain their implications; and",
      "Compare the main options already floated, then recommend feasible measures with concrete delivery arrangements.",
    ],
    note: "Write in clear formal English. Do not merely paraphrase background material. Use only the Data File.",
  },
  docs: [
    {
      id: "A",
      title: "Background brief — Social Welfare Department & Labour and Welfare Bureau (Sep 2026)",
      paras: [
        "City of Jade’s population aged 65+ is projected to rise from 1.52 million (2025) to about 1.78 million by 2031. Median waiting time for subsidised residential care home (RCHE) places lengthened from 37 months (2021) to 48 months (2025) for ordinary care-and-attention places; nursing-home waits average 52 months.",
        "Community care service (CCS) voucher and integrated home care services (IHCS) cover only about 41% of assessed frail elders still living at home who meet moderate-to-severe dependency criteria. Day care centre utilisation averages 94% in urban districts and 88% in new towns, with new-application waits of 6–11 months.",
      ],
      bullets: [
        "Informal carers: ~62% of primary carers of frail elders are adult children or spouses; 29% report cutting paid work hours.",
        "Emergency hospital admissions among community-dwelling frail elders tagged ‘care breakdown’: +17% (2023→2025).",
        "SWD estimates ~4,200 additional CCS / day-care places needed by 2029 to hold RCHE ordinary-place waits near current levels under base demand.",
      ],
    },
    {
      id: "B",
      title: "Service utilisation snapshot (SWD / HA interface, FY2024/25)",
      table: {
        headers: ["Channel", "Users / places", "YoY change", "Note"],
        rows: [
          ["Subsidised RCHE (ordinary C&A)", "28,400 places", "+2%", "Median wait 48 months"],
          ["CCS voucher active users", "19,760", "+11%", "Supply of accredited providers lagging"],
          ["IHCS / enhanced home care", "24,180", "+6%", "Peak evening slots full in 7 districts"],
          ["Day care centre (subsidised)", "8,920 places", "+4%", "Utilisation 88–94%"],
          ["Carer support / respite nights", "61,400 nights", "+9%", "Still <0.4 night per carer-month"],
        ],
      },
    },
    {
      id: "C",
      title: "Alliance for Ageing in Place (NGO / carer coalition) — open letter extract",
      quote: [
        "Families cannot ‘age in place’ on slogans while home-care teams stop at 6 p.m. and respite is rationed. Expand community care vouchers and purchase-of-service with evening and weekend coverage, and fund carer respite as a core service—not an afterthought—before pouring every dollar into new residential blocks that take five years to build.",
      ],
      bullets: [
        "Demand ring-fenced POS for home care, day care and carer respite in every district cluster.",
        "Oppose treating residential expansion as the sole answer to community-care shortfalls.",
        "Ask for a 14-day emergency respite pathway when carers are hospitalised or collapse.",
      ],
    },
    {
      id: "D",
      title: "District Councils / private RCHE operators’ note",
      bullets: [
        "Private RCHE fees for moderate care often HK$18,000–28,000/month; many middle-income families deplete savings within 18–24 months.",
        "Operators warn that rapid CCS voucher expansion without workforce training and quality audits risks uneven standards and ‘paper providers’.",
        "Some district voices prefer more subsidised RCHE places over ‘outsourcing care to the market’.",
      ],
    },
    {
      id: "E",
      title: "Treasury / Financial Services Bureau note (Oct 2026)",
      bullets: [
        "Additional recurrent spending above HK$900 million a year for new subsidised RCHE places faces strong resistance this fiscal cycle (land, works and staffing lag).",
        "Time-limited capital for day-care fit-out or smart-home aids of HK$150–220 million over three years is more acceptable if recurrent add-ons stay below HK$450 million.",
        "CCS voucher / POS expansion of ~HK$280–360 million recurrent is preferred to large permanent RCHE headcount if unit costs, quality scores and carer outcomes are published.",
        "Any carer-allowance uplift must be targeted, time-bound pilots with clear exit and fraud controls.",
      ],
    },
    {
      id: "F",
      title: "Internal options paper (Welfare Branch, Oct 2026)",
      options: [
        {
          name: "Option 1 — Scale community care vouchers + POS (home / day care)",
          text: "Add ~HK$320 million recurrent for CCS vouchers and purchased home/day-care places, with evening/weekend sessions in 10 high-wait districts. Fastest capacity for ageing-in-place; depends on accredited workforce and quality control.",
        },
        {
          name: "Option 2 — Accelerate subsidised residential care places",
          text: "Bring forward ~2,400 additional subsidised RCHE places via purchase and new contract homes. Strong public brand and eases 48-month waits. High recurrent cost (~HK$720–850 million when fully open) and 4–6 year delivery lag for purpose-built homes.",
        },
        {
          name: "Option 3 — Discharge planning + respite hybrid (limited new RCHE)",
          text: "Joint HA–SWD discharge planning for frail elders, means-tested carer allowance pilot (~8,000 carers, ~HK$110 million), 400 ring-fenced respite places with a 14-day emergency pathway (~HK$90 million), plus a limited tranche of new/contract RCHE places for high-dependency overflow. Cuts bed-blocking and carer burnout; alone does not create enough daily community-care hours.",
        },
      ],
      closing:
        "Bureau note: a hybrid (voucher/POS for daily community care + targeted respite/carer support + a limited residential pipeline for high-dependency cases) may fit Doc E better than Option 2 alone.",
    },
    {
      id: "G",
      title: "Workforce & quality snapshot (SWD, 2025/26)",
      bullets: [
        "Vacancy rate among subsidised home-care workers: 14% urban, 19% new towns; average case-load 1 worker : 9–11 clients.",
        "Only 44% of districts report a written emergency respite protocol for carer hospitalisation.",
        "Accredited CCS voucher providers grew 7% YoY vs 11% growth in active voucher users — supply lag widening.",
      ],
    },
  ],
  learnPoints: [
    "**開場定 criteria**：縮短有效照顧到位時間、減輕照顧者崩潰、控經常開支 — 後面 weighing 圍住呢三條。",
    "**兩個問題要「現象 → 邊啲人 → 點解急」**：輪候／缺口用 Doc A–B 數字，唔好抄背景散文。",
    "**Option 比較**：同一套 criteria 打；主動回應 Doc C（怕淨係起院舍）同 Doc E（經常開支上限）。",
    "**推薦要組合 + 落地**：邊個做、分階段、pilot 區、2–3 個 KPI；同財政信封對齊。",
    "**結尾短**：殘餘風險一句（人手／質素），唔再開新題。",
  ],
  model: {
    to: "Permanent Secretary, Labour and Welfare Bureau",
    from: "[AO]",
    subject: "Elderly community care capacity — problems and recommended package",
    date: "28 October 2026",
    sections: [
      {
        h: "1. Opening",
        html: "<p>Community and home-care capacity for frail elders has not kept pace with population ageing, leaving long residential waits and thin evening/respite cover. Any response should shorten time to appropriate community support, reduce carer-breakdown risk, and stay within tight recurrent limits.</p>",
      },
      {
        h: "2. Two major problems and implications",
        html:
          "<p><strong>Problem 1 — Community care and day-care queues that force premature residential demand.</strong><br>CCS vouchers and IHCS reach only about 41% of assessed moderate-to-severe home-dwelling frail elders; day-care utilisation sits at 88–94% with 6–11 month waits, while ordinary RCHE waits have stretched to 48 months (Docs A, B). Implications are clinical and fiscal: care-breakdown admissions rose 17%, and unresolved community gaps push families toward high-cost private RCHEs (HK$18,000–28,000/month) or unsafe DIY care.</p>" +
          "<p><strong>Problem 2 — Carer strain with thin respite and weak emergency pathways.</strong><br>About 62% of primary carers are family members; 29% cut paid work, yet respite supply remains under 0.4 night per carer-month and only 44% of districts have written emergency protocols (Docs A, B, G). The implication is a <strong>workforce and equity gap</strong>: when carers collapse, hospitals absorb avoidable admissions and lower-income households cannot buy substitute care (Doc D).</p>",
      },
      {
        h: "3. Comparison of options",
        html:
          "<p><strong>Option 1 (CCS vouchers + POS home/day care)</strong> scores highest on near-term capacity and cost fit: ~HK$320 million recurrent sits inside Treasury’s preference for voucher/POS over large RCHE headcount (Docs E, F). It answers the Alliance call for ageing in place with evening/weekend cover, but needs workforce training and quality audits so ‘paper providers’ do not dilute standards (Docs D, G).</p>" +
          "<p><strong>Option 2 (accelerate subsidised RCHE)</strong> eases the 48-month brand-name wait and suits high-dependency cases, yet ~HK$720–850 million recurrent and multi-year works lag clash with Doc E. It should be a parallel pipeline for the most dependent, not the Year-1 centrepiece for community shortfalls.</p>" +
          "<p><strong>Option 3 (discharge planning + respite + limited RCHE)</strong> eases hospital bed-blocking and carer burnout (~HK$200 million for allowance/respite, plus a thin residential overflow) and supplies the 14-day emergency pathway Doc C demands, but alone does not create enough daily community-care hours. It is a necessary complement to Option 1, not a substitute.</p>",
      },
      {
        h: "4. Recommendation",
        html:
          "<p>Adopt a <strong>hybrid, sequenced package</strong> weighted to Option 1, with a firm Option 3 discharge/respite track and a limited Option 2 residential pipeline for high-dependency cases.</p>" +
          "<p><strong>Phase 1 (Years 1–2):</strong> Expand CCS vouchers and POS home/day care in the 10 highest-wait districts, mandating evening/weekend sessions; publish unit costs and quality scores. Stand up joint HA–SWD discharge planning for frail elders; launch the means-tested carer-allowance pilot (~8,000 carers) and ring-fence emergency respite with a 14-day pathway when carers are hospitalised. Require every district cluster to adopt a written emergency respite protocol.</p>" +
          "<p><strong>Phase 2 (Years 3–5):</strong> Add targeted subsidised RCHE / contract-home places where community data show persistent high-dependency overflow — not a territory-wide residential surge up front. Grow accredited voucher providers at least in line with voucher uptake.</p>" +
          "<p><strong>KPIs:</strong> (i) median wait from assessment to first appropriate CCS/day-care session; (ii) share of carer-hospitalisation cases accessing emergency respite within 14 days; (iii) voucher/POS spend vs quality scores, vacancy rates and care-breakdown admissions.</p>",
      },
      {
        h: "5. Residual risks",
        html: "<p>Home-care vacancies (14–19%) could slow POS rollout; voucher growth without audits risks uneven quality. Both should sit on a joint LWB–SWD board with a mid-Phase-1 review.</p>",
      },
    ],
  },
});
