const timelineEvents = [
  {
    id: "TL-001",
    title: "Briefing at Sungai Relau base camp",
    dateLabel: "Saturday",
    timeLabel: "12:00 PM",
    location: "Sungai Relau Base Camp",
    category: "Expedition Start",
    summary: "The expedition begins after a guide briefing that included discussion of hiker experience levels.",
    people: ["P-001", "P-003", "P-009"],
    evidence: ["FS-TR-001", "FS-MAP-001"],
    issues: ["ISS-002", "ISS-003", "ISS-006"],
    status: "Witness Account",
    questionsRaised: ["How was participant readiness assessed?", "Were medical or fitness risks explicitly discussed before departure?"]
  },
  {
    id: "TL-002",
    title: "Raja experiences diarrhea and slows down",
    dateLabel: "Saturday",
    timeLabel: "Ascent to Kem Kor",
    location: "Trail between Sungai Relau and Kem Kor",
    category: "Medical Distress",
    summary: "Witness-linked reconstruction notes Raja Azlan Shah reportedly experienced diarrhea and moved slowly during the ascent.",
    people: ["P-001", "P-003", "P-009"],
    evidence: ["FS-TR-001"],
    issues: ["ISS-001", "ISS-002", "ISS-003"],
    status: "Witness Account",
    questionsRaised: ["Was Raja’s condition assessed as a potential warning sign?", "Who was responsible for monitoring his physical condition?"]
  },
  {
    id: "TL-003",
    title: "Unusual sleepiness reported",
    dateLabel: "Saturday",
    timeLabel: "Ascent / evening",
    location: "Trail toward Kem Kor",
    category: "Medical Distress",
    summary: "Raja and Hasbullah are linked to accounts of unusual sleepiness or drowsiness during the trek.",
    people: ["P-001", "P-003"],
    evidence: ["FS-TR-001", "FS-TR-002"],
    issues: ["ISS-001", "ISS-004"],
    status: "Requires Clarification",
    questionsRaised: ["Was the sleepiness ordinary fatigue or a symptom requiring closer attention?", "Was it communicated to expedition leadership?"]
  },
  {
    id: "TL-004",
    title: "Stomach discomfort at Kem Kor",
    dateLabel: "Saturday",
    timeLabel: "Arrival at Kem Kor",
    location: "Kem Kor",
    category: "Medical Distress",
    summary: "Raja reportedly complained of stomach discomfort after arrival at Kem Kor.",
    people: ["P-001", "P-006", "P-007"],
    evidence: ["FS-TR-001", "FS-TR-002"],
    issues: ["ISS-001", "ISS-002", "ISS-004"],
    status: "Witness Account",
    questionsRaised: ["Was the stomach complaint treated as a continuation of earlier symptoms?", "Was a decision point recorded at Kem Kor?"]
  },
  {
    id: "TL-005",
    title: "Buddy-system jungle toilet trip",
    dateLabel: "Saturday",
    timeLabel: "Kem Kor",
    location: "Kem Kor surrounding jungle area",
    category: "Supervision / Buddy System",
    summary: "Raja entered the jungle to relieve himself under a buddy-system arrangement. Available accounts require cross-reference on the companion’s identity.",
    people: ["P-001", "P-006", "P-007"],
    evidence: ["FS-TR-001", "FS-TR-002"],
    issues: ["ISS-002", "ISS-004"],
    status: "Unresolved",
    questionsRaised: ["Who accompanied Raja?", "What was observed about his condition immediately before and after the trip?"]
  },
  {
    id: "TL-006",
    title: "Exhausted team briefing and dinner",
    dateLabel: "Saturday",
    timeLabel: "10:00 PM",
    location: "Kem Kor",
    category: "Decision Point",
    summary: "The exhausted team reportedly held a briefing and ate dinner before continuing the movement plan.",
    people: ["P-001", "P-003", "P-004", "P-005", "P-009"],
    evidence: ["FS-TR-001", "FS-TR-002"],
    issues: ["ISS-002", "ISS-003", "ISS-004"],
    status: "Witness Account",
    questionsRaised: ["Who decided the group should continue?", "Was Raja’s condition discussed in the briefing?"]
  },
  {
    id: "TL-007",
    title: "Night push toward Kem Botak",
    dateLabel: "Saturday night",
    timeLabel: "After Kem Kor",
    location: "Route toward Kem Botak",
    category: "Route Movement",
    summary: "The group continued forward into a high-risk night movement toward Kem Botak after signs of fatigue and reported medical symptoms.",
    people: ["P-001", "P-009"],
    evidence: ["FS-TR-001", "FS-MAP-001"],
    issues: ["ISS-002", "ISS-003", "ISS-004"],
    status: "Requires Clarification",
    questionsRaised: ["Was a risk assessment conducted before night movement?", "What alternatives were considered?"]
  },
  {
    id: "TL-008",
    title: "Delayed update and Zara’s omission",
    dateLabel: "Following Tuesday",
    timeLabel: "Post-incident communication",
    location: "Ground contact communication layer",
    category: "Information Blackout",
    summary: "Ground contacts reportedly circulated delayed-descent updates to a broader group while Zara was omitted from the update pathway. Zara’s account identifies this as the beginning of a communication gap at the point she was seeking urgent information.",
    people: ["P-002", "P-010"],
    evidence: ["FS-COM-001", "FS-ZA-001", "FS-VIZ-001"],
    issues: ["ISS-005", "ISS-004"],
    status: "Requires Clarification",
    questionsRaised: ["Who controlled information flow?", "Why was Zara not included in the update pathway?", "What information was known internally at the time Zara was asking for updates?"]
  },
  {
    id: "TL-009",
    title: "Tuesday revelation to Zara",
    dateLabel: "Tuesday",
    timeLabel: "Revelation call",
    location: "Ground contact communication layer",
    category: "Information Blackout",
    summary: "Zara’s interview account describes a call in which she pressed for clarity after rain was denied as the reason for delay. The contact then revealed that a member had collapsed, leading Zara to demand identities and offer aid.",
    people: ["P-002", "P-010"],
    evidence: ["FS-ZA-001", "FS-COM-001", "FS-VIZ-001"],
    issues: ["ISS-005", "ISS-004"],
    status: "Witness Account",
    questionsRaised: ["When was the collapse first known to ground contacts?", "Why was the identity not immediately disclosed to Zara?", "What rescue or aid options were available at that moment?"]
  },
  {
    id: "TL-010",
    title: "Formal debriefing at Zara’s house",
    dateLabel: "Saturday, 26 March 2022",
    timeLabel: "Formal debrief",
    location: "Zara’s house",
    category: "Post-Incident Debrief",
    summary: "A formal debriefing took place at Zara’s house with Hasbullah, Medek, and others. The route board frames the six-day delay as attributed to Ariff and members who tested positive under KKM undergoing COVID-19 quarantine and fever recovery.",
    people: ["P-002", "P-003", "P-005", "P-008"],
    evidence: ["FS-TR-002", "FS-VIZ-001"],
    issues: ["ISS-004", "ISS-005", "ISS-002"],
    status: "Witness Account",
    questionsRaised: ["What was clarified during the debriefing?", "Which timeline details were confirmed or left unresolved?", "Which participants were absent and why?"]
  }
];

