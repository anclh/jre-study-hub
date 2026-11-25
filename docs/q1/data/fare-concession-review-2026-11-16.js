/* Original fictional City of Jade exercise. All documents, figures and statements in the case are invented. */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "fare-concession-review-2026-11-16",
  title: "Reviewing the Fare Concession · City of Jade",
  titleZh: "乘車優惠／補貼與必要出行",
  tip: "虛構練習。先將補貼、登車次數同完整旅程分開睇，再按五部分框架寫約 700 字。寫完先睇範文。",
  task: {
    role: "You are an Administrative Officer in the City of Jade's Transport and Welfare Bureau. Write an internal discussion paper for the Mobility Committee after the first month of a revised fare concession for older and eligible disabled passengers.",
    bullets: [
      "Identify two problems with the early results. Explain what the evidence can and cannot show about public spending and access to essential destinations.",
      "Compare the three options on cost, delivery, evaluation quality and protection of essential travel. Recommend one approach and respond to a stakeholder concern.",
      "Explain who should implement the recommendation, what to measure and how the Committee should use the six-month review to decide what happens next.",
    ],
    note: "Write about 700 words in formal English using only the Data File. All figures and organisations in this exercise are fictional.",
  },
  docs: [
    {
      id: "A",
      title: "Treasury payment and ticketing extract",
      paras: [
        "From 1 April, Jade replaced its flat $2 fare per eligible boarding with a $2 fare where the adult fare is $8 or less and 25% of the adult fare otherwise. The Treasury reimburses operators for the difference. An onward boarding is charged separately.",
      ],
      table: {
        headers: ["Indicator", "March", "April"],
        rows: [
          ["Ordinary weekdays", "23", "19"],
          ["Weekend days or public holidays", "8", "11"],
          ["Mean subsidy per ordinary weekday", "$3.50m", "$3.30m"],
          ["Mean subsidy per weekend day or public holiday", "$1.95m", "$1.90m"],
          ["Total subsidy", "$96.10m", "$83.60m"],
        ],
      },
      bullets: [
        "The averages are shown to the nearest $0.01 million. The extract includes no matched data for the same season in earlier years.",
        "An accessible shuttle was suspended for two weeks in April at East Basin. Ticketing records show boardings and reimbursements, but do not record destinations, journey purpose or trips people chose not to make.",
      ],
    },
    {
      id: "B",
      title: "Passenger access survey and route note",
      bullets: [
        "A panel of 120 older passengers and 80 eligible disabled passengers kept a one-week travel diary in both months. All lived in East Basin or Hill Gate and were recruited through two service centres. The panel is not representative of Jade.",
        "Among 100 panel members who had at least one scheduled clinic or rehabilitation visit in each diary week, 84 completed all such journeys in March and 73 did so in April. None of these figures establishes why a journey was missed.",
        "A typical journey from Hill Gate to North Clinic requires two boardings each way, with adult fares of $12 and $6. The eligible return fare rose from $8 to $10. The direct route has no step-free stop near the clinic entrance.",
      ],
    },
    {
      id: "C",
      title: "Six-month options and spending ceiling",
      paras: [
        "The Committee has $9 million in additional funds for six months, including evaluation. A first review of access must be ready within eight weeks. A targeted safeguard, if selected, must begin within eight weeks.",
      ],
      options: [
        {
          name: "Option 1 — Keep the current fare and commission an evaluation",
          text: "$3 million over six months. First report at week eight. Reweight payments by day type and compare with the same months in the preceding year. Recruit a wider travel diary panel. No change to fares or access support during the review.",
        },
        {
          name: "Option 2 — Restore the flat fare citywide for six months",
          text: "$24 million including a basic payment review. Operators can revert within four weeks. Reduces the cost of affected boardings for all beneficiaries, but does not restore a suspended service or address inaccessible stops.",
        },
        {
          name: "Option 3 — Evaluate the reform and pilot an essential-journey rebate",
          text: "$8.5 million including evaluation. First report and first rebate by week eight. Reimburse the increase above the former fare on travel to scheduled medical or rehabilitation appointments for up to 2,000 eligible passengers in East Basin and Hill Gate. Run the same evaluation as Option 1, tracking pilot districts and comparable districts outside the pilot separately. Limited to registered appointments on existing routes.",
        },
      ],
    },
    {
      id: "D",
      title: "Statements to the Mobility Committee",
      quote: [
        "Jade Independent Living Forum: Some members need to take two routes because the direct stop is not accessible. An app-only claim would miss people who most need help. Some workers also face higher fares on journeys the medical rebate would not cover.",
        "Jade Transit Operators Council: We can supply aggregate boarding and fare data by route and day type. Tell us which indicators you need before asking us to change the fare system.",
        "East Basin Health Centre: We can verify that an appointment was scheduled without collecting a diagnosis. We can also help passengers submit claims at the counter.",
      ],
    },
  ],
  learnPoints: [
    "用相同日數組合重算補貼：以 3 月日數計，4 月日均費率對應約 $91.1m，較 3 月少約 $5m。",
    "分清登車、完整旅程同必要旅程。用完成覆診或復康旅程衡量可及性，交代樣本限制同其他可能原因。",
    "比較同一套準則。揀試點就交代紙本／櫃位安排，亦要講清楚邊類旅程未受保障。",
    "分開監察票價改革同試點效果。用六個月嘅開支同出行數據決定保留、調整或擴大支援。",
  ],
  model: {
    to: "Mobility Committee",
    from: "Administrative Officer, Transport and Welfare Bureau",
    subject: "Evaluation of the Revised Fare Concession and Protection of Essential Travel",
    date: "16 November 2026",
    sections: [
      {
        h: "1. Opening",
        html: `<p>City of Jade's first month of fare reform showed lower reimbursement and fewer completed clinic journeys among surveyed passengers. This paper recommends a six-month evaluation with a targeted rebate to protect access to scheduled care while the Bureau tests the effect on spending and mobility.</p>`,
      },
      {
        h: "2. Problem analysis",
        html: `<p><strong>The monthly comparison overstates the decrease on a common calendar.</strong> Reimbursement fell from $96.1 million to $83.6 million, but April had four fewer ordinary weekdays. Applying April's weekday and non-weekday averages to March's mix gives about $91.1 million. The resulting $5 million difference is less than half the raw $12.5 million decline. It still reflects any other changes in travel or services between the two months. Treating it as a permanent saving could leave the Bureau with an unrealistic budget.</p>
<p><strong>Boarding figures miss the burden on passengers with limited alternatives.</strong> A Hill Gate clinic return journey rose from $8 to $10 because an accessible journey requires transfers. Among 100 panel members with appointments in both diary weeks, the number completing every scheduled clinic or rehabilitation journey fell from 84 to 73. The panel was recruited from two service centres and the East Basin shuttle suspension may have affected travel. The fall warrants investigation because repeated missed visits could interrupt care.</p>`,
      },
      {
        h: "3. Option comparison",
        html: `<p>The decision should balance the six-month budget, implementation deadlines, the quality of evaluation and protection of essential journeys.</p>
<p><strong>Option 1</strong> delivers an evaluation on time for $3 million and gives the Bureau evidence on travel that ticketing data cannot provide. It leaves passengers facing additional costs throughout the review, including those who need several boardings to reach a clinic.</p>
<p><strong>Option 2</strong> restores lower fares broadly within four weeks. Its $24 million cost exceeds the $9 million ceiling, and the reversal would cut short observation of the revised fare. Passengers who cannot reach an accessible stop would still face a service barrier.</p>
<p><strong>Option 3</strong> meets the spending and timing limits, preserves evidence on the revised fare outside the pilot and offsets increases on eligible journeys to scheduled care in two districts. It offers narrower support than restoration. The accessibility forum's concern about app-only claims can be addressed through paper forms and in-person assistance at participating clinics. The Bureau should also track work journeys outside the rebate to see whether they warrant a different response.</p>`,
      },
      {
        h: "4. Recommendation",
        html: `<p>Approve Option 3 and review both the rebate and the underlying fare reform after six months.</p>
<ul>
<li><strong>Who:</strong> The Bureau should lead. Operators should provide aggregate ticketing data, and clinics and welfare centres should assist with enrolment and verify appointments without collecting diagnoses.</li>
<li><strong>When and where:</strong> Start by week eight in East Basin and Hill Gate. Prioritise eligible passengers with repeated appointments who face fare increases on transfer-dependent routes.</li>
<li><strong>Resources:</strong> Cap six-month spending at $8.5 million and enrol no more than 2,000 passengers within the pilot. Monitor claims and remaining funds monthly.</li>
<li><strong>Evaluation:</strong> Compare payments on a common mix of weekdays and holidays and use prior-year months as a seasonal check. Compare travel outcomes before and after launch in the pilot and similar non-pilot districts. Check service disruptions, earlier trends and differences in who responds before attributing any change to the rebate.</li>
</ul>`,
      },
      {
        h: "5. Closing",
        html: `<p>At six months, review calendar-adjusted subsidy, the share of scheduled care journeys completed and the share of eligible claims paid within 14 days. Report outcomes separately for older and disabled passengers and for those needing transfers. Expand the rebate only if access improves within budget. If missed journeys persist because of routes or stops, work with operators on service changes. For Members’ consideration.</p>`,
      },
    ],
  },
});
