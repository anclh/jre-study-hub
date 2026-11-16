/* Original City of Jade practice question. All documents and figures are fictional. */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "maintenance-tender-support-2026-11-16",
  title: "Fairer Building Maintenance Tenders · City of Jade",
  titleZh: "樓宇維修：預審名單與代辦招標監管",
  tip: "由投標競爭、利益衝突同業主選擇入手。寫完先睇範文。",
  task: {
    role: "You are an Administrative Officer in the City of Jade's Development Bureau. Advise the Building Renewal Committee on the first phase of a proposed Maintenance Support Office.",
    bullets: [
      "Identify two procurement problems and explain why they matter to owners and capable suppliers.",
      "Compare the three proposals on competition, independence, affordability and delivery. Recommend safeguards for prequalification and tender evaluation, and respond to one stakeholder concern.",
      "Recommend implementation arrangements and measures for a six-month review.",
    ],
    note: "Write about 700 words in formal English. Use only the fictional Data File.",
  },
  docs: [
    {
      id: "A",
      title: "Review of 60 completed maintenance tenders",
      bullets: [
        "Twenty-four tenders received fewer than three compliant bids. Nine tenders received at least three bids but fewer than three independent bidders once common ownership was checked. These two counts refer to separate groups.",
        "Seventeen consultant contracts combined initial condition assessment, specification writing and works supervision. Seven of those files lacked a documented independent review of the scope. The review did not determine whether the scopes were excessive.",
        "A survey of 40 owners’ committees found that 25 would use free templates, while 22 wanted help with evaluation. Of those 22, 13 said the proposed standard fee would be hard to pay without a waiver.",
      ],
    },
    {
      id: "B",
      title: "Market sounding",
      quote: [
        "Jade Small Works Federation: A list based only on a prior government contract would exclude competent new firms. Accept independently verified private work of comparable size and complexity.",
        "Neighbourhood Owners Panel: We want to see how the assessors scored quality and price. If there is only one credible recommendation, explain whether we can re-tender.",
        "Building Surveyors Council: The person who identifies defects should not benefit from increasing the scope of repair. Have the maintenance planner explain material departures from the condition report.",
      ],
    },
    {
      id: "C",
      title: "Options for the first six months",
      paras: ["The Committee can allocate up to $7 million. Support must open within 12 weeks. Owners retain the final award decision. The regulator remains responsible for enforcement."],
      options: [
        { name: "Option 1 — Publish free templates and an annual supplier list", text: "$1.4 million; six weeks. Publish sample scopes and bid forms. Listing requires a public contract completed in the last three years. Owners organise scoring and conflict checks." },
        { name: "Option 2 — Centralise all awards", text: "$11 million; 18 weeks. The Office assigns a single firm for inspection, design and supervision and selects the contractor on behalf of the owners." },
        { name: "Option 3 — Open prequalification with optional managed tendering", text: "$6.6 million; ten weeks. Use free templates plus separate, rolling lists for inspectors, supervision consultants and contractors. Provide managed scoring for up to 40 projects, including fee relief for eligible committees. Owners choose from the recommendations or re-tender." },
      ],
    },
    {
      id: "D",
      title: "Procurement assurance note",
      bullets: [
        "Published entry criteria can include verified comparable projects, current qualifications and safety records. Allow applications every quarter and issue written reasons for refusal, with a review by a person outside the original assessment.",
        "Check common ownership and declared relationships before scoring. Where an assessor has a conflict, a substitute should review the bid. Flag unusual pricing or bid patterns for review. The support office must refer possible collusion to the regulator.",
        "Before inviting bids, disclose the price and quality weights and the minimum quality score. Afterwards, give owners a comparative score summary, the reasons for the recommendation and an explanation of any conflict action, while protecting commercially sensitive details.",
      ],
    },
  ],
  learnPoints: [
    "三份合規標書未必代表三個獨立競爭者。差異要用共同擁有權核對。",
    "預審要有客觀準則、滾動申請同覆核渠道，先可以兼顧質素同新供應商入場。",
    "分開驗樓、策劃監工同評標。交代業主重招選擇同懷疑合謀嘅轉介路徑。",
  ],
  model: {
    to: "Building Renewal Committee",
    from: "Administrative Officer, Development Bureau",
    subject: "First Phase of Building Maintenance Tender Support",
    date: "16 November 2026",
    sections: [
      { h: "1. Opening", html: "<p>Owners need help obtaining independent bids and assessing whether major repairs offer value for money. This paper recommends open prequalification and optional managed tendering with transparent scoring and independent checks.</p>" },
      { h: "2. Problem analysis", html: "<p><strong>Apparent competition can overstate actual choice.</strong> Twenty-four of the 60 reviewed tenders received fewer than three compliant offers. A further nine fell below three independent bidders once common ownership was checked. Owners may have little basis for judging market price if several offers come from related firms. That pattern warrants scrutiny, though it cannot establish collusion by itself.</p><p><strong>Combined professional roles weaken independent scrutiny.</strong> Seven of 17 files with combined assessment and supervision lacked an independent review of scope. A consultant who benefits from later work may have an incentive to enlarge the scope. Without a second review, owners can find it difficult to challenge the quantity or cost of proposed works. Fees could also deter committees that most need support: 13 of 22 committees interested in evaluation help said the standard fee would be hard to pay.</p>" },
      { h: "3. Option comparison", html: "<p>Option 1 is inexpensive and opens within six weeks. Templates would help capable committees compare offers, but requiring a previous public contract could unnecessarily restrict entry. It also leaves resource-poor committees to verify conflicts and compare bids themselves.</p><p>Option 2 would coordinate decisions centrally, but it misses the cost and timing limits, removes owners’ award discretion and concentrates professional responsibilities. A central award cannot compensate for a weak check on the scope of work.</p><p>Option 3 can start within ten weeks at $6.6 million. Separate lists support role independence, while optional managed scoring and fee relief make specialist help accessible. To address small firms’ concerns, assess comparable private projects against the same published standards as public work. Keep the lists open to quarterly applications and provide independent review of refusals.</p>" },
      { h: "4. Recommendation", html: "<p>The Office should publish the entry criteria, scoring weights and sample documents by week ten. Assign ownership checks and declarations to an officer outside the scoring panel. Replace conflicted assessors and refer credible concerns to the regulator. Ensure the surveyor and supervision consultant are independent on each assisted project. Give owners a score summary and the rationale for the shortlist, including the option to re-tender if there is insufficient competition. Reserve fee relief for eligible committees within the $6.6 million budget.</p>" },
      { h: "5. Closing", html: "<p>At six months, review independent compliant bids per tender, entry and rejection rates for new firms, the share of conflicts resolved before scoring, and uptake of fee relief. Check the reasons for re-tendering and time to award. Extend the service only if it increases credible choice without creating excessive delays or excluding smaller suppliers. For Members’ consideration.</p>" },
    ],
  },
});
