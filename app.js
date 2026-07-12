const state = {
  activeSection: "landing",
  search: "",
  type: "all",
  status: "all",
  activeIssue: null
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
  renderRelationships();
  renderPhotos();
  renderDiscrepancies();
  initRevealObserver();
}

function bindNavigation() {
  qsa(".nav-link").forEach(button => {
    button.addEventListener("click", () => activateSection(button.dataset.section));
  });

  qsa("[data-section-jump]").forEach(button => {
    button.addEventListener("click", () => activateSection(button.dataset.sectionJump));
  });

  const enterBtn = qs("#enterArchiveBtn");
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      const cover = qs("#caseCover");
      cover.classList.add("is-opening");
      window.setTimeout(() => activateSection("overview"), 520);
    });
  }

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
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

function renderOverview() {
  qs("#timelineCount").textContent = timelineEvents.length;
  qs("#evidenceCount").textContent = evidenceItems.length;
  qs("#peopleCount").textContent = people.length;
  qs("#medicalCount").textContent = medicalMarkers.length;
  qs("#discrepancyCount").textContent = discrepancies.length;

  qs("#startHereGrid").innerHTML = startHereSteps.map(step => `
    <button class="start-card reveal-card" type="button" data-section-jump="${escapeAttr(step.target)}">
      <span class="start-number">${escapeHtml(step.number)}</span>
      <strong>${escapeHtml(step.title)}</strong>
      <span>${escapeHtml(step.copy)}</span>
    </button>
  `).join("");

  qsa("#startHereGrid [data-section-jump]").forEach(button => {
    button.addEventListener("click", () => activateSection(button.dataset.sectionJump));
  });

  qs("#issueThreadGrid").innerHTML = issueThreads.map(thread => `
    <button class="issue-thread-card ${escapeAttr(thread.className)} reveal-card" type="button" data-open-issue="${escapeAttr(thread.id)}">
      <span class="tag">${escapeHtml(thread.id)}</span>
      <strong>${escapeHtml(thread.title)}</strong>
      <span>${escapeHtml(thread.description)}</span>
      <small>${thread.linkedEvents.length} timeline event${thread.linkedEvents.length === 1 ? "" : "s"} · ${thread.linkedEvidence.length} evidence item${thread.linkedEvidence.length === 1 ? "" : "s"}</small>
    </button>
  `).join("");

  qsa("[data-open-issue]").forEach(button => {
    button.addEventListener("click", () => openIssueModal(button.dataset.openIssue));
  });

  qs("#overviewModules").innerHTML = overviewModules.map(module => `
    <article class="paper-panel module-card reveal-card">
      <span class="tag">${escapeHtml(module.tag)}</span>
      <h3>${escapeHtml(module.title)}</h3>
      <p>${escapeHtml(module.copy)}</p>
    </article>
  `).join("");
}

