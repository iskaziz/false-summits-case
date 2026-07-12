const timelineEvents = [
  {
    id: "TL-001",
    title: "Briefing at Sungai Relau base camp",
    dateLabel: "Saturday",
    timeLabel: "12:00 PM",
    location: "Sungai Relau Base Camp",
    category: "Expedition Start",
    summary: "The expedition begins following a guide briefing on hiker experience levels and route expectations.",
    people: ["Raja Azlan Shah", "Hasbullah", "Guides", "Expedition group"],
    evidence: ["FS-TR-001", "FS-TR-002"],
    issues: ["Preparedness", "Experience assessment", "Duty-of-care question"],
    status: "Witness account",
    markerType: "verified",
    questionsRaised: [
      "How was participant readiness assessed before departure?",
      "Were medical or fitness risks discussed at the briefing?"
    ]
  },
  {
    id: "TL-002",
    title: "Medical distress reported during ascent",
    dateLabel: "Saturday",
    timeLabel: "Ascent to Kem Kor",
    location: "Trail between Sungai Relau and Kem Kor",
    category: "Medical distress",
    summary: "Raja Azlan Shah reportedly experienced diarrhea and moved slowly during the ascent.",
    people: ["Raja Azlan Shah", "Hasbullah", "Guide"],
    evidence: ["FS-TR-001"],
    issues: ["Diarrhea", "Slow pace", "Guide awareness"],
    status: "Witness account",
    markerType: "medical",
    questionsRaised: [
      "Was Raja's condition assessed before the team continued?",
      "Who was responsible for monitoring his condition during the ascent?"
    ]
  },
  {
    id: "TL-003",
    title: "Unusual sleepiness reported",
    dateLabel: "Saturday",
    timeLabel: "Ascent / evening progression",
    location: "Trail to Kem Kor",
    category: "Medical distress",
    summary: "Witness material records unusual sleepiness affecting Raja and Hasbullah, raising questions about fatigue, physical condition, and environmental stress.",
    people: ["Raja Azlan Shah", "Hasbullah"],
    evidence: ["FS-TR-001"],
    issues: ["Sleepiness", "Fatigue", "Environmental risk"],
    status: "Witness account",
    markerType: "medical",
    questionsRaised: [
      "Was the sleepiness treated as ordinary fatigue or as a warning sign?",
      "Did the leadership reassess the group's condition?"
    ]
  },
  {
    id: "TL-004",
    title: "Stomach discomfort at Kem Kor",
    dateLabel: "Saturday",
    timeLabel: "Arrival at Kem Kor",
    location: "Kem Kor",
    category: "Medical distress",
    summary: "Raja reportedly complained of a churning stomach after arrival at Kem Kor.",
    people: ["Raja Azlan Shah", "Expedition group"],
    evidence: ["FS-TR-001", "FS-TR-002"],
    issues: ["Stomach complaint", "Continued medical distress"],
    status: "Witness account",
    markerType: "medical",
    questionsRaised: [
      "Was the recurring gastrointestinal distress escalated to the guides?",
      "Was continuing the route at night medically considered?"
    ]
  },
  {
    id: "TL-005",
    title: "Buddy-system jungle toilet trip",
    dateLabel: "Saturday",
    timeLabel: "Kem Kor stop",
    location: "Kem Kor vicinity",
    category: "Witness discrepancy",
    summary: "Raja entered the jungle to relieve himself under the buddy-system. The identity of the accompanying person requires careful cross-reference.",
    people: ["Raja Azlan Shah", "Rashdan", "Zafrul"],
    evidence: ["FS-TR-001", "FS-TR-002"],
    issues: ["Buddy system", "Supervision", "Unresolved discrepancy"],
    status: "Requires clarification",
    markerType: "unresolved",
    questionsRaised: [
      "Who accompanied Raja into the jungle?",
      "What was observed about Raja's condition at this point?"
    ]
  },
  {
    id: "TL-006",
    title: "Briefing and dinner after exhausting movement",
    dateLabel: "Saturday",
    timeLabel: "10:00 PM",
    location: "Kem Kor",
    category: "Group decision-making",
    summary: "The exhausted team reportedly held a briefing and ate dinner around 10:00 PM.",
    people: ["Expedition group", "Guides", "Raja Azlan Shah"],
    evidence: ["FS-TR-002"],
    issues: ["Fatigue", "Decision-making", "Duty-of-care question"],
    status: "Witness account",
    markerType: "verified",
    questionsRaised: [
      "Was the group's exhaustion formally assessed?",
      "Who decided the next movement plan?"
    ]
  },
  {
    id: "TL-007",
    title: "Night push toward Kem Botak",
    dateLabel: "Saturday night",
    timeLabel: "After Kem Kor briefing",
    location: "Route toward Kem Botak",
    category: "Route decision",
    summary: "The team continued into the night toward Kem Botak, despite fatigue and earlier reported symptoms.",
    people: ["Expedition group", "Guides", "Raja Azlan Shah"],
    evidence: ["FS-TR-002"],
    issues: ["Night movement", "Risk assessment", "Duty-of-care question"],
    status: "Witness account",
    markerType: "unresolved",
    questionsRaised: [
      "Was the decision to continue consistent with safe trekking practice?",
      "Was Raja's condition specifically considered before departure?"
    ]
  },
  {
    id: "TL-008",
    title: "Delayed update and Zara's omission",
    dateLabel: "Following Tuesday",
    timeLabel: "Post-incident communication period",
    location: "Ground contact communications",
    category: "Information blackout",
    summary: "Ground contacts reportedly circulated a delayed update to a broader group while Zara was omitted, raising questions around post-incident disclosure and communication handling.",
    people: ["Zara", "Ground contacts"],
    evidence: ["FS-COM-001", "FS-ZA-001"],
    issues: ["Information blackout", "Communication gap", "Misrepresentation question"],
    status: "Requires clarification",
    markerType: "unresolved",
    questionsRaised: [
      "Who controlled information after the delay became known?",
      "Why was Zara omitted from the broader update?"
    ]
  }
];