const evidenceItems = [
  {
    id: "FS-TR-001",
    title: "Hasbullah Interview Transcript",
    type: "Transcript",
    date: "2022-03-19",
    people: ["P-001", "P-003"],
    locations: ["Sungai Relau", "Kem Kor", "Gunung Tahan trail"],
    tags: ["medical distress", "sleepiness", "diarrhea", "timeline", "witness account"],
    issueThreads: ["ISS-001", "ISS-002", "ISS-003", "ISS-004"],
    status: "Witness Account",
    access: "Redacted",
    summary: "Interview transcript linked to Raja’s physical condition during the ascent and the group’s movement toward Kem Kor.",
    editorialNote: "Public-facing use should rely on redacted excerpts or paraphrased summaries unless transcript release has been cleared.",
    fileUrl: "assets/documents/FS-TR-001-redacted.pdf",
    linkedTimelineEvents: ["TL-001", "TL-002", "TL-003", "TL-004", "TL-006", "TL-007"],
    linkedDiscrepancies: ["DX-001", "DX-002", "DX-003"]
  },
  {
    id: "FS-TR-002",
    title: "Ariff / Hasbullah / Johan / Medek Transcript",
    type: "Transcript",
    date: "2022-03-26",
    people: ["P-003", "P-004", "P-005", "P-008"],
    locations: ["Kem Kor", "Gunung Tahan trail"],
    tags: ["group account", "timeline", "buddy system", "cross-reference"],
    issueThreads: ["ISS-002", "ISS-003", "ISS-004"],
    status: "Witness Account",
    access: "Redacted",
    summary: "Group transcript used to cross-reference route movement, participant accounts, and unresolved discrepancies.",
    editorialNote: "This record should be presented as witness recollection, not final determination.",
    fileUrl: "assets/documents/FS-TR-002-redacted.pdf",
    linkedTimelineEvents: ["TL-003", "TL-004", "TL-005", "TL-006"],
    linkedDiscrepancies: ["DX-001", "DX-002", "DX-003"]
  },
  {
    id: "FS-ZA-001",
    title: "Zara Interview",
    type: "Interview",
    date: "Production interview",
    people: ["P-002", "P-001"],
    locations: ["Documentary interview", "Post-incident communication layer"],
    tags: ["family account", "information blackout", "search for clarity", "documentary journey"],
    issueThreads: ["ISS-005", "ISS-004"],
    status: "Witness Account",
    access: "Summary Only",
    summary: "Interview record framing Zara’s journey to seek clarity, understand the final expedition, and identify unresolved questions.",
    editorialNote: "Use with care to separate personal testimony from independently verified records.",
    fileUrl: "assets/transcripts/FS-ZA-001-summary.html",
    linkedTimelineEvents: ["TL-008"],
    linkedDiscrepancies: ["DX-004"]
  },
  {
    id: "FS-PM-001",
    title: "Post-Mortem Summary",
    type: "Medical",
    date: "Official medical record summary",
    people: ["P-001"],
    locations: ["Medical record"],
    tags: ["cause of death", "medical findings", "autopsy", "summary"],
    issueThreads: ["ISS-001", "ISS-007"],
    status: "Official Record",
    access: "Summary Only",
    summary: "Public-safe summary record for post-mortem findings. Full unredacted medical documents should not be published without legal and family clearance.",
    editorialNote: "Restrict public detail to what is necessary for documentary context and public-interest analysis.",
    fileUrl: "assets/documents/FS-PM-001-summary.pdf",
    linkedTimelineEvents: ["TL-002", "TL-003", "TL-004"],
    linkedDiscrepancies: ["DX-002"]
  },
  {
    id: "FS-MAP-001",
    title: "Gunung Tahan Route Map",
    type: "Map",
    date: "Archive reconstruction",
    people: ["P-001", "P-009"],
    locations: ["Sungai Relau", "Kem Kor", "Kem Botak"],
    tags: ["route", "location", "timeline", "map reference"],
    issueThreads: ["ISS-003", "ISS-002"],
    status: "Archive Reconstruction",
    access: "Public",
    summary: "Route reference linking key event markers along the Sungai Relau to Kem Kor and Kem Botak pathway.",
    editorialNote: "Prototype route board is illustrative and should be replaced or checked against accurate route materials before final publication.",
    fileUrl: "assets/maps/FS-MAP-001-route.jpg",
    linkedTimelineEvents: ["TL-001", "TL-002", "TL-004", "TL-007"],
    linkedDiscrepancies: ["DX-003"]
  },
  {
    id: "FS-VIZ-001",
    title: "Gunung Tahan Route Board Visual Reconstruction",
    type: "Visual Reconstruction",
    date: "Prototype visual guide",
    people: ["P-001", "P-002", "P-003", "P-005", "P-006", "P-007", "P-008", "P-010"],
    locations: ["Sungai Relau", "Kem Kor", "Kem Botak", "Ground communication layer"],
    tags: ["route board", "visual reconstruction", "medical distress", "communication track", "information blackout"],
    issueThreads: ["ISS-001", "ISS-002", "ISS-003", "ISS-004", "ISS-005"],
    status: "Editorial Reconstruction",
    access: "Public",
    summary: "Interactive visual route board separating mountain elevation milestones from the ground communication track, with Raja Azlan Shah’s reported symptoms and Zara’s information pathway highlighted.",
    editorialNote: "This visual is a documentary reconstruction based on transcript milestones and route references. It should be treated as an interpretive guide, not a legal finding.",
    fileUrl: "assets/images/gunung-tahan-route-board.png",
    linkedTimelineEvents: ["TL-001", "TL-002", "TL-003", "TL-004", "TL-005", "TL-006", "TL-007", "TL-008", "TL-009", "TL-010"],
    linkedDiscrepancies: ["DX-001", "DX-002", "DX-003", "DX-004"]
  },
  {
    id: "FS-COM-001",
    title: "Tuesday Communication / Information Blackout Summary",
    type: "Communication",
    date: "Following Tuesday",
    people: ["P-002", "P-010"],
    locations: ["Ground contact communication layer"],
    tags: ["information blackout", "delayed update", "Zara omitted", "communication"],
    issueThreads: ["ISS-005", "ISS-004"],
    status: "Requires Clarification",
    access: "Summary Only",
    summary: "Public-safe summary of the delayed communication issue and reported omission of Zara from broader updates.",
    editorialNote: "Avoid publishing private numbers or unredacted message screenshots without clearance.",
    fileUrl: "assets/documents/FS-COM-001-summary.pdf",
    linkedTimelineEvents: ["TL-008"],
    linkedDiscrepancies: ["DX-004"]
  }
];

