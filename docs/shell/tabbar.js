(function () {
  "use strict";

  function hubBase() {
    var path = location.pathname || "/";
    var markers = ["/policy/", "/q1/", "/q2/", "/vocab/"];
    for (var i = 0; i < markers.length; i++) {
      var idx = path.indexOf(markers[i]);
      if (idx >= 0) return path.slice(0, idx + 1);
    }
    var bare = path.match(/^(.*\/)(policy|q1|q2|vocab)\/?$/);
    if (bare) return bare[1];
    if (path.endsWith("/")) return path;
    return path.replace(/\/[^/]*$/, "/");
  }

  function activeKey() {
    var path = location.pathname || "";
    if (path.indexOf("/q1") >= 0) return "q1";
    if (path.indexOf("/q2") >= 0) return "q2";
    if (path.indexOf("/vocab") >= 0) return "vocab";
    if (path.indexOf("/policy") >= 0) return "policy";
    return "policy";
  }

  function mount() {
    if (document.getElementById("jre-hub-tabbar")) return;
    var base = hubBase();
    var active = activeKey();
    var tabs = [
      { key: "policy", href: base + "policy/", zh: "政策", en: "Policy", ico: "🏛" },
      { key: "q1", href: base + "q1/", zh: "英文Q1", en: "English", ico: "✍️" },
      { key: "q2", href: base + "q2/", zh: "中文Q2", en: "Chinese", ico: "🖋" },
      { key: "vocab", href: base + "vocab/", zh: "詞彙", en: "Vocab", ico: "📘" }
    ];

    document.body.classList.add("hub-has-tabs");

    var nav = document.createElement("nav");
    nav.id = "jre-hub-tabbar";
    nav.setAttribute("aria-label", "JRE Study Hub");
    nav.innerHTML = tabs
      .map(function (t) {
        var cls = t.key === active ? ' class="is-active"' : "";
        var aria = t.key === active ? ' aria-current="page"' : "";
        return (
          '<a href="' +
          t.href +
          '"' +
          cls +
          aria +
          ">" +
          '<span class="hub-ico" aria-hidden="true">' +
          t.ico +
          "</span>" +
          '<span class="hub-zh">' +
          t.zh +
          "</span>" +
          '<span class="hub-en">' +
          t.en +
          "</span>" +
          "</a>"
        );
      })
      .join("");
    document.body.appendChild(nav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
