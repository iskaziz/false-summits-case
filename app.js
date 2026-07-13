(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const data = {
    timelineEvents: safeArray('timelineEvents'),
    evidenceItems: safeArray('evidenceItems'),
    people: safeArray('people'),
    medicalMarkers: safeArray('medicalMarkers'),
    discrepancies: safeArray('discrepancies'),
    routeMarkers: safeArray('routeMarkers'),
    issueThreads: safeArray('issueThreads'),
    photoItems: safeArray('photoItems'),
    relationshipMap: safeArray('relationshipMap'),
    overviewModules: safeArray('overviewModules'),
    startHereSteps: safeArray('startHereSteps'),
    routeBoardHighlights: safeArray('routeBoardHighlights')
  };

  const state = {
    layer: 'all',
    selectedMarkerId: data.routeMarkers[0]?.id || null,
    selectedPersonId: data.people[0]?.id || null,
    evidenceQuery: '',
    typeFilter: 'all',
    statusFilter: 'all',
    accessFilter: 'all'
  };

  document.addEventListener('DOMContentLoaded', init);

  function safeArray(name){
    try { return Array.isArray(eval(name)) ? eval(name) : []; } catch(e) { return []; }
  }

  function init(){
    bindNav();
    renderCounters();
    renderStartSteps();
    renderRouteBoard();
    renderCompressedRail();
    renderInspector();
    populateEvidenceFilters();
    bindEvidenceControls();
    renderEvidence();
    renderPeople();
    renderQuestions();
    bindModal();
  }

  function bindNav(){
    $$('.nav-link').forEach(btn => btn.addEventListener('click', () => showSection(btn.dataset.section)));
    $$('[data-section-jump]').forEach(btn => btn.addEventListener('click', () => showSection(btn.dataset.sectionJump)));
    const toggle = $('#navToggle');
    const nav = $('#primaryNav');
    if(toggle && nav){
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }
  }

  function showSection(id){
    $$('.page-section').forEach(section => section.classList.toggle('is-active', section.id === id));
    $$('.nav-link').forEach(btn => btn.classList.toggle('is-active', btn.dataset.section === id));
    $('#primaryNav')?.classList.remove('is-open');
    $('#navToggle')?.setAttribute('aria-expanded','false');
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function renderCounters(){
    const target = $('#dashboardCounters');
    if(!target) return;
    const counters = [
      ['Timeline', data.timelineEvents.length],
      ['Evidence', data.evidenceItems.length],
      ['People', data.people.length],
      ['Medical', data.medicalMarkers.length],
      ['Questions', data.discrepancies.length]
    ];
    target.innerHTML = counters.map(([label,value]) => `<article class="counter-card"><strong>${value}</strong><span>${escapeHtml(label)}</span></article>`).join('');
  }

  function renderStartSteps(){
    const target = $('#startSteps');
    if(!target) return;
    const steps = data.startHereSteps.length ? data.startHereSteps : [
      {number:'01',title:'What happened?',copy:'Open the timeline layer.',target:'caseboard'},
      {number:'02',title:'Where did it happen?',copy:'Follow the route board.',target:'caseboard'},
      {number:'03',title:'What symptoms were reported?',copy:'Use the medical layer.',target:'caseboard'},
      {number:'04',title:'What decisions were made?',copy:'Inspect decision points.',target:'caseboard'},
      {number:'05',title:'What remains unresolved?',copy:'Open Questions.',target:'questions'}
    ];
    target.innerHTML = steps.map(step => `
      <button class="start-step" type="button" data-start-target="${step.target || 'caseboard'}">
        <span>${escapeHtml(step.number || '')}</span><strong>${escapeHtml(step.title)}</strong><p>${escapeHtml(step.copy || '')}</p>
      </button>`).join('');
    $$('[data-start-target]', target).forEach(btn => btn.addEventListener('click', () => {
      const targetId = btn.dataset.startTarget || 'caseboard';
      if(['overview','timeline','route','medical','relationships','photos','discrepancies'].includes(targetId)){
        showSection('caseboard');
        state.layer = layerFromLegacyTarget(targetId);
        updateLayerTabs(); renderRouteBoard(); renderCompressedRail(); renderInspector();
      } else showSection(targetId);
    }));
  }

  function layerFromLegacyTarget(target){
    return {overview:'all',timeline:'timeline',route:'route',medical:'medical',relationships:'all',photos:'all',discrepancies:'communication'}[target] || 'all';
  }

  function renderRouteBoard(){
    const target = $('#routeHotspots');
    if(!target) return;
    const markers = filteredMarkers();
    target.innerHTML = data.routeMarkers.map((m, idx) => {
      const muted = markers.includes(m) ? '' : ' is-muted';
      const selected = state.selectedMarkerId === m.id ? ' is-selected' : '';
      return `<button class="hotspot${muted}${selected}" data-marker-id="${m.id}" data-type="${escapeHtml(m.markerType || 'route')}" style="left:${Number(m.x)||50}%;top:${Number(m.y)||50}%" type="button" title="${escapeAttr(m.title)}">${idx+1}</button>`;
    }).join('');
    $$('.hotspot', target).forEach(btn => btn.addEventListener('click', () => {
      state.selectedMarkerId = btn.dataset.markerId;
      renderRouteBoard();
      renderInspector({type:'marker', id:state.selectedMarkerId});
    }));
    $$('#caseLayerTabs .layer-tab').forEach(btn => btn.addEventListener('click', () => {
      state.layer = btn.dataset.layer;
      updateLayerTabs(); renderRouteBoard(); renderCompressedRail(); renderInspector();
    }));
    updateLayerTabs();
  }

  function updateLayerTabs(){
    $$('#caseLayerTabs .layer-tab').forEach(btn => btn.classList.toggle('is-active', btn.dataset.layer === state.layer));
  }

  function filteredMarkers(){
    if(state.layer === 'all') return data.routeMarkers;
    if(state.layer === 'medical') return data.routeMarkers.filter(m => ['medical','decision'].includes(m.markerType));
    if(state.layer === 'communication') return data.routeMarkers.filter(m => ['communication','debrief'].includes(m.markerType));
    if(state.layer === 'route') return data.routeMarkers.filter(m => ['route','briefing','decision'].includes(m.markerType));
    if(state.layer === 'timeline') return data.routeMarkers;
    return data.routeMarkers;
  }

  function renderCompressedRail(){
    const target = $('#compressedRail');
    if(!target) return;
    let rows = [];
    if(state.layer === 'medical') rows = data.medicalMarkers.map(item => ({kind:'medical', id:item.id, kicker:item.stage || 'Medical marker', title:item.symptom || item.title}));
    else if(state.layer === 'communication') rows = data.timelineEvents.filter(e => (e.issues||[]).includes('ISS-005') || ['TL-008','TL-009','TL-010'].includes(e.id)).map(e => ({kind:'timeline', id:e.id, kicker:e.timeLabel || e.dateLabel, title:e.title}));
    else rows = data.timelineEvents.map(e => ({kind:'timeline', id:e.id, kicker:e.timeLabel || e.dateLabel, title:e.title}));
    target.innerHTML = rows.map(row => `<button class="rail-item" type="button" data-kind="${row.kind}" data-id="${row.id}"><span>${escapeHtml(row.kicker||'')}</span><strong>${escapeHtml(row.title)}</strong></button>`).join('');
    $$('.rail-item', target).forEach(btn => btn.addEventListener('click', () => renderInspector({type:btn.dataset.kind, id:btn.dataset.id})));
  }

  function renderInspector(selection){
    const target = $('#inspectorPanel');
    if(!target) return;
    let html = '';
    if(selection?.type === 'timeline') html = timelineInspector(findById(data.timelineEvents, selection.id));
    else if(selection?.type === 'medical') html = medicalInspector(findById(data.medicalMarkers, selection.id));
    else if(selection?.type === 'issue') html = issueInspector(findById(data.issueThreads, selection.id));
    else if(selection?.type === 'evidence') html = evidenceInspector(findById(data.evidenceItems, selection.id));
    else html = markerInspector(findById(data.routeMarkers, state.selectedMarkerId) || data.routeMarkers[0]);
    target.innerHTML = html || emptyInspector();
    bindInspectorActions(target);
  }

  function markerInspector(m){
    if(!m) return emptyInspector();
    const events = (m.linkedTimelineEvents||[]).map(id => findById(data.timelineEvents,id)).filter(Boolean);
    const evidence = (m.evidence||[]).map(id => findById(data.evidenceItems,id)).filter(Boolean);
    const people = (m.people||[]).map(id => personName(id)).filter(Boolean);
    return `<div class="inspector-content">
      <span class="eyebrow">${escapeHtml(m.track || 'Route Marker')}</span>
      <h2>${escapeHtml(m.title)}</h2>
      <p>${escapeHtml(m.summary || '')}</p>
      ${m.rajaFocus ? `<div class="modal-preview"><strong>Raja Azlan Shah focus</strong><p>${escapeHtml(m.rajaFocus)}</p></div>` : ''}
      <div class="meta-grid">
        <div class="meta-item"><span>Location</span><strong>${escapeHtml(m.location || '—')}</strong></div>
        <div class="meta-item"><span>Key issue</span><strong>${escapeHtml(m.keyIssue || 'Requires clarification')}</strong></div>
      </div>
      ${badgeRow(people, 'blue')}
      <h3>Linked timeline</h3>${miniList(events, 'timeline')}
      <h3>Linked evidence</h3>${miniList(evidence, 'evidence')}
    </div>`;
  }

  function timelineInspector(e){
    if(!e) return emptyInspector();
    const issues = (e.issues||[]).map(issueTitle).filter(Boolean);
    const evidence = (e.evidence||[]).map(id => findById(data.evidenceItems,id)).filter(Boolean);
    return `<div><span class="eyebrow">${escapeHtml(e.dateLabel || 'Timeline')}</span><h2>${escapeHtml(e.title)}</h2><p>${escapeHtml(e.summary || '')}</p>
      <div class="meta-grid"><div class="meta-item"><span>Time</span><strong>${escapeHtml(e.timeLabel || '—')}</strong></div><div class="meta-item"><span>Location</span><strong>${escapeHtml(e.location || '—')}</strong></div><div class="meta-item"><span>Status</span><strong>${escapeHtml(e.status || '—')}</strong></div><div class="meta-item"><span>Category</span><strong>${escapeHtml(e.category || '—')}</strong></div></div>
      ${badgeRow(issues)}
      ${e.questionsRaised?.length ? `<h3>Questions raised</h3><ul>${e.questionsRaised.map(q=>`<li>${escapeHtml(q)}</li>`).join('')}</ul>` : ''}
      <h3>Linked evidence</h3>${miniList(evidence, 'evidence')}</div>`;
  }

  function medicalInspector(m){
    if(!m) return emptyInspector();
    const evidence = (m.evidence||[]).map(id => findById(data.evidenceItems,id)).filter(Boolean);
    return `<div><span class="eyebrow">Medical Marker</span><h2>${escapeHtml(m.symptom || m.title)}</h2><p>${escapeHtml(m.summary || '')}</p>
      <div class="meta-grid"><div class="meta-item"><span>Stage</span><strong>${escapeHtml(m.stage || '—')}</strong></div><div class="meta-item"><span>Risk category</span><strong>${escapeHtml(m.riskCategory || '—')}</strong></div></div>
      ${m.investigativeQuestion ? `<div class="modal-preview"><strong>Investigative question</strong><p>${escapeHtml(m.investigativeQuestion)}</p></div>` : ''}
      <h3>Linked evidence</h3>${miniList(evidence, 'evidence')}</div>`;
  }

  function evidenceInspector(e){
    if(!e) return emptyInspector();
    const issues = (e.issues || e.tags || []).map(x => issueTitle(x) || x).filter(Boolean);
    const events = (e.linkedTimelineEvents || []).map(id => findById(data.timelineEvents,id)).filter(Boolean);
    return `<div><span class="eyebrow">${escapeHtml(e.id || 'Evidence')}</span><h2>${escapeHtml(e.title)}</h2><p>${escapeHtml(e.summary || '')}</p>
      <div class="meta-grid"><div class="meta-item"><span>Type</span><strong>${escapeHtml(e.type || '—')}</strong></div><div class="meta-item"><span>Status</span><strong>${escapeHtml(e.status || '—')}</strong></div><div class="meta-item"><span>Access</span><strong>${escapeHtml(e.access || '—')}</strong></div><div class="meta-item"><span>Date</span><strong>${escapeHtml(e.date || '—')}</strong></div></div>
      ${badgeRow(issues)}<h3>Linked events</h3>${miniList(events, 'timeline')}
      <div class="modal-preview" aria-label="Document placeholder"><div class="redacted-line"></div><div class="redacted-line mid"></div><div class="redacted-line short"></div><p>Public file preview placeholder. Attach redacted source material when cleared.</p></div></div>`;
  }

  function issueInspector(issue){
    if(!issue) return emptyInspector();
    const events = (issue.linkedEvents||[]).map(id => findById(data.timelineEvents,id)).filter(Boolean);
    const evidence = (issue.linkedEvidence||[]).map(id => findById(data.evidenceItems,id)).filter(Boolean);
    return `<div><span class="eyebrow">Issue Thread</span><h2>${escapeHtml(issue.title)}</h2><p>${escapeHtml(issue.description || '')}</p><h3>Linked events</h3>${miniList(events, 'timeline')}<h3>Linked evidence</h3>${miniList(evidence, 'evidence')}</div>`;
  }

  function emptyInspector(){
    return `<div class="inspector-empty"><span class="eyebrow">Inspector</span><h2>Select an item.</h2><p>Details will load here.</p></div>`;
  }

  function bindInspectorActions(root){
    $$('[data-open-kind]', root).forEach(btn => btn.addEventListener('click', () => {
      const kind = btn.dataset.openKind, id = btn.dataset.openId;
      if(kind === 'evidence') openModal(evidenceInspector(findById(data.evidenceItems,id)));
      else if(kind === 'timeline') renderInspector({type:'timeline',id});
      else if(kind === 'medical') renderInspector({type:'medical',id});
      else if(kind === 'issue') renderInspector({type:'issue',id});
    }));
  }

  function miniList(items, kind){
    if(!items.length) return `<p class="muted">No linked records in this prototype.</p>`;
    return `<div class="action-row">${items.map(item => `<button class="inspector-action" type="button" data-open-kind="${kind}" data-open-id="${item.id}">${escapeHtml(item.id)} — ${escapeHtml(item.title || item.symptom || item.name || '')}</button>`).join('')}</div>`;
  }

  function populateEvidenceFilters(){
    const typeSel = $('#typeFilter'), statusSel = $('#statusFilter'), accessSel = $('#accessFilter');
    addOptions(typeSel, unique(data.evidenceItems.map(e => e.type)));
    addOptions(statusSel, unique(data.evidenceItems.map(e => e.status)));
    addOptions(accessSel, unique(data.evidenceItems.map(e => e.access)));
  }

  function addOptions(select, values){
    if(!select) return;
    values.filter(Boolean).sort().forEach(v => select.insertAdjacentHTML('beforeend', `<option value="${escapeAttr(v)}">${escapeHtml(v)}</option>`));
  }

  function bindEvidenceControls(){
    const inputs = [$('#evidenceSearch'), $('#typeFilter'), $('#statusFilter'), $('#accessFilter')].filter(Boolean);
    inputs.forEach(el => el.addEventListener('input', () => {
      state.evidenceQuery = $('#evidenceSearch')?.value.toLowerCase().trim() || '';
      state.typeFilter = $('#typeFilter')?.value || 'all';
      state.statusFilter = $('#statusFilter')?.value || 'all';
      state.accessFilter = $('#accessFilter')?.value || 'all';
      renderEvidence();
    }));
  }

  function evidenceFiltered(){
    return data.evidenceItems.filter(e => {
      const hay = [e.id,e.title,e.type,e.status,e.access,e.summary,(e.tags||[]).join(' '),(e.people||[]).map(personName).join(' '),(e.locations||[]).join(' ')].join(' ').toLowerCase();
      return (!state.evidenceQuery || hay.includes(state.evidenceQuery)) &&
        (state.typeFilter === 'all' || e.type === state.typeFilter) &&
        (state.statusFilter === 'all' || e.status === state.statusFilter) &&
        (state.accessFilter === 'all' || e.access === state.accessFilter);
    });
  }

  function renderEvidence(){
    const rows = evidenceFiltered();
    const tbody = $('#evidenceTable tbody');
    const mobile = $('#evidenceCardsMobile');
    if(tbody){
      tbody.innerHTML = rows.map(e => `<tr data-evidence-id="${e.id}"><td><strong>${escapeHtml(e.id)}</strong></td><td>${escapeHtml(e.type||'')}</td><td><div class="table-title">${escapeHtml(e.title)}</div><small>${escapeHtml(truncate(e.summary||'',120))}</small></td><td>${escapeHtml(e.status||'')}</td><td>${badgeRow((e.issues||e.tags||[]).slice(0,3).map(x=>issueTitle(x)||x))}</td><td><button class="inspector-action" type="button">Open</button></td></tr>`).join('');
      $$('tr[data-evidence-id]', tbody).forEach(row => row.addEventListener('click', () => openModal(evidenceInspector(findById(data.evidenceItems,row.dataset.evidenceId)))));
    }
    if(mobile){
      mobile.innerHTML = rows.map(e => `<button class="mobile-evidence-card" type="button" data-evidence-id="${e.id}"><span class="eyebrow">${escapeHtml(e.id)}</span><h3>${escapeHtml(e.title)}</h3><p>${escapeHtml(truncate(e.summary||'',130))}</p>${badgeRow([e.type,e.status,e.access].filter(Boolean))}</button>`).join('');
      $$('[data-evidence-id]', mobile).forEach(btn => btn.addEventListener('click', () => openModal(evidenceInspector(findById(data.evidenceItems,btn.dataset.evidenceId)))));
    }
  }

  function renderPeople(){
    const list = $('#peopleList'), detail = $('#peopleDetail');
    if(!list || !detail) return;
    list.innerHTML = data.people.map(p => `<button class="person-button ${p.id===state.selectedPersonId?'is-active':''}" type="button" data-person-id="${p.id}"><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(p.role || p.category || '')}</span></button>`).join('');
    $$('.person-button', list).forEach(btn => btn.addEventListener('click', () => {state.selectedPersonId = btn.dataset.personId; renderPeople();}));
    const p = findById(data.people, state.selectedPersonId) || data.people[0];
    if(!p){ detail.innerHTML = '<p>No people loaded.</p>'; return; }
    const evidence = (p.linkedEvidence||[]).map(id => findById(data.evidenceItems,id)).filter(Boolean);
    const events = (p.linkedTimelineEvents||[]).map(id => findById(data.timelineEvents,id)).filter(Boolean);
    const rel = data.relationshipMap.find(r => r.linkedPerson === p.id);
    detail.innerHTML = `<span class="eyebrow">${escapeHtml(p.category || 'Profile')}</span><h2>${escapeHtml(p.name)}</h2><p>${escapeHtml(p.summary || p.publicSummary || '')}</p><div class="meta-grid"><div class="meta-item"><span>Role</span><strong>${escapeHtml(p.role || '—')}</strong></div><div class="meta-item"><span>Case relevance</span><strong>${escapeHtml(p.relationshipToCase || p.category || '—')}</strong></div></div>${badgeRow(p.keyIssues || [])}<h3>Linked events</h3>${miniList(events,'timeline')}<h3>Linked evidence</h3>${miniList(evidence,'evidence')}${rel ? `<h3>Relationship map</h3><div class="action-row">${rel.connections.map(c => `<button class="inspector-action" type="button" data-rel-type="${c.targetType}" data-rel-target="${c.target}">${escapeHtml(c.label)}</button>`).join('')}</div>` : ''}`;
    bindInspectorActions(detail);
    $$('[data-rel-type]', detail).forEach(btn => btn.addEventListener('click', () => handleRelationship(btn.dataset.relType, btn.dataset.relTarget)));
  }

  function handleRelationship(type, target){
    if(type === 'evidence') openModal(evidenceInspector(findById(data.evidenceItems,target)));
    else if(type === 'timeline'){ showSection('caseboard'); renderInspector({type:'timeline', id:target}); }
    else if(type === 'medical'){ showSection('caseboard'); state.layer='medical'; updateLayerTabs(); renderRouteBoard(); renderCompressedRail(); renderInspector({type:'medical', id:target}); }
    else if(type === 'issue'){ showSection('questions'); setTimeout(() => openAccordionById(target), 50); }
    else showSection(target === 'medical' ? 'caseboard' : 'caseboard');
  }

  function renderQuestions(){
    const issueTarget = $('#issueAccordion');
    const discTarget = $('#discrepancyAccordion');
    if(issueTarget){
      issueTarget.innerHTML = data.issueThreads.map((issue, i) => `<article class="accordion-item ${i===0?'is-open':''}" data-accordion-id="${issue.id}"><button class="accordion-trigger" type="button"><span>${escapeHtml(issue.title)}</span><span>+</span></button><div class="accordion-content"><p>${escapeHtml(issue.description||'')}</p><div class="action-row"><button class="inspector-action" type="button" data-inspect-issue="${issue.id}">Inspect on Case Board</button></div></div></article>`).join('');
      bindAccordions(issueTarget);
      $$('[data-inspect-issue]', issueTarget).forEach(btn => btn.addEventListener('click', () => {showSection('caseboard'); renderInspector({type:'issue', id:btn.dataset.inspectIssue});}));
    }
    if(discTarget){
      discTarget.innerHTML = data.discrepancies.map((d, i) => discrepancyAccordionHtml(d,i)).join('');
      bindAccordions(discTarget);
      bindInspectorActions(discTarget);
    }
  }

  function discrepancyAccordionHtml(d, i){
    const sourceA = d.sourceA || d.accountA || d.sources?.[0] || 'Source A requires review';
    const sourceB = d.sourceB || d.accountB || d.sources?.[1] || 'Source B requires review';
    return `<article class="accordion-item ${i===0?'is-open':''}" data-accordion-id="${d.id}"><button class="accordion-trigger" type="button"><span>${escapeHtml(d.title)}</span><span>+</span></button><div class="accordion-content"><p>${escapeHtml(d.summary || d.issue || '')}</p><div class="compare-grid"><div class="compare-cell"><strong>Source A</strong><p>${escapeHtml(String(sourceA))}</p></div><div class="compare-cell"><strong>Source B</strong><p>${escapeHtml(String(sourceB))}</p></div></div><p><strong>Why it matters:</strong> ${escapeHtml(d.whyItMatters || d.conflict || 'This affects the reconstruction and requires clarification.')}</p>${badgeRow([d.status || 'Unresolved', d.category || 'Discrepancy'], 'red')}${miniList((d.linkedTimelineEvents||[]).map(id=>findById(data.timelineEvents,id)).filter(Boolean),'timeline')}</div></article>`;
  }

  function bindAccordions(root){
    $$('.accordion-trigger', root).forEach(btn => btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const currently = item.classList.contains('is-open');
      $$('.accordion-item', root).forEach(x => x.classList.remove('is-open'));
      if(!currently) item.classList.add('is-open');
    }));
  }

  function openAccordionById(id){
    const item = $(`[data-accordion-id="${CSS.escape(id)}"]`);
    if(item){ $$('.accordion-item', item.parentElement).forEach(x => x.classList.remove('is-open')); item.classList.add('is-open'); item.scrollIntoView({block:'center', behavior:'smooth'}); }
  }

  function bindModal(){
    $$('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
  }

  function openModal(html){
    $('#modalContent').innerHTML = html;
    const modal = $('#detailModal');
    modal.setAttribute('aria-hidden','false');
    bindInspectorActions($('#modalContent'));
  }

  function closeModal(){ $('#detailModal')?.setAttribute('aria-hidden','true'); }

  function findById(arr,id){ return arr.find(x => x.id === id); }
  function unique(arr){ return Array.from(new Set(arr.filter(Boolean))); }
  function personName(id){ return findById(data.people,id)?.name || id; }
  function issueTitle(id){ return findById(data.issueThreads,id)?.title || (String(id).startsWith('ISS-') ? id : null); }
  function truncate(s,n){ return String(s).length > n ? String(s).slice(0,n-1)+'…' : String(s); }
  function badgeRow(items, tone=''){
    const arr = (items||[]).filter(Boolean);
    if(!arr.length) return '';
    return `<div class="badge-row">${arr.map(item => `<span class="badge ${tone}">${escapeHtml(String(item))}</span>`).join('')}</div>`;
  }
  function escapeHtml(str){ return String(str ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
  function escapeAttr(str){ return escapeHtml(str).replace(/`/g,'&#96;'); }
})();
