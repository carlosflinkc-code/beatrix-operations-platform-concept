const sharedDemoPin = "17102000EXP";
const sharedDemoPinLabel = "1710 2000 EXP";

const updates = [
  {
    what: "Buffetroute verplaatst van Expozaal naar Mies Bouwman Foyer",
    where: "Expozijde, liftzone level 2 en foyeropstelling",
    audience: "Bekende medewerkers, event hosts, supervisor, assistent-supervisor en coördinator",
    action: "Pas looplijn, glasretour en Dienbladen-doorstroom direct aan. Lift B blijft retour-only.",
    time: "13:40",
    highlight: true,
  },
  {
    what: "Eerste medewerkers melden om 05:45 bij Centrale Hal voor registratie-opbouw",
    where: "Centrale Hal Begane Grond en registratiebalies",
    audience: "Eerste medewerkers, supervisor en assistent-supervisor",
    action: "Check balies, stroom, infostandaards, koorden en eerste briefing voordat publiek binnenkomt.",
    time: "05:12",
    highlight: false,
  },
  {
    what: "Lunchworkshops krijgen extra spoelbuffer en extra GFT-capaciteit",
    where: "114-E, 117-E, 214-C en 215-E",
    audience: "Keuken, spoelkeuken, supervisor, assistent-supervisor en coördinator",
    action: "Plaats extra lege kratten, twee extra GFT-bakken en scheid koude retour direct per workshop.",
    time: "10:28",
    highlight: false,
  },
  {
    what: "Badgecontrole bij Expo-ingang aangescherpt in afstemming met Myriam Wijnen",
    where: "Centrale Hal en schuifdeuren Expozaal",
    audience: "Event hosts, beveiliging, supervisor en coördinator",
    action: "Verwijs deelnemers zonder badge terug naar centrale registratie. Standhouders pas na 18:45 doorlaten.",
    time: "08:05",
    highlight: false,
  },
  {
    what: "Ramadan To Go-productie toegevoegd met aparte koude lijn en uitgifteset",
    where: "Keuken koud, ExpoKantoor en kelderlogistiek",
    audience: "Keuken, kelderlogistiek, event hosts, supervisor en coördinator",
    action: "Reserveer tassen, water, handfruit en warme koffie-uitgifte voor Mine Lakbir-Demirbag om 18:30.",
    time: "16:02",
    highlight: false,
  },
];

const notices = [
  {
    title: "Expo-routing aangepast",
    priority: "critical",
    state: "Ongelezen",
    audience: "Bekende medewerkers, event hosts, supervisor, assistent-supervisor, coördinator",
    body: "Uitgifte en retour lopen niet meer parallel. De foyer wordt front-of-house, de liftzone blijft uitsluitend service.",
    meta: ["Expozaal / Mies Bouwman Foyer", "13:40", "Direct handelen"],
  },
  {
    title: "Vroege ploeg geactiveerd",
    priority: "operational",
    state: "Nieuw",
    audience: "Eerste medewerkers, supervisor, assistent-supervisor",
    body: "Registratie, stroompunten en infostandaards moeten vóór 06:30 gereed staan in de Centrale Hal.",
    meta: ["Centrale Hal", "05:12", "Startset gereedmaken"],
  },
  {
    title: "Spoel- en keukenflow opgeschaald",
    priority: "operational",
    state: "Nieuw",
    audience: "Keuken, spoelkeuken, supervisor, coördinator",
    body: "Vier lunchworkshops en theaterpiek vragen om extra retourbuffer, aparte koude lijn en scherpere kratwissels.",
    meta: ["114 / 117 / 214 / 215", "10:28", "Capaciteit verhogen"],
  },
  {
    title: "Event host briefing aangescherpt",
    priority: "",
    state: "Gelezen",
    audience: "Event hosts, supervisor",
    body: "Event hosts krijgen alleen gastenstroom-, badge- en routingupdates en niet de interne keuken- of leveranciersdetails.",
    meta: ["Need-to-know", "08:05", "Geen groepsapp-logica"],
  },
];

