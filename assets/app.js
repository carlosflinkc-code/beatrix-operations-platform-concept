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

renderUpdateFeed();
wireRoutes();