function renderTimeline() {
  qs("#timelineList").innerHTML = timelineEvents.map(event => `
    <article class="timeline-item reveal-card">
      <div class="timeline-time">
        <span>${escapeHtml(event.dateLabel)}</span>
        <strong>${escapeHtml(event.timeLabel)}</strong>
      </div>
      <div>
        <span class="tag">${escapeHtml(event.category)}</span>
        <h3>${escapeHtml(event.title)}</h3>
        <p>${escapeHtml(event.summary)}</p>
        <div class="card-meta">${renderIssueTags(event.issues)}</div>
      </div>
      <button type="button" data-open-timeline="${escapeAttr(event.id)}">Open Event</button>
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
    const peopleNames = item.people.map(id => getPersonName(id));
    const issueNames = item.issueThreads.map(id => getIssueTitle(id));
    const haystack = [item.id, item.title, item.type, item.status, item.access, item.summary, ...peopleNames, ...item.tags, ...item.locations, ...issueNames].join(" ").toLowerCase();
    const matchesSearch = !state.search || haystack.includes(state.search);
    const matchesType = state.type === "all" || item.type === state.type;
    const matchesStatus = state.status === "all" || item.status === state.status;
    return matchesSearch && matchesType && matchesStatus;
  });

  qs("#evidenceResultsMeta").textContent = `${filtered.length} archive record${filtered.length === 1 ? "" : "s"} shown`;
  qs("#evidenceGrid").innerHTML = filtered.map(item => renderEvidenceCard(item)).join("") || `
    <article class="paper-panel"><h3>No matching evidence</h3><p>Adjust your search or filters.</p></article>
  `;

  qsa("[data-open-evidence]").forEach(button => {
    button.addEventListener("click", () => openEvidenceModal(button.dataset.openEvidence));
  });
}

function renderEvidenceCard(item) {
  return `
    <article class="evidence-card reveal-card">
      <div class="card-meta">
        <span class="tag">${escapeHtml(item.id)}</span>
        <span class="status-badge ${statusClass(item.access)}">${escapeHtml(item.access)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <div class="card-meta">
        <span class="tag">${escapeHtml(item.type)}</span>
        <span class="tag">${escapeHtml(item.status)}</span>
        <span class="tag">${escapeHtml(item.date)}</span>
      </div>
      <div class="card-meta">${renderIssueTags(item.issueThreads)}</div>
      <div class="card-spacer"></div>
      <button type="button" data-open-evidence="${escapeAttr(item.id)}">Open Evidence</button>
    </article>
  `;
}

function renderPeople() {
  qs("#peopleGrid").innerHTML = people.map(person => `
    <article class="person-card reveal-card">
      <span class="tag">${escapeHtml(person.category)}</span>
      <h3>${escapeHtml(person.name)}</h3>
      <p><strong>${escapeHtml(person.role)}</strong></p>
      <p>${escapeHtml(person.summary)}</p>
      <div class="card-meta">${person.keyIssues.map(issue => `<span class="tag">${escapeHtml(issue)}</span>`).join("")}</div>
      <div class="card-spacer"></div>
      <button type="button" data-open-person="${escapeAttr(person.id)}">View Profile</button>
    </article>
  `).join("");

  qsa("[data-open-person]").forEach(button => {
    button.addEventListener("click", () => openPersonModal(button.dataset.openPerson));
  });
}

function renderMap() {
  const markerLayer = qs("#mapMarkers");
  if (!markerLayer) return;

  markerLayer.innerHTML = routeMarkers.map((marker, index) => `
    <button class="route-hotspot marker-${escapeAttr(marker.markerType)} reveal-card" type="button" style="left:${marker.x}%; top:${marker.y}%;" data-open-route="${escapeAttr(marker.id)}" aria-label="Open route marker ${escapeAttr(marker.title)}">
      <span class="hotspot-pulse"></span>
      <span class="hotspot-number">${index + 1}</span>
      <span class="hotspot-label"><strong>${escapeHtml(marker.title)}</strong><small>${escapeHtml(marker.keyIssue)}</small></span>
    </button>
  `).join("");

  const routeFocusList = qs("#routeFocusList");
  if (routeFocusList) {
    routeFocusList.innerHTML = routeMarkers.filter(marker => marker.rajaFocus).map(marker => `
      <button type="button" class="route-focus-item" data-open-route="${escapeAttr(marker.id)}">
        <span class="tag">${escapeHtml(marker.track || "Route marker")}</span>
        <strong>${escapeHtml(marker.title)}</strong>
        <span>${escapeHtml(marker.rajaFocus)}</span>
      </button>
    `).join("");
  }

  const highlightGrid = qs("#routeHighlightGrid");
  if (highlightGrid && typeof routeBoardHighlights !== "undefined") {
    highlightGrid.innerHTML = routeBoardHighlights.map(item => `
      <article class="route-highlight-card reveal-card">
        <span class="tag">${escapeHtml(item.category)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
        <div class="card-meta">${renderIssueTags(item.issueThreads || [])}</div>
        <button type="button" data-open-route-highlight="${escapeAttr(item.id)}">Open Reading</button>
      </article>
    `).join("");
  }

  qsa("[data-open-route]").forEach(button => {
    button.addEventListener("click", () => openRouteModal(button.dataset.openRoute));
  });
  qsa("[data-open-route-highlight]").forEach(button => {
    button.addEventListener("click", () => openRouteHighlightModal(button.dataset.openRouteHighlight));
  });
}

function renderMedical() {
  const stages = ["Sungai Relau", "Ascent", "Kem Kor", "Night Push", "Post-Incident Review"];
  qs("#symptomBoard").innerHTML = `
    <div class="symptom-line"></div>
    ${stages.map((stage, index) => `<div class="symptom-stage" style="--stage-index:${index}"><span>${escapeHtml(stage)}</span></div>`).join("")}
    ${medicalMarkers.map(marker => `<button type="button" class="symptom-pin reveal-card" data-open-medical="${escapeAttr(marker.id)}" style="left:${medicalPosition(marker.stage)}%"><strong>${escapeHtml(marker.symptom)}</strong><span>${escapeHtml(marker.stage)}</span></button>`).join("")}
  `;

  qs("#medicalGrid").innerHTML = medicalMarkers.map(marker => `
    <article class="medical-card reveal-card">
      <span class="stage">${escapeHtml(marker.stage)}</span>
      <h3>${escapeHtml(marker.symptom)}</h3>
      <p>${escapeHtml(marker.summary)}</p>
      <span class="tag">${escapeHtml(marker.riskCategory)}</span>
      <div class="card-spacer"></div>
      <button type="button" data-open-medical="${escapeAttr(marker.id)}">Open Marker</button>
    </article>
  `).join("");

  qsa("[data-open-medical]").forEach(button => {
    button.addEventListener("click", () => openMedicalModal(button.dataset.openMedical));
  });
}

function renderRelationships() {
  qs("#relationshipBoard").innerHTML = relationshipMap.map(group => `
    <article class="relationship-cluster reveal-card">
      <button class="relationship-central" type="button" data-open-person="${escapeAttr(group.linkedPerson)}">
        <span class="tag">${escapeHtml(group.nodeType)}</span>
        <strong>${escapeHtml(group.central)}</strong>
      </button>
      <div class="relationship-links">
        ${group.connections.map(connection => `
          <button type="button" class="relationship-node" data-rel-type="${escapeAttr(connection.targetType)}" data-rel-target="${escapeAttr(connection.target)}">
            <strong>${escapeHtml(connection.label)}</strong>
            <span>${escapeHtml(connection.note)}</span>
          </button>
        `).join("")}
      </div>
    </article>
  `).join("");

  qsa("#relationshipBoard [data-open-person]").forEach(button => button.addEventListener("click", () => openPersonModal(button.dataset.openPerson)));
  qsa("#relationshipBoard [data-rel-type]").forEach(button => button.addEventListener("click", () => openRelationshipTarget(button.dataset.relType, button.dataset.relTarget)));
}

function renderPhotos() {
  qs("#photoWall").innerHTML = photoItems.map(photo => `
    <article class="photo-card reveal-card">
      <button class="photo-frame" type="button" data-open-photo="${escapeAttr(photo.id)}" aria-label="Open ${escapeAttr(photo.title)}">
        ${photo.imageUrl ? `<img src="${escapeAttr(photo.imageUrl)}" alt="${escapeAttr(photo.title)}">` : `<span>${escapeHtml(photo.id)}</span>`}
      </button>
      <div class="photo-caption">
        <span class="tag">${escapeHtml(photo.category)}</span>
        <h3>${escapeHtml(photo.title)}</h3>
        <p>${escapeHtml(photo.caption)}</p>
        <span class="status-badge ${statusClass(photo.access)}">${escapeHtml(photo.access)}</span>
      </div>
    </article>
  `).join("");

  qsa("[data-open-photo]").forEach(button => button.addEventListener("click", () => openPhotoModal(button.dataset.openPhoto)));
}

function renderDiscrepancies() {
  qs("#discrepancyGrid").innerHTML = discrepancies.map(item => `
    <article class="discrepancy-card reveal-card">
      <div class="card-meta">
        <span class="tag">${escapeHtml(item.category)}</span>
        <span class="status-badge ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <div class="comparison-grid">
        <div><span class="eyebrow">Source A</span><p>${escapeHtml(item.sourceA)}</p></div>
        <div><span class="eyebrow">Source B</span><p>${escapeHtml(item.sourceB)}</p></div>
      </div>
      <p><strong>Conflict / difference:</strong> ${escapeHtml(item.conflict)}</p>
      <p><strong>Why it matters:</strong> ${escapeHtml(item.whyItMatters)}</p>
      <button type="button" data-open-discrepancy="${escapeAttr(item.id)}">Open Issue</button>
    </article>
  `).join("");

  qsa("[data-open-discrepancy]").forEach(button => button.addEventListener("click", () => openDiscrepancyModal(button.dataset.openDiscrepancy)));
}

function bindModal() {
  qsa("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });
}

function openModal(html) {
  qs("#modalContent").innerHTML = html;
  const modal = qs("#detailModal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-lock");
  const closeBtn = qs(".modal-close");
  if (closeBtn) closeBtn.focus();
  bindModalInternalLinks();
}

function closeModal() {
  const modal = qs("#detailModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-lock");
}

function bindModalInternalLinks() {
  qsa("#modalContent [data-open-evidence]").forEach(button => button.addEventListener("click", () => openEvidenceModal(button.dataset.openEvidence)));
  qsa("#modalContent [data-open-timeline]").forEach(button => button.addEventListener("click", () => openTimelineModal(button.dataset.openTimeline)));
  qsa("#modalContent [data-open-person]").forEach(button => button.addEventListener("click", () => openPersonModal(button.dataset.openPerson)));
  qsa("#modalContent [data-open-discrepancy]").forEach(button => button.addEventListener("click", () => openDiscrepancyModal(button.dataset.openDiscrepancy)));
  qsa("#modalContent [data-open-issue]").forEach(button => button.addEventListener("click", () => openIssueModal(button.dataset.openIssue)));
  qsa("#modalContent [data-open-route]").forEach(button => button.addEventListener("click", () => openRouteModal(button.dataset.openRoute)));
  qsa("#modalContent [data-open-route-highlight]").forEach(button => button.addEventListener("click", () => openRouteHighlightModal(button.dataset.openRouteHighlight)));
  qsa("#modalContent [data-section-jump]").forEach(button => button.addEventListener("click", () => { closeModal(); activateSection(button.dataset.sectionJump); }));
}

function openTimelineModal(id) {
  const event = timelineEvents.find(item => item.id === id);
  if (!event) return;
  openModal(`
    <span class="modal-kicker">Timeline Event · ${escapeHtml(event.id)}</span>
    <h2 id="modalTitle">${escapeHtml(event.title)}</h2>
    <div class="modal-grid">
      <div class="paper-panel"><h3>Summary</h3><p>${escapeHtml(event.summary)}</p><p><strong>Location:</strong> ${escapeHtml(event.location)}</p><p><strong>Time:</strong> ${escapeHtml(event.dateLabel)} · ${escapeHtml(event.timeLabel)}</p></div>
      <div class="paper-panel"><h3>Questions raised</h3>${renderList(event.questionsRaised)}</div>
    </div>
    <div class="modal-section"><h3>Issue threads</h3>${renderIssueTags(event.issues, true)}</div>
    <div class="modal-section"><h3>People involved</h3>${renderPersonLinks(event.people)}</div>
    <div class="modal-section"><h3>Linked evidence</h3>${renderEvidenceLinks(event.evidence)}</div>
  `);
}

function openEvidenceModal(id) {
  const item = evidenceItems.find(record => record.id === id);
  if (!item) return;
  openModal(`
    <span class="modal-kicker">Evidence Record · ${escapeHtml(item.id)}</span>
    <h2 id="modalTitle">${escapeHtml(item.title)}</h2>
    <div class="modal-grid">
      <div class="paper-panel">
        <h3>Record Summary</h3>
        <p>${escapeHtml(item.summary)}</p>
        <p><strong>Type:</strong> ${escapeHtml(item.type)}</p>
        <p><strong>Status:</strong> ${escapeHtml(item.status)}</p>
        <p><strong>Access:</strong> <span class="status-badge ${statusClass(item.access)}">${escapeHtml(item.access)}</span></p>
        <p><strong>Date:</strong> ${escapeHtml(item.date)}</p>
      </div>
      <div class="paper-panel document-placeholder">
        <h3>Document / Media Placeholder</h3>
        <p><span class="redacted-line"></span> <span class="redacted-line short"></span></p>
        <p class="muted">${escapeHtml(item.fileUrl || "No public file attached yet")}</p>
      </div>
    </div>
    <div class="modal-section"><h3>Issue tags</h3>${renderIssueTags(item.issueThreads, true)}</div>
    <div class="modal-section"><h3>People</h3>${renderPersonLinks(item.people)}</div>
    <div class="modal-section"><h3>Locations</h3><p>${item.locations.map(escapeHtml).join(" · ")}</p></div>
    <div class="modal-section"><h3>Linked timeline events</h3>${renderTimelineLinks(item.linkedTimelineEvents)}</div>
    <div class="modal-section"><h3>Linked discrepancies</h3>${renderDiscrepancyLinks(item.linkedDiscrepancies || [])}</div>
    <div class="modal-section"><h3>Editorial note</h3><p>${escapeHtml(item.editorialNote)}</p></div>
  `);
}

function openPersonModal(id) {
  const person = people.find(item => item.id === id);
  if (!person) return;
  openModal(`
    <span class="modal-kicker">Profile · ${escapeHtml(person.category)}</span>
    <h2 id="modalTitle">${escapeHtml(person.name)}</h2>
    <div class="modal-grid">
      <div class="paper-panel"><h3>Role</h3><p><strong>${escapeHtml(person.role)}</strong></p><p>${escapeHtml(person.summary)}</p></div>
      <div class="paper-panel"><h3>Key issues</h3>${renderList(person.keyIssues)}</div>
    </div>
    <div class="modal-section"><h3>Linked evidence</h3>${renderEvidenceLinks(person.linkedEvidence)}</div>
    <div class="modal-section"><h3>Linked timeline events</h3>${renderTimelineLinks(person.linkedTimelineEvents)}</div>
  `);
}

function openRouteModal(id) {
  const marker = routeMarkers.find(item => item.id === id);
  if (!marker) return;
  openModal(`
    <span class="modal-kicker">Route Board Marker · ${escapeHtml(marker.id)} · ${escapeHtml(marker.track || "Route")}</span>
    <h2 id="modalTitle">${escapeHtml(marker.title)}</h2>
    <div class="modal-grid">
      <div class="paper-panel"><h3>Location</h3><p>${escapeHtml(marker.location)}</p><h3>Summary</h3><p>${escapeHtml(marker.summary)}</p></div>
      <div class="paper-panel"><h3>Raja Azlan Shah focus</h3><p>${escapeHtml(marker.rajaFocus || marker.keyIssue)}</p><h3>Key issue</h3><p>${escapeHtml(marker.keyIssue)}</p><span class="tag">${escapeHtml(marker.markerType)}</span></div>
    </div>
    <div class="modal-section"><h3>Related timeline events</h3>${renderTimelineLinks(marker.linkedTimelineEvents)}</div>
    <div class="modal-section"><h3>People involved</h3>${renderPersonLinks(marker.people)}</div>
    <div class="modal-section"><h3>Linked evidence</h3>${renderEvidenceLinks(marker.evidence)}</div>
  `);
}

function openRouteHighlightModal(id) {
  const item = typeof routeBoardHighlights !== "undefined" ? routeBoardHighlights.find(record => record.id === id) : null;
  if (!item) return;
  openModal(`
    <span class="modal-kicker">Route Board Reading · ${escapeHtml(item.id)}</span>
    <h2 id="modalTitle">${escapeHtml(item.title)}</h2>
    <div class="modal-grid">
      <div class="paper-panel"><h3>Reading</h3><p>${escapeHtml(item.summary)}</p><p><strong>Category:</strong> ${escapeHtml(item.category)}</p></div>
      <div class="paper-panel"><h3>Issue threads</h3>${renderIssueTags(item.issueThreads || [], true)}</div>
    </div>
    <div class="modal-section"><h3>Linked route markers</h3>${renderRouteLinks(item.linkedMarkers || [])}</div>
    <div class="modal-section"><h3>Linked evidence</h3>${renderEvidenceLinks(item.linkedEvidence || [])}</div>
  `);
}

function openMedicalModal(id) {
  const marker = medicalMarkers.find(item => item.id === id);
  if (!marker) return;
  openModal(`
    <span class="modal-kicker">Medical Marker · ${escapeHtml(marker.id)}</span>
    <h2 id="modalTitle">${escapeHtml(marker.symptom)}</h2>
    <div class="modal-grid">
      <div class="paper-panel"><h3>Summary</h3><p>${escapeHtml(marker.summary)}</p><p><strong>Stage:</strong> ${escapeHtml(marker.stage)}</p><p><strong>Risk category:</strong> ${escapeHtml(marker.riskCategory)}</p></div>
      <div class="paper-panel"><h3>Investigative question</h3><p>${escapeHtml(marker.investigativeQuestion)}</p></div>
    </div>
    <div class="modal-section"><h3>Linked person</h3>${renderPersonLinks([marker.linkedPerson])}</div>
    <div class="modal-section"><h3>Linked evidence</h3>${renderEvidenceLinks(marker.evidence)}</div>
    <div class="modal-section"><h3>Linked timeline events</h3>${renderTimelineLinks(marker.linkedTimelineEvents)}</div>
  `);
}

function openDiscrepancyModal(id) {
  const item = discrepancies.find(record => record.id === id);
  if (!item) return;
  openModal(`
    <span class="modal-kicker">Discrepancy · ${escapeHtml(item.id)}</span>
    <h2 id="modalTitle">${escapeHtml(item.title)}</h2>
    <div class="comparison-grid modal-comparison">
      <div class="paper-panel"><span class="eyebrow">Source A</span><p>${escapeHtml(item.sourceA)}</p></div>
      <div class="paper-panel"><span class="eyebrow">Source B</span><p>${escapeHtml(item.sourceB)}</p></div>
    </div>
    <div class="paper-panel"><h3>Conflict / difference</h3><p>${escapeHtml(item.conflict)}</p><h3>Why it matters</h3><p>${escapeHtml(item.whyItMatters)}</p><span class="status-badge ${statusClass(item.status)}">${escapeHtml(item.status)}</span></div>
    <div class="modal-section"><h3>Linked timeline events</h3>${renderTimelineLinks(item.linkedTimelineEvents)}</div>
    <div class="modal-section"><h3>Linked evidence</h3>${renderEvidenceLinks(item.evidence)}</div>
  `);
}

function openIssueModal(id) {
  const issue = issueThreads.find(item => item.id === id);
  if (!issue) return;
  openModal(`
    <span class="modal-kicker">Issue Thread · ${escapeHtml(issue.id)}</span>
    <h2 id="modalTitle">${escapeHtml(issue.title)}</h2>
    <div class="paper-panel"><p>${escapeHtml(issue.description)}</p></div>
    <div class="modal-section"><h3>Linked timeline events</h3>${renderTimelineLinks(issue.linkedEvents)}</div>
    <div class="modal-section"><h3>Linked evidence</h3>${renderEvidenceLinks(issue.linkedEvidence)}</div>
  `);
}

function openPhotoModal(id) {
  const photo = photoItems.find(item => item.id === id);
  if (!photo) return;
  openModal(`
    <span class="modal-kicker">Photo Record · ${escapeHtml(photo.id)}</span>
    <h2 id="modalTitle">${escapeHtml(photo.title)}</h2>
    <div class="modal-grid">
      <div class="photo-frame modal-photo-frame">${photo.imageUrl ? `<img src="${escapeAttr(photo.imageUrl)}" alt="${escapeAttr(photo.title)}">` : `<span>${escapeHtml(photo.id)}</span>`}</div>
      <div class="paper-panel"><h3>Metadata</h3><p><strong>Type:</strong> ${escapeHtml(photo.type)}</p><p><strong>Location:</strong> ${escapeHtml(photo.location)}</p><p><strong>Date:</strong> ${escapeHtml(photo.date)}</p><p><strong>Access:</strong> <span class="status-badge ${statusClass(photo.access)}">${escapeHtml(photo.access)}</span></p><p>${escapeHtml(photo.caption)}</p></div>
    </div>
    <div class="modal-section"><h3>Linked timeline events</h3>${renderTimelineLinks(photo.linkedTimelineEvents)}</div>
    <div class="modal-section"><h3>Linked evidence</h3>${renderEvidenceLinks(photo.linkedEvidence)}</div>
  `);
}

function openRelationshipTarget(type, target) {
  const normalized = type.toLowerCase();
  if (normalized === "evidence") return openEvidenceModal(target);
  if (normalized === "timeline") return openTimelineModal(target);
  if (normalized === "medical") return openMedicalModal(target);
  if (normalized === "issue") return openIssueModal(target);
  if (normalized === "section") { closeModal(); activateSection(target); return; }
}

function renderIssueTags(ids = [], asButtons = false) {
  return ids.map(id => {
    const issue = issueThreads.find(thread => thread.id === id);
    const title = issue ? issue.title : id;
    const cls = issue ? issue.className : "";
    return asButtons
      ? `<button class="tag issue-tag ${escapeAttr(cls)}" type="button" data-open-issue="${escapeAttr(id)}">${escapeHtml(title)}</button>`
      : `<span class="tag issue-tag ${escapeAttr(cls)}">${escapeHtml(title)}</span>`;
  }).join("");
}

function renderPersonLinks(ids = []) {
  return ids.map(id => `<button type="button" class="link-pill" data-open-person="${escapeAttr(id)}">${escapeHtml(getPersonName(id))}</button>`).join("") || `<p class="muted">No linked profiles.</p>`;
}

function renderEvidenceLinks(ids = []) {
  return ids.map(id => `<button type="button" class="link-pill" data-open-evidence="${escapeAttr(id)}">${escapeHtml(id)} · ${escapeHtml(getEvidenceTitle(id))}</button>`).join("") || `<p class="muted">No linked evidence.</p>`;
}

function renderTimelineLinks(ids = []) {
  return ids.map(id => `<button type="button" class="link-pill" data-open-timeline="${escapeAttr(id)}">${escapeHtml(id)} · ${escapeHtml(getTimelineTitle(id))}</button>`).join("") || `<p class="muted">No linked timeline events.</p>`;
}

function renderDiscrepancyLinks(ids = []) {
  return ids.map(id => `<button type="button" class="link-pill" data-open-discrepancy="${escapeAttr(id)}">${escapeHtml(id)} · ${escapeHtml(getDiscrepancyTitle(id))}</button>`).join("") || `<p class="muted">No linked discrepancy records.</p>`;
}

function renderList(items = []) {
  return `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function getPersonName(id) { return (people.find(item => item.id === id) || {}).name || id; }
function getEvidenceTitle(id) { return (evidenceItems.find(item => item.id === id) || {}).title || id; }
function getTimelineTitle(id) { return (timelineEvents.find(item => item.id === id) || {}).title || id; }
function getDiscrepancyTitle(id) { return (discrepancies.find(item => item.id === id) || {}).title || id; }
function getIssueTitle(id) { return (issueThreads.find(item => item.id === id) || {}).title || id; }

function statusClass(value = "") {
  const key = value.toLowerCase();
  if (key.includes("public")) return "status-public";
  if (key.includes("redacted")) return "status-redacted";
  if (key.includes("summary")) return "status-summary";
  if (key.includes("private")) return "status-private";
  if (key.includes("pending")) return "status-pending";
  if (key.includes("unresolved") || key.includes("requires")) return "status-unresolved";
  return "status-neutral";
}

function medicalPosition(stage) {
  const s = stage.toLowerCase();
  if (s.includes("sungai")) return 8;
  if (s.includes("ascent")) return 30;
  if (s.includes("kem kor")) return 52;
  if (s.includes("night")) return 74;
  return 90;
}

function initRevealObserver() {
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    qsa(".reveal-card").forEach(card => card.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  qsa(".reveal-card").forEach(card => observer.observe(card));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

document.addEventListener("DOMContentLoaded", initArchive);