const workOrderItems = [
  {
    time: "05:00 - 17:00",
    room: "Beatrix Theater",
    title: "Plenair programma, projectie, audio en backstage-opstelling",
    owner: "Audio Visual / Theater / Coördinatie",
    status: "Kritiek",
  },
  {
    time: "06:30 - 19:30",
    room: "Centrale Hal Begane Grond",
    title: "Registratie, stroompunten, infostandaards, beveiliging en garderobe",
    owner: "Facilities / Planning / Security",
    status: "Live",
  },
  {
    time: "08:00 - 18:00",
    room: "114-E, 117-E, 214-C en 215-E",
    title: "Lunchworkshops met water, tafellinnen, hostess en lunchdranken",
    owner: "Kitchen Cold / Catering Operations",
    status: "Definitief",
  },
  {
    time: "12:00 - 13:30",
    room: "Jaarbeurs Meetup-zalen",
    title: "Lunch Op Maat VJ met buffet, servies, allergenenbordjes en dranken",
    owner: "Keuken / Magazijn Hallen / Debras",
    status: "Gewijzigd",
  },
  {
    time: "16:00 - 18:00",
    room: "ExpoKantoor en kelderlogistiek",
    title: "Ramadan To Go en aanvullende hospitality voor Mine Lakbir-Demirbag",
    owner: "Kitchen Cold / Kelder / Event hosts",
    status: "Nieuw",
  },
  {
    time: "18:45 - 20:00",
    room: "Expozaal en Mineurslaan-zijde",
    title: "Afbouwtoegang voor standhouders en leveranciers onder beveiligingscontrole",
    owner: "Security / Coördinatie",
    status: "Bevestigen",
  },
];

const routeLabels = {
  eerste: "Eerste medewerker-link actief",
  nieuw: "Nieuwe medewerker-link actief",
  bekend: "Bekende medewerker-link actief",
  eventhost: "Event host-link actief",
  supervisor: "Supervisor-link actief",
  assistant: "Assistent-supervisor-link actief",
  coordinator: "Coördinator-link actief",
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
    eerste: "eerste",
    first: "eerste",
    vroeg: "eerste",
    nieuw: "nieuw",
    new: "nieuw",
    bekend: "bekend",
    known: "bekend",
    eventhost: "eventhost",
    host: "eventhost",
    supervisor: "supervisor",
    assistant: "assistant",
    "assistent-supervisor": "assistant",
    assistent: "assistant",
    coordinator: "coordinator",
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

function setGrantedRoles(roles) {
  const granted = new Set(getGrantedRoles());
  roles.forEach((role) => granted.add(role));
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
      <p class="access-hint">Demo-PIN: <strong>${sharedDemoPinLabel}</strong></p>
      <label class="access-label" for="access-pin">Voer de demo-PIN in</label>
      <input id="access-pin" class="access-input" type="password" autocomplete="off" />
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
    "Deze laag is alleen bedoeld voor supervisor, assistent-supervisor of coördinatie. Medewerker-, event host- en eerste-medewerkerlinks blijven bewust schoner.";
  input.value = "";
  error.hidden = true;
  modal.classList.add("is-visible");

  const close = () => {
    modal.classList.remove("is-visible");
    submit.onclick = null;
    cancel.onclick = null;
  };

  submit.onclick = () => {
    const pin = input.value.replace(/\s+/g, "").trim().toUpperCase();
    if (pin === sharedDemoPin) {
      setGrantedRoles(config.allowedRoles);
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
  const protectedContent = document.querySelector("[data-protected-content]");
  if (!protectedContent) return;

  protectedContent.classList.add("protected-content", "is-locked");

  let gate = document.querySelector("[data-access-gate]");
  if (!gate) {
    gate = document.createElement("section");
    gate.className = "access-gate";
    gate.setAttribute("data-access-gate", "");
    gate.innerHTML = `
      <p class="eyebrow">Roltoegang</p>
      <h3>Deze laag is afgeschermd</h3>
      <p>
        Deze inhoud is alleen bedoeld voor supervisor, assistent-supervisor of coördinatie. De navigatie blijft bewust open, zodat je altijd terug kunt naar de openbare demo.
      </p>
      <p class="access-hint">Demo-PIN: <strong>${sharedDemoPinLabel}</strong></p>
      <div class="cta-row">
        <button class="button button-primary" type="button" data-access-open>Voer PIN in</button>
      </div>
      <div class="access-gate-links">
        <a class="button button-secondary" href="./index.html">Terug naar home</a>
        <a class="button button-secondary" href="./briefing.html">Open dagbriefing</a>
        <a class="button button-secondary" href="./materials.html">Open materialen</a>
        <a class="button button-secondary" href="./app.html?role=nieuw">Open medewerkerroute</a>
      </div>
    `;
    protectedContent.parentNode.insertBefore(gate, protectedContent);
  }

  const openButton = gate.querySelector("[data-access-open]");
  openButton.onclick = () => {
    requestProtectedAccess(pageRole, () => {
      protectedContent.classList.remove("is-locked");
      gate.remove();
    });
  };
}

renderUpdateFeed();
renderNoticeFeed();
renderWorkOrderFeed();
wireRoutes();
wireProtectedLinks();
applyRoleFromQuery();
protectCurrentPage();
