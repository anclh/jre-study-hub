(() => {
  const groups = [
    { zh: "房屋、土地與北都", en: "Housing, land and Northern Metropolis", themes: ["housing-land", "northern-metropolis"] },
    { zh: "醫療、安老與照顧", en: "Healthcare, ageing and care", themes: ["healthcare", "elderly-care"] },
    { zh: "福利與勞工", en: "Welfare and labour", themes: ["poverty-welfare", "labour"] },
    { zh: "教育與青年", en: "Education and youth", themes: ["education", "youth"] },
    { zh: "金融與財稅", en: "Finance and taxation", themes: ["finance", "fintech-ai"] },
    { zh: "創科、數碼與管治", en: "Innovation, digital government and governance", themes: ["innovation", "digital-gov", "governance", "legislation"] },
    { zh: "交通、環境與基建", en: "Transport, environment and infrastructure", themes: ["transport-logistics", "environment-climate"] },
    { zh: "國家發展與大灣區", en: "National development and Greater Bay Area", themes: ["national-development"] },
    { zh: "文化、體育與旅遊", en: "Culture, sports and tourism", themes: ["culture-tourism", "sports"] },
  ];
  const other = { zh: "其他政策", en: "Other policies" };
  const groupByTheme = new Map(groups.flatMap((group) => group.themes.map((theme) => [theme, group])));
  const openGroupsByList = new WeakMap();

  function render(container, entries, { lang, expandMatches = false }) {
    if (!openGroupsByList.has(container)) openGroupsByList.set(container, new Set());
    const openGroups = openGroupsByList.get(container);
    const cardsByGroup = new Map();
    for (const { theme, card } of entries) {
      const group = groupByTheme.get(theme) || other;
      if (!cardsByGroup.has(group)) cardsByGroup.set(group, []);
      cardsByGroup.get(group).push(card);
    }

    const sections = document.createDocumentFragment();
    for (const group of [...groups, other]) {
      const cards = cardsByGroup.get(group);
      if (!cards) continue;

      const section = document.createElement("details");
      section.className = "policy-group";
      section.open = expandMatches || openGroups.has(group);

      const heading = document.createElement("summary");
      heading.className = "policy-group-heading";
      const name = document.createElement("span");
      name.textContent = group[lang];
      const count = document.createElement("span");
      count.className = "policy-group-count";
      count.textContent = lang === "zh" ? `${cards.length} 張` : `${cards.length} ${cards.length === 1 ? "card" : "cards"}`;
      heading.append(name, count);
      heading.addEventListener("click", () => {
        if (expandMatches) return;
        if (section.open) openGroups.delete(group);
        else openGroups.add(group);
      });

      const list = document.createElement("div");
      list.className = "policy-group-cards";
      list.append(...cards);
      section.append(heading, list);
      sections.append(section);
    }
    container.replaceChildren(sections);
  }

  window.JrePolicyGroups = { render };
})();
