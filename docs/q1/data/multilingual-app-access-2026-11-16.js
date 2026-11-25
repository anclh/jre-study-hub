/* Original fictional City of Jade exercise. All case documents, figures and statements are invented. */
window.Q1_CASE_PACKS = window.Q1_CASE_PACKS || [];
window.Q1_CASE_PACKS.push({
  id: "multilingual-app-access-2026-11-16",
  title: "From App Access to Completed Applications · City of Jade",
  titleZh: "政府 App 共融／資訊查閱與完成申請",
  tip: "原創虛構練習。先睇申請流程邊一步最多人退出，再比較翻譯、簡化流程同人工協助。寫完先睇五部分範文。",
  task: {
    role: "You are an Administrative Officer in the City of Jade's Digital Services Bureau. Write an internal discussion paper for the Public Services Committee on improving access to government apps for ethnic minority residents.",
    bullets: [
      "Identify two barriers to completing applications and explain their practical implications.",
      "Compare the three proposals on likely improvement in completion, accessibility, cost and delivery time. Recommend how to prioritise multilingual support, simpler application flows and assisted service, and respond to a stakeholder concern.",
      "Specify who should deliver the changes and how the Committee should measure successful completion at the six-month review.",
    ],
    note: "Write about 700 words in formal English. Use only the fictional Data File below.",
  },
  docs: [
    {
      id: "A",
      title: "Observed application tasks in two public service apps",
      paras: [
        "Researchers recruited 200 adult ethnic minority residents through three community centres. Each participant attempted one task on a smartphone: apply for a transport allowance or request a fee waiver. All met the eligibility criteria in their assigned test scenario. The table groups the participants by whether they preferred a language available in the app for completing forms. Groups were not randomly assigned.",
      ],
      table: {
        headers: ["Stage reached in the test", "Preferred an available language (80)", "Preferred another language (120)"],
        rows: [
          ["Found the correct application form", "72", "78"],
          ["Passed identity and document checks", "64", "48"],
          ["Submitted a complete application and received a reference number", "60", "42"],
        ],
      },
      bullets: [
        "Several translated service pages linked to forms and validation messages available only in the two default languages. Some participants knew what benefit they wanted but could not tell which documents were required.",
        "Across both groups, researchers observed failed uploads, repeated requests for the same address and sessions that expired before documents could be retrieved. The tests identify where users left the flow but cannot isolate the effect of each barrier.",
      ],
    },
    {
      id: "B",
      title: "Assisted service records and resident feedback",
      bullets: [
        "Over four weeks the three centres logged 160 distinct requests for help with either application. Staff helped 96 applicants complete a submission during the first contact, booked follow-ups for 40 and could not secure an interpreter that week for 24. The log does not show how many ultimately submitted after follow-up.",
        "Both apps count sessions and submissions separately. An applicant who restarts after a failed upload creates a new session. A staff-assisted submission is logged, but the service teams cannot currently link it to the earlier attempt.",
      ],
      quote: [
        "Riverside Residents Network: I could read the introduction in my language, but when the app rejected my proof of address I did not know why. The centre helped me finish. I would rather speak to a trained adviser than show my documents to a neighbour.",
        "Community Services Association: Help desks can reach people excluded by a phone-only process, but we need trained interpreters and permission to close a case only when we know the application went through.",
      ],
    },
    {
      id: "C",
      title: "Options and resource limits",
      paras: [
        "The Committee can spend up to $5 million on a six-month pilot and must start at least one improvement within eight weeks. The two service departments must retain identity and eligibility checks. Each estimate includes evaluation and covers the same six months.",
      ],
      options: [
        {
          name: "Option 1 — Translate all twelve public service app landing pages",
          text: "$2.2 million. First pages available in six weeks. Provide reviewed content in four additional languages on service summaries and FAQs. Existing forms, uploads and error messages stay as they are. No additional assisted-service capacity.",
        },
        {
          name: "Option 2 — Rebuild both application flows citywide",
          text: "$6.4 million. First launch after 16 weeks. Remove repeated fields, add save-and-return, simplify uploads and improve validation messages. Initial release supports the two existing interface languages. No separate assisted-service budget.",
        },
        {
          name: "Option 3 — Phase improvements in two application flows at three centres",
          text: "$4.8 million. Start assisted appointments and an interpreted callback service by week six. By week twelve, translate the key application steps and error messages into three languages selected using service-centre demand, add save-and-return and show an upload checklist before sign-in. Interpreted appointments remain available for other languages. Budget covers bilingual review and 50 appointments per week across the three centres.",
        },
      ],
    },
    {
      id: "D",
      title: "Delivery and evaluation advice",
      bullets: [
        "Translation reviewers can check official terms and test instructions with residents. The service owner must approve wording that could affect eligibility decisions.",
        "With applicants' agreement, both apps and pilot centres can use the same randomly generated reference for each started application. The evaluation record can include the service, preferred language if voluntarily provided, whether assistance was used, and the date of confirmed submission. It need not store identity documents or infer ethnicity.",
        "Two similar non-pilot centres can report the same indicators for comparison. The Bureau can collect a four-week baseline before launch. Short, interpreted interviews can reach residents who never start an application.",
      ],
    },
  ],
  learnPoints: [
    "用全組作分母比較完成率：60／80＝75%，42／120＝35%。再用逐步數字定位流失，有落差並唔代表語言係唯一原因。",
    "譯文要覆蓋會阻住申請嘅步驟，例如文件要求、錯誤訊息同確認頁。衡量翻譯效果要睇完成率。",
    "用同一個申請參考號碼連接 App 同人工支援，避免將重試或轉渠道計成另一宗申請。",
    "按語言偏好、服務同支援方式報告完成情況，另記錄未能開始申請嘅人遇到咩障礙。",
  ],
  model: {
    to: "Public Services Committee",
    from: "Administrative Officer, Digital Services Bureau",
    subject: "Improving Access to Government App Applications",
    date: "16 November 2026",
    sections: [
      {
        h: "1. Opening",
        html: `<p>Some ethnic minority residents can locate public services on their phones but struggle to complete the application. This paper identifies two barriers and recommends a pilot that combines assisted service, simpler forms and multilingual guidance at the steps where applicants need it.</p>`,
      },
      {
        h: "2. Problem analysis",
        html: `<p><strong>Language support ends before the application is complete.</strong> In Document A, 78 of 120 participants who preferred another language found the correct form, but just 42 completed the application. The completion rate was 35%, compared with 75% among participants who preferred an available language. Translated landing pages can help users find a service, but untranslated document instructions and error messages may prevent them from finishing. The groups were not randomly assigned, so the difference cannot be attributed entirely to language.</p>
<p><strong>Application steps are difficult to recover from when something goes wrong.</strong> Participants in both groups struggled with failed uploads, repeated fields and expiring sessions. Without a way to resume, an applicant may have to start again or seek help from a relative. Centre staff helped 96 of 160 people submit on first contact, but 24 could not secure an interpreter that week. Applicants who cannot get timely help may miss a deadline for assistance.</p>`,
      },
      {
        h: "3. Option comparison",
        html: `<p>The pilot should improve the likelihood of completion, remain accessible to people who need help and fit the spending and delivery limits.</p>
<p><strong>Option 1</strong> delivers the widest range of translated service introductions by week six at $2.2 million. It would improve discovery, but applicants facing an untranslated error or a failed upload would still have to resolve it themselves.</p>
<p><strong>Option 2</strong> addresses repeated fields and allows applicants to resume later. Its $6.4 million cost exceeds the ceiling, and the 16-week launch misses the eight-week requirement. People who need another language or support to recover from a failed check may still struggle.</p>
<p><strong>Option 3</strong> brings assisted appointments and interpreted callbacks into service by week six, followed by multilingual instructions and simpler uploads in week twelve. It costs $4.8 million. Prioritising three languages limits immediate digital coverage. To address the residents’ concern about using friends or neighbours, offer trained interpreters by appointment or callback for other languages and explain the available help on the application page.</p>`,
      },
      {
        h: "4. Recommendation",
        html: `<p>Approve Option 3 for the transport allowance and fee waiver.</p>
<ul>
<li><strong>Who:</strong> The Digital Services Bureau should coordinate the two service departments and three centres. Service owners should approve translated eligibility instructions, and residents should test the full flow before release.</li>
<li><strong>When and where:</strong> Start assisted service at the three centres in week six. Release the revised app flows in week twelve, prioritising document instructions, validation messages and submission confirmation.</li>
<li><strong>Resources:</strong> Cap pilot spending at $4.8 million. Review interpreter demand and appointment waiting time weekly and rebalance the 50 appointments across centres.</li>
<li><strong>Measurement:</strong> Count the proportion of distinct started applications that are complete and acknowledged within 14 days, whether submitted independently or with help. Link restarts and changes of channel by consented reference. Report cases that could not be linked separately. Compare the four-week baseline with pilot results and changes at the two comparison centres.</li>
</ul>`,
      },
      {
        h: "5. Closing",
        html: `<p>At six months, review completion within 14 days, abandonment by step and time to obtain interpreted support. Report results by service and preferred language where sample sizes allow. Use interviews to check whether people still struggle to start. Expand components that improve completion without widening gaps or exceeding the budget, and revise those that leave barriers unresolved. For Members’ consideration.</p>`,
      },
    ],
  },
});
