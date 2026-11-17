(() => {
  const root = typeof globalThis !== "undefined" ? globalThis : window;

  function itemYear(item) {
    const match = String((item && item.date) || "").match(/^(\d{4})/);
    return match ? match[1] : "";
  }

  function asList(value) {
    if (value == null || value === "") return [];
    return Array.isArray(value) ? value : [value];
  }

  function asSet(value) {
    if (!value) return null;
    if (typeof value.has === "function" && typeof value.size === "number") {
      return value.size ? value : null;
    }
    if (Array.isArray(value)) return value.length ? new Set(value) : null;
    return null;
  }

  function uniqueYears(items) {
    const seen = new Set();
    const years = [];
    (items || []).forEach((item) => {
      const year = itemYear(item);
      if (year && !seen.has(year)) {
        seen.add(year);
        years.push(year);
      }
    });
    years.sort((a, b) => b.localeCompare(a));
    return years;
  }

  function matchesItem(item, filters, labels) {
    if (!item) return false;
    const departments = asSet(filters && filters.departments);
    const themes = asSet(filters && filters.themes);
    const years = asSet(filters && filters.years);
    const query = String((filters && filters.query) || "").trim().toLowerCase();
    const deptIds = asList(item.departments);
    const themeIds = asList(item.themes);

    if (departments) {
      const hit = deptIds.some((id) => departments.has(id));
      if (!hit) return false;
    }
    if (themes) {
      const hit = themeIds.some((id) => themes.has(id));
      if (!hit) return false;
    }
    if (years) {
      const year = itemYear(item);
      if (!year || !years.has(year)) return false;
    }
    if (!query) return true;

    const deptLabel = (labels && labels.deptLabel) || ((id) => id);
    const themeLabel = (labels && labels.themeLabel) || ((id) => id);
    const hay = [
      item.title,
      item.title_en || "",
      item.summary || "",
      item.date || "",
      item.source_name || "",
      ...(item.interview_angles || []),
      ...deptIds.map(deptLabel),
      ...themeIds.map(themeLabel),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(query);
  }

  root.JrePolicySearch = { itemYear, asList, uniqueYears, matchesItem };
})();