const people = [
  { id: "P-001", name: "Raja Azlan Shah", role: "Deceased climber", category: "Subject", summary: "Participant in the Gunung Tahan expedition whose physical condition and final movements are central to the reconstruction.", linkedEvidence: ["FS-TR-001", "FS-PM-001", "FS-MAP-001"], linkedTimelineEvents: ["TL-002", "TL-003", "TL-004", "TL-005", "TL-007"], keyIssues: ["Medical distress", "Final movements", "Cause of death"] },
  { id: "P-002", name: "Zara", role: "Wife / documentary journey", category: "Family", summary: "Zara’s journey frames the documentary’s search for clarity and accountability after the expedition.", linkedEvidence: ["FS-ZA-001", "FS-COM-001"], linkedTimelineEvents: ["TL-008", "TL-009", "TL-010"], keyIssues: ["Information blackout", "Search for clarity", "Accountability"] },
  { id: "P-003", name: "Hasbullah", role: "Hiker / witness", category: "Expedition Participant", summary: "Witness profile linked to accounts of the ascent, reported symptoms, and unusual sleepiness.", linkedEvidence: ["FS-TR-001", "FS-TR-002"], linkedTimelineEvents: ["TL-001", "TL-002", "TL-003", "TL-006"], keyIssues: ["Medical distress", "Sleepiness", "Timeline"] },
  { id: "P-004", name: "Ariff", role: "Hiker / witness", category: "Expedition Participant", summary: "Participant profile used for cross-reference in the group transcript.", linkedEvidence: ["FS-TR-002"], linkedTimelineEvents: ["TL-006"], keyIssues: ["Group account", "Cross-reference"] },
  { id: "P-005", name: "Johan", role: "Hiker / witness", category: "Expedition Participant", summary: "Participant profile linked to the group account and timeline reconstruction.", linkedEvidence: ["FS-TR-002"], linkedTimelineEvents: ["TL-006"], keyIssues: ["Group movement", "Timeline"] },
  { id: "P-006", name: "Rashdan", role: "Buddy-system reference", category: "Expedition Participant", summary: "Name associated with the Kem Kor buddy-system question requiring cross-reference.", linkedEvidence: ["FS-TR-001", "FS-TR-002"], linkedTimelineEvents: ["TL-005"], keyIssues: ["Buddy system", "Unresolved discrepancy"] },
  { id: "P-007", name: "Zafrul", role: "Buddy-system reference", category: "Expedition Participant", summary: "Name associated with the Kem Kor buddy-system question requiring cross-reference.", linkedEvidence: ["FS-TR-001", "FS-TR-002"], linkedTimelineEvents: ["TL-005"], keyIssues: ["Buddy system", "Unresolved discrepancy"] },
  { id: "P-008", name: "Medek", role: "Hiker / witness", category: "Expedition Participant", summary: "Participant profile connected to the 26 March transcript and group account.", linkedEvidence: ["FS-TR-002"], linkedTimelineEvents: ["TL-006"], keyIssues: ["Group account", "Timeline"] },
  { id: "P-009", name: "Expedition Guides", role: "Expedition leadership / route management", category: "Leadership", summary: "Guide and leadership role profile linked to preparedness, pace monitoring, route decisions, and duty-of-care questions.", linkedEvidence: ["FS-TR-001", "FS-MAP-001"], linkedTimelineEvents: ["TL-001", "TL-002", "TL-006", "TL-007"], keyIssues: ["Duty of care", "Risk assessment", "Route movement"] },
  { id: "P-010", name: "Ground Contacts", role: "Post-incident communication layer", category: "Communication", summary: "Ground contact profile linked to delayed updates and the reported omission of Zara from information flow.", linkedEvidence: ["FS-COM-001", "FS-ZA-001"], linkedTimelineEvents: ["TL-008", "TL-009"], keyIssues: ["Information blackout", "Disclosure", "Communication"] }
];