const evidenceItems = [
  {
    id: "FS-TR-001",
    title: "Hasbullah Interview Transcript",
    type: "Transcript",
    date: "2022-03-19",
    people: ["Hasbullah", "Raja Azlan Shah"],
    locations: ["Sungai Relau", "Kem Kor"],
    tags: ["medical distress", "sleepiness", "diarrhea", "timeline"],
    status: "Witness Account",
    access: "Redacted",
    summary: "Interview transcript containing references to Raja's physical condition during the ascent, including diarrhea, slow movement, and unusual sleepiness.",
    fileUrl: "assets/documents/FS-TR-001-redacted.pdf",
    linkedTimelineEvents: ["TL-001", "TL-002", "TL-003", "TL-004", "TL-005"],
    linkedDiscrepancies: ["DX-001", "DX-002"]
  },
  {
    id: "FS-TR-002",
    title: "Ariff / Hasbullah / Johan / Medek Transcript",
    type: "Transcript",
    date: "2022-03-26",
    people: ["Ariff", "Hasbullah", "Johan", "Medek", "Raja Azlan Shah"],
    locations: ["Kem Kor", "Route toward Kem Botak"],
    tags: ["group account", "timeline", "night movement", "decision-making"],
    status: "Witness Account",
    access: "Redacted",
    summary: "Group transcript relevant to sequence reconstruction, group movement, fatigue, and decision-making after Kem Kor.",
    fileUrl: "assets/documents/FS-TR-002-redacted.pdf",
    linkedTimelineEvents: ["TL-004", "TL-005", "TL-006", "TL-007"],
    linkedDiscrepancies: ["DX-001", "DX-003"]
  },
  {
    id: "FS-ZA-001",
    title: "Zara Interview",
    type: "Interview",
    date: "Production interview",
    people: ["Zara", "Raja Azlan Shah"],
    locations: ["Post-incident communications"],
    tags: ["family perspective", "information blackout", "accountability", "clarity"],
    status: "Interview Record",
    access: "Summary Only",
    summary: "Interview account from Zara documenting her search for clarity, the communication gap, and the emotional and evidentiary stakes of the documentary.",
    fileUrl: "assets/transcripts/FS-ZA-001-summary.html",
    linkedTimelineEvents: ["TL-008"],
    linkedDiscrepancies: ["DX-004"]
  },
  {
    id: "FS-PM-001",
    title: "Post-mortem Summary",
    type: "Medical",
    date: "Official medical record",
    people: ["Raja Azlan Shah"],
    locations: ["Medical examination"],
    tags: ["cause of death", "medical findings", "autopsy", "official record"],
    status: "Official Record",
    access: "Summary Only",
    summary: "Public-safe medical summary prepared from the official post-mortem report. Full unredacted medical material should remain private or legally reviewed before publication.",
    fileUrl: "assets/documents/FS-PM-001-summary.pdf",
    linkedTimelineEvents: ["TL-002", "TL-003", "TL-004"],
    linkedDiscrepancies: []
  },
  {
    id: "FS-MAP-001",
    title: "Gunung Tahan Route Map",
    type: "Map",
    date: "Archive reconstruction",
    people: ["Expedition group"],
    locations: ["Sungai Relau", "Kem Kor", "Kem Botak"],
    tags: ["route", "map", "timeline", "location markers"],
    status: "Archive Reconstruction",
    access: "Public",
    summary: "Illustrated route reconstruction linking key timeline events to the Sungai Relau, Kem Kor, and Kem Botak route sequence.",
    fileUrl: "assets/maps/FS-MAP-001-route-map.jpg",
    linkedTimelineEvents: ["TL-001", "TL-002", "TL-004", "TL-007"],
    linkedDiscrepancies: []
  },
  {
    id: "FS-COM-001",
    title: "Tuesday Communication / Information Blackout Summary",
    type: "Communication",
    date: "Following Tuesday",
    people: ["Zara", "Ground contacts"],
    locations: ["Ground contact communications"],
    tags: ["information blackout", "delayed update", "communication", "disclosure"],
    status: "Requires Clarification",
    access: "Summary Only",
    summary: "Summary record of the delayed update period and the reported omission of Zara from broader communications.",
    fileUrl: "assets/documents/FS-COM-001-summary.pdf",
    linkedTimelineEvents: ["TL-008"],
    linkedDiscrepancies: ["DX-004"]
  }
];

