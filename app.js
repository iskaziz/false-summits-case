const state = {
  activeSection: "landing",
  search: "",
  type: "all",
  status: "all"
};

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function initArchive() {
  bindNavigation();
  bindModal();
  renderOverview();
  renderTimeline();
  renderEvidenceControls();
  renderEvidence();
  renderPeople();
  renderMap();
  renderMedical();
  renderDiscrepancies();
}

function bindNavigation() {
  qsa(".nav-link").forEach(button => {
    button.addEventListener("click", () => activateSection(button.dataset.section));
  });

  qsa("[data-section-jump]").forEach(button => {
    button.addEventListener("click", () => activateSection(button.dataset.sectionJump));
  });

  const navToggle = qs("#navToggle");
  const primaryNav = qs("#primaryNav");
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function activateSection(sectionId) {
  state.activeSection = sectionId;
  qsa(".page-section").forEach(section => section.classList.toggle("is-active", section.id === sectionId));
  qsa(".nav-link").forEach(link => link.classList.toggle("is-active", link.dataset.section === sectionId));
  qs("#primaryNav").classList.remove("is-open");
  qs("#navToggle").setAttribute("aria-expanded", "false");
  const section = qs(`#${sectionId}`);
  if (section) document.title = `${section.dataset.pageTitle || "Archive"} | False Summits`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderOverview() {
  qs("#timelineCount").textContent = timelineEvents.length;
  qs("#evidenceCount").textContent = evidenceItems.length;
  qs("#peopleCount").textContent = people.length;
  qs("#discrepancyCount").textContent = discrepancies.length;

  qs("#overviewModules").innerHTML = overviewModules.map(module => `
    <article class="paper-panel module-card">
      <span class="tag">${escapeHtml(module.tag)}</span>
      <h3>${escapeHtml(module.title)}</h3>
      <p>${escapeHtml(module.copy)}</p>
    </article>
  `).join("");
}

function renderTimeline() {
  qs("#timelineList").innerHTML = timelineEvents.map(event => `
    <article class="timeline-item">
      <div class="timeline-time">
        <span class="dot ${event.markerType}"></span>
        <strong>${escapeHtml(event.dateLabel)}</strong><br />${escapeHtml(event.timeLabel)}
      </div>
      <div>
        <h3>${escapeHtml(event.title)}</h3>
        <p>${escapeHtml(event.summary)}</p>
        <div class="card-meta">${event.issues.map(issue => `<span class="tag">${escapeHtml(issue)}</span>`).join("")}</div>
      </div>
      <button type="button" data-open-timeline="${event.id}">Open Event</button>
    </article>
  `).join("");

  qsa("[data-open-timeline]").forEach(button => {
    button.addEventListener("click", () => openTimelineModal(button.dataset.openTimeline));
  });
}

function renderEvidenceControls() {
  const typeFilter = qs("#typeFilter");
  const statusFilter = qs("#statusFilter");
  const uniqueTypes = [...new Set(evidenceItems.map(item => item.type))].sort();
  const uniqueStatuses = [...new Set(evidenceItems.map(item => item.status))].sort();

  typeFilter.innerHTML = `<option value="all">All types</option>` + uniqueTypes.map(type => `<option value="${escapeAttr(type)}">${escapeHtml(type)}</option>`).join("");
  statusFilter.innerHTML = `<option value="all">All statuses</option>` + uniqueStatuses.map(status => `<option value="${escapeAttr(status)}">${escapeHtml(status)}</option>`).join("");

  qs("#evidenceSearch").addEventListener("input", event => {
    state.search = event.target.value.trim().toLowerCase();
    renderEvidence();
  });
  typeFilter.addEventListener("change", event => {
    state.type = event.target.value;
    renderEvidence();
  });
  statusFilter.addEventListener("change", event => {
    state.status = event.target.value;
    renderEvidence();
  });
}

function renderEvidence() {
  const filtered = evidenceItems.filter(item => {
    const haystack = [item.title, item.type, item.status, item.access, item.summary, ...item.people, ...item.tags, ...item.locations].join(" ").toLowerCase();
    const matchesSearch = !state.search || haystack.includes(state.search);
    const matchesType = state.type === "all" || item.type === state.type;
    const matchesStatus = state.status === "all" || item.status === state.status;
    return matchesSearch && matchesType && matchesStatus;
  });

  qs("#evidenceResultsMeta").textContent = `${filtered.length} archive record${filtered.length === 1 ? "" : "s"} shown`;
  qs("#evidenceGrid").innerHTML = filtered.map(item => renderEvidenceCard(item)).join("") || `<article class="paper-panel"><h3>No matching evidence</h3><p>Adjust your search or filters.</p></article>`;

  qsa("[data-open-evidence]").forEach(button => {
    button.addEventListener("click", () => openEvidenceModal(button.dataset.openEvidence));
  });
}

function renderEvidenceCard(item) {
  return `
    <article class="evidence-card">
      <div class="card-meta">
        <span class="tag">${escapeHtml(item.id)}</span>
        <span class="status-badge ${accessClass(item.access)}">${escapeHtml(item.access)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <div class="card-meta">
        <span class="tag">${escapeHtml(item.type)}</span>
        <span class="tag">${escapeHtml(item.status)}</span>
        <span class="tag">${escapeHtml(item.date)}</span>
      </div>
      <div class="card-spacer"></div>
      <button type="button" data-open-evidence="${item.id}">Open Evidence</button>
    </article>
  `;
}

function renderPeople() {
  qs("#peopleGrid").innerHTML = people.map(person => `
    <article class="person-card">
      <span class="tag">${escapeHtml(person.category)}</span>
      <h3>${escapeHtml(person.name)}</h3>
      <p><strong>${escapeHtml(person.role)}</strong></p>
      <p>${escapeHtml(person.summary)}</p>
      <div class="card-meta">${person.keyIssues.map(issue => `<span class="tag">${escapeHtml(issue)}</span>`).join("")}</div>
      <div class="card-spacer"></div>
      <button type="button" data-open-person="${person.id}">View Profile</button>
    </article>
  `).join("");

  qsa("[data-open-person]").forEach(button => {
    button.addEventListener("click", () => openPersonModal(button.dataset.openPerson));
  });
}

function renderMap() {
  const markerPositions = [
    { id: "TL-001", left: "8%", top: "66%" },
    { id: "TL-002", left: "22%", top: "56%" },
    { id: "TL-004", left: "42%", top: "47%" },
    { id: "TL-006", left: "52%", top: "38%" },
    { id: "TL-007", left: "68%", top: "31%" },
    { id: "TL-008", left: "78%", top: "70%" }
  ];

  qs("#mapMarkers").innerHTML = markerPositions.map(marker => {
    const event = timelineEvents.find(item => item.id === marker.id);
    return `
      <button class="map-marker" style="left:${marker.left}; top:${marker.top};" data-open-timeline="${event.id}">
        <strong>${escapeHtml(event.location)}</strong>
        <small>${escapeHtml(event.title)}</small>
      </button>
    `;
  }).join("");

  qsa(".map-marker").forEach(button => {
    button.addEventListener("click", () => openTimelineModal(button.dataset.openTimeline));
  });
}

function renderMedical() {
  qs("#medicalGrid").innerHTML = medicalMarkers.map(marker => `
    <article class="medical-card">
      <span class="stage">${escapeHtml(marker.stage)}</span>
      <h3>${escapeHtml(marker.symptom)}</h3>
      <p>${escapeHtml(marker.summary)}</p>
      <div class="card-meta">
        <span class="tag">${escapeHtml(marker.riskCategory)}</span>
      </div>
      <p><strong>Investigative question:</strong> ${escapeHtml(marker.investigativeQuestion)}</p>
      <div class="card-meta">${marker.evidence.map(id => `<button class="link-pill" data-open-evidence="${id}">${id}</button>`).join("")}</div>
    </article>
  `).join("");

  qsa("#medicalGrid [data-open-evidence]").forEach(button => {
    button.addEventListener("click", () => openEvidenceModal(button.dataset.openEvidence));
  });
}

function renderDiscrepancies() {
  qs("#discrepancyTableBody").innerHTML = discrepancies.map(item => `
    <tr>
      <td><strong>${escapeHtml(item.title)}</strong><br>${escapeHtml(item.issue)}</td>
      <td>${escapeHtml(item.category)}</td>
      <td>${item.sources.map(source => `<button class="discrepancy-link" data-open-evidence="${source}">${source}</button>`).join(" ")}</td>
      <td>${escapeHtml(item.whyItMatters)}</td>
      <td><span class="status-badge status-unresolved">${escapeHtml(item.status)}</span></td>
    </tr>
  `).join("");

  qsa("#discrepancyTableBody [data-open-evidence]").forEach(button => {
    button.addEventListener("click", () => openEvidenceModal(button.dataset.openEvidence));
  });
}

function openEvidenceModal(id) {
  const item = evidenceItems.find(record => record.id === id);
  if (!item) return;
  const linkedEvents = item.linkedTimelineEvents.map(eventId => timelineEvents.find(event => event.id === eventId)).filter(Boolean);
  const linkedIssues = item.linkedDiscrepancies.map(issueId => discrepancies.find(issue => issue.id === issueId)).filter(Boolean);

  setModalContent(`
    <p class="modal-kicker">${escapeHtml(item.type)} · ${escapeHtml(item.id)}</p>
    <h2 id="modalTitle">${escapeHtml(item.title)}</h2>
    <div class="card-meta">
      <span class="status-badge ${accessClass(item.access)}">${escapeHtml(item.access)}</span>
      <span class="tag">${escapeHtml(item.status)}</span>
      <span class="tag">${escapeHtml(item.date)}</span>
    </div>
    <p>${escapeHtml(item.summary)}</p>
    <p><strong>Public handling note:</strong> This prototype uses archive metadata and summaries. Replace document links only after redaction and legal review.</p>
    <div class="modal-grid">
      <div class="paper-panel">
        <h3>People Mentioned</h3>
        ${item.people.map(name => `<span class="link-pill">${escapeHtml(name)}</span>`).join("")}
        <h3>Locations</h3>
        ${item.locations.map(location => `<span class="link-pill">${escapeHtml(location)}</span>`).join("")}
      </div>
      <div class="paper-panel">
        <h3>Tags</h3>
        ${item.tags.map(tag => `<span class="link-pill">${escapeHtml(tag)}</span>`).join("")}
        <h3>File reference</h3>
        <p><span class="redacted-line"></span> ${escapeHtml(item.fileUrl)}</p>
      </div>
    </div>
    <div class="paper-panel" style="margin-top:16px;">
      <h3>Linked Timeline Events</h3>
      ${linkedEvents.map(event => `<button class="link-pill" data-open-timeline="${event.id}">${escapeHtml(event.id)} · ${escapeHtml(event.title)}</button>`).join("") || "<p>No linked events recorded.</p>"}
      <h3>Linked Discrepancies</h3>
      ${linkedIssues.map(issue => `<span class="link-pill">${escapeHtml(issue.id)} · ${escapeHtml(issue.title)}</span>`).join("") || "<p>No linked discrepancies recorded.</p>"}
    </div>
  `);

  qsa("#modalContent [data-open-timeline]").forEach(button => {
    button.addEventListener("click", () => openTimelineModal(button.dataset.openTimeline));
  });
}

function openTimelineModal(id) {
  const event = timelineEvents.find(record => record.id === id);
  if (!event) return;
  setModalContent(`
    <p class="modal-kicker">${escapeHtml(event.category)} · ${escapeHtml(event.id)}</p>
    <h2 id="modalTitle">${escapeHtml(event.title)}</h2>
    <div class="card-meta">
      <span class="tag">${escapeHtml(event.dateLabel)}</span>
      <span class="tag">${escapeHtml(event.timeLabel)}</span>
      <span class="tag">${escapeHtml(event.status)}</span>
    </div>
    <p>${escapeHtml(event.summary)}</p>
    <div class="modal-grid">
      <div class="paper-panel">
        <h3>Location</h3>
        <p>${escapeHtml(event.location)}</p>
        <h3>People</h3>
        ${event.people.map(name => `<span class="link-pill">${escapeHtml(name)}</span>`).join("")}
      </div>
      <div class="paper-panel">
        <h3>Issues</h3>
        ${event.issues.map(issue => `<span class="link-pill">${escapeHtml(issue)}</span>`).join("")}
        <h3>Evidence</h3>
        ${event.evidence.map(evidenceId => `<button class="link-pill" data-open-evidence="${evidenceId}">${escapeHtml(evidenceId)}</button>`).join("")}
      </div>
    </div>
    <div class="paper-panel" style="margin-top:16px;">
      <h3>Questions Raised</h3>
      <ul>${event.questionsRaised.map(question => `<li>${escapeHtml(question)}</li>`).join("")}</ul>
    </div>
  `);

  qsa("#modalContent [data-open-evidence]").forEach(button => {
    button.addEventListener("click", () => openEvidenceModal(button.dataset.openEvidence));
  });
}

function openPersonModal(id) {
  const person = people.find(record => record.id === id);
  if (!person) return;
  setModalContent(`
    <p class="modal-kicker">${escapeHtml(person.category)} · ${escapeHtml(person.id)}</p>
    <h2 id="modalTitle">${escapeHtml(person.name)}</h2>
    <p><strong>${escapeHtml(person.role)}</strong></p>
    <p>${escapeHtml(person.summary)}</p>
    <div class="modal-grid">
      <div class="paper-panel">
        <h3>Key Issues</h3>
        ${person.keyIssues.map(issue => `<span class="link-pill">${escapeHtml(issue)}</span>`).join("")}
      </div>
      <div class="paper-panel">
        <h3>Linked Evidence</h3>
        ${person.linkedEvidence.map(evidenceId => `<button class="link-pill" data-open-evidence="${evidenceId}">${escapeHtml(evidenceId)}</button>`).join("")}
        <h3>Timeline Events</h3>
        ${person.linkedTimelineEvents.map(eventId => `<button class="link-pill" data-open-timeline="${eventId}">${escapeHtml(eventId)}</button>`).join("")}
      </div>
    </div>
  `);

  qsa("#modalContent [data-open-evidence]").forEach(button => button.addEventListener("click", () => openEvidenceModal(button.dataset.openEvidence)));
  qsa("#modalContent [data-open-timeline]").forEach(button => button.addEventListener("click", () => openTimelineModal(button.dataset.openTimeline)));
}

function setModalContent(html) {
  qs("#modalContent").innerHTML = html;
  const modal = qs("#detailModal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  qs(".modal-close").focus();
}

function bindModal() {
  qsa("[data-close-modal]").forEach(element => element.addEventListener("click", closeModal));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });
}

function closeModal() {
  const modal = qs("#detailModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function accessClass(access) {
  const normalized = access.toLowerCase();
  if (normalized.includes("public")) return "status-public";
  if (normalized.includes("redacted")) return "status-redacted";
  if (normalized.includes("summary")) return "status-summary";
  if (normalized.includes("private")) return "status-private";
  return "status-unresolved";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

document.addEventListener("DOMContentLoaded", initArchive);