const medicalMarkers = [
  { id: "MED-001", symptom: "Diarrhea / cirit-birit", stage: "Ascent", linkedPerson: "P-001", summary: "Raja reportedly experienced diarrhea during the ascent.", evidence: ["FS-TR-001"], linkedTimelineEvents: ["TL-002"], riskCategory: "Hydration / gastrointestinal distress", investigativeQuestion: "Was this symptom treated as a warning sign in the expedition environment?" },
  { id: "MED-002", symptom: "Churning stomach / perut mengulas", stage: "Kem Kor", linkedPerson: "P-001", summary: "Raja reportedly complained of stomach discomfort after arriving at Kem Kor.", evidence: ["FS-TR-001", "FS-TR-002"], linkedTimelineEvents: ["TL-004", "TL-005"], riskCategory: "Continuing gastrointestinal distress", investigativeQuestion: "Was the symptom evaluated as part of a continuing medical pattern?" },
  { id: "MED-003", symptom: "Sleepiness / mengantuk", stage: "Ascent / evening", linkedPerson: "P-001", summary: "Unusual sleepiness was reportedly experienced by Raja and Hasbullah.", evidence: ["FS-TR-001", "FS-TR-002"], linkedTimelineEvents: ["TL-003"], riskCategory: "Fatigue / altered alertness", investigativeQuestion: "Was the drowsiness ordinary fatigue or a symptom requiring attention?" },
  { id: "MED-004", symptom: "Slow pace", stage: "Ascent", linkedPerson: "P-001", summary: "Raja reportedly walked slowly during the ascent and required closer monitoring.", evidence: ["FS-TR-001"], linkedTimelineEvents: ["TL-002"], riskCategory: "Reduced physical capacity", investigativeQuestion: "Did the slower pace change leadership’s risk assessment?" },
  { id: "MED-005", symptom: "Exhaustion", stage: "Kem Kor / Night Push", linkedPerson: "P-001", summary: "The group was reportedly exhausted around the late briefing and meal before continuing movement.", evidence: ["FS-TR-001", "FS-TR-002"], linkedTimelineEvents: ["TL-006", "TL-007"], riskCategory: "Fatigue and night movement risk", investigativeQuestion: "Was continuation into the night appropriate given the accumulated signs of fatigue and illness?" }
];

