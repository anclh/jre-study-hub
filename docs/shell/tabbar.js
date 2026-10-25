(function () {
  "use strict";

  function hubBase() {
    var path = location.pathname || "/";
    var markers = ["/policy/", "/vocab/"];
    for (var i = 0; i < markers.length; i++) {
      var idx = path.indexOf(markers[i]);
      if (idx >= 0) return path.slice(0, idx + 1);
    }
    var bare = path.match(/^(.*\/)(policy|vocab)\/?$/);
    if (bare) return bare[1];
    if (path.endsWith("/")) return path;
    return path.replace(/\/[^/]*$/, "/");
  }

  function activeKey() {
    var path = location.pathname || "";
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
