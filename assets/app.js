const updates = [
  {
    what: "Buffet X verplaatst van Expozaal naar Mies Bouwman Foyer",
    where: "Level 2 servicegang en foyeropstelling",
    audience: "Bekende medewerkers, supervisors en coördinator",
    action: "Pas routing, glasretour en uitgiftepunt per direct aan.",
    time: "13:40",
    highlight: true,
  },
  {
    what: "Lunchopstelling Jaarbeurs Meetup krijgt extra audiovisuele set",
    where: "114-E Jaarbeurs Meetup",
    audience: "Supervisor en coördinator",
    action: "Controleer stroom, tafelplan en vrij servicepad vóór 14:15.",
    time: "12:55",
    highlight: false,
  },
  {
    what: "Nieuwe medewerkers eerst door digitale onboarding vrijgeven",
    where: "Entree briefingpunt",
    audience: "Nieuwe medewerkers en supervisors",
    action: "Laat pas inchecken na afronding van route, checkvragen en materiaalherkenning.",
    time: "11:20",
    highlight: false,
  },
];

const notices = [
  {
    title: "Expozaal routing aangepast",
    priority: "critical",
    state: "Ongelezen",
    audience: "Bekende medewerkers, supervisors, coördinator",
    body: "Uitgifte schuift door naar Mies Bouwman Foyer. Lift B blijft vrij voor retour en hulpmiddelen.",
    meta: ["Expozaal / Mies Bouwman Foyer", "13:40", "Direct handelen"],
  },
  {
    title: "Lunchworkshop krijgt extra audiovisuele ondersteuning",
    priority: "operational",
    state: "Nieuw",
    audience: "Supervisor, coördinator",
    body: "Controleer opstelling, stroompunt en vrije looplijn in 114-E Jaarbeurs Meetup.",
    meta: ["114-E", "12:55", "Werkorder aangepast"],
  },
  {
    title: "Onboardingcheck verplicht",
    priority: "",
    state: "Gelezen",
    audience: "Nieuwe medewerkers, supervisor",
    body: "Nieuwe medewerkers worden pas inzetbaar na routebevestiging en visuele materiaalcheck.",
    meta: ["Briefingpunt", "11:20", "Vrijgave vereist"],
  },
];

const workOrderItems = [
  {
    time: "08:00 - 18:00",
    room: "114-E Jaarbeurs Meetup",
    title: "Lunchworkshop infectieziekten",
    owner: "Catering Operations / Audio Visual",
    status: "Nieuw",
  },
  {
    time: "08:00 - 18:00",
    room: "Expozaal",
    title: "Water en servicekratten opstellen",
    owner: "Catering Operations",
    status: "Gewijzigd",
  },
  {
    time: "12:00 - 13:30",
    room: "Mies Bouwman Foyer",
    title: "Lunch workshop behandeling eczeem",
    owner: "Supervisor Beatrix",
    status: "Definitief",
  },
  {
    time: "17:30 - 22:00",
    room: "Beatrix Theater",
    title: "Walking dinner en glasretourpiek",
    owner: "Debras / Spoel / Coördinatie",
    status: "Kritiek",
  },
];

const routeLabels = {
  nieuw: "Nieuwe medewerker-link actief",
  bekend: "Bekende medewerker-link actief",
  supervisor: "Supervisor-link actief",
  coordinator: "Coördinator-link actief",
};

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

function renderWorkOrderFeed() {
  const feeds = document.querySelectorAll("[data-work-order-feed]");
  if (!feeds.length) return;

  const html = workOrderItems
    .map(
      (item) => `
        <article class="workorder-row">
          <div class="workorder-time">${item.time}</div>
          <div class="workorder-main">
            <strong>${item.title}</strong>
            <p>${item.room}</p>
          </div>
          <div class="workorder-owner">${item.owner}</div>
          <div class="workorder-state">${item.status}</div>
        </article>
      `,
    )
    .join("");

  feeds.forEach((feed) => {
    feed.innerHTML = html;
  });
}

function activateRoute(target) {
  const buttons = document.querySelectorAll("[data-route-target]");
  const panels = document.querySelectorAll("[data-route-panel]");

  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.getAttribute("data-route-target") === target);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-visible", panel.getAttribute("data-route-panel") === target);
  });

  document.querySelectorAll("[data-role-badge]").forEach((badge) => {
    badge.textContent = routeLabels[target] || "Rolkeuze vereist";
  });
}

function wireRoutes() {
  const buttons = document.querySelectorAll("[data-route-target]");
  const panels = document.querySelectorAll("[data-route-panel]");
  if (!buttons.length || !panels.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activateRoute(button.getAttribute("data-route-target"));
    });
  });
}

function applyRoleFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const rawRole = params.get("role");
  if (!rawRole) return;

  const mapping = {
    nieuw: "nieuw",
    new: "nieuw",
    bekend: "bekend",
    known: "bekend",
    supervisor: "supervisor",
    coordinator: "coordinator",
    coordinatoren: "coordinator",
    coordinatie: "coordinator",
  };

  const target = mapping[rawRole.toLowerCase()];
  if (target) {
    activateRoute(target);
  }
}

renderUpdateFeed();
renderNoticeFeed();
renderWorkOrderFeed();
wireRoutes();
applyRoleFromQuery();