const discrepancies = [
  { id: "DX-001", title: "Unclear buddy-system companion", category: "Witness discrepancy", sourceA: "Account references Rashdan", sourceB: "Account references Zafrul", conflict: "The identity of the person accompanying Raja during the Kem Kor jungle toilet trip requires clarification.", whyItMatters: "This affects the reconstruction of supervision and Raja’s condition at Kem Kor.", status: "Unresolved", linkedTimelineEvents: ["TL-005"], evidence: ["FS-TR-001", "FS-TR-002"] },
  { id: "DX-002", title: "Severity of Raja’s illness", category: "Medical / witness interpretation", sourceA: "Symptoms may be framed as manageable discomfort", sourceB: "Repeated diarrhea, stomach discomfort, slow pace, and sleepiness suggest a broader pattern", conflict: "The severity and significance of the symptoms require careful cross-reference.", whyItMatters: "This bears directly on the duty-of-care question and whether continued movement should have been reassessed.", status: "Requires Clarification", linkedTimelineEvents: ["TL-002", "TL-003", "TL-004"], evidence: ["FS-TR-001", "FS-TR-002", "FS-PM-001"] },
  { id: "DX-003", title: "Decision to continue into night movement", category: "Leadership / route decision", sourceA: "The group held a late briefing and dinner", sourceB: "The group still pushed forward toward Kem Botak", conflict: "The decision-making basis for continuing into night movement remains unclear.", whyItMatters: "The decision intersects with fatigue, medical symptoms, route risk, and leadership responsibility.", status: "Requires Clarification", linkedTimelineEvents: ["TL-006", "TL-007"], evidence: ["FS-TR-001", "FS-TR-002", "FS-MAP-001"] },
  { id: "DX-004", title: "Tuesday communication and Zara’s omission", category: "Information blackout", sourceA: "Delayed update circulated to a broader group", sourceB: "Zara reportedly requested updates but was omitted or denied meaningful information", conflict: "The communication pathway and rationale for Zara’s omission require clarification.", whyItMatters: "This affects the documentary’s public-interest question around disclosure and post-incident accountability.", status: "Requires Clarification", linkedTimelineEvents: ["TL-008"], evidence: ["FS-COM-001", "FS-ZA-001"] }
];

