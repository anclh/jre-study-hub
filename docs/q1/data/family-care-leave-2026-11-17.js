/* Original fictional City of Jade Q1 practice pack. All documents, institutions and operational figures are invented for examination simulation. Reported policy parameters accurately reflect public proposals. */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "family-care-leave-2026-11-17",
  title: "Civil Service Family Care Leave: Verification, Shift Rostering and Implementation · City of Jade",
  titleZh: "公務員家庭關顧假／審批、輪班與防濫用",
  tip: "先花 15 分鐘整理 Data File：分清政策宣布／建議與法定權益；前線輪班與後勤文職調配壓力截然不同；剔除雜音後按五段骨架寫約 700 字。",
  task: {
    role: "You are an Administrative Officer in the Civil Service Bureau (CSB) of the City of Jade. Draft an internal discussion paper for the Senior Civil Service Management Committee on the proposed implementation arrangements for Civil Service Family Care Leave.",
    bullets: [
      "Identify two major operational and governance challenges in introducing Family Care Leave across diverse government departments, and assess their wider implications for frontline public services and public perception.",
      "Compare the three implementation options against operational feasibility, abuse deterrence, staff morale, and administrative cost. Recommend a balanced package and address one major stakeholder concern inline.",
      "Set out clear delivery arrangements (lead bureau, phased consultation timeline, frontline roster buffers, and measurable review KPIs).",
    ],
    note: "Write about 700 words in clear, formal administrative English. Use only the Data File. Distinguish policy proposals from enacted legislation. All institutions and operational figures in the City of Jade are fictional.",
  },
  docs: [
    {
      id: "A",
      title: "CSB Policy Framework Proposal & Workforce Distribution Extract",
      paras: [
        "In response to growing caregiving burdens among employees, the Government proposes introducing Family Care Leave for civil servants tentatively starting from January 2027. The proposed framework is currently subject to formal staff consultation.",
        "Under the proposal, eligible civil servants may take at most 12 hours of paid family care leave per calendar year, taken in blocks of 1 to 4 hours per application. The leave covers four permissible grounds: accompanying dependents to medical appointments, caring for sick relatives, attending children's school events (e.g. parent-teacher conferences), and handling urgent family emergencies.",
        "Regarding verification, providing a specific reason upon application is generally sufficient; submission of formal documentary proof is not routinely required, unless supervisory management reasonably suspects abuse. The policy is strictly an internal employer initiative for the civil service and does not constitute statutory leave for private-sector employees.",
      ],
      table: {
        headers: ["Departmental Cluster", "Headcount", "Frontline / 24-hr Shift Proportion", "Avg. Unplanned Short Absences (<4h)", "Minimum Manning Constraint"],
        rows: [
          ["Emergency & Disciplinary Services (Police, Fire, Ambulance, Corrections)", "62,000", "88%", "3.9 hrs / year", "Strict 90% manning ratio; backup call-out requires 2–3 hours"],
          ["Frontline Health & Social Crisis Units (Clinics, residential shelters)", "34,000", "72%", "3.4 hrs / year", "85% manning ratio; peer cover extends service queues"],
          ["General Administration & Headquarters Bureaux", "79,000", "12%", "1.2 hrs / year", "Flexible desk allocation; work absorbed by peers without disruption"],
        ],
      },
      bullets: [
        "Civil service headcount stands at 175,000 across 68 departments and agencies.",
        "The proposed 12-hour entitlement cannot be carried forward to subsequent years or encashed upon retirement.",
        "Note: The Civil Service Staff Choir will hold its annual spring choral showcase on 24 February 2027 at Jade City Hall.",
      ],
    },
    {
      id: "B",
      title: "Three Proposed Implementation Options",
      options: [
        {
          name: "Option 1 — Pre-approval with Mandatory Documentary Verification",
          text: "Require all applications to be submitted at least 3 working days in advance, accompanied by official clinic appointment cards, hospital discharge slips, or school circulars. For emergency cases, immediate supervisor countersignature and retrospective submission of doctor's certificates within 24 hours are mandatory. Estimated administrative compliance cost: $16 million/year across departments.",
        },
        {
          name: "Option 2 — Immediate Unconditional Self-Declaration",
          text: "Permit employees to take 1–4 hours of family care leave upon verbal or digital self-certification without advance notice, supervisory veto, or any documentation requirement. Operating cost: minimal ($1.5 million/year). However, uncoordinated absences risk clustering during Friday afternoons, holiday eves, or critical shift changeovers.",
        },
        {
          name: "Option 3 — Calibrated Modular Framework with Roster Buffers & Risk-Based Audit",
          text: "Implement the proposed 12 hours/year in 1–4 hour blocks from January 2027. Require 48 hours advance notice for scheduled events (appointments, school activities) while permitting same-day emergency declarations with supervisor concurrence. Reason-based approval is standard; documentary proof is required only upon reasonable suspicion of pattern abuse (e.g. repetitive Friday/Monday leaves). Frontline shift clusters establish a 15% standby roster buffer. Setup: $4 million; recurrent: $6.5 million/year.",
        },
      ],
    },
    {
      id: "C",
      title: "Stakeholder Consultation Submissions",
      quote: [
        "Jade Government Employees Association: 'The 12-hour provision is a humane measure that recognises caregiving pressures. However, forcing civil servants to provide receipts or school letters for a two-hour teacher conference creates distrust and heavy clerical friction. Genuine emergencies cannot wait for pre-printed certificates.'",
        "Frontline Services Joint Consultative Council: 'In emergency stations and 24-hour wards, an unannounced 2-hour departure leaves an emergency vehicle or treatment room shorthanded. Supervisors need operational discretion to defer non-urgent requests if minimum manning is threatened.'",
        "Employers' Federation of Jade: 'Civil service family care leave must remain strictly an internal employer benefit. It should not be misconstrued as a statutory blueprint or prelude to mandating hourly family leave for the private sector, where SMEs already face severe manpower shortages.'",
        "Treasury Branch: 'All departmental relief coverage, overtime, and administrative overheads must be absorbed within existing personal emoluments baselines. No supplementary subvention will be granted.'",
      ],
    }
  ],
  sortedNotes: [
        "P1: Operational disparity across clusters: 62,000 disciplinary staff (88% shift) and 34,000 health/social workers (72% shift) operate under rigid 85–90% manning rules where backup takes 2–3 hours. Unplanned 1–4h absences risk service gaps or delayed emergency response, unlike 79,000 desk-based staff.",
        "P2: Verification and external credibility dilemmas: Reason-only approval risks accusations of civil service privilege and pattern abuse, whereas rigid upfront documentation destroys the utility of short emergency leave. Clear boundary: policy is internal and non-statutory for private businesses.",
        "Options: O1 ($16M) eliminates abuse but adds heavy red tape and destroys emergency utility; O2 ($1.5M) triggers roster collapse and public outcry; O3 ($6.5M) balances reason-based dignity, 48h scheduled notice, emergency flexibility, and risk-based 5% audit under existing baselines.",
        "Distractor to drop: Civil Service Staff Choir showcase in February 2027.",
      ],
  learnPoints: [
    "**Step 1 — Sort:** CSB AO → Senior Civil Service Management Committee; P1 frontline shift vulnerability and minimum manning vs desk flexibility; P2 verification standard vs abuse risk and private-sector concerns; distinguish proposal from statutory law; drop choir concert noise.",
    "**Step 2 — Diagnose:** 1–4 hour leave blocks are valuable for emergencies, but in 24/7 services where backup takes 2–3 hours, uncoordinated absences threaten essential service delivery and invite public scrutiny.",
    "**Step 3 — Compare:** O1 costs $16M and defeats emergency purpose; O2 risks roster collapse and public backlash; O3 fits within the $6.5M envelope, safeguards frontline manning via 48h advance notice for planned events, and reserves documentary checks for reasonable suspicion of abuse.",
    "**Step 4 — Deliver:** CSB leads interdepartmental consultation through Q3–Q4 2026 for January 2027 launch; departments absorb relief internally; monitor leave uptake, shift disruption rate, and abuse complaints; 6-month review in July 2027.",
  ],
  model: {
    to: "Senior Civil Service Management Committee",
    from: "Administrative Officer, Civil Service Bureau (CSB)",
    subject: "Implementation Framework for Civil Service Family Care Leave",
    date: "17 November 2026",
    sections: [
      {
        h: "1. Opening",
        html: `<p>To support civil servants with caregiving obligations, the Government proposes granting up to 12 hours of paid family care leave annually from January 2027, subject to staff consultation. This paper evaluates the operational implications of the proposed scheme across diverse departments, addresses supervisory and verification challenges, and recommends an enforceable administrative framework.</p>`,
      },
      {
        h: "2. Problems and implications",
        html: `<p><strong>Operational vulnerability in frontline shift-based departments.</strong><br>The civil service workforce of 175,000 is sharply bifurcated between desk-bound headquarters and frontline shift operations. Among 62,000 emergency and disciplinary staff, 88% work 24-hour shift rotas subject to a strict 90% minimum manning ratio, where arranging relief cover takes two to three hours. A further 34,000 health and social crisis personnel maintain an 85% manning threshold. In these environments, unplanned one-to-four-hour absences directly threaten service coverage, creating emergency response gaps or extending patient clinic queues. Conversely, 79,000 administrative and headquarters staff can absorb short leaves through flexible peer coverage without service interruption.</p>
<p><strong>Verification tensions and external sensitivity.</strong><br>Under the consultation proposal, employees need only state a valid reason—medical appointments, sick relatives, school functions, or urgent family emergencies—with documentary proof demanded only when abuse is reasonably suspected. While trust-based approval preserves staff dignity, critics may perceive self-declared hourly leave as public-sector privilege prone to pattern abuse around weekends. Conversely, mandating advance proof for every application would destroy the scheme's utility for sudden domestic crises. Furthermore, the Employers' Federation has raised concerns regarding statutory spillover; CSB must firmly reiterate that this is an internal employer benefit rather than a statutory mandate for private enterprises.</p>`,
      },
      {
        h: "3. Comparison of options",
        html: `<p>The options must be evaluated against operational continuity, abuse deterrence, staff morale, and administrative cost within existing personal emoluments baselines.</p>
<p><strong>Option 1</strong> mandates three days' advance notice and formal documentation for all applications, at an annual compliance cost of $16 million. While it prevents fraudulent claims, it imposes excessive clerical burdens and renders same-day emergency relief impossible, attracting vehement opposition from staff unions.</p>
<p><strong>Option 2</strong> allows immediate self-certification with zero documentation or supervisory veto. While inexpensive at $1.5 million annually, uncoordinated departures would trigger critical manning deficits in emergency stations and clinics during peak periods, severely undermining public confidence.</p>
<p><strong>Option 3</strong> provides the most balanced mechanism. At $6.5 million annually, it establishes the 12-hour entitlement in one-to-four-hour units while introducing an operational distinction: 48 hours' advance notification for scheduled medical or school events, alongside immediate notification for genuine emergencies. The Frontline Services Joint Consultative Council rightly cautions that emergency rosters cannot tolerate unmanaged absences. This concern is directly mitigated by empowering shift supervisors to adjust non-emergency leave timing and establishing a 15% intra-unit standby relief pool. Documentary proof is reserved strictly for substantiated suspicion of pattern abuse, reinforced by a post-event random 5% audit.</p>`,
      },
      {
        h: "4. Recommendation",
        html: `<p>The Government should adopt Option 3 and begin formal departmental consultations immediately, with a target rollout date of 1 January 2027:</p>
<ul>
<li><strong>Leadership:</strong> CSB will issue standardised civil-service-wide guidelines, while departmental heads, particularly in the disciplinary and health services, formulate tailored rostering buffers.</li>
<li><strong>Operational protocols:</strong> Require 48 hours' advance notice for planned family appointments and school events. For sudden emergencies, allow same-day leave subject to supervisor acknowledgement and shift minimum manning protocols.</li>
<li><strong>Verification and safeguards:</strong> Uphold reason-based self-declaration as the default. Departmental management will conduct an annual random 5% audit and require medical or attendance certificates only where clear abuse indicators arise (e.g. repeated Friday or Monday emergency leave).</li>
<li><strong>Financial discipline:</strong> In accordance with Treasury instructions, all relief coverage and system costs ($4 million setup, $6.5 million recurrent) must be absorbed within departmental baseline allocations. Reiterate publicly that the policy is non-statutory for the private sector.</li>
</ul>`,
      },
      {
        h: "5. Closing",
        html: `<p>Success should be measured by maintaining a 98% minimum manning compliance rate in shift services, an overall staff satisfaction rate above 80%, and confirmed abuse rates below 0.5% during sample audits. CSB will conduct a comprehensive six-month review in July 2027 to assess operational efficiency and refine rostering protocols before full institutionalisation. For Members’ consideration.</p>`,
      },
    ],
  },
});
