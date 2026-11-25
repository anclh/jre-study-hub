/* Fictional City of Jade Q1 practice pack */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "retirement-contributions-2026-11-16",
  title: "Recovering Retirement Contributions · City of Jade",
  titleZh: "退休供款／追討拖欠",
  tip: "把欠款宗數、金額和逾期時間分開，並比較措施能否及早收回供款。",
  task: {
    role: "You are an Administrative Officer in the City of Jade Labour Bureau. Write a memo to the Director of Retirement Protection.",
    bullets: [
      "Identify two problems with the current recovery process and assess their implications for workers.",
      "Compare the options against the budget and delivery deadline, address stakeholder objections, and recommend a package with safeguards and measurable outcomes."
    ],
    note: "The City of Jade, its institutions and all figures in this data file are fictional."
  },
  docs: [
    { id: "A", title: "Retirement Authority Review (fictional figures)", bullets: [
      "At the end of June, 6,000 employer accounts were overdue. Of these, 900 were at least 90 days overdue and accounted for $36 million of the $60 million outstanding.",
      "In a review of 400 overdue cases, workers received their first notice a median of 46 days after the payment deadline. One in four cases required manual correction of payroll records.",
      "One large trustee proposed adding its enforcement costs to the standard member administration fee.",
      "The authority is moving its staff canteen to a different floor next year."
    ] },
    { id: "B", title: "Options and resource limits", options: [
      { name: "Option 1 — Uniform higher surcharge", text: "Increase the charge for all late payments. Recurrent cost of $2 million and a three-month launch. The authority would continue to rely on the existing notification and reconciliation systems." },
      { name: "Option 2 — Earlier alerts and targeted escalation", text: "Send a worker alert after 14 days, provide a correction window for disputed records, and add a surcharge for confirmed arrears still outstanding at 90 days. A pilot can start in five months. Setup costs $3 million and annual operation costs $6 million." },
      { name: "Option 3 — Fast-track every recovery case", text: "Refer every arrears case to a new specialist unit immediately after the deadline. Setup costs $4 million and annual operation costs $11 million. Recruitment and training would take nine months." }
    ] },
    { id: "C", title: "Stakeholder submissions", quote: [
      "Workers' Council: Workers need timely notice and a way to correct employer records. Members should never pay for a trustee's penalties.",
      "Small Employers Federation: Automated charges should pause while credible payroll disputes are reviewed. Short-term cash flow problems and repeat defaults warrant different responses.",
      "Treasury: The pilot must start within six months. Setup spending is capped at $4 million and annual recurrent spending at $7 million."
    ] }
  ],
  sortedNotes: [
      "P1: 900 of 6,000 overdue accounts hold 60% of outstanding contributions. Persistent arrears warrant prioritisation.",
      "P2: The median worker notice arrives after 46 days. Payroll errors and potential fee pass-through create separate risks to workers.",
      "Compare speed, recurrent cost, proportionality and ability to recover money. O2 fits the caps and deadline. Ignore the canteen relocation."
    ],
  learnPoints: [
    "Use 900 out of 6,000 for the share of overdue accounts, and $36 million out of $60 million for the share of money outstanding.",
    "Distinguish days to notify a worker from days to credit recovered contributions to the worker's account.",
    "Compare all three proposals against the same delivery and spending constraints before discussing safeguards."
  ],
  model: {
    to: "Director of Retirement Protection",
    from: "Administrative Officer, Labour Bureau",
    subject: "A targeted pilot to recover overdue retirement contributions",
    date: "16 November 2026",
    sections: [
      { h: "1. Purpose", html: "<p>I recommend a five-month pilot combining early alerts with targeted escalation. The pilot would address persistent arrears and give workers time to check their contribution records.</p>" },
      { h: "2. Problems and implications", html: "<p>Accounts at least 90 days overdue make up 15% of overdue accounts but hold 60% of the outstanding balance. Prioritising these cases could help protect a large share of affected savings. The median notice arrives after 46 days, delaying workers’ opportunity to flag missed payments. A quarter of reviewed cases also required a manual payroll correction, so immediate automatic sanctions could penalise employers for record errors.</p>" },
      { h: "3. Options", html: "<p>A uniform surcharge is cheap and fast, but it leaves the notice and reconciliation gaps in place. Fast-tracking every case would exceed both the six-month deadline and the $7 million recurrent ceiling. Option 2 fits both limits and directs extra enforcement towards persistent arrears. It should include a short, documented pause on escalation for credible disputes and a separate review of repeat defaults.</p>" },
      { h: "4. Implementation and safeguards", html: "<p>The authority should lead the pilot using $3 million in setup funding and $6 million a year for operations. Trustees should send alerts and give workers a confidential correction route. A finance audit should check both direct charges and changes in member fees for evidence that trustees have passed on penalties.</p>" },
      { h: "5. Evaluation", html: "<p>Review after six months of pilot operation. Report the share of workers notified within 14 days, the value credited to their accounts, and the share of newly overdue balances still outstanding at 90 days. Compare results with a similar group outside the pilot and publish the rate of erroneous escalation before deciding whether to expand.</p>" }
    ]
  }
});
