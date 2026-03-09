const updates = [
  {
    what: "Buffet X verplaatst van Expozaal naar Mies Bouwman Foyer",
    where: "Level 2 servicegang en foyeropstelling",
    audience: "Bekende medewerkers, supervisor, assistent-supervisor en coördinator",
    action: "Pas routing, glasretour en uitgiftepunt per direct aan.",
    time: "13:40",
    highlight: true,
  },
  {
    what: "Lunchopstelling Jaarbeurs Meetup krijgt extra audiovisuele set",
    where: "114-E Jaarbeurs Meetup",
    audience: "Supervisor, assistent-supervisor en coördinator",
    action: "Controleer stroom, tafelplan en vrij servicepad vóór 14:15.",
    time: "12:55",
    highlight: false,
  },
  {
    what: "Nieuwe medewerkers eerst door digitale onboarding vrijgeven",
    where: "Entree briefingpunt",
    audience: "Nieuwe medewerkers, supervisor en assistent-supervisor",
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
    audience: "Bekende medewerkers, supervisor, assistent-supervisor, coördinator",
    body: "Uitgifte schuift door naar Mies Bouwman Foyer. Lift B blijft vrij voor retour en hulpmiddelen.",
    meta: ["Expozaal / Mies Bouwman Foyer", "13:40", "Direct handelen"],
  },
  {
    title: "Lunchworkshop krijgt extra audiovisuele ondersteuning",
    priority: "operational",
    state: "Nieuw",
    audience: "Supervisor, assistent-supervisor, coördinator",
    body: "Controleer opstelling, stroompunt en vrije looplijn in 114-E Jaarbeurs Meetup.",
    meta: ["114-E", "12:55", "Werkorder aangepast"],
  },
  {
    title: "Onboardingcheck verplicht",
    priority: "",
    state: "Gelezen",
    audience: "Nieuwe medewerkers, supervisor, assistent-supervisor",
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
  assistant: "Assistent-supervisor-link actief",
  coordinator: "Coördinator-link actief",
};

const rolePins = {
  supervisor: "2406",
  assistant: "2407",
  coordinator: "2408",
};

const protectedRoleConfig = {
  workorder: {
    label: "Live Work Order",
    allowedRoles: ["supervisor", "assistant", "coordinator"],
  },
  supervisor: {
    label: "Supervisorlaag",
    allowedRoles: ["supervisor"],
  },
  assistant: {
    label: "Assistent-supervisorlaag",
    allowedRoles: ["assistant", "supervisor"],
  },
  coordinator: {
    label: "Coördinatorlaag",
    allowedRoles: ["coordinator"],
  },
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
      const target = button.getAttribute("data-route-target");
      const restrictedRole = button.getAttribute("data-protected-role");
      if (restrictedRole) {
        requestProtectedAccess(restrictedRole, () => activateRoute(target));
        return;
      }
      activateRoute(target);
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
    assistant: "assistant",
    "assistent-supervisor": "assistant",
    assistent: "assistant",
    coordinator: "coordinator",
    coordinatoren: "coordinator",
    coordinatie: "coordinator",
  };

  const target = mapping[rawRole.toLowerCase()];
  if (target) {
    const restrictedRole = {
      supervisor: "supervisor",
      assistant: "assistant",
      coordinator: "coordinator",
    }[target];

    if (restrictedRole) {
      requestProtectedAccess(restrictedRole, () => activateRoute(target));
      return;
    }
    activateRoute(target);
  }
}

function getGrantedRoles() {
  try {
    return JSON.parse(sessionStorage.getItem("beatrixAccessRoles") || "[]");
  } catch {
    return [];
  }
}

function setGrantedRole(role) {
  const granted = new Set(getGrantedRoles());
  granted.add(role);
  sessionStorage.setItem("beatrixAccessRoles", JSON.stringify(Array.from(granted)));
}

function hasProtectedAccess(key) {
  const config = protectedRoleConfig[key];
  if (!config) return true;
  const granted = new Set(getGrantedRoles());
  return config.allowedRoles.some((role) => granted.has(role));
}

function createAccessModal() {
  let modal = document.querySelector("[data-access-modal]");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.className = "access-modal";
  modal.setAttribute("data-access-modal", "");
  modal.innerHTML = `
    <div class="access-dialog">
      <p class="eyebrow">Roltoegang</p>
      <h3 data-access-title>Afgeschermde laag</h3>
      <p class="subtle-note" data-access-copy>
        Deze informatie is niet bedoeld voor algemene medewerkers of nieuwe medewerkers.
      </p>
      <label class="access-label" for="access-pin">Voer de demo-PIN in</label>
      <input id="access-pin" class="access-input" type="password" inputmode="numeric" autocomplete="off" />
      <div class="access-error" data-access-error hidden>Onjuiste PIN. Probeer opnieuw.</div>
      <div class="cta-row">
        <button class="button button-primary" type="button" data-access-submit>Toegang geven</button>
        <button class="button button-secondary" type="button" data-access-cancel>Annuleren</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function requestProtectedAccess(key, onSuccess) {
  const config = protectedRoleConfig[key];
  if (!config) {
    onSuccess?.();
    return;
  }

  if (hasProtectedAccess(key)) {
    onSuccess?.();
    return;
  }

  const modal = createAccessModal();
  const title = modal.querySelector("[data-access-title]");
  const copy = modal.querySelector("[data-access-copy]");
  const input = modal.querySelector("#access-pin");
  const error = modal.querySelector("[data-access-error]");
  const submit = modal.querySelector("[data-access-submit]");
  const cancel = modal.querySelector("[data-access-cancel]");

  title.textContent = `${config.label} is afgeschermd`;
  copy.textContent =
    "Deze laag is alleen bedoeld voor supervisor, assistent-supervisor of coördinatie. Algemene medewerkers zien deze informatie niet.";
  input.value = "";
  error.hidden = true;
  modal.classList.add("is-visible");

  const close = () => {
    modal.classList.remove("is-visible");
    submit.onclick = null;
    cancel.onclick = null;
  };

  submit.onclick = () => {
    const pin = input.value.trim();
    const matchedRole = Object.entries(rolePins).find(([, value]) => value === pin)?.[0];
    if (matchedRole && config.allowedRoles.includes(matchedRole)) {
      setGrantedRole(matchedRole);
      close();
      onSuccess?.();
      return;
    }
    error.hidden = false;
  };

  cancel.onclick = close;
  input.focus();
}

function wireProtectedLinks() {
  document.querySelectorAll("[data-protected-role]").forEach((link) => {
    if (link.tagName === "BUTTON") return;
    link.addEventListener("click", (event) => {
      const key = link.getAttribute("data-protected-role");
      if (!key || hasProtectedAccess(key)) return;
      event.preventDefault();
      requestProtectedAccess(key, () => {
        const href = link.getAttribute("href");
        if (href) window.location.href = href;
      });
    });
  });
}

function protectCurrentPage() {
  const pageRole = document.body.getAttribute("data-page-protection");
  if (!pageRole || hasProtectedAccess(pageRole)) return;

  document.body.classList.add("page-protected");
  requestProtectedAccess(pageRole, () => {
    document.body.classList.remove("page-protected");
    document.body.classList.add("page-unlocked");
  });
}

renderUpdateFeed();
renderNoticeFeed();
renderWorkOrderFeed();
wireRoutes();
wireProtectedLinks();
applyRoleFromQuery();
protectCurrentPage();
