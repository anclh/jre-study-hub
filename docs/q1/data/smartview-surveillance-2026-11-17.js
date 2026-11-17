/* Original fictional City of Jade Q1 practice pack. All documents, institutions and operational figures are invented for examination simulation. Reported policy parameters accurately reflect public announcements. */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "smartview-surveillance-2026-11-17",
  title: "SmartView AI Facial Recognition: Authorisation, Data Retention and Public Accountability · City of Jade",
  titleZh: "SmartView 人工智能人臉識別：授權層級、資料留存期與公眾問責（2026-11-17 模擬卷）",
  tip: "分清宣布啟用與獨立驗證；影像 31 日上限與比對紀錄 180 日上限分開睇。按五段骨架寫約 700 字。",
  task: {
    role: "You are an Administrative Officer in the Security Bureau, City of Jade. Prepare an internal discussion paper for the Public Surveillance Oversight Committee regarding the operational activation and data governance of the SmartView facial recognition system.",
    bullets: [
      "Identify two governance and operational risks associated with deploying AI facial recognition across the public surveillance network, distinguishing verified operational status from policy proposals.",
      "Evaluate the three options against crime investigation effectiveness, privacy compliance, system integrity, and public trust. Recommend an enforceable governance framework and mitigate a major stakeholder objection inline.",
      "Specify institutional oversight (who signs off searches, data purge verification, pilot scope, and measurable accountability KPIs).",
    ],
    note: "Write about 700 words in formal English. Use only the Data File. All institutions, locations, and supplementary figures are fictional City of Jade illustrations. Accurately reflect reported parameters: activation announced for 16 Nov (unverified completion), inspector rank or above for searches, video retained no more than 31 days, face-match logs proposed up to 180 days, target 60,000 cameras by 2028.",
  },
  docs: [
    {
      id: "A",
      title: "Security Bureau Review: SmartView Roll-out and Surveillance Network Metrics",
      paras: [
        "In mid-November, the Commissioner of Police announced that the SmartView automated facial recognition system would be activated on 16 November across selected public surveillance feeds. However, full technical completion and integration across the network have not been independently verified.",
        "Under the government's security roadmap, the public camera surveillance network aims to expand to a target of 60,000 cameras by 2028 (up from 18,000 active units currently deployed across high-density public transport interchanges and commercial districts).",
        "Regarding data governance, the operating manual stipulates that raw video footage is retained for no more than 31 days before automatic cyclical overwriting. To assist investigations into organized crime syndicates and fugitives, authorities propose that face-match time and location metadata be retained for up to 180 days, subject to privacy guidelines. Querying the system requires authorization from an officer of Inspector rank or above.",
      ],
      table: {
        headers: ["Surveillance Parameter", "Target / Milestone (2028)", "Current Pilot Level (Nov 2026)", "Statutory / Governance Threshold"],
        rows: [
          ["Camera Network Size", "60,000 cameras", "18,000 cameras", "Phased city-wide public estate installation"],
          ["Raw CCTV Footage Retention", "Max. 31 days", "Max. 31 days", "Strict automated erasure protocol"],
          ["Face-Match Metadata Retention", "Up to 180 days (proposed)", "30 days (interim standard)", "Subject to privacy impact assessment"],
          ["Search Access Threshold", "Inspector rank or above", "Inspector rank or above", "Documented criminal nexus mandatory"],
          ["Trial Match Queries (Past 6 Months)", "N/A", "420 authorised queries", "78% related to violent crime or missing elders"],
        ],
      },
      bullets: [
        "SmartView uses mathematical facial biometric templates and does not store unencrypted facial photographs in the index.",
        "System audit logs currently record search user ID, timestamp, and case reference number.",
        "Note: The Police Band Annual Gala Concert is scheduled for 18 January 2027 at the Jade Cultural Centre.",
      ],
    },
    {
      id: "B",
      title: "Three Proposed Governance and Retention Options",
      options: [
        {
          name: "Option 1 — Restrictive 31-Day Uniform Purge & Senior Executive Sign-off",
          text: "Cap both raw video footage and all face-match time/location logs at 31 days. Elevate search approval to Superintendent rank or above. Low operational budget ($6 million/year). Ensures maximal privacy compliance, but severely curtails investigations into complex cross-district fraud syndicates or cold cases where suspect identities emerge after month-end.",
        },
        {
          name: "Option 2 — Expanded 1-Year Retention with Devolved Access",
          text: "Retain face-match logs for 365 days across all 60,000 camera feeds; devolve search authority to Station Sergeant rank to maximize investigative speed. High operational utility for beat constables. However, an unconstrained one-year movement archive creates immense civil liberties friction, heightened breach vulnerability, and likely legal challenge under the Personal Data (Privacy) Ordinance.",
        },
        {
          name: "Option 3 — Tiered Authorization, Audited 180-Day Metadata Retention & Independent Purge Oversight",
          text: "Adopt the proposed 180-day retention cap for face-match time and location data, while strictly enforcing the 31-day ceiling on raw video footage. Require Inspector rank or above for search approval, confined to serious arrestable offences or life-threatening emergencies. Introduce cryptographic tamper-proof audit trails, mandatory automated purging on Day 181, and quarterly independent compliance inspections by the Privacy Commissioner. Setup: $12 million; recurrent: $15 million/year.",
        },
      ],
    },
    {
      id: "C",
      title: "Stakeholder Views and Legal Submissions",
      quote: [
        "Privacy and Personal Data Protection Council: 'Retaining movement timestamps and location data of matched individuals for up to 180 days creates a persistent retrospective tracking log. Without independent technical verification of the 16 November activation and verifiable cryptographic deletion, public trust in the 60,000-camera network will erode rapidly.'",
        "Criminal Investigation Department: 'In serious syndicate crimes and missing vulnerable persons, suspects or victims are rarely identified on Day 1. Keeping match trails for 180 days under inspector sign-off is essential to connect cross-district movements across 60,000 camera feeds without keeping bulky video indefinitely.'",
        "Department of Justice (Public Law Division): 'A 180-day metadata retention period is legally defensible only if search thresholds require documented reasonable suspicion of serious crime signed by an Inspector, backed by statutory destruction requirements.'",
      ],
    },
    {
      id: "D",
      title: "0–5 min Sort & Highlight Reference (Quick Check)",
      bullets: [
        "P1: Data governance asymmetry: 31-day video ceiling vs proposed 180-day metadata match log. Without independent verification of automated deletion, a 180-day location trail generates public anxiety and privacy litigation risk.",
        "P2: Operational oversight at scale: Expanding from 18,000 to 60,000 cameras by 2028 will multiply search volumes. Restricting searches to Inspector rank or above provides crucial deterrence against misuse, but requires automated audit logging to prevent bottlenecks.",
        "Options: O1 ($6M) cripples complex investigations; O2 creates excessive privacy intrusion and legal vulnerability; O3 ($15M) balances investigative utility with audited 180-day metadata limits and independent Privacy Commissioner oversight.",
        "Noise to drop: Police Band Gala Concert in January 2027.",
      ],
    },
  ],
  learnPoints: [
    "**Step 1 — Sort:** Security Bureau AO → Public Surveillance Oversight Committee; P1 31-day video vs 180-day match log asymmetry and unverified activation status; P2 scale of 60,000 cameras by 2028 requiring robust Inspector-rank sign-off; drop police band concert.",
    "**Step 2 — Diagnose:** AI facial recognition enables rapid detection across 60,000 cameras, but retaining 180-day location logs without independent verification risks privacy backlash and legal challenges.",
    "**Step 3 — Compare:** O1 is too restrictive for complex crimes; O2 triggers legal vulnerability; O3 balances crime deterrence and privacy compliance within the 180-day cap, addressing Privacy Council concerns via independent technical audits.",
    "**Step 4 — Deliver:** Security Bureau leads with Police and Privacy Commissioner; implement digital Inspector sign-off portal; conduct quarterly audit reports; six-month pilot review in May 2027.",
  ],
  model: {
    to: "Public Surveillance Oversight Committee",
    from: "Administrative Officer, Security Bureau",
    subject: "Governance, Data Retention and Oversight Framework for SmartView Facial Recognition",
    date: "17 November 2026",
    sections: [
      {
        h: "1. Opening",
        html: `<p>Following the Commissioner's announcement that the SmartView AI facial recognition system would be activated on 16 November, the Government must establish an enforceable data governance framework. As the surveillance network expands towards its target of 60,000 cameras by 2028, this paper evaluates retention and authorisation protocols, balances crime prevention against privacy safeguards, and recommends a deliverable regulatory framework.</p>`,
      },
      {
        h: "2. Problems and implications",
        html: `<p><strong>Data retention asymmetry and verification gaps.</strong><br>The current framework establishes clear boundaries for raw video footage, mandating automatic deletion after no more than 31 days. However, authorities have proposed retaining face-match time and location metadata for up to 180 days to support ongoing criminal investigations. While biometrics are stored as mathematical templates rather than photographs, preserving citizens' temporal and spatial matches for six months effectively constructs retrospective movement profiles. Crucially, the full technical activation announced for 16 November has not been independently verified. Without certified automated purge routines, the proposed 180-day metadata archive invites acute public scepticism and heightened litigation risk under personal data privacy laws.</p>
<p><strong>Scaling operational oversight across an expanding network.</strong><br>The surveillance network currently operates 18,000 cameras and is scheduled to more than triple to 60,000 cameras by 2028. Trial operations generated 420 search queries over six months, with 78% linked to violent crimes or missing vulnerable persons. Restricting query authorisation to officers of Inspector rank or above provides an essential legal safeguard against arbitrary surveillance. However, as the camera network expands to 60,000 units, search requests will multiply significantly. Without a centralised, tamper-evident digital workflow, inspector-level vetting risks either degenerating into perfunctory sign-offs or causing administrative bottlenecks during time-critical investigations.</p>`,
      },
      {
        h: "3. Comparison of options",
        html: `<p>The options must be assessed against investigative efficacy, privacy compliance, system integrity, and public trust.</p>
<p><strong>Option 1</strong> applies a uniform 31-day deletion cap to both raw footage and match metadata, while raising search sign-off to Superintendent rank. At $6 million annually, it offers robust privacy protection. However, it severely hobbles cross-district syndicate and fugitive investigations where suspect identities are established only after weeks of forensic analysis.</p>
<p><strong>Option 2</strong> extends metadata retention to 365 days across all 60,000 cameras and devolves search access to Station Sergeants. While it offers maximum operational convenience for frontline policing, an unconstrained one-year location trail constitutes disproportionate mass surveillance, inviting immediate legal challenges and public outcry.</p>
<p><strong>Option 3</strong> strikes the optimal institutional balance. Costing $12 million in capital setup and $15 million annually, it formalises the 180-day retention ceiling for face-match metadata while rigorously enforcing the 31-day erasure cap for raw video. Queries remain restricted to Inspector rank or above and must satisfy statutory thresholds of serious arrestable crime or immediate life risk. The Privacy and Personal Data Protection Council legitimately argues that unverified 180-day logs compromise citizen privacy. This concern is directly answered by integrating cryptographic audit logs, automated irreversible purging on Day 181, and mandatory quarterly compliance audits conducted by the Privacy Commissioner's office.</p>`,
      },
      {
        h: "4. Recommendation",
        html: `<p>We recommend approving Option 3 and implementing the governance framework in phased stages:</p>
<ul>
<li><strong>Leadership and oversight:</strong> Security Bureau will chair the Surveillance Governance Board, with the Department of Justice issuing statutory search thresholds and the Privacy Commissioner conducting independent verification.</li>
<li><strong>Access control:</strong> Restrict system access strictly to Inspector rank or above via a secure dual-authenticated digital portal, requiring an active criminal investigation case file and supervisory sign-off before queries can execute.</li>
<li><strong>Retention and purge protocols:</strong> Maintain the absolute 31-day ceiling on raw CCTV footage. Enforce the 180-day cap on match metadata through automated daily cryptographic purge routines certified by third-party technical auditors.</li>
<li><strong>Transparency:</strong> Publish quarterly statistical digests reporting the number of searches, rank of authorising officers, offence categories, and audit compliance rates, while withholding sensitive operational details.</li>
</ul>`,
      },
      {
        h: "5. Closing",
        html: `<p>Effectiveness should be measured by a 100% compliance rate with inspector-level search authorisations, zero unauthorised data breaches, and verified automated disposal of 100% of expired records within 24 hours of reaching Day 181. Security Bureau will table a comprehensive six-month review in May 2027 to evaluate system integrity before expanding SmartView to subsequent camera deployment tranches. For Members’ consideration.</p>`,
      },
    ],
  },
});
