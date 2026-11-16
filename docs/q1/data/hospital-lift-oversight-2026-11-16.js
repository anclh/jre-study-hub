/* Original City of Jade practice question. All documents and figures are fictional. */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "hospital-lift-oversight-2026-11-16",
  title: "Hospital Lift Works: Inspection, Escalation and Disclosure · City of Jade",
  titleZh: "醫院升降機工程：分段驗收、風險通報與披露",
  tip: "分清工程驗收、臨床啟用同紀律調查。寫完先睇範文。",
  task: {
    role: "You are an Administrative Officer in the City of Jade's Public Works Bureau. Prepare an internal discussion paper for the Capital Works Committee after recurring lift faults at Harbour Ridge Hospital's new clinical wing.",
    bullets: [
      "Identify two oversight failures and explain how they affect safety, service readiness and accountability.",
      "Compare the three options on assurance, delivery, cost and transparency. Recommend an approach covering inspection, escalation and public disclosure.",
      "Set out who should sign off each decision, when the wing can open and how the arrangements should be reviewed.",
    ],
    note: "Write about 700 words in formal English. Use only the fictional Data File.",
  },
  docs: [
    {
      id: "A",
      title: "Technical review of the clinical wing",
      bullets: [
        "The wing has 18 lifts. In a four-week commissioning exercise, seven lifts recorded repeated faults. Inspectors identified shaft alignment or clearance issues in five of those seven. The other two are being examined. All seven were isolated from routine use.",
        "Five of the 18 files lacked a signed record of shaft and clearance checks before rail installation. Three of those five relate to lifts with confirmed alignment or clearance issues. Some later checklists mark installation complete without attaching measured results.",
        "Two routes for transferring patients on beds are required for clinical opening. Only one has been tested end to end with a bed and an emergency transfer team. The hospital can operate its existing wing for another three months at extra staffing cost.",
      ],
    },
    {
      id: "B",
      title: "Escalation record and hospital feedback",
      bullets: [
        "Site logs recorded the first recurring faults on 3 August. Facilities staff received a consolidated notice on 24 August, and the hospital opening board learned on 9 September that the transfer plan might be affected. The first public service notice went out on 18 September.",
        "The contract requires engineers to log defects, but does not identify who must notify the opening board or issue public service notices. An investigatory referral has been made on record handling. No misconduct finding has been issued.",
      ],
      quote: [
        "Clinical Operations Group: We need a confirmed contingency transfer route before moving wards. Give us a timetable with conditions so that we can plan staffing.",
        "Hospital Users Council: Tell families which services will move and when. The notice should distinguish verified facts and unresolved risks.",
      ],
    },
    {
      id: "C",
      title: "Immediate response options",
      paras: ["The Committee can spend $6 million on additional assurance and can start new controls within four weeks. Authorisation by the lift regulator remains mandatory. The opening date is conditional on clinical readiness."],
      options: [
        { name: "Option 1 — Contractor retest and monthly reporting", text: "$1.3 million; one week. Retest the seven faulty lifts and submit certificates and monthly action logs. No independent review of earlier inspection records or separate notice trigger." },
        { name: "Option 2 — Independently reopen all inspections across the public estate", text: "$10.2 million; ten weeks to mobilise. Review every lift log at eight public facilities. The same team would review this wing and the other sites in sequence." },
        { name: "Option 3 — Independent checks at critical stages and risk-based escalation", text: "$5.4 million; three weeks. Commission independent checks of shaft clearances, installation records and loaded trials in the new wing. Keep isolated lifts out of use until cleared. Introduce an escalation protocol and public readiness updates. Sample two other projects that share the same inspection procedure." },
      ],
    },
    {
      id: "D",
      title: "Proposed verification and reporting rules",
      bullets: [
        "For remaining installation or rework, record shaft measurements before fitting rails, then record alignment and clearances before commissioning. For installed equipment, use safe direct checks where possible and record any evidentiary gap for independent resolution.",
        "Escalate any safety-critical fault or potential loss of a required patient-transfer route to the duty engineer and opening board within 24 hours. Update patients when confirmed disruption changes service arrangements. Name a lead for each update and publish the next update date.",
        "The works engineer confirms that defects have been corrected, the independent verifier signs the supporting measurements and tests, the regulator decides whether to authorise use, and hospital operations signs off clinical transfer readiness.",
      ],
    },
  ],
  learnPoints: [
    "文件未簽同工程有缺陷係兩個訊號。用實測紀錄同獨立覆核決定可否放行。",
    "分開通報安全風險、向病人披露服務安排，同調查責任。",
    "先定臨床啟用條件，再講工期。醫院要測試兩條完整病床轉運路線。",
  ],
  model: {
    to: "Capital Works Committee",
    from: "Administrative Officer, Public Works Bureau",
    subject: "Assurance and Disclosure for the Harbour Ridge Clinical Wing",
    date: "16 November 2026",
    sections: [
      { h: "1. Opening", html: "<p>Repeated lift faults threaten the readiness of Harbour Ridge Hospital's new clinical wing. This paper recommends independent checks and a clear escalation procedure so the hospital can plan its opening against verified patient-transfer capacity.</p>" },
      { h: "2. Problem analysis", html: "<p><strong>Inspection evidence is incomplete at critical stages.</strong> Five files lacked a signed clearance check before rail installation. Three relate to lifts with confirmed alignment or clearance problems. The missing records do not establish the cause of each fault. They do make it difficult to show that dimensional problems were identified before work advanced. Faults may then surface during commissioning, when rework costs more and can disrupt the opening.</p><p><strong>Defect records did not reach clinical decision-makers in time.</strong> The opening board learned of the possible transfer impact more than a month after repeated faults first appeared in the site log. Only one of two required routes has passed an end-to-end test. Late escalation reduces the time to plan ward transfers and explain changes to staff and families. It is distinct from the unresolved investigatory referral.</p>" },
      { h: "3. Option comparison", html: "<p>Option 1 is cheap and immediate, but relying on contractor retests leaves earlier gaps in inspection evidence and offers no prompt notice when a fault affects patient transfer. Monthly reporting is too slow for an issue that could change the opening plan.</p><p>Option 2 could identify common failures across public facilities, but mobilisation misses the four-week limit and costs $4.2 million above the ceiling. Reviewing unrelated lifts in sequence might also delay work on the routes that matter first.</p><p>Option 3 starts within three weeks for $5.4 million and concentrates independent checks on the clinical wing. Sampling two projects using the same procedure provides a reasoned basis for deciding whether to look more widely. To answer the hospital's concern about rostering, publish conditional opening milestones and keep existing arrangements in place until both bed-transfer routes pass.</p>" },
      { h: "4. Recommendation", html: "<p>Appoint an independent verifier within three weeks. Require signed measurements before major rework progresses and load tests before requesting authorisation. The works engineer should confirm corrections, the verifier should check the evidence and the regulator should authorise use. The hospital opening board should confirm readiness only after both routes pass end-to-end trials. Escalate safety-critical faults or threats to either required route within 24 hours. The hospital communications lead should issue confirmed service changes and the next update date, keeping staff and patients informed without prejudging the referral.</p>" },
      { h: "5. Closing", html: "<p>After three months, review the share of critical stages with complete signed evidence, the share of serious incidents escalated within 24 hours and the recurrence of faults after handover. Expand the independent review if the sample reveals similar control failures. Open the clinical wing only after the regulator and hospital each confirm their requirements have been met. For Members’ consideration.</p>" },
    ],
  },
});