const routeMarkers = [
  { id: "RM-001", title: "Sungai Relau Base Camp", track: "Mountain Elevation Milestones", location: "Sungai Relau Base Camp", x: 10, y: 34, linkedTimelineEvents: ["TL-001"], people: ["P-001", "P-003", "P-009"], summary: "Saturday 12:00 PM: the expedition begins following a guide briefing on hiker experience levels.", keyIssue: "Preparedness and experience assessment", evidence: ["FS-TR-001", "FS-MAP-001", "FS-VIZ-001"], markerType: "briefing", rajaFocus: "Raja enters the expedition within a group decision-making structure where readiness and experience-level briefing become relevant to later duty-of-care questions." },
  { id: "RM-002", title: "Saturday ascent to Kem Kor", track: "Mountain Elevation Milestones", location: "Ascent toward Kem Kor", x: 44, y: 24, linkedTimelineEvents: ["TL-002", "TL-003"], people: ["P-001", "P-003", "P-009"], summary: "Raja reportedly experiences diarrhea, walks slowly in the middle of the pack with a guide, and both Raja and Hasbullah experience unusual sleepiness.", keyIssue: "Medical distress and monitoring", evidence: ["FS-TR-001", "FS-TR-002", "FS-VIZ-001"], markerType: "medical", rajaFocus: "This is the first major symptom cluster: cirit-birit, slowed pace, and mengantuk. The archive frames this as a warning pattern requiring cross-reference." },
  { id: "RM-003", title: "Arrival at Kem Kor", track: "Mountain Elevation Milestones", location: "Kem Kor", x: 48, y: 52, linkedTimelineEvents: ["TL-004", "TL-005"], people: ["P-001", "P-006", "P-007"], summary: "Raja complains of a churning stomach and enters the jungle to relieve himself under the buddy-system. The companion is identified as Rashdan or Zafrul in the reconstruction and remains an identity point to clarify.", keyIssue: "Buddy-system discrepancy", evidence: ["FS-TR-001", "FS-TR-002", "FS-VIZ-001"], markerType: "decision", rajaFocus: "The symptom progression continues at Kem Kor. The companion identity matters because it affects the reconstruction of supervision and observations immediately around Raja’s condition." },
  { id: "RM-004", title: "10:00 PM briefing and dinner", track: "Mountain Elevation Milestones", location: "Kem Kor", x: 62, y: 47, linkedTimelineEvents: ["TL-006"], people: ["P-001", "P-003", "P-004", "P-005", "P-009"], summary: "The exhausted team holds a briefing and eats dinner before further movement.", keyIssue: "Decision point before night travel", evidence: ["FS-TR-001", "FS-TR-002", "FS-VIZ-001"], markerType: "briefing", rajaFocus: "This point asks whether Raja’s earlier symptoms were actively considered before the night movement decision." },
  { id: "RM-005", title: "Saturday night push toward Kem Botak", track: "Mountain Elevation Milestones", location: "Route toward Kem Botak", x: 78, y: 42, linkedTimelineEvents: ["TL-007"], people: ["P-001", "P-009"], summary: "The hikers continue into the night toward Kem Botak after fatigue and symptoms had already been reported.", keyIssue: "High-risk night movement", evidence: ["FS-TR-001", "FS-MAP-001", "FS-VIZ-001"], markerType: "route", rajaFocus: "This is the central duty-of-care question on the route board: whether continuing into night movement was appropriate after the reported symptom cluster." },
  { id: "RM-006", title: "Following Tuesday — information blackout", track: "Ground Communication Track", location: "Ground communication layer", x: 15, y: 75, linkedTimelineEvents: ["TL-008"], people: ["P-002", "P-010"], summary: "Ground contacts circulate a delayed-descent message to the broader group while Zara is omitted from the update pathway.", keyIssue: "Selective disclosure / omission", evidence: ["FS-COM-001", "FS-ZA-001", "FS-VIZ-001"], markerType: "communication", rajaFocus: "The communication track shifts from mountain movement to information control around Raja’s status and Zara’s access to urgent facts." },
  { id: "RM-007", title: "'They all ok tu'", track: "Ground Communication Track", location: "Ground communication layer", x: 36, y: 77, linkedTimelineEvents: ["TL-008"], people: ["P-002", "P-010"], summary: "When Zara asks for updates, a contact reportedly reassures her with the phrase 'they all ok tu'. The archive labels this as a situation-misrepresentation issue requiring clarification.", keyIssue: "Situation misrepresented", evidence: ["FS-ZA-001", "FS-COM-001", "FS-VIZ-001"], markerType: "communication", rajaFocus: "This point matters because it potentially conflicts with information that a member had collapsed or that there was more serious uncertainty on the mountain." },
  { id: "RM-008", title: "Tuesday revelation", track: "Ground Communication Track", location: "Ground communication layer", x: 61, y: 76, linkedTimelineEvents: ["TL-009"], people: ["P-002", "P-010"], summary: "Zara calls to ask if rain caused the delay; this is denied. A contact then reveals that a member collapsed, prompting Zara to demand identities and offer aid.", keyIssue: "Delayed disclosure of collapse", evidence: ["FS-ZA-001", "FS-COM-001", "FS-VIZ-001"], markerType: "communication", rajaFocus: "This is the moment Zara’s search for Raja’s identity and condition becomes urgent and explicit." },
  { id: "RM-009", title: "26 March formal debriefing", track: "Ground Communication Track", location: "Zara’s house", x: 84, y: 76, linkedTimelineEvents: ["TL-010"], people: ["P-002", "P-003", "P-005", "P-008"], summary: "A formal debriefing takes place at Zara’s house with Hasbullah, Medek, and others after a six-day delay attributed to Ariff and KKM-positive members undergoing COVID-19 quarantine and fever recovery.", keyIssue: "Delayed formal explanation", evidence: ["FS-TR-002", "FS-VIZ-001"], markerType: "debrief", rajaFocus: "The debriefing becomes a later reconstruction point where the family seeks a clearer explanation of what happened to Raja." }
];

