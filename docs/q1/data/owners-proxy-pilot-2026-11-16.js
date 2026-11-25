/* Original City of Jade practice question. All documents and figures are fictional. */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "owners-proxy-pilot-2026-11-16",
  title: "Verifying Proxy Appointments at Owners’ Meetings · City of Jade",
  titleZh: "業主大會／電子授權試點與投票可及性",
  tip: "先分清法定人數、親身投票門檻同代表委任。寫完先睇五部分範文。",
  task: {
    role: "You are an Administrative Officer in the City of Jade's Home Affairs Bureau. Prepare an internal discussion paper for the Building Governance Committee on a proposed electronic proxy appointment pilot.",
    bullets: [
      "Identify two weaknesses in the current meeting arrangements and explain their implications for the integrity and accessibility of voting.",
      "Compare the three options on verification, accessibility, cost and delivery. Recommend an approach and address a stakeholder concern.",
      "Explain how to run and evaluate the pilot, and how to use its findings when considering any future limit on proxy appointments.",
    ],
    note: "Write about 700 words in formal English. Use only the fictional Data File.",
  },
  docs: [
    {
      id: "A",
      title: "Meeting file review",
      bullets: [
        "In 18 recent owners’ meetings, 1,200 paper appointments were lodged. Reviewers flagged 144 forms for duplicate unit references, missing signatures or mismatched details. Of these, 96 were corrected before the meeting, 32 were ruled invalid and 16 were unresolved at the opening bell. A flag is not a finding of fraud.",
        "The largest proxy holder at one meeting represented 38 of 220 eligible units. The audit did not determine how the owners instructed that person to vote.",
        "Current Jade rules count confirmed proxy representation towards a 10% quorum. A draft bill would separately require at least 20% of eligible units to vote in person on high-value resolutions. The draft has not been enacted. In a sample of eight meetings on such resolutions, seven met the quorum but only three would have met the proposed in-person threshold.",
      ],
    },
    {
      id: "B",
      title: "Consultation and pilot authority",
      bullets: [
        "In a survey of 200 owners at six pilot candidates, 72 said they would struggle to attend a weekday evening meeting. Of those 72, 48 cited mobility restrictions, caring duties or being out of town. The survey measures reported difficulty in these estates only.",
        "The Bureau can pilot electronic appointment and verification in parallel with paper before a bill is enacted. Paper documents remain the legally operative record in the pilot. The platform does not cast votes or count remote attendance as in-person participation.",
      ],
      quote: [
        "Jade Older Owners Network: A service desk should let owners who cannot use a phone confirm or cancel an appointment. Step-free meeting venues would also make it easier to vote in person.",
        "Estate Secretaries Association: Give us one register. If online and paper records conflict, we need a published review process before ballots are issued.",
      ],
    },
    {
      id: "C",
      title: "Pilot proposals",
      paras: ["The pilot must start within four months, cost no more than $3.5 million and preserve paper access."],
      options: [
        { name: "Option 1 — Improve paper checks", text: "$0.9 million; one month. Add two signatures, early submission and owner callbacks. No electronic trial or common record across estates." },
        { name: "Option 2 — Citywide digital replacement", text: "$5.2 million; six months. Require digital identity and online submission. An automatic cap of five proxies per holder would require separate legal authority." },
        { name: "Option 3 — Parallel-channel pilot at six estates", text: "$3.2 million; three months. Test an electronic appointment record with a common register, independent reconciliation and a staffed paper route. Fund step-free venues and test weekend sessions. Record concentration for evaluation without applying a cap." },
      ],
    },
    {
      id: "D",
      title: "Advice from the records and privacy team",
      bullets: [
        "Match each appointment against the ownership register. Log the receipt date, latest verified instruction and any cancellation. Never count a second appointment for the same eligible unit without resolving which instruction is valid.",
        "Give owners a receipt and a confidential way to raise an objection. The independent returning officer can check the full record. Public notices can show totals without posting signatures or identity numbers.",
        "Estates differ in size and meeting schedule. Report rejection and correction rates by submission channel, alongside meeting attendance and quorum, and record the reasons owners give for withdrawing or staying away.",
      ],
    },
  ],
  learnPoints: [
    "分清法定人數、親身投票比例同授權集中度，逐個指標用啱分母。",
    "將標記、核實失敗同已證實舞弊分開。處理紙本同電子紀錄衝突先至點票。",
    "試點只測電子委任同核實。是否設授權上限要另作決定。",
  ],
  model: {
    to: "Building Governance Committee",
    from: "Administrative Officer, Home Affairs Bureau",
    subject: "Pilot for Verifying Proxy Appointments",
    date: "16 November 2026",
    sections: [
      { h: "1. Opening", html: "<p>Owners who cannot attend meetings need a reliable way to appoint a representative. This paper recommends a six-estate trial that tests whether electronic verification improves the integrity of appointments while preserving paper access and helping owners attend in person.</p>" },
      { h: "2. Problem analysis", html: "<p><strong>Verification is too often unresolved when meetings open.</strong> Reviewers flagged 144 of 1,200 appointments, of which 48 were invalid or still unresolved at opening. The flags do not establish fraud. Even an administrative error can delay a decision or let a disputed appointment influence a vote. Allowing an owner to confirm or cancel an instruction before the meeting would give officers time to resolve such cases.</p><p><strong>Quorum can conceal barriers to direct participation.</strong> Seven of eight sampled meetings met the quorum, but only three would have met the draft threshold for voting in person. Of 72 surveyed owners who expected difficulty attending, 48 cited mobility, caring or travel constraints. A change in the in-person requirement could delay resolutions at these estates unless meetings become easier to attend. Easier proxy appointment protects representation, but it cannot count as an in-person vote under the draft.</p>" },
      { h: "3. Option comparison", html: "<p>Option 1 is the quickest and costs $0.9 million. Earlier checks would help catch missing signatures, and paper remains familiar. Separate records at each estate, however, give the Committee little evidence about electronic verification or reconciliation across channels.</p><p>Option 2 offers a common digital record but exceeds both limits. It excludes owners who cannot submit online and assumes authority to impose a cap that the Bureau does not have. The observed case of 38 appointments justifies examining concentration. It does not show what an appropriate cap would be.</p><p>Option 3 costs $3.2 million and can start in three months. It gives owners a choice of channels and tests verification without changing the legal status of appointments. To address secretaries’ concerns about conflicting records, the returning officer should reconcile electronic entries with the operative paper documents before issuing ballots. An unresolved discrepancy should be recorded and handled under a published review procedure.</p>" },
      { h: "4. Recommendation", html: "<p>Approve Option 3. The Home Affairs Bureau should recruit estates with different attendance patterns. Returning officers should check ownership, time-stamp instructions and cancellations, and give owners a receipt. The Bureau should fund the staffed paper desk, step-free venues and weekend sessions within the $3.2 million envelope. It should set a deadline for objections before each meeting and give owners a confidential route to correct errors.</p>" },
      { h: "5. Closing", html: "<p>Review failed verifications per 100 appointments by channel, the share of disputes resolved before ballots are issued, and in-person turnout as a share of eligible units. Measure concentration separately and ask owners who did not vote about barriers. Use the results to decide whether to extend the platform and whether a separate proposal on a cap merits consultation. For Members’ consideration.</p>" },
    ],
  },
});
