/* Nine additional fictional City of Jade Q1 packs aligned with under-covered Q2 themes. */
(function () {
  window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];

  function addPack(p) {
    const task = {
      role: `You are an Administrative Officer in the ${p.bureau}, City of Jade. Draft an internal discussion paper for the ${p.recipient}.`,
      bullets: [
        `Identify two major problems in ${p.issue} and assess their implications.`,
        "Compare the options using common criteria, address objections inline, and recommend feasible measures with delivery arrangements and KPIs."
      ],
      note: "Write in clear formal English. Analyse rather than paraphrase. Use only this fictional Data File."
    };
    const modelSections = [
      { h: "1. Opening", html: `<p>${p.model.opening}</p>` },
      { h: "2. Problems and implications", html: p.model.problems.map(x => `<p>${x}</p>`).join("") },
      { h: "3. Comparison of options", html: p.model.comparison.map(x => `<p>${x}</p>`).join("") },
      { h: "4. Recommendation", html: `<p>${p.model.recommendation.intro}</p><ul>${p.model.recommendation.points.map(x => `<li>${x}</li>`).join("")}</ul>` },
      { h: "5. Closing", html: `<p>${p.model.closing}</p>` }
    ];
    window.Q1_CASE_PACKS.push({
      id: p.id, title: p.title, titleZh: p.titleZh,
      tip: "先用 15 分鐘內完成 task／Data File planning，再按五段骨架寫 memo；留意 Doc D 的 Step 1 排序提示。",
      task,
      docs: [...p.docs, { id: "D", title: "Step 1 — Sorted notes (0–5 min reference)", bullets: p.sort }],
      learnPoints: [
        `**Step 1 — Sort:** ${p.sort.join(" ")}`,
        `**Step 2 — Diagnose:** ${p.problems.join(" ")}`,
        `**Step 3 — Compare:** ${p.compare}`,
        `**Step 4 — Deliver:** ${p.deliver}`
      ],
      model: {
        to: p.recipient, from: `Administrative Officer, ${p.bureau}`,
        subject: p.subject, date: "9 November 2026", sections: modelSections
      }
    });
  }

  addPack({
    id: "housing-land-2026-11-09", title: "Housing Land Readiness · City of Jade", titleZh: "房屋與土地／熟地交付",
    bureau: "Housing and Development Bureau", recipient: "Interdepartmental Task Group on Housing Delivery", issue: "the housing land and construction pipeline",
    subject: "Turning Housing Sites into Deliverable Supply",
    docs: [
      { id: "A", title: "Housing Supply Review (fictional figures)", bullets: [
        "The public-housing waiting time is 5.8 years, up from 4.9 years four years ago; applications rose 14% over the same period.",
        "Of 42,000 units scheduled for completion in the next five years, only 54% are on sites with all enabling works funded and underway.",
        "In three growth districts, drainage, road access and utility diversion account for 61% of slippage against the original site programme.",
        "Average time from site identification to works-ready status is 6.2 years; contractors report a 13% shortage in experienced site supervisors.",
        "The annual interdepartmental spring reception is planned for April."
      ]},
      { id: "B", title: "Floated options", options: [
        { name: "Option 1 — Universal rent credit", text: "Provide $1,000 monthly to every public-housing applicant. Fast to administer; estimated recurrent cost $1.1 billion a year and does not add homes." },
        { name: "Option 2 — New mega-estate programme", text: "Acquire and build three new estates. Capital cost $4.6 billion; first homes in 7–9 years; requires 260 additional project staff." },
        { name: "Option 3 — Site-readiness delivery compact", text: "Prioritise enabling works on ready or near-ready sites, publish interdepartmental milestones and use modular construction on suitable plots. Setup $70 million; recurrent coordination and assurance cost $118 million a year; pilot in two districts within 9 months." }
      ]},
      { id: "C", title: "Stakeholders and Treasury", quote: [
        "Public Housing Applicants’ Alliance: Families need a visible completion timetable; announcing unit targets without dates has weakened confidence.",
        "Small Builders’ Federation: Modular methods can shorten work on suitable sites, but design changes after tender and uneven inspection standards create cost and quality risks.",
        "Treasury Branch: New recurrent housing-delivery support is capped at $150 million a year; any pilot must report completed enabling milestones and units delivered."
      ]}
    ],
    sort: ["P1: 5.8-year wait; only 54% of pipeline has funded enabling works; site readiness averages 6.2 years.", "P2: delays cluster in drainage, access and utilities; supervisor shortage is 13%.", "O1 costs $1.1B recurrent; O2 costs $4.6B and takes 7–9 years; O3 costs $118M recurrent under the $150M cap.", "Address modular quality and change-control concerns; drop the spring reception."],
    problems: ["Unready sites delay planned supply and prolong the waiting list.", "Fragmented works sequencing and thin project supervision make delivery dates unreliable."],
    compare: "effectiveness, recurrent affordability, delivery time/manpower and build quality; only Option 3 can target the current pipeline within the cap.",
    deliver: "The Housing and Development Bureau should lead a nine-month, two-district pilot; fund $70M setup and cap recurrent cost at $118M; publish milestone, completion and quality KPIs quarterly.",
    model: {
      opening: "Jade’s housing shortage is aggravated by delays between identifying land and completing enabling works. This paper compares three ways to improve delivery and recommends a capped pilot focused on sites closest to construction.",
      problems: [
        "The first problem is that a sizeable share of planned housing supply is not yet deliverable. Although 42,000 units are scheduled over five years, only 54% sit on plots with enabling works funded and underway. With the public-housing wait already 5.8 years, delays risk extending hardship for applicants and reducing confidence in announced supply.",
        "Secondly, responsibility for site preparation is fragmented and specialist capacity is thin. Drainage, road access and utilities account for 61% of slippage in three growth districts, while experienced site supervisors are 13% short. This may create repeated redesign and cost escalation, tying up public funds without producing completed homes."
      ],
      comparison: [
        "Options should be weighed by units delivered, recurrent affordability, speed and quality control. Option 1 offers immediate household relief, but its $1.1 billion annual cost exceeds the $150 million ceiling and adds no supply.",
        "Option 2 creates long-term capacity, yet $4.6 billion in capital, a 7–9-year lead time and 260 new posts make it a poor answer to current bottlenecks.",
        "Option 3 is more proportionate: it targets near-ready sites and costs $118 million recurrently. Builders’ concerns about modular quality are valid; standard designs, independent inspection and a formal change-control gate should precede each site award."
      ],
      recommendation: { intro: "A two-district pilot of Option 3 is recommended.", points: [
        "The Housing and Development Bureau should lead, with Transport, Drainage and Utility departments assigning named project officers.",
        "Begin within nine months on sites with funded works and clear land access; review after 12 months.",
        "Seek $70 million setup funding and cap annual coordination and assurance spending at $118 million.",
        "Publish quarterly enabling-work milestones, schedule variance, units completed and inspection defect rates."
      ]},
      closing: "The pilot should be expanded only if it shortens works-ready time without weakening inspection outcomes. A 12-month review should guide any further allocation; for Members’ consideration."
    }
  });

  addPack({
    id: "youth-employment-2026-11-09", title: "Youth Employment & Skills Match · City of Jade", titleZh: "青年就業／技能配對",
    bureau: "Labour and Skills Bureau", recipient: "Interdepartmental Committee on Youth Employment", issue: "young people’s transition from training into stable work",
    subject: "Improving the Transition from Training to Work",
    docs: [
      { id: "A", title: "Youth Labour Market Brief (fictional figures)", bullets: [
        "Among residents aged 18–29, unemployment is 8.4%, compared with 4.1% for the whole working-age population.",
        "Training enrolment rose 22% in three years, but only 46% of completers entered a related job within six months.",
        "In the northern districts, 38% of surveyed employers report vacancies in digital operations, logistics and health support; 57% of jobseekers there lack transport for evening placements.",
        "Only 29% of current placements include a named workplace mentor; six-month retention is 52%.",
        "A bureau dragon-boat team trial is scheduled for May."
      ]},
      { id: "B", title: "Options and resource envelope", options: [
        { name: "Option 1 — Universal youth employment allowance", text: "Pay $3,000 monthly to all unemployed young adults for six months. Can start in three months; recurrent cost about $780 million a year; does not ensure training or job matching." },
        { name: "Option 2 — Government training campus", text: "Build a central campus with 2,000 annual places. Capital $1.6 billion; 4–6 years to open; requires 90 instructors and support staff." },
        { name: "Option 3 — Paid district placement compact", text: "Co-fund 1,200 paid placements with employers, offer short accredited modules and assign mentors. Setup $24 million; recurrent cost $132 million; pilot in two districts in six months." }
      ]},
      { id: "C", title: "Stakeholder submissions", quote: [
        "Youth Employment Forum: Young people need paid experience and a real route to a job, not repeated courses without employer contact.",
        "Small Business Council: Small firms can host trainees if paperwork is light, wage support arrives on time and placements do not displace existing workers.",
        "Treasury Branch: Annual recurrent youth-employment spending is capped at $150 million; publish completion, placement and retention outcomes."
      ]}
    ],
    sort: ["P1: youth unemployment 8.4% vs 4.1%; only 46% of trainees enter related work within six months.", "P2: vacancies and jobseekers are mismatched by location/transport; only 29% have mentors and retention is 52%.", "O1 $780M; O2 $1.6B / 4–6 years / 90 staff; O3 $132M recurrent under $150M cap.", "Protect small firms from paperwork and displacement; drop the dragon-boat trial."],
    problems: ["Training is not reliably connected to relevant employment.", "Placement support is uneven, especially for young people facing transport and mentoring barriers."],
    compare: "job outcomes, recurrent cost, speed/manpower and fair access; paid placements directly connect training to local vacancies while fitting the ceiling.",
    deliver: "The Labour and Skills Bureau should pilot in two northern districts within six months; use $24M setup and $132M recurrent; track placement, six-month retention and displacement complaints.",
    model: {
      opening: "Jade’s youth-employment challenge reflects both a high unemployment gap and a weak bridge from training to work. This paper compares three options and recommends a district placement pilot tied to employer demand and measurable retention.",
      problems: [
        "First, training participation is not translating into relevant employment. Enrolment rose 22%, yet fewer than half of completers entered a related job within six months. This may waste public training investment and leave young people with credentials that do not improve their prospects.",
        "Second, access to quality work experience is uneven. Only 29% of placements include a named mentor and six-month retention is 52%; in northern districts, many jobseekers also lack transport for evening placements. Vacancies can therefore remain unfilled while young people miss practical experience, widening district and income gaps."
      ],
      comparison: [
        "The options should be assessed by job outcomes, affordability, speed and accessibility. Option 1 is simple but its $780 million annual cost far exceeds the $150 million cap and does not guarantee skills or work experience.",
        "Option 2 offers structured training, but the $1.6 billion campus, 4–6-year lead time and 90 additional staff postpone support and concentrate it in one location.",
        "Option 3 can start within six months, costs $132 million recurrently and links short modules to paid vacancies. Small firms’ concerns about administration and displacement should be addressed through a one-page claim process, prompt wage reimbursement and a rule that placements cannot replace existing posts."
      ],
      recommendation: { intro: "A two-district paid placement pilot is recommended.", points: [
        "The Labour and Skills Bureau should lead with accredited training providers and participating employers.",
        "Start in two northern districts within six months, prioritising sectors with documented vacancies.",
        "Seek $24 million for setup and cap annual recurrent costs at $132 million.",
        "Track completion, related-job placement within six months, retention and substantiated displacement complaints."
      ]},
      closing: "Expansion should depend on verified job quality and retention, not enrolment alone. Review the pilot after 12 months and adjust employer support where access remains weak; for Members’ consideration."
    }
  });

  addPack({
    id: "tourism-culture-2026-11-09", title: "Tourism, Culture & District Flow · City of Jade", titleZh: "旅遊文化／分流與地區受惠",
    bureau: "Culture, Tourism and Commerce Bureau", recipient: "Task Group on Sustainable Visitor Economy", issue: "visitor concentration and uneven district benefits",
    subject: "Dispersing Visitors and Sharing Tourism Benefits",
    docs: [
      { id: "A", title: "Visitor Economy Snapshot (fictional figures)", bullets: [
        "Jade received 31 million visitor trips last year, 18% above the year before; 72% of overnight visitors used three central districts as their main base.",
        "On peak weekends, two heritage streets exceed their safe pedestrian-flow threshold for about 90 minutes; nearby small shops report lost local customers.",
        "Outside the central cluster, 64% of surveyed cultural venues have spare weekday capacity, yet only 21% of visitors can name an attraction outside the core.",
        "Small cultural operators cite fragmented ticketing and uncertain coach access; annual maintenance costs for the waterfront promenade rose 17%.",
        "The government archive’s stamp-collecting day is in June."
      ]},
      { id: "B", title: "Policy options", options: [
        { name: "Option 1 — Universal visitor coupon", text: "Issue a $200 coupon to each visitor. Launch in four months; estimated cost $620 million yearly; likely to subsidise trips already planned and add no crowd management." },
        { name: "Option 2 — New international convention and culture complex", text: "Capital cost $2.8 billion; 6–8 years to deliver; annual operation $185 million and 140 additional staff." },
        { name: "Option 3 — District culture-pass pilot", text: "Bundle timed entry, transport information and small-venue offers across four districts; provide crowd stewards on peak days. Setup $36 million; recurrent $108 million; launch in eight months." }
      ]},
      { id: "C", title: "Stakeholders and Treasury", quote: [
        "Central District Residents’ Group: Promotion without crowd limits shifts disruption onto residents and local shops.",
        "Cultural Venue Network: A shared pass could help smaller venues, but commissions, coach access and visitor data must be transparent.",
        "Treasury Branch: New recurrent visitor-management spending is capped at $120 million yearly and should report district spread and crowd safety."
      ]}
    ],
    sort: ["P1: visitor trips +18%; 72% concentrate in three central districts and peak streets exceed flow thresholds.", "P2: 64% of non-core venues have spare weekday capacity, but awareness is only 21%; small operators face access/ticketing barriers.", "O1 $620M recurrent; O2 $2.8B + $185M recurrent / 6–8 years / 140 staff; O3 $108M recurrent under $120M cap.", "Address residents’ crowding and operators’ data/commission concerns; drop the archive event."],
    problems: ["Visitor spending and pressure are concentrated in a few districts.", "Underused cultural venues are poorly connected to visitor planning and transport information."],
    compare: "visitor distribution and crowd safety, recurrent affordability, delivery time and small-operator access; Option 3 tests demand before major construction.",
    deliver: "The Culture, Tourism and Commerce Bureau should pilot the pass across four districts in eight months; spend $36M setup/$108M recurrent; publish crowd-flow, non-core visits and SME participation KPIs.",
    model: {
      opening: "Jade’s visitor growth is concentrated in a small central area, while cultural venues elsewhere remain underused. This paper assesses options for improving visitor distribution and local benefits without creating an open-ended operating burden.",
      problems: [
        "The first problem is uneven concentration. Although visitor trips rose 18%, 72% of overnight visitors base themselves in three central districts and two heritage streets exceed safe flow thresholds on peak weekends. This disrupts residents and local trade while exposing the administration to crowd-safety risks.",
        "Secondly, attractions outside the core are not well connected to visitor itineraries. Most surveyed venues have weekday capacity, but only 21% of visitors know of a non-core attraction. Fragmented ticketing and coach access prevent smaller operators from benefiting and leave public cultural assets underused."
      ],
      comparison: [
        "Options should be compared by visitor dispersal, safety, cost, speed and accessibility for small operators. Option 1 is fast but its $620 million annual cost is high and may subsidise trips that would occur anyway.",
        "Option 2 adds a major venue but requires $2.8 billion, 6–8 years and $185 million annual operation, above the $120 million cap; it would not address current crowd pressure.",
        "Option 3 is a reversible pilot at $108 million recurrently. Operators’ concerns about commissions and data sharing should be addressed through published fee rules, opt-in participation and aggregated reporting. Timed entry and peak-day stewards should also respond to residents’ safety concerns."
      ],
      recommendation: { intro: "A four-district culture-pass pilot is recommended.", points: [
        "The Culture, Tourism and Commerce Bureau should lead, with transport agencies, district offices and venue operators.",
        "Launch in eight months across two central and two under-visited districts; test weekday and peak-weekend routes.",
        "Seek $36 million setup funding and cap recurrent costs at $108 million annually.",
        "Track peak pedestrian flow, non-core venue visits, small-operator participation and local complaints."
      ]},
      closing: "Scale-up should depend on safer peak flows and verified visitor dispersal, with promenade maintenance funded explicitly. Review after one full visitor season; for Members’ consideration."
    }
  });

  addPack({
    id: "gba-services-2026-11-09", title: "Cross-border Community Services · City of Jade", titleZh: "大灣區融合／跨境服務銜接",
    bureau: "Constitutional and Mainland Affairs Bureau", recipient: "Cross-boundary Service Coordination Committee", issue: "cross-boundary access to health, ageing and employment services",
    subject: "Making Cross-boundary Services Easier to Navigate",
    docs: [
      { id: "A", title: "Cross-boundary Access Review (fictional figures)", bullets: [
        "An estimated 86,000 Jade residents make at least one cross-boundary trip monthly for work, family care or health services; the count rose 16% in three years.",
        "A survey of 4,200 users found 34% had repeated an eligibility assessment after crossing districts or providers; 27% had missed a follow-up because records or appointments were not coordinated.",
        "Older users and people with chronic conditions make 41% of reported service trips; 29% of surveyed users needed help with digital forms.",
        "Existing district liaison counters handle 12,000 enquiries yearly, but only 44% are resolved at first contact.",
        "The interdepartmental dragon boat regatta is planned for August."
      ]},
      { id: "B", title: "Options", options: [
        { name: "Option 1 — Universal travel and service voucher", text: "Provide $1,000 to every cross-boundary traveller. Cost about $510 million recurrently; quick to launch but untargeted and does not coordinate care." },
        { name: "Option 2 — New cross-boundary service centre", text: "Build a single large centre near the checkpoint. Capital $2.1 billion; 5–7 years to open; 230 additional staff and $190 million yearly operation." },
        { name: "Option 3 — Assisted navigator and referral pilot", text: "Create staffed navigation desks, appointment coordination and consent-based record summaries across three service corridors. Setup $42 million; recurrent $126 million; six-month pilot." }
      ]},
      { id: "C", title: "Submissions and constraints", quote: [
        "Cross-boundary Families Network: People should not have to explain their case from the beginning at every counter.",
        "Privacy Commissioner’s Office: Any record exchange must use informed consent, minimum necessary information and clear correction procedures.",
        "Treasury Branch: Recurrent coordination spending is capped at $140 million; no central database should be built before a limited pilot demonstrates need."
      ]}
    ],
    sort: ["P1: 86,000 monthly cross-boundary users; 34% repeat assessment and 27% miss follow-up from poor coordination.", "P2: vulnerable groups rely on services; only 44% of liaison queries resolve first time and digital support is limited.", "O1 $510M recurrent; O2 $2.1B / 5–7 years / 230 staff, $190M recurrent; O3 $126M recurrent within $140M cap.", "Build consent, data minimisation and correction into any record exchange; drop the regatta."],
    problems: ["Users face repeated eligibility checks and fragmented referrals across service boundaries.", "Information and digital access gaps disproportionately affect older and medically vulnerable users."],
    compare: "continuity and accessibility, recurrent affordability, implementation speed and privacy safeguards; a navigator pilot tests coordination before any central system.",
    deliver: "The Constitutional and Mainland Affairs Bureau should lead a six-month pilot in three corridors with service departments; cap annual recurrent cost at $126M; track first-contact resolution, missed follow-ups and consent complaints.",
    model: {
      opening: "Cross-boundary travel is increasingly important to Jade residents, yet service arrangements remain difficult to navigate. This paper compares options for improving continuity while protecting privacy and controlling recurrent expenditure.",
      problems: [
        "The first problem is fragmented service navigation. More than one-third of surveyed users repeated an eligibility assessment, and over one-quarter missed follow-up because appointments or records were not coordinated. This creates avoidable delay and may interrupt care or support for people whose needs cross administrative boundaries.",
        "Secondly, the current system is least accessible to users who need assistance. Older people and those with chronic conditions account for a substantial share of trips, while many users need help completing digital forms. With fewer than half of liaison queries resolved at first contact, users may abandon services or make unnecessary journeys."
      ],
      comparison: [
        "Options should be weighed by continuity, access, affordability, speed and privacy. Option 1 is simple but costs about $510 million recurrently and does not fix duplicated assessments.",
        "Option 2 offers a visible service point but costs $2.1 billion, takes 5–7 years and requires 230 staff; its $190 million annual cost exceeds Treasury’s ceiling.",
        "Option 3 costs $126 million recurrently and can start in six months. Privacy concerns are material; exchanges should be consent-based, limited to necessary summaries, logged and correctable, with paper and in-person routes retained."
      ],
      recommendation: { intro: "A three-corridor navigator pilot is recommended before considering a shared digital system.", points: [
        "The Constitutional and Mainland Affairs Bureau should lead with health, social-service and district teams.",
        "Start within six months in corridors with high service use; run for one year.",
        "Seek $42 million setup funding and cap recurrent spending at $126 million.",
        "Measure first-contact resolution, repeated assessments, missed follow-ups, user access and privacy complaints."
      ]},
      closing: "Any future expansion should require evidence that users receive more continuous support without excessive data collection. Review after 12 months; for Members’ consideration."
    }
  });

  addPack({
    id: "family-support-2026-11-09", title: "Childcare & Family Support · City of Jade", titleZh: "生育與家庭支援／托兒可及性",
    bureau: "Labour and Family Bureau", recipient: "Task Force on Family and Childcare Support", issue: "affordable childcare and parents’ ability to remain in work",
    subject: "Targeting Childcare Support Where Capacity Is Tight",
    docs: [
      { id: "A", title: "Family Services Review (fictional figures)", bullets: [
        "Jade recorded 32,400 births last year, 7% fewer than five years ago; a survey found that 44% of parents cited childcare cost or availability as a major barrier to having another child.",
        "For children under three, subsidised full-day places cover 58% of assessed demand; median waiting time in four outer districts is 11 months.",
        "Among mothers returning from parental leave, 23% did not resume their previous hours; employers cited inflexible shifts and care gaps.",
        "Community providers report 14% vacancy in qualified early-childhood staff; 39% of subsidised places are unused after 6 p.m. because opening hours do not match shift work.",
        "The bureau’s staff family fun day is planned for July."
      ]},
      { id: "B", title: "Policy options", options: [
        { name: "Option 1 — Universal newborn grant", text: "Pay $20,000 per newborn. Estimated recurrent cost $648 million yearly; can launch in four months but does not improve childcare supply or affordability after birth." },
        { name: "Option 2 — Build public childcare centres", text: "Add 12 centres and 2,400 places. Capital $1.5 billion; 4–6 years to deliver; requires 310 additional qualified staff." },
        { name: "Option 3 — Targeted care-hours partnership", text: "Purchase flexible-hour places from accredited NGOs, provide means-tested childcare credits and co-fund staff retention. Setup $28 million; recurrent $146 million; two-district pilot in seven months." }
      ]},
      { id: "C", title: "Stakeholders and fiscal limit", quote: [
        "Parents’ Association: Support is hard to use when places close before late shifts end; application rules should be simple.",
        "Early Childhood Providers Council: Flexible hours need predictable contracts and safe staffing; short grants make recruitment difficult.",
        "Treasury Branch: Annual recurrent family-service additions are capped at $160 million; target lower-income households and report take-up and parental employment outcomes."
      ]}
    ],
    sort: ["P1: subsidised under-three coverage 58%; outer-district wait 11 months; 44% cite cost/availability as a barrier.", "P2: care hours mismatch work patterns; 23% of mothers do not resume previous hours; childcare workforce vacancy 14%.", "O1 $648M recurrent; O2 $1.5B / 4–6 years / 310 staff; O3 $146M recurrent under $160M cap.", "Design safe staffing, predictable contracts and simple means testing; drop the staff family day."],
    problems: ["Affordable childcare places do not meet demand, especially in outer districts.", "Opening hours and workforce constraints make available capacity unusable for some working parents."],
    compare: "targeted access and employment impact, recurrent cost, speed/staffing and provider sustainability; Option 3 uses existing accredited capacity.",
    deliver: "The Labour and Family Bureau should lead a seven-month pilot in two high-wait districts; fund $28M setup/$146M recurrent; measure wait time, place use and return-to-work outcomes.",
    model: {
      opening: "Families face both a shortage of affordable childcare and service hours that do not fit many work schedules. This paper compares options and recommends a targeted partnership that can use existing accredited capacity while testing outcomes.",
      problems: [
        "First, subsidised childcare supply falls short of assessed demand. Only 58% of under-three demand is covered, and four outer districts report an 11-month wait. This may constrain parents’ work choices and make family support least available where travel options are limited.",
        "Secondly, nominal capacity does not always match working patterns. Nearly one-quarter of mothers returning from leave do not resume previous hours, while provider vacancies and early closing times limit flexible care. This risks reducing household income and wasting places that remain unused after 6 p.m."
      ],
      comparison: [
        "Options should be assessed by access, employment outcomes, recurrent affordability and staffing feasibility. Option 1 is quick but its $648 million yearly cost exceeds the $160 million cap and does not add care capacity.",
        "Option 2 adds places but requires $1.5 billion capital, 4–6 years and 310 qualified staff, making it too slow for current waiting families.",
        "Option 3 costs $146 million recurrently and can start in seven months. Providers’ concerns about safe staffing and recruitment should be met with multi-year service contracts, staffing standards and a retention allowance tied to audited coverage."
      ],
      recommendation: { intro: "A two-district care-hours partnership is recommended.", points: [
        "The Labour and Family Bureau should lead with accredited NGOs, district offices and employers.",
        "Launch in two outer districts within seven months; prioritise families on the longest waiting lists and parents on shift work.",
        "Request $28 million setup funding and cap recurrent spending at $146 million.",
        "Track median wait, evening place utilisation, household eligibility take-up and return-to-work hours."
      ]},
      closing: "Expansion should depend on safe staffing and improved access rather than places announced. Review after one year and adjust credits against actual take-up; for Members’ consideration."
    }
  });

  addPack({
    id: "platform-work-2026-11-09", title: "Platform Work & Courier Protection · City of Jade", titleZh: "平台經濟／送貨員保障",
    bureau: "Labour and Skills Bureau", recipient: "Task Group on Platform Work Standards", issue: "courier safety, income transparency and access to basic protection",
    subject: "A Practical Protection Framework for Platform Couriers",
    docs: [
      { id: "A", title: "Platform Work Review (fictional figures)", bullets: [
        "Jade has about 46,000 active app-based delivery workers; 61% rely on platform work for at least half their monthly income.",
        "A survey found 37% could not predict weekly earnings within 20%; 26% reported an accident or injury in the past year, while 42% said they lacked clear coverage information.",
        "Workers spend a median of 7.5 hours weekly waiting between paid orders; disputed account suspensions take 18 days to resolve on average.",
        "Platforms report that 78% of couriers prefer flexible hours; smaller operators cite thin margins and changing demand.",
        "The Labour Bureau’s annual sports day is scheduled for September."
      ]},
      { id: "B", title: "Options", options: [
        { name: "Option 1 — Universal minimum earnings guarantee", text: "Guarantee all couriers $120 per active hour. Estimated public cost $920 million yearly; may encourage under-reporting of hours and does not directly improve safety." },
        { name: "Option 2 — Public courier service centres", text: "Build 10 centres with advice, rest areas and inspectors. Capital $1.1 billion; 5 years to deliver; requires 180 staff and $170 million annual operation." },
        { name: "Option 3 — Portable protection and transparency code", text: "Require standard earnings statements, rapid appeal channels, safety training and shared accident cover funded by platform levies. Setup $20 million; recurrent administration and premium support $112 million; pilot in six months." }
      ]},
      { id: "C", title: "Stakeholder views and ceiling", quote: [
        "Courier Union: Flexibility matters, but workers need to understand deductions and receive a prompt response when an account is suspended.",
        "Digital Platforms Association: A levy could raise prices and drive small operators out; rules should be consistent and introduced in stages.",
        "Treasury Branch: New recurrent protection spending is capped at $125 million; proposals should use co-funding and publish safety and dispute-resolution outcomes."
      ]}
    ],
    sort: ["P1: 61% rely on platform income; 37% report unpredictable earnings; 26% had an accident/injury and 42% lack clear cover information.", "P2: 7.5 weekly unpaid waiting hours and 18-day account appeal resolution.", "O1 $920M recurrent; O2 $1.1B / 5 years / 180 staff / $170M recurrent; O3 $112M recurrent under $125M cap.", "Address operator cost concerns with phased, consistent co-funding; drop the sports day."],
    problems: ["Couriers face income uncertainty and unclear accident protection.", "Platform decisions and appeals lack timely, transparent processes."],
    compare: "worker protection, public cost, speed/manpower and platform viability; Option 3 sets minimum standards while sharing cost with operators.",
    deliver: "The Labour and Skills Bureau should lead a six-month pilot with willing platforms; cap recurrent spending at $112M; measure injury coverage, earnings-statement compliance and appeal time.",
    model: {
      opening: "Platform delivery work offers flexibility but leaves gaps in protection and information. This paper compares options for improving safety and accountability while preserving a viable market for workers and operators.",
      problems: [
        "The first problem is that workers cannot reliably assess earnings or protection. A majority depend substantially on app income, yet 37% report volatile weekly earnings and 42% are unclear about accident coverage. This can leave injured workers facing financial loss and weakens informed choice about work risks.",
        "Secondly, platform decisions may be difficult to challenge promptly. Account suspension disputes take an average of 18 days, and couriers report long unpaid waiting periods. Delayed appeals can interrupt income, while opaque deductions reduce trust and make enforcement difficult."
      ],
      comparison: [
        "Options should be weighed by protection, affordability, implementation capacity and operator impact. Option 1’s $920 million yearly cost is far beyond the $125 million cap and may reward reported hours without addressing accidents.",
        "Option 2 provides rest and advice facilities but requires $1.1 billion capital, five years, 180 staff and $170 million recurrently.",
        "Option 3 costs $112 million recurrently and can begin in six months. Platforms’ concern about levies and small-operator viability should be addressed through a phased rate, common rules and a temporary co-funding tier for smaller firms, with annual review."
      ],
      recommendation: { intro: "A portable protection and transparency pilot is recommended.", points: [
        "The Labour and Skills Bureau should lead with the insurance regulator, worker representatives and participating platforms.",
        "Start in six months with platforms covering the highest courier volumes; review after one year.",
        "Seek $20 million setup funding and cap annual recurrent administration and premium support at $112 million.",
        "Measure verified accident coverage, statement compliance, injury rates and median appeal resolution time."
      ]},
      closing: "The pilot should protect workers without imposing untested costs on smaller operators. Adjust the levy only after published safety and dispute data; for Members’ consideration."
    }
  });

  addPack({
    id: "public-space-2026-11-09", title: "Public Open Space Management · City of Jade", titleZh: "公共休憩空間／管理與公平使用",
    bureau: "Environment and Public Realm Bureau", recipient: "Interdepartmental Task Group on Neighbourhood Open Space", issue: "equitable access, crowding and upkeep of public spaces",
    subject: "Balancing Access and Upkeep in Public Open Spaces",
    docs: [
      { id: "A", title: "Open Space Audit (fictional figures)", bullets: [
        "Older inner districts provide 1.8 square metres of public open space per resident, compared with 6.4 square metres in newer districts.",
        "Weekend use at 12 waterfront and hillside sites exceeds designed capacity by an average of 35%; recorded litter and minor safety incidents doubled in two years.",
        "A user survey found 31% of older people and 24% of residents with mobility needs could not reach a suitable park within 15 minutes.",
        "Maintenance response time averages 48 hours in central sites and 96 hours in outer districts; 22% of reported defects remain open after one week.",
        "The municipal gardening showcase opens in November."
      ]},
      { id: "B", title: "Options", options: [
        { name: "Option 1 — Universal park access grant", text: "Give every household a $600 recreation credit. Estimated recurrent cost $540 million; no new space or maintenance capacity." },
        { name: "Option 2 — Build three large regional parks", text: "Capital $3.2 billion; 7–10 years to open; annual maintenance $165 million and 240 additional staff." },
        { name: "Option 3 — Neighbourhood access and maintenance compact", text: "Add small shaded rest areas, improve step-free links, use peak-time stewards and publish district maintenance contracts. Setup $33 million; recurrent $104 million; pilot in four districts in seven months." }
      ]},
      { id: "C", title: "Stakeholder submissions", quote: [
        "Access for All Coalition: Reservation systems can exclude people without smartphones; routes and facilities should be usable without an app.",
        "Neighbourhood Operators’ Association: Stewards need clear authority and training; maintenance contracts should reward timely repairs, not just inspections.",
        "Treasury Branch: Recurrent public-space spending is capped at $115 million and should prioritise districts with low provision and high unmet need."
      ]}
    ],
    sort: ["P1: open-space provision is 1.8 vs 6.4 m²/resident; many mobility-limited users cannot reach a park within 15 minutes.", "P2: hotspot use exceeds capacity by 35%; defects linger and safety/litter incidents doubled.", "O1 $540M; O2 $3.2B / 7–10 years / 240 staff / $165M recurrent; O3 $104M recurrent under $115M cap.", "Keep access possible without smartphones; define steward authority and maintenance service levels; drop the showcase."],
    problems: ["Open-space access is geographically unequal and excludes some mobility-limited users.", "Popular sites are overcrowded while maintenance response is slow and uneven."],
    compare: "equity and safety, recurrent affordability, delivery speed/staffing and inclusive access; Option 3 targets underserved districts and existing hotspots.",
    deliver: "The Environment and Public Realm Bureau should pilot in four low-provision districts within seven months; fund $33M setup/$104M recurrent; track access, defect closure and peak crowd incidents.",
    model: {
      opening: "Public spaces are unevenly distributed and some popular sites are under pressure. This paper compares options for improving access and upkeep, with priority given to underserved residents and measurable service standards.",
      problems: [
        "First, access is geographically and physically unequal. Older districts provide only 1.8 square metres per resident against 6.4 in newer areas, while many older people and residents with mobility needs cannot reach a suitable park within 15 minutes. This limits opportunities for recreation and social connection among groups who may benefit most.",
        "Secondly, use and maintenance are poorly balanced. Weekend demand at selected sites exceeds designed capacity by 35%, and over one-fifth of defects remain unresolved after a week. Persistent crowding and repair delays may increase safety incidents and reduce public confidence in the management of shared spaces."
      ],
      comparison: [
        "The options should be assessed by equity, safety, recurrent cost, delivery time and inclusive access. Option 1 costs $540 million yearly and does not improve either space or maintenance.",
        "Option 2 adds major parks but takes 7–10 years, costs $3.2 billion capital and $165 million recurrently, above the $115 million ceiling.",
        "Option 3 is quicker and costs $104 million recurrently. The access coalition is right that app-only reservations could exclude users; the pilot should retain walk-in access and telephone booking. Steward authority, training and repair response times should be written into contracts."
      ],
      recommendation: { intro: "A four-district access and maintenance compact is recommended.", points: [
        "The Environment and Public Realm Bureau should lead with district offices and accessibility groups.",
        "Start in four low-provision districts within seven months and operate for one year.",
        "Seek $33 million setup funding and cap recurrent costs at $104 million.",
        "Track step-free access, defects closed within 48 hours, peak crowd incidents and user feedback."
      ]},
      closing: "Expansion should depend on safer, more inclusive use and faster repairs, not visitor counts alone. Review after one year; for Members’ consideration."
    }
  });

  addPack({
    id: "digital-finance-2026-11-09", title: "Digital Finance & Tokenised Settlement · City of Jade", titleZh: "數碼金融／代幣化結算",
    bureau: "Financial Services Bureau", recipient: "Interdepartmental Committee on Digital Finance", issue: "safe adoption of tokenised settlement and digital financial services",
    subject: "A Controlled Path for Tokenised Settlement",
    docs: [
      { id: "A", title: "Digital Finance Pilot Review (fictional figures)", bullets: [
        "Twenty-three local institutions tested tokenised settlement in controlled trials; only seven have moved to limited commercial use.",
        "Participating firms report settlement time fell from one business day to under ten minutes, but 42% of smaller firms cite integration cost as a barrier.",
        "Three trial incidents involved failed reconciliation or delayed redemption; no customer loss was recorded, but incident reporting was inconsistent.",
        "Only 36% of surveyed small exporters understand the difference between a regulated deposit token and an unregulated digital asset.",
        "The Bureau’s annual financial-services golf day is in October."
      ]},
      { id: "B", title: "Options", options: [
        { name: "Option 1 — Universal digital-finance adoption grant", text: "Provide up to $100,000 to every eligible firm. Estimated recurrent cost $480 million; weak link to safe use or verified productivity." },
        { name: "Option 2 — Public token settlement network", text: "Build a government-operated network for all business payments. Capital $1.4 billion; 5–7 years; requires 160 technical and compliance staff." },
        { name: "Option 3 — Regulated sandbox and shared assurance facility", text: "Set common redemption and reconciliation standards, fund independent testing and offer small exporters assisted onboarding. Setup $54 million; recurrent $86 million; 12-month pilot." }
      ]},
      { id: "C", title: "Industry and Treasury views", quote: [
        "Small Exporters’ Council: Smaller firms need plain-language guidance and shared testing; each company cannot afford its own technical review.",
        "Digital Asset Association: Common standards help, but overly prescriptive rules may lock in one technology and raise entry costs.",
        "Treasury Branch: Recurrent public support is capped at $100 million; any pilot must report settlement reliability, redemption performance and firm uptake."
      ]}
    ],
    sort: ["P1: pilots show faster settlement, but only 7/23 have limited commercial use and integration cost blocks 42% of small firms.", "P2: reconciliation/redemption incidents and inconsistent reporting; only 36% understand product distinctions.", "O1 $480M; O2 $1.4B / 5–7 years / 160 staff; O3 $86M recurrent under $100M cap.", "Keep standards technology-neutral, improve redemption reporting and offer small firms shared assurance; drop the golf day."],
    problems: ["Small firms cannot afford integration and assurance costs, limiting adoption benefits.", "Unclear product understanding and inconsistent incident reporting create trust and consumer-protection risks."],
    compare: "safe and useful adoption, public cost, technical staffing and access for smaller firms; a shared sandbox tests safeguards before any network build.",
    deliver: "The Financial Services Bureau should lead a 12-month sandbox pilot; spend $54M setup/$86M recurrent; track settlement reliability, redemption failures, small-firm uptake and incidents.",
    model: {
      opening: "Tokenised settlement may improve transaction speed, but Jade’s trials reveal uneven adoption and incomplete safeguards. This paper compares options and recommends a controlled, technology-neutral pilot before wider public investment.",
      problems: [
        "The first problem is that small firms cannot readily access the benefits. Settlement times improved in trials, but fewer than one-third of participating institutions reached limited commercial use and 42% of smaller firms cite integration costs. This risks concentrating productivity gains among larger firms.",
        "Secondly, trust and operational safeguards are not yet consistent. Reconciliation and redemption incidents were reported inconsistently, while many exporters do not understand the distinction between different token types. This may undermine confidence and leave customers unclear about the protection attached to a product."
      ],
      comparison: [
        "Options should be assessed by safe adoption, affordability, technical feasibility and small-firm access. Option 1’s $480 million recurrent cost is high and rewards uptake without proving secure use.",
        "Option 2 creates a common network but costs $1.4 billion, takes 5–7 years and requires 160 specialised staff.",
        "Option 3 costs $86 million recurrently and can start within a year. Industry concerns about technology lock-in can be addressed through outcome-based, technology-neutral standards and periodic review; independent tests and clear redemption reporting would address safety gaps."
      ],
      recommendation: { intro: "A 12-month regulated sandbox and shared assurance pilot is recommended.", points: [
        "The Financial Services Bureau should lead with regulators, banks, payment providers and exporter groups.",
        "Invite a diverse group of institutions and small firms; assess before any permanent network decision.",
        "Seek $54 million setup funding and cap recurrent public support at $86 million.",
        "Publish settlement reliability, redemption outcomes, incidents and small-firm participation."
      ]},
      closing: "The pilot should proceed only with clear accountability for customer funds and incident disclosure. Review after 12 months before considering scale-up; for Members’ consideration."
    }
  });

  addPack({
    id: "ai-public-services-2026-11-09", title: "AI in Public Services · City of Jade", titleZh: "人工智能／公共服務管治",
    bureau: "Digital Government and Administration Bureau", recipient: "Interdepartmental Committee on Responsible AI", issue: "responsible use of AI in public-service decisions",
    subject: "Building Safeguards into Public-service AI",
    docs: [
      { id: "A", title: "Public AI Service Audit (fictional figures)", bullets: [
        "Nine departments use automated tools to sort enquiries or flag applications; average first-response time fell 21% in the largest services.",
        "A review of 8,600 cases found 12% of flagged cases were later changed after human review; rates varied from 5% to 23% by service.",
        "Only four of the nine departments publish an explanation of how users can challenge an AI-assisted decision; appeal resolution averages 24 days.",
        "Procurement records show 68% of contracts do not specify audit access, model-change notice or incident reporting.",
        "The annual civil-service choir concert is on 12 December."
      ]},
      { id: "B", title: "Options", options: [
        { name: "Option 1 — Automate all eligible casework", text: "Roll out vendor systems across 20 services. Setup $260 million; annual licence cost $175 million; delivery in 18 months. Risks expanding before safeguards are ready." },
        { name: "Option 2 — Replace AI with manual review teams", text: "Recruit 500 officers for case screening and appeals. Annual cost $235 million; 2–3 years to recruit; may restore longer response times." },
        { name: "Option 3 — Human-reviewed pilot and assurance register", text: "Limit AI to low-risk triage, require reasons and human appeal, and publish an inventory with audit and incident standards. Setup $48 million; recurrent $92 million; pilot in three services within six months." }
      ]},
      { id: "C", title: "Stakeholders and budget constraint", quote: [
        "Digital Rights Coalition: People need a named human contact and a way to correct inaccurate information before a service decision is final.",
        "Civil Service Managers’ Association: Staff need training and workable appeal capacity; adding checks without time or clear responsibility will slow frontline work.",
        "Treasury Branch: Annual recurrent AI governance spending is capped at $100 million; departments must show service gains and publish material incidents."
      ]}
    ],
    sort: ["P1: response time improved 21%, but 12% of flagged cases changed after human review; variation is wide.", "P2: only 4/9 departments explain challenge routes; appeals take 24 days; most contracts lack audit/change/incident terms.", "O1 $260M setup + $175M recurrent; O2 $235M recurrent and 2–3-year hiring; O3 $48M setup + $92M recurrent under $100M cap.", "Guarantee human contact, correction and staff capacity; drop the choir concert."],
    problems: ["AI-assisted triage can produce inconsistent flags that alter service outcomes.", "Weak appeal routes and procurement terms limit accountability and public trust."],
    compare: "service speed and accuracy, recurrent cost, workforce feasibility and fairness/accountability; Option 3 preserves human decisions while testing safeguards.",
    deliver: "The Digital Government and Administration Bureau should lead a six-month, three-service pilot; $48M setup/$92M recurrent; measure response time, overturned flags, appeal time and audit compliance.",
    model: {
      opening: "AI-assisted tools have shortened response times in some services, but review and accountability arrangements remain uneven. This paper compares options and recommends a limited pilot in which efficiency gains remain subject to human oversight.",
      problems: [
        "The first problem is inconsistent decision quality. Although first response times fell 21%, 12% of flagged cases were changed after human review, with substantial variation across services. If errors are not detected early, residents may face delay or an unfair service outcome.",
        "Secondly, users and staff lack reliable routes to challenge and correct decisions. Only four departments explain appeal arrangements, while average resolution takes 24 days; most contracts also omit audit and change-notification terms. This weakens accountability and may erode trust in digital services."
      ],
      comparison: [
        "Options should be assessed by service quality, affordability, staffing feasibility and fairness. Option 1 could scale quickly but its $175 million recurrent licence cost exceeds the $100 million ceiling and would extend tools before safeguards are consistent.",
        "Option 2 offers direct human review but costs $235 million yearly and requires 500 recruits over several years, potentially restoring longer queues.",
        "Option 3 costs $92 million recurrently and can begin in six months. The managers’ concern about workload is valid; set risk-based review thresholds, provide staff training and fund appeal capacity within the pilot. Require accessible human contact, correction rights and audit clauses."
      ],
      recommendation: { intro: "A three-service human-reviewed pilot is recommended.", points: [
        "The Digital Government and Administration Bureau should lead with participating departments, procurement officers and user representatives.",
        "Start within six months in low-risk triage functions; exclude final high-impact decisions from automated determination.",
        "Seek $48 million for setup and cap annual governance and support costs at $92 million.",
        "Measure response time, changed flags, appeal resolution, user complaints and contract-audit compliance; publish material incidents."
      ]},
      closing: "Scale-up should depend on improved service speed without worsening errors or appeal access. Review after 12 months and suspend any tool that fails the audit threshold; for Members’ consideration."
    }
  });
})();