const people = [
  {
    id: "P-001",
    name: "Raja Azlan Shah",
    role: "Deceased climber",
    category: "Subject",
    summary: "Participant in the Gunung Tahan expedition whose physical condition, final movements, and cause of death are central to the documentary reconstruction.",
    linkedEvidence: ["FS-TR-001", "FS-TR-002", "FS-PM-001"],
    linkedTimelineEvents: ["TL-002", "TL-003", "TL-004", "TL-005", "TL-007"],
    keyIssues: ["Medical distress", "Final movements", "Cause of death", "Duty-of-care question"]
  },
  {
    id: "P-002",
    name: "Zara",
    role: "Wife of Raja Azlan Shah",
    category: "Family / Documentary Journey",
    summary: "Zara’s journey frames the documentary’s search for clarity, timeline reconstruction, and systemic accountability questions.",
    linkedEvidence: ["FS-ZA-001", "FS-COM-001"],
    linkedTimelineEvents: ["TL-008"],
    keyIssues: ["Information blackout", "Disclosure", "Accountability"]
  },
  {
    id: "P-003",
    name: "Hasbullah",
    role: "Expedition participant / witness",
    category: "Witness",
    summary: "Witness whose account is relevant to Raja's physical condition, sleepiness, pace, and the Saturday ascent chronology.",
    linkedEvidence: ["FS-TR-001", "FS-TR-002"],
    linkedTimelineEvents: ["TL-001", "TL-002", "TL-003"],
    keyIssues: ["Medical symptoms", "Sleepiness", "Timeline reconstruction"]
  },
  {
    id: "P-004",
    name: "Ariff, Johan, Medek",
    role: "Expedition participants / witnesses",
    category: "Witness group",
    summary: "Participants appearing in the 26 March group transcript, relevant to the movement sequence and decision-making around Kem Kor and the night push.",
    linkedEvidence: ["FS-TR-002"],
    linkedTimelineEvents: ["TL-006", "TL-007"],
    keyIssues: ["Group movement", "Fatigue", "Decision-making"]
  },
  {
    id: "P-005",
    name: "Rashdan / Zafrul",
    role: "Buddy-system references",
    category: "Witness / unresolved reference",
    summary: "Names associated with the buddy-system account around Raja entering the jungle at Kem Kor. The exact identity requires cross-reference.",
    linkedEvidence: ["FS-TR-001", "FS-TR-002"],
    linkedTimelineEvents: ["TL-005"],
    keyIssues: ["Buddy system", "Supervision", "Unresolved discrepancy"]
  },
  {
    id: "P-006",
    name: "Guides / Expedition leadership",
    role: "Route and safety leadership",
    category: "Leadership",
    summary: "Leadership role relevant to preparedness assessment, medical monitoring, fatigue assessment, and movement decisions.",
    linkedEvidence: ["FS-TR-001", "FS-TR-002"],
    linkedTimelineEvents: ["TL-001", "TL-002", "TL-006", "TL-007"],
    keyIssues: ["Duty of care", "Preparedness", "Risk assessment"]
  },
  {
    id: "P-007",
    name: "Ground contacts",
    role: "Post-incident communication actors",
    category: "Communication",
    summary: "Individuals associated with delayed updates and post-incident communication flow. Public archive should use redacted or role-based references unless legally cleared.",
    linkedEvidence: ["FS-COM-001"],
    linkedTimelineEvents: ["TL-008"],
    keyIssues: ["Information blackout", "Delayed disclosure", "Misrepresentation question"]
  }
];

