/* SME digital transformation uptake Q1 pack — loaded by ../app.js */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "sme-digital-2026-10-26",
  title: "SME Digital Transformation Subsidy · City of Jade",
  titleZh: "中小企數碼轉型／資助吸納",
  tip: "先只睇 Data File，15 分鐘內 sort／highlight，自己寫完先睇範例。",
  task: {
    role: "You are an Administrative Officer in the Commerce and Economic Development Bureau of the City of Jade. The Permanent Secretary has asked you to prepare an internal discussion paper (about 500–800 words) for senior management.",
    bullets: [
      "Identify two major problems arising from weak SME digital uptake under the existing subsidy, and explain their implications; and",
      "Compare the main options already floated, then recommend feasible measures with concrete delivery arrangements.",
    ],
    note: "Write in clear formal English. Do not merely paraphrase background material. Use only the Data File.",
  },
  docs: [
    {
      id: "A",
      title: "Programme background — Innovation and Technology Commission (Sep 2026)",
      paras: [
        "The SME Digital Boost Scheme (launched 2023) offers matching grants up to HK$100,000 for approved digital tools (e-commerce, inventory, e-invoicing, basic cybersecurity). Cumulative applications: 14,200; approvals: 6,850; estimated eligible SMEs city-wide: ~110,000.",
        "Uptake is skewed: 61% of approvals went to firms with ≥20 staff; micro firms (<10 staff) account for 72% of the SME stock but only 24% of approvals.",
      ],
      bullets: [
        "Average time from application to first disbursement: 19 weeks (target: 10).",
        "About 34% of approved projects used third-party ‘grant consultants’; median consultant fee: 18% of grant.",
        "Post-grant survey (n=1,200): 41% still primarily use paper invoicing six months after project end.",
      ],
    },
    {
      id: "B",
      title: "Cybersecurity & payment incident snapshot (Police / HKMA liaison, 2025)",
      table: {
        headers: ["Issue", "SME reports 2025", "YoY", "Note"],
        rows: [
          ["Business email compromise", "1,860", "+27%", "Often after rushed e-commerce setup"],
          ["Fake payment QR / phishing", "3,240", "+33%", "Micro retail heavily hit"],
          ["Ransomware (SME)", "410", "+18%", "Backup / MFA uptake still low"],
        ],
      },
    },
    {
      id: "C",
      title: "SME Association Federation — submission extract",
      quote: [
        "The form asks for technical specs our owners cannot write. Consultants take a cut and leave us with software we barely use. Give us a simple credit for approved tools plus a free one-stop advisory desk — do not force full e-invoicing next year.",
      ],
      bullets: [
        "Simplify to a voucher / credit list of pre-approved vendors.",
        "Oppose mandatory e-invoicing before 2029 for firms under 10 staff.",
        "Want subsidised basic cyber hygiene training bundled with any grant.",
      ],
    },
    {
      id: "D",
      title: "Chamber of Commerce (larger SMEs) & vendor note",
      bullets: [
        "Larger SMEs defend current matching-grant design as filtering unserious applicants.",
        "IT vendors warn a pure voucher may drive race-to-bottom software with weak security.",
        "Some chambers accept phased e-invoicing for B2G first, not blanket B2B.",
      ],
    },
    {
      id: "E",
      title: "Treasury note (Oct 2026)",
      bullets: [
        "Unspent Scheme balance: ~HK$420 million of the original HK$1.0 billion envelope remains; lapse risk if uptake stays low.",
        "New recurrent advisory headcount above HK$80 million a year is difficult; time-limited hub contracts preferred.",
        "Any voucher redesign should keep lifetime cap per firm and publish fraud / clawback rates.",
        "Mandatory e-invoicing has compliance and political cost; not to be sold as a ‘free’ digitalisation fix this cycle.",
      ],
    },
    {
      id: "F",
      title: "Internal options paper (Commerce Branch, Oct 2026)",
      options: [
        {
          name: "Option 1 — Redesign as capped voucher / credit for pre-approved tools",
          text: "Replace heavy project proposals with a catalogue credit (e.g. HK$40,000–60,000) redeemable at vetted vendors, with light cyber baseline. Speeds micro-firm access; risk of low utilisation depth and weak custom fit.",
        },
        {
          name: "Option 2 — Intensive district digital advisory hubs (purchase-of-service)",
          text: "Fund 6 hubs for 3 years (~HK$55–70 million total) to help owners choose tools, complete applications, and do 90-day follow-up. Raises quality; slower city-wide reach; still needs a simpler grant behind it.",
        },
        {
          name: "Option 3 — Accelerate mandatory e-invoicing (B2B) from 2028",
          text: "Forces digital process adoption. Strong long-run compliance logic; high SME pushback (Doc C), enforcement load, and does not fix cyber readiness (Doc B).",
        },
      ],
      closing:
        "Bureau note: hybrid of streamlined credit + time-limited hubs, with e-invoicing kept to B2G pilots first, may clear Doc E lapse risk without Doc C collision.",
    },
    {
      id: "G",
      title: "Productivity Council evaluation extract (Aug 2026)",
      bullets: [
        "Firms that received both grant and ≥4 hours advisory were 2.3× more likely to still use the tool at 12 months.",
        "Applications rejected for incomplete technical annexes: 29% of micro-firm submissions vs 11% for firms ≥20 staff.",
        "Recommended bundling MFA / backup checklist as a drawdown condition for any payment-related tool.",
      ],
    },
  ],
  learnPoints: [
    "**開場定 criteria**：提高微企吸納、工具真用得到、控欺詐／經常開支 — weighing 圍住呢啲。",
    "**兩個問題**：低吸納＋顧問抽水／表格牆；同數碼後網絡風險 — 用 Doc A–B、G 數字。",
    "**Option 比較**：回應 Doc C（反強制）同 Doc E（防止 envelope lapse）；唔好當睇唔到 Doc D 對 voucher 質素擔憂。",
    "**推薦要組合 + 落地**：邊個做、分階段、pilot、KPI（吸納、12 個月仍使用率、網絡事件）。",
    "**結尾短**：殘餘風險一句。",
  ],
  model: {
    to: "Permanent Secretary, Commerce and Economic Development Bureau",
    from: "[AO]",
    subject: "SME Digital Boost — uptake problems and recommended redesign",
    date: "26 October 2026",
    sections: [
      {
        h: "1. Opening",
        html: "<p>The SME Digital Boost Scheme has under-reached micro firms, left money at risk of lapse, and coincided with rising cyber incidents after rushed digitisation. Redesign should raise useful uptake among smaller firms, improve sustained tool use, and contain fraud and recurrent cost.</p>",
      },
      {
        h: "2. Two major problems and implications",
        html:
          "<p><strong>Problem 1 — Process friction that excludes micro firms and leaks value to intermediaries.</strong><br>Only 24% of approvals went to micro firms that form 72% of the stock; average disbursement takes 19 weeks; 29% of micro applications fail on technical annexes; consultants take a median 18% cut (Docs A, G). Implications are equity and fiscal: the Scheme misses its intended base while ~HK$420 million remains unspent and at lapse risk (Doc E).</p>" +
          "<p><strong>Problem 2 — Weak sustained use and rising cyber exposure after thin implementations.</strong><br>41% of surveyed grantees still rely mainly on paper invoicing at six months; SME phishing and business-email compromise reports are up sharply (Docs A, B). Advisory-backed projects are 2.3× more likely to keep using tools at 12 months (Doc G). The implication is not merely low application volume but <strong>low-quality digitisation</strong> that can increase harm.</p>",
      },
      {
        h: "3. Comparison of options",
        html:
          "<p><strong>Option 1 (catalogue voucher/credit)</strong> directly cuts form barriers and should lift micro uptake and burn the unspent envelope faster. Vendor vetting and a cyber baseline are essential to answer Chamber fears of low-quality software (Docs D, F).</p>" +
          "<p><strong>Option 2 (advisory hubs)</strong> matches Productivity Council evidence on sustained use and Federation demand for a one-stop desk (Docs C, G). Time-limited POS (~HK$55–70 million) fits Treasury better than large permanent headcount (Doc E), but hubs alone without a simpler grant will not clear the application wall.</p>" +
          "<p><strong>Option 3 (early mandatory B2B e-invoicing)</strong> forces process change yet collides with micro-firm opposition, enforcement cost, and does little for cyber hygiene (Docs C, B, E). Keep e-invoicing on a slower B2G-first track.</p>",
      },
      {
        h: "4. Recommendation",
        html:
          "<p>Adopt a <strong>hybrid</strong>: redesign the grant as a capped catalogue credit (Option 1) <em>plus</em> time-limited district advisory hubs (Option 2); defer broad B2B e-invoicing.</p>" +
          "<p><strong>Phase 1 (12–18 months):</strong> Launch HK$40,000–60,000 credits for pre-approved tools with MFA/backup checklist as drawdown conditions for payment-related products. Stand up 6 hubs on 3-year POS; prioritise micro retail and food sectors. Publish clawback / fraud metrics quarterly.</p>" +
          "<p><strong>Phase 2:</strong> Expand catalogue categories using hub feedback; pilot B2G e-invoicing only; revisit wider mandates after uptake and cyber KPIs improve.</p>" +
          "<p><strong>KPIs:</strong> (i) micro-firm share of approvals; (ii) 12-month tool still-in-use rate; (iii) median weeks to disbursement; (iv) SME cyber incident rate among grantees vs baseline.</p>",
      },
      {
        h: "5. Residual risks",
        html: "<p>Catalogue capture by a few vendors and hub no-show rates need competitive listing rules and attendance KPIs in POS contracts. Mandatory e-invoicing remains a later lever, not Year-1 policy.</p>",
      },
    ],
  },
});
