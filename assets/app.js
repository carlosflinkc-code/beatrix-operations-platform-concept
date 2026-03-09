const updates = [
  {
    what: "Lift B tijdelijk exclusief voor ombouw",
    where: "Level 2 liftzone",
    audience: "Ervaren medewerkers en supervisors",
    action: "Laat retour tot 17:15 via servicegang Noord en lift A lopen.",
    time: "13:40",
    highlight: true,
  },
  {
    what: "Nieuwe medewerkers verplicht eerst door onboardingroute",
    where: "Briefingpunt entree",
    audience: "Nieuwe medewerkers en supervisors",
    action: "Eerst route A afronden, daarna pas inzet op level 2.",
    time: "12:55",
    highlight: false,
  },
  {
    what: "Extra glasretour verwacht na walking dinner",
    where: "Level 4 en spoelvoorzone",
    audience: "Alle routes",
    action: "Extra glascontainers plaatsen en servicegang vrij houden.",
    time: "11:20",
    highlight: false,
  },
];

const notices = [
  {
    title: "Lift B exclusief voor ombouw",
    priority: "critical",
    state: "Ongelezen",
    audience: "Ervaren medewerkers, supervisors",
    body: "Retour loopt tijdelijk via servicegang Noord en lift A. Supervisor bewaakt vrije liftzone.",
    meta: ["Level 2 liftzone", "13:40", "Direct handelen"],
  },
  {
    title: "Onboardingcheck verplicht voor nieuwe medewerkers",
    priority: "unread",
    state: "Nieuw",
    audience: "Nieuwe medewerkers, supervisors",
    body: "Nieuwe medewerkers ronden eerst de onboardingroute af voordat zij inzetbaar zijn op level 2.",
    meta: ["Briefingpunt entree", "12:55", "Incheck vereist"],
  },
  {
    title: "Extra glasretour verwacht na walking dinner",
    priority: "",
    state: "Gelezen",
    audience: "Alle routes",
    body: "Extra glascontainers plaatsen op level 4 en servicegang vrij houden voor doorstroming.",
    meta: ["Level 4", "11:20", "Operationeel"],
  },
];

function renderUpdateFeed() {
  const feeds = document.querySelectorAll("[data-update-feed]");
  if (!feeds.length) return;

  const html = updates
    .map(
      (update) => `
        <article class="update-item${update.highlight ? " highlight" : ""}">
          <div>
            <div class="update-label">Wat</div>
            <strong>${update.what}</strong>
            <span class="metric-label">Gewijzigd om ${update.time}</span>
          </div>
          <div>
            <div class="update-label">Waar</div>
            <p>${update.where}</p>
          </div>
          <div>
            <div class="update-label">Voor wie</div>
            <p>${update.audience}</p>
          </div>
          <div>
            <div class="update-label">Wat nu doen</div>
            <p>${update.action}</p>
          </div>
        </article>
      `,
    )
    .join("");

  feeds.forEach((feed) => {
    feed.innerHTML = html;
  });
}

function wireRoutes() {
  const buttons = document.querySelectorAll("[data-route-target]");
  const panels = document.querySelectorAll("[data-route-panel]");
  if (!buttons.length || !panels.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-route-target");
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      panels.forEach((panel) => {
        panel.classList.toggle(
          "is-visible",
          panel.getAttribute("data-route-panel") === target,
        );
      });
    });
  });
}

function renderNoticeFeed() {
  const feeds = document.querySelectorAll("[data-notice-feed]");
  if (!feeds.length) return;

  const html = notices
    .map(
      (notice) => `
        <article class="note-card ${notice.priority}">
          <div class="status-chip ${notice.priority || "stable"}">${notice.state}</div>
          <strong>${notice.title}</strong>
          <p>${notice.body}</p>
          <div class="notice-meta">
            <span>Voor: ${notice.audience}</span>
            ${notice.meta.map((item) => `<span>${item}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");

  feeds.forEach((feed) => {
    feed.innerHTML = html;
  });
}

renderUpdateFeed();
wireRoutes();
renderNoticeFeed();