const issueThreads = [
  { id: "ISS-001", title: "Medical Distress", description: "Tracks reported symptoms including diarrhea, stomach discomfort, sleepiness, slow pace, and exhaustion.", linkedEvents: ["TL-002", "TL-003", "TL-004"], linkedEvidence: ["FS-TR-001", "FS-TR-002", "FS-PM-001"], className: "thread-medical" },
  { id: "ISS-002", title: "Duty of Care", description: "Frames questions around monitoring, risk assessment, supervision, and leadership decisions.", linkedEvents: ["TL-001", "TL-002", "TL-004", "TL-005", "TL-006", "TL-007"], linkedEvidence: ["FS-TR-001", "FS-TR-002", "FS-MAP-001"], className: "thread-duty" },
  { id: "ISS-003", title: "Route Movement", description: "Links key locations, movement decisions, and the night push toward Kem Botak.", linkedEvents: ["TL-001", "TL-002", "TL-007"], linkedEvidence: ["FS-MAP-001", "FS-TR-001", "FS-VIZ-001"], className: "thread-route" },
  { id: "ISS-004", title: "Timeline Discrepancy", description: "Identifies sequence issues and areas requiring cross-reference between transcripts.", linkedEvents: ["TL-003", "TL-004", "TL-005", "TL-006", "TL-008"], linkedEvidence: ["FS-TR-001", "FS-TR-002", "FS-COM-001", "FS-VIZ-001"], className: "thread-discrepancy" },
  { id: "ISS-005", title: "Information Blackout", description: "Focuses on delayed updates, selective disclosure, and Zara’s reported exclusion from information flow.", linkedEvents: ["TL-008", "TL-009", "TL-010"], linkedEvidence: ["FS-ZA-001", "FS-COM-001", "FS-VIZ-001"], className: "thread-blackout" },
  { id: "ISS-006", title: "Regulatory Oversight", description: "Holds space for permits, route controls, organiser obligations, and official process review.", linkedEvents: ["TL-001"], linkedEvidence: ["FS-MAP-001"], className: "thread-regulatory" },
  { id: "ISS-007", title: "Cause of Death", description: "Connects public-safe medical summaries to the broader timeline reconstruction.", linkedEvents: ["TL-002", "TL-003", "TL-004"], linkedEvidence: ["FS-PM-001"], className: "thread-cause" }
];

const routeBoardHighlights = [
  { id: "RBH-001", title: "Raja’s symptom cluster", category: "Medical distress", summary: "The route board places diarrhea, slow pace, stomach discomfort, and unusual sleepiness as a linked progression rather than isolated details.", linkedMarkers: ["RM-002", "RM-003"], linkedEvidence: ["FS-TR-001", "FS-TR-002"], issueThreads: ["ISS-001", "ISS-002"] },
  { id: "RBH-002", title: "Kem Kor decision point", category: "Duty of care", summary: "Kem Kor is treated as the critical decision node: Raja had reported symptoms, the team was exhausted, and a briefing preceded further night movement.", linkedMarkers: ["RM-003", "RM-004", "RM-005"], linkedEvidence: ["FS-TR-001", "FS-TR-002"], issueThreads: ["ISS-002", "ISS-003", "ISS-004"] },
  { id: "RBH-003", title: "Zara’s information pathway", category: "Information blackout", summary: "The ground communication track separates what Zara was reportedly told from later disclosure that a member had collapsed.", linkedMarkers: ["RM-006", "RM-007", "RM-008"], linkedEvidence: ["FS-ZA-001", "FS-COM-001"], issueThreads: ["ISS-005", "ISS-004"] },
  { id: "RBH-004", title: "Formal debrief delay", category: "Post-incident reconstruction", summary: "The debriefing is placed after the Tuesday communication sequence to show when a fuller account was eventually sought at Zara’s house.", linkedMarkers: ["RM-009"], linkedEvidence: ["FS-TR-002"], issueThreads: ["ISS-004", "ISS-005"] }
];

