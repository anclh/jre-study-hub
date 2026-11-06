/* Urban Heat Resilience Q1 pack — loaded by ../app.js */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "urban-heat-2026-11-06",
  title: "Urban Heat Risk & Neighbourhood Cooling · City of Jade",
  titleZh: "城市熱風險與社區降溫（2026-11-06 模擬卷）",
  tip: "先做 15–20 分鐘四步速讀：標 P1/P2、options、constraints/objections，刪走蘭花展噪音；再按固定五段骨架寫。",
  task: {
    role: "You are an Administrative Officer in the Environment and Ecology Bureau (EEB), City of Jade. Draft an internal discussion paper for the Interdepartmental Task Group on Summer Heat Resilience.",
    bullets: [
      "Identify two major problems in protecting residents from extreme urban heat and assess their wider implications.",
      "Compare the options using common criteria, address objections inline, and recommend a feasible package with delivery arrangements and KPIs."
    ],
    note: "Write in clear formal English. Analyse rather than paraphrase the data."
  },
  docs: [
    { id: "A", title: "EEB / Health Department Heat-Risk Review (September 2026)", bullets: [
      "Jade recorded 31 days above 33°C in 2026, up from 18 days in 2016.",
      "Six older districts have 8% tree canopy vs 24% in newer districts; night-time surface temperatures average 3.2°C higher.",
      "Heat-related ambulance calls rose 28% year-on-year; people aged 65+ accounted for 54%, and 62% of calls came from the six older districts.",
      "Of 120,000 low-income households in those districts, 37% have no air-conditioner in the main living area. Electricity arrears rose 19% this summer.",
      "The Health Department estimates 41% of heat-related emergency attendances could be avoided with earlier warnings, accessible cool spaces and welfare checks.",
      "EEB maintains 14 public cooling centres, but only four open beyond 8 p.m.; average use was 31% of capacity on ordinary hot days.",
      "Noise: the Jade Horticulture Society plans its annual orchid exhibition in March 2027."
    ]},
    { id: "B", title: "Proposed Options", options: [
      { name: "Option 1 — Universal summer electricity rebate", text: "Pay $2,000 to every household for three summer months. Cost: $1.44 billion/year; launch in six weeks. No means test or health-risk targeting." },
      { name: "Option 2 — Eight new district cooling halls", text: "Build halls in six older districts and two transport hubs. Capital: $1.9 billion; annual operating cost: $210 million. Delivery: 4–6 years; requires 180 additional facility and health-support staff." },
      { name: "Option 3 — Heat-safe neighbourhood package", text: "Extend existing centre hours, add mobile shaded rest points, coat eligible walk-up roofs with reflective material, and provide targeted electricity credits plus scheduled welfare checks. Two-district pilot in four months. Setup: $32 million; annual recurrent cost: $168 million." }
    ]},
    { id: "C", title: "Stakeholder Submissions", quote: [
      "Federation of Residents’ Organisations: A centre closing at 6 p.m. does little for people in overheated flats at night; some older residents cannot walk to a distant hall.",
      "Property Owners’ Association: Roof works may cause disruption and unfairly benefit tenants; owners should not carry open-ended maintenance costs.",
      "Treasury Branch: New recurrent heat-resilience spending is capped at $180 million/year. Proposals must target high-risk districts and show health outcomes.",
      "District Health Network: Cash helps with bills, but without outreach, isolated residents may not recognise danger or seek help in time."
    ]},
    { id: "D", title: "0–5 min Sort & Highlight Reference", bullets: [
      "P1: 8% vs 24% canopy; +3.2°C night surface temperature; 37% without AC; arrears +19%.",
      "P2: ambulance calls +28%; 54% aged 65+; 62% from six old districts; only 4/14 centres open after 8 p.m.; 41% attendances potentially avoidable.",
      "Options: O1 fast but $1.44B and untargeted; O2 $1.9B / 4–6 years / 180 staff; O3 $168M recurrent under cap, four-month pilot.",
      "Objections: evening / mobility access; roof disruption and maintenance; outreach needed. Drop orchid exhibition noise."
    ]}
  ],
  learnPoints: [
    "**Step 1 — Sort:** EEB AO → Heat Resilience Task Group; P1 unequal exposure / household vulnerability; P2 inaccessible prevention response; compare cost, speed, staffing and equity; drop orchid exhibition.",
    "**Step 2 — Diagnose:** Heat and energy poverty compound health inequalities; limited evening access leaves older residents exposed and avoidable cases enter emergency care.",
    "**Step 3 — Compare:** O1 breaches the $180M cap eightfold; O2 is slow, costly and staff-intensive; O3 fits the cap and uses existing capacity. Answer owner concerns with opt-in works and capped maintenance; answer access concerns with late hours, transport and home checks.",
    "**Step 4 — Deliver:** EEB leads with Health, District Offices, NGOs and Housing; four-month pilot in Sham Shui Po and Kwun Tong; $32M setup + $168M recurrent; KPIs on ambulance calls, high-risk resident contact and centre availability; review after six months and one hot season."
  ],
  model: {
    to: "Interdepartmental Task Group on Summer Heat Resilience",
    from: "Administrative Officer, Environment and Ecology Bureau (EEB)",
    subject: "A Targeted Neighbourhood Response to Extreme Urban Heat",
    date: "6 November 2026",
    sections: [
      { h: "1. Opening", html: "<p>As extreme heat becomes more frequent, residents in older, densely built districts face disproportionate exposure and limited access to effective relief. This paper examines the linked problems of unequal heat vulnerability and gaps in the current response, and recommends a targeted, deliverable package within the recurrent spending ceiling.</p>" },
      { h: "2. Problems and implications", html: "<p><strong>Problem 1 — Unequal exposure compounds energy poverty.</strong><br>Tree-canopy cover in six older districts is only <strong>8%</strong>, compared with 24% in newer areas, while night-time surface temperatures average 3.2°C higher. At the same time, 37% of low-income households in these districts lack air-conditioning in their main living area, and their electricity arrears rose 19% this summer. This combination makes heat protection dependent on household means. Left unaddressed, it risks worsening existing health inequalities and pushing vulnerable households into a cycle of heat-related illness and energy debt. The 28% year-on-year increase in heat-related ambulance calls points to wider pressure on emergency services as hot periods lengthen.</p><p><strong>Problem 2 — The current response misses people at critical times and places.</strong><br>Jade has 14 public cooling centres, but only four open beyond 8 p.m.; some older residents also cannot walk to a distant facility. Yet 62% of heat-related ambulance calls came from the six older districts, and 54% involved people aged 65 or above. The Health Department estimates that 41% of heat-related emergency attendances could be prevented through earlier warnings, accessible cool spaces and welfare checks. Without these measures, avoidable cases may continue to enter emergency care, reducing capacity for other patients and weakening public confidence in the city’s heat preparedness.</p>" },
      { h: "3. Comparison of options", html: "<p>The options should be assessed against effectiveness, fiscal sustainability, speed and staffing feasibility, and equitable access. <strong>Option 1</strong>, a universal summer electricity rebate, could be launched within six weeks and help households meet bills. However, its <strong>$1.44 billion</strong> annual cost exceeds the $180 million recurrent ceiling eightfold. As it is not means-tested, much of the subsidy would go to households at lower risk, while cash alone would not ensure that isolated residents receive warnings or assistance.</p><p><strong>Option 2</strong> would add permanent cooling halls, but its $1.9 billion capital cost and four-to-six-year lead time make it unsuitable as the main response to immediate risk. Recruiting 180 additional facility and health-support staff would also be challenging. Moreover, a hall-based model does not by itself solve the difficulty older or mobility-limited residents face in reaching a centre.</p><p><strong>Option 3</strong> offers the strongest balance. At $168 million in annual recurrent spending, it stays within the Treasury ceiling and combines targeted household support with prevention and accessible services. The Property Owners’ Association is right that roof works could create disruption and unclear maintenance liabilities. This concern can be addressed through opt-in works, standardised specifications and a capped maintenance grant with a defined term. The package should also extend centre hours and provide transport or home checks for people unable to travel, addressing the concern that a distant centre closing early offers little protection.</p>" },
      { h: "4. Recommendation", html: "<p>On balance, a phased pilot of Option 3 is recommended, subject to clear targeting and outcome monitoring:</p><ul><li><strong>Leadership:</strong> EEB should lead, with the Health Department identifying high-risk residents and monitoring health outcomes. District Offices and NGOs should conduct outreach, while the Housing Department coordinates building access and roof works.</li><li><strong>Pilot and timing:</strong> Within four months, launch in Sham Shui Po and Kwun Tong, selecting blocks with low canopy, high ambulance-call rates and low household cooling access. The pilot should run through one hot season.</li><li><strong>Resources:</strong> Seek $32 million in one-off setup funding and ring-fence annual recurrent costs at $168 million. Extend existing centres rather than build new halls, and direct credits and works to eligible households and buildings.</li><li><strong>Access and safeguards:</strong> Open pilot centres until midnight on forecast hot nights. Arrange transport for residents with mobility needs and scheduled welfare checks for identified isolated residents. Roof works should be voluntary, with capped grant and maintenance terms agreed before installation.</li></ul>" },
      { h: "5. Closing", html: "<p>Success should be measured by a 15% reduction in heat-related ambulance calls in pilot areas, contact through a warning or welfare check with 80% of identified high-risk residents, and 90% centre availability on triggered nights. EEB should conduct a six-month progress review and a post-season evaluation before considering expansion. For Members’ consideration.</p>" }
    ]
  }
});