const medicalMarkers = [
  {
    id: "MED-001",
    symptom: "Diarrhea / cirit-birit",
    stage: "Saturday ascent",
    linkedPerson: "Raja Azlan Shah",
    summary: "Raja reportedly experienced diarrhea during the ascent toward Kem Kor.",
    evidence: ["FS-TR-001"],
    riskCategory: "Hydration / gastrointestinal distress",
    investigativeQuestion: "Was this symptom treated as a warning sign in an extreme trekking environment?"
  },
  {
    id: "MED-002",
    symptom: "Slow pace",
    stage: "Saturday ascent",
    linkedPerson: "Raja Azlan Shah",
    summary: "Witness material describes Raja moving slowly, with a guide near him during the ascent.",
    evidence: ["FS-TR-001"],
    riskCategory: "Reduced physical capacity",
    investigativeQuestion: "Did the slow pace trigger a formal reassessment of the participant's condition?"
  },
  {
    id: "MED-003",
    symptom: "Unusual sleepiness / mengantuk",
    stage: "Saturday ascent / evening",
    linkedPerson: "Raja Azlan Shah and Hasbullah",
    summary: "Unusual sleepiness was reportedly experienced by Raja and Hasbullah.",
    evidence: ["FS-TR-001"],
    riskCategory: "Fatigue / unexplained symptom",
    investigativeQuestion: "Was the sleepiness interpreted as routine exhaustion or potential medical concern?"
  },
  {
    id: "MED-004",
    symptom: "Churning stomach / perut mengulas",
    stage: "Arrival at Kem Kor",
    linkedPerson: "Raja Azlan Shah",
    summary: "Raja reportedly complained of stomach discomfort at Kem Kor before the jungle toilet trip.",
    evidence: ["FS-TR-001", "FS-TR-002"],
    riskCategory: "Continued gastrointestinal distress",
    investigativeQuestion: "Was the recurring symptom escalated before the team continued into night movement?"
  },
  {
    id: "MED-005",
    symptom: "Group exhaustion",
    stage: "Saturday 10:00 PM briefing",
    linkedPerson: "Expedition group",
    summary: "The group was reportedly exhausted by the late briefing and dinner period.",
    evidence: ["FS-TR-002"],
    riskCategory: "Decision-making under fatigue",
    investigativeQuestion: "How did exhaustion affect the decision to continue toward Kem Botak?"
  }
];

const discrepancies = [
  {
    id: "DX-001",
    title: "Unclear buddy-system companion",
    category: "Witness discrepancy",
    issue: "Different accounts appear to identify different individuals as accompanying Raja into the jungle.",
    sources: ["FS-TR-001", "FS-TR-002"],
    linkedTimelineEvents: ["TL-005"],
    status: "Unresolved",
    whyItMatters: "This affects the reconstruction of supervision and Raja's condition at Kem Kor."
  },
  {
    id: "DX-002",
    title: "Severity of medical distress",
    category: "Medical / duty-of-care question",
    issue: "Raja's symptoms may be treated differently across accounts: discomfort, diarrhea, slow pace, and sleepiness require cross-reference.",
    sources: ["FS-TR-001", "FS-PM-001"],
    linkedTimelineEvents: ["TL-002", "TL-003", "TL-004"],
    status: "Requires clarification",
    whyItMatters: "The severity assessment affects whether the leadership response was adequate in an extreme environment."
  },
  {
    id: "DX-003",
    title: "Decision to continue into the night",
    category: "Leadership / route decision",
    issue: "The basis for continuing toward Kem Botak after exhaustion and reported symptoms remains a central accountability question.",
    sources: ["FS-TR-002"],
    linkedTimelineEvents: ["TL-006", "TL-007"],
    status: "Requires clarification",
    whyItMatters: "This is central to evaluating preparedness, risk assessment, and duty of care."
  },
  {
    id: "DX-004",
    title: "Zara omitted from delayed update",
    category: "Information blackout",
    issue: "A delayed update was reportedly circulated to others while Zara was omitted from the communication flow.",
    sources: ["FS-ZA-001", "FS-COM-001"],
    linkedTimelineEvents: ["TL-008"],
    status: "Requires clarification",
    whyItMatters: "This affects post-incident disclosure, family notification, and the credibility of communication handling."
  }
];

const overviewModules = [
  {
    title: "Cause of Death",
    copy: "Medical records and symptom chronology are handled through public-safe summaries and linked evidence markers.",
    tag: "Medical module"
  },
  {
    title: "Duty of Care",
    copy: "The archive isolates preparedness, assessment, supervision, fatigue, and night-movement questions.",
    tag: "Accountability module"
  },
  {
    title: "Misrepresentation",
    copy: "Communication records are treated as disclosure questions, not conclusions, until independently verified.",
    tag: "Disclosure module"
  },
  {
    title: "Regulatory Oversight",
    copy: "Permits, guide responsibilities, and official procedures can be added as the evidence locker expands.",
    tag: "Oversight module"
  }
];