const photoItems = [
  { id: "FS-PH-001", title: "Sungai Relau Reference", type: "Location Reference", location: "Sungai Relau", date: "Reference image pending", access: "Public", caption: "Placeholder for base camp / starting point visual reference.", linkedTimelineEvents: ["TL-001"], linkedEvidence: ["FS-MAP-001"], category: "Location Reference", imageUrl: "" },
  { id: "FS-PH-002", title: "Kem Kor Reference", type: "Location Reference", location: "Kem Kor", date: "Reference image pending", access: "Public", caption: "Placeholder for campsite reference connected to stomach complaint and decision-point events.", linkedTimelineEvents: ["TL-004", "TL-005", "TL-006"], linkedEvidence: ["FS-MAP-001"], category: "Location Reference", imageUrl: "" },
  { id: "FS-PH-003", title: "Trail Condition Reference", type: "Expedition Reference", location: "Ascent route", date: "Reference image pending", access: "Public", caption: "Placeholder for route terrain / trail condition reference.", linkedTimelineEvents: ["TL-002", "TL-003"], linkedEvidence: ["FS-MAP-001"], category: "Expedition Reference", imageUrl: "" },
  { id: "FS-PH-004", title: "Transcript Scan Placeholder", type: "Document Scan", location: "Archive records", date: "Document scan pending", access: "Redacted", caption: "Placeholder for redacted transcript image or scan.", linkedTimelineEvents: ["TL-002", "TL-003", "TL-006"], linkedEvidence: ["FS-TR-001"], category: "Document Scan", imageUrl: "" },
  { id: "FS-PH-005", title: "Route Map Reference", type: "Map Reference", location: "Gunung Tahan route", date: "Map reference pending", access: "Public", caption: "Placeholder for final illustrated route map.", linkedTimelineEvents: ["TL-001", "TL-007"], linkedEvidence: ["FS-MAP-001"], category: "Map Reference", imageUrl: "" },
  { id: "FS-PH-006", title: "Documentary Production Still Placeholder", type: "Production Still", location: "Documentary production", date: "Production still pending", access: "Pending Review", caption: "Placeholder for public-safe documentary production still.", linkedTimelineEvents: ["TL-008"], linkedEvidence: ["FS-ZA-001"], category: "Production Still", imageUrl: "" }
];

const relationshipMap = [
  { id: "REL-001", central: "Raja Azlan Shah", nodeType: "person", linkedPerson: "P-001", connections: [
    { label: "Medical Tracker", targetType: "section", target: "medical", note: "Symptoms and risk markers" },
    { label: "Hasbullah Transcript", targetType: "evidence", target: "FS-TR-001", note: "Witness account" },
    { label: "Post-Mortem Summary", targetType: "evidence", target: "FS-PM-001", note: "Public-safe medical record" },
    { label: "Kem Kor Events", targetType: "timeline", target: "TL-004", note: "Stomach discomfort and decision point" }
  ]},
  { id: "REL-002", central: "Zara", nodeType: "person", linkedPerson: "P-002", connections: [
    { label: "Information Blackout", targetType: "issue", target: "ISS-005", note: "Disclosure and omission question" },
    { label: "Tuesday Communication", targetType: "timeline", target: "TL-008", note: "Delayed update issue" },
      { label: "Tuesday Revelation", targetType: "timeline", target: "TL-009", note: "Collapse disclosure" },
    { label: "Zara Interview", targetType: "evidence", target: "FS-ZA-001", note: "Documentary journey" }
  ]},
  { id: "REL-003", central: "Hasbullah", nodeType: "person", linkedPerson: "P-003", connections: [
    { label: "Unusual Sleepiness", targetType: "medical", target: "MED-003", note: "Symptom cross-reference" },
    { label: "Ascent Timeline", targetType: "timeline", target: "TL-002", note: "Ascent account" },
    { label: "Witness Transcript", targetType: "evidence", target: "FS-TR-001", note: "Interview transcript" }
  ]},
  { id: "REL-004", central: "Expedition Guides", nodeType: "role", linkedPerson: "P-009", connections: [
    { label: "Duty of Care", targetType: "issue", target: "ISS-002", note: "Preparedness and risk assessment" },
    { label: "Night Push", targetType: "timeline", target: "TL-007", note: "Route decision" },
    { label: "Route Map", targetType: "evidence", target: "FS-MAP-001", note: "Movement reconstruction" }
  ]}
];

const overviewModules = [
  { tag: "Module 01", title: "Cause of Death", copy: "Public-safe summaries connect official medical findings to the timeline without exposing unnecessary private details." },
  { tag: "Module 02", title: "Duty of Care", copy: "The archive identifies decision points where monitoring, pace, medical distress, and route movement require scrutiny." },
  { tag: "Module 03", title: "Misrepresentation", copy: "Conflicting or incomplete accounts are treated as unresolved discrepancies, not predetermined conclusions." },
  { tag: "Module 04", title: "Regulatory Oversight", copy: "Permits, official processes, and expedition controls can be added as the archive expands." }
];

const startHereSteps = [
  { id: "START-001", number: "01", title: "What happened?", copy: "Begin with the archive briefing and overall documentary reconstruction.", target: "overview" },
  { id: "START-002", number: "02", title: "Where did it happen?", copy: "Follow the route board from Sungai Relau toward Kem Kor and Kem Botak.", target: "route" },
  { id: "START-003", number: "03", title: "What symptoms were reported?", copy: "Review the symptom progression and risk markers.", target: "medical" },
  { id: "START-004", number: "04", title: "What decisions were made?", copy: "Move through the expedition timeline and decision points.", target: "timeline" },
  { id: "START-005", number: "05", title: "What remains unresolved?", copy: "Compare issues requiring clarification in the discrepancy matrix.", target: "discrepancies" }
];
