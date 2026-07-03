// Blog posts. Each post renders an index card + a full article page at #/post/<slug>.
//
// content[] is an ordered list of blocks. Supported block types:
//   { type: 'p',      text: '...' }                 paragraph
//   { type: 'h2',     text: '...' }                 section heading
//   { type: 'list',   items: ['...', '...'] }       bulleted list
//   { type: 'quote',  text: '...' }                 pull quote
//   { type: 'code',   lang: 'python', text: '...' }  code block
//   { type: 'img',    src: '/uploads/x.jpg', alt: '...', caption: '...' }

export const POSTS = [
  {
    slug: 'sirenatech',
    title: 'SirenaTech: Real-Time Water Quality Monitoring with IoT + CNN',
    excerpt:
      'A portable system that brings lab-grade water assessments to the field — pairing IoT sensors with a CNN + Naive Bayes model, trained on DENR reference data and validated in the field by a practicing chemical engineer.',
    date: '2024-03-15',
    readTime: '6 min read',
    tags: ['CNN', 'Naive Bayes', 'Python', 'Kotlin', 'IoT'],
    award: '🏆 Best Innovative Thesis · CS Expo 2023–24',
    content: [
      {
        type: 'p',
        text: 'SirenaTech is a portable water quality monitoring platform that pairs low-cost IoT sensors with a hybrid machine-learning model to deliver real-time, lab-comparable assessments straight to an Android phone. The goal was simple: let a field worker point a device at a water source and get a trustworthy safe / unsafe verdict in seconds — no lab, no waiting.',
      },
      { type: 'h2', text: 'The Problem' },
      {
        type: 'p',
        text: 'Millions of people in the Philippines lack reliable access to safe drinking water, and traditional lab testing is slow, expensive, and rarely available where it is needed most. Field workers and engineers needed a way to make a defensible safe / unsafe call on the spot, not days later.',
      },
      { type: 'h2', text: 'The Approach' },
      {
        type: 'list',
        items: [
          'An IoT sensor array captures turbidity, pH, temperature, and TDS readings.',
          'A CNN + Naive Bayes model classifies water quality from those sensor signatures.',
          'An Android app surfaces the result with a clear, color-coded verdict.',
          'Edge-first design so it keeps working with intermittent connectivity.',
        ],
      },
      { type: 'h2', text: 'Model Architecture' },
      {
        type: 'p',
        text: 'SirenaTech uses a two-model architecture. A convolutional neural network (CNN) learns the non-linear patterns hidden in the combined sensor signature — the way turbidity, pH, temperature, and TDS move together — to detect contamination signatures that simple thresholds miss. A Naive Bayes classifier runs alongside it as a fast, interpretable probabilistic layer that scores each reading against known safe and unsafe parameter distributions. Combining the CNN’s pattern sensitivity with Naive Bayes’ calibrated probabilities produces a verdict that is both accurate and easy to explain to a non-technical user.',
      },
      { type: 'h2', text: 'The Data' },
      {
        type: 'p',
        text: 'The model was built on water quality reference data from the Department of Environment and Natural Resources (DENR), which defined the regulatory safe / unsafe parameter ranges and gave the training labels a recognized standard to anchor against. That was complemented with real sample readings and domain parameters supplied by the client — a practicing chemical engineer — so the model learned from the same conditions it would face in the field, not just textbook values.',
      },
      { type: 'h2', text: 'Training & Validation' },
      {
        type: 'p',
        text: 'The CNN and Naive Bayes models were trained on the labeled DENR-anchored dataset and cross-checked against the client’s own sample readings. Validation was done where it counts: with the client himself. As a chemical engineer using the system on his own project, he reviewed the assessments against his expectations and confirmed the results were correct and consistent — and that the tool was genuinely helping him do his work faster. Sign-off from a domain expert on live samples mattered far more here than any single offline metric.',
      },
      { type: 'h2', text: 'Results' },
      {
        type: 'p',
        text: 'SirenaTech produced reliable, lab-comparable assessments in seconds, was validated in the field by a practicing chemical engineer, and was recognized as Best Innovative Thesis at CS Expo 2023–24. What started as a thesis became a tool a real engineer chose to keep using.',
      },
      {
        type: 'quote',
        text: 'The win wasn’t the model — it was a domain expert trusting it enough to use it on his own work.',
      },
    ],
  },
  {
    slug: 'enterprise-workflow-orchestration',
    title: 'Enterprise Workflow Orchestration: A Production-Grade n8n Architecture',
    excerpt:
      'How a centralized n8n sub-workflow architecture with standardized logging, JSON validation, and dynamic routing turned brittle, copy-pasted integrations into a consistent, observable system teams can actually trust.',
    date: '2024-09-02',
    readTime: '7 min read',
    tags: ['n8n', 'AWS', 'MuleSoft', 'PostgreSQL'],
    content: [
      {
        type: 'p',
        text: 'This is the architecture I use to make enterprise integrations boring — in the best way. Predictable, observable, and reusable, so adding the next integration is a configuration change, not a new firefight.',
      },
      { type: 'h2', text: 'The Problem' },
      {
        type: 'p',
        text: 'Integration logic was duplicated across dozens of workflows, logging was ad hoc, and inconsistent response shapes made every downstream consumer fragile. One upstream change could quietly break things nobody noticed until a customer did. The team needed a single standard, not more workflows.',
      },
      { type: 'h2', text: 'The Architecture' },
      {
        type: 'list',
        items: [
          'Reusable sub-workflows for shared logic instead of copy-paste sprawl.',
          'Standardized log codes so any run is traceable end to end.',
          'Dynamic routing via Switch nodes driven by request metadata.',
          'Strict JSON validation on every input and every output.',
        ],
      },
      {
        type: 'p',
        text: 'Every response follows one predictable envelope, so consumers integrate against a single contract — forever:',
      },
      {
        type: 'code',
        lang: 'json',
        text: '{\n  "status": "success",\n  "description": "Record processed",\n  "data": { "id": 1024 },\n  "meta": { "trace": "WF-200-OK" }\n}',
      },
      { type: 'h2', text: 'Impact' },
      {
        type: 'p',
        text: 'The result was integrations that behave the same way every time. New endpoints onboard in hours instead of days because the hard parts — logging, validation, routing, error handling — are already solved and shared. When something does fail, the standardized trace codes point straight at the cause instead of starting a guessing game, so issues get caught and resolved before they reach a customer.',
      },
      {
        type: 'quote',
        text: 'Standardize the boring parts once, and every future integration inherits reliability for free.',
      },
    ],
  },
  {
    slug: 'agentic-automation-guardrails',
    title: 'Agentic Automation You Can Trust: Guardrails, Tool Design, and Human-in-the-Loop',
    excerpt:
      'Giving an LLM access to Zendesk, SAP, and enterprise APIs is the easy part. Making it safe enough for production is the real work — narrow tools, strict output validation, trace codes, and approval gates before anything irreversible happens.',
    date: '2026-05-27',
    readTime: '7 min read',
    tags: ['Agentic AI', 'n8n', 'LLM', 'Observability'],
    content: [
      {
        type: 'p',
        text: 'An agentic system is an LLM with hands. In my day job I orchestrate models against Zendesk, SAP, and internal APIs through n8n — which means a wrong decision is no longer a bad paragraph, it is a wrong ticket update, a wrong record in a system of record, a wrong email to a real customer. This post is the set of design rules I apply so that giving a model hands does not mean giving it free rein.',
      },
      { type: 'h2', text: 'The Problem' },
      {
        type: 'p',
        text: 'Demos make agents look finished. You wire a model to a few tools, it does something impressive on the happy path, and everyone wants it shipped. But production traffic is mostly edge cases: ambiguous requests, malformed data, APIs that time out, and instructions hiding inside customer text. An agent without guardrails handles all of that with the same cheerful confidence it had in the demo — and that is exactly the problem.',
      },
      { type: 'h2', text: 'Rule 1: Narrow Tools Beat Powerful Tools' },
      {
        type: 'p',
        text: 'The single highest-leverage decision is what the tools can do. I never hand an agent a generic "call this API" tool. Each tool is a narrow, well-described capability with the smallest surface that still does the job — "append an internal note to ticket X" instead of "update ticket", "read order status" instead of "query the database". The model cannot misuse a capability it was never given, so most failure modes are eliminated at design time instead of caught at runtime.',
      },
      { type: 'h2', text: 'Rule 2: Validate Every Output Like You Don’t Trust It' },
      {
        type: 'p',
        text: 'Model output is user input. Before anything an LLM produces touches a downstream system, it passes through strict JSON validation — the same discipline I use for enterprise integrations. Every agent response must conform to a schema, and every workflow response follows one predictable envelope:',
      },
      {
        type: 'code',
        lang: 'json',
        text: '{\n  "status": "success",\n  "description": "Ticket triaged",\n  "data": { "action": "append_note", "ticketId": 88231, "confidence": 0.93 },\n  "meta": { "trace": "AGT-110-OK" }\n}',
      },
      {
        type: 'p',
        text: 'If the output does not parse, does not match the schema, or references an entity that does not exist, the run stops and routes to the failure branch. The agent never gets the benefit of the doubt.',
      },
      { type: 'h2', text: 'Rule 3: Reversible by Default, Approved When Not' },
      {
        type: 'list',
        items: [
          'Actions are sorted into two buckets at design time: reversible (draft, tag, annotate, stage) and irreversible (send, post, update a system of record, touch money).',
          'Reversible actions run autonomously — that is where the speed comes from.',
          'Irreversible actions require a human approval gate: the agent prepares the action, a person clicks approve, the workflow executes it.',
          'Confidence thresholds route the gray zone: high-confidence runs flow through, low-confidence runs escalate to a human with full context attached.',
        ],
      },
      { type: 'h2', text: 'Rule 4: If You Can’t Trace It, You Can’t Trust It' },
      {
        type: 'p',
        text: 'Every run carries a trace code from trigger to terminal state, and every decision the model makes — which tool, which inputs, what confidence — is logged in a standardized shape. When something goes wrong, the question "what did the agent do and why" has a five-minute answer, not a forensic investigation. And failures page me directly: a broken run is a notification, never a silent gap someone discovers a week later.',
      },
      { type: 'h2', text: 'What This Buys You' },
      {
        type: 'p',
        text: 'None of these rules make the agent smarter. They make it accountable — and accountability is what lets you keep widening its autonomy. Every gate that holds builds the trust to remove the next one. Teams that skip the guardrails ship faster for a month, then freeze the whole program after the first incident. Teams that build them ship slower for a month, then never stop expanding.',
      },
      {
        type: 'quote',
        text: 'Autonomy is earned in production, one validated run at a time.',
      },
    ],
  },
  {
    slug: 'document-extraction-pipeline',
    title: 'Document/Data Extraction Pipeline: PDFs In, Clean Structured Data Out (n8n + Claude/OpenAI)',
    excerpt:
      'Invoices, scanned forms, and reports arrive as PDFs — and someone retypes them into a spreadsheet. This pipeline replaces that job: n8n ingests the document, Claude or GPT extracts and classifies the fields, strict validation catches the lies, and clean rows land in Sheets, Airtable, or your database.',
    date: '2026-06-24',
    readTime: '8 min read',
    tags: ['n8n', 'Claude API', 'OpenAI', 'Document AI', 'Airtable'],
    content: [
      {
        type: 'p',
        text: 'Every business has a version of this job: documents arrive — invoices, purchase orders, intake forms, scanned applications — and a human reads each one and retypes the important fields into a spreadsheet or a system. It is slow, error-prone, and nobody wants to do it. This post is the pipeline I build to replace it: PDF in, AI extracts structured fields, validation proves the extraction is trustworthy, and clean rows land in Google Sheets, Airtable, or a database. The same architecture I run for enterprise ticket and report pipelines, pointed at documents.',
      },
      // TODO: add workflow screenshot here once uploaded, e.g.
      // { type: 'img', src: '/uploads/doc-extraction-workflow.png', alt: 'n8n document extraction workflow', caption: 'The full n8n pipeline: ingest → extract → validate → write' },
      { type: 'h2', text: 'The Problem' },
      {
        type: 'p',
        text: 'Classic OCR gives you text, not answers. It will happily read an invoice into a wall of characters, but it cannot tell you which number is the total, which line is the vendor, or that page 3 is actually a different document. Template-based extractors solve one layout and break on the next vendor’s format. What businesses actually need is layout-independent extraction: hand the system any reasonable document and get back the same named fields, every time.',
      },
      { type: 'h2', text: 'The Pipeline' },
      {
        type: 'code',
        lang: 'text',
        text: 'Trigger (email attachment / Drive folder / upload form)\n  → NORMALIZE_Document        (PDF → images or text; split multi-doc files)\n  → CLASSIFY_DocumentType     (invoice? PO? intake form? unknown → human)\n  → EXTRACT_Fields            (Claude/GPT vision → strict JSON schema)\n  → VALIDATE_Extraction       (schema + business rules + math checks)\n  → WRITE_Destination         (Sheets / Airtable / Postgres upsert)\n  → on any failure: SEND_ErrorMessage → Telegram alert with trace code',
      },
      {
        type: 'p',
        text: 'Two design choices carry the whole thing. First, classification runs before extraction — knowing the document type lets you use a targeted prompt and schema per type instead of one bloated mega-prompt, and anything the classifier cannot place routes straight to a human instead of being force-fit. Second, the model is never asked to “read the document” — it is asked to fill a specific JSON schema, field by field, with an explicit instruction to return null for anything it cannot find rather than guessing.',
      },
      { type: 'h2', text: 'The Extraction Step' },
      {
        type: 'p',
        text: 'Claude and GPT-4o both read documents as images, which means scanned forms, photographed receipts, and digital PDFs all go through the same door — no separate OCR stage to maintain. The prompt pins down the schema, the units, the date format, and the null policy. A typical invoice extraction returns:',
      },
      {
        type: 'code',
        lang: 'json',
        text: '{\n  "status": "success",\n  "data": {\n    "documentType": "invoice",\n    "vendorName": "Apex Industrial Supply",\n    "invoiceNumber": "INV-20418",\n    "invoiceDate": "2026-06-12",\n    "currency": "PHP",\n    "lineItems": [\n      { "description": "Ball valve 2in", "qty": 12, "unitPrice": 850.0, "amount": 10200.0 }\n    ],\n    "subtotal": 10200.0,\n    "tax": 1224.0,\n    "total": 11424.0,\n    "confidence": 0.96\n  },\n  "meta": { "trace": "DOC-200-OK" }\n}',
      },
      { type: 'h2', text: 'Validation: Where Trust Is Earned' },
      {
        type: 'p',
        text: 'Model output is user input — the same rule I apply to every agentic system. Extraction only counts after it survives three layers of checks:',
      },
      {
        type: 'list',
        items: [
          'Schema validation — every field present, correctly typed, dates parseable, enums in range. Malformed output fails the run; it never gets “cleaned up” downstream.',
          'Business rules — line items must sum to the subtotal, subtotal + tax must equal the total, dates cannot be in the future, currency must match the vendor’s known currency. Math the model cannot fake.',
          'Confidence routing — high-confidence extractions flow straight through to the destination; low-confidence ones land in a review queue with the original document attached, so a human confirms in seconds instead of retyping in minutes.',
        ],
      },
      {
        type: 'p',
        text: 'That last layer is what makes the system honest about its limits. The goal is not 100% automation — it is 100% of documents handled correctly, with the model doing the bulk and humans only touching the genuinely ambiguous ones.',
      },
      { type: 'h2', text: 'Writing to the Destination' },
      {
        type: 'p',
        text: 'The final step is an idempotent upsert keyed on a natural identifier — vendor + invoice number, or a form submission ID — so re-running a failed batch never creates duplicates. Sheets and Airtable get the flat fields for the operations team; Postgres gets the full structured record including line items. Every row carries the trace code, so any value in the spreadsheet can be walked back to the exact run and the exact source document that produced it.',
      },
      { type: 'h2', text: 'Lessons from Enterprise Pipelines' },
      {
        type: 'p',
        text: 'This is the same discipline as the Zendesk and report pipelines I run in my enterprise work, transplanted onto documents: strict JSON contracts on every hop, standardized trace codes on every run, and failures that page me on Telegram instead of dying silently. A document pipeline that silently drops one invoice a week is worse than no pipeline — the failure mode must always be a loud notification, never a missing row someone finds at month-end close.',
      },
      {
        type: 'quote',
        text: 'OCR reads documents. This pipeline answers them — and proves the answer before anyone acts on it.',
      },
    ],
  },
  {
    slug: 'lead-capture-ghl-followup',
    title: 'Lead Capture → CRM → Follow-up: The n8n + GoHighLevel Pipeline Every Client Asks For',
    excerpt:
      'Form or webhook in → dedupe check → create/update the GoHighLevel contact → auto-tag by source → the right SMS/email sequence fires within seconds. The most-requested automation in the GHL world, built the production way: validated payloads, no duplicate contacts, no lead ever silently dropped.',
    date: '2026-07-01',
    readTime: '8 min read',
    tags: ['GoHighLevel', 'n8n', 'CRM Automation', 'Lead Capture'],
    content: [
      {
        type: 'p',
        text: 'If you build automations for agencies and local businesses, one request comes up more than everything else combined: “when a lead comes in, get it into GoHighLevel, tag it, and start the follow-up — automatically.” Speed-to-lead is the whole game; a lead contacted within five minutes is dramatically more likely to convert than one contacted an hour later. This post walks through the pipeline I built for that job: webhook in, validate, upsert the contact, tag by source, drop it into the sales pipeline — and if anything fails, the team knows within seconds.',
      },
      {
        type: 'img',
        src: '/uploads/lead-capture-workflow.png',
        alt: 'n8n lead capture to GoHighLevel workflow with intake, CRM sync, confirm/log, and error handling groups',
        caption: 'The full n8n build: Lead Intake → Validate → CRM Sync (GHL) → Confirm + Log, with a dedicated error-handling lane.',
      },
      { type: 'h2', text: 'The Problem' },
      {
        type: 'p',
        text: 'Leads arrive from everywhere — Facebook lead ads, website forms, landing pages, chat widgets, purchased lists — and each source formats its payload differently. Wire them all straight into the CRM and you get the classic mess: duplicate contacts for the same person, no record of which channel produced which lead, and follow-up that depends on whether a human happened to check the inbox. Meanwhile the lead who filled out the form at 9pm is buying from whoever texted back first.',
      },
      { type: 'h2', text: 'The Pipeline' },
      {
        type: 'p',
        text: 'The workflow is organized into four labeled lanes on the n8n canvas — Lead Intake, CRM Sync, Confirm + Log, and Error Handling — so anyone opening it can read the business logic straight off the canvas:',
      },
      {
        type: 'code',
        lang: 'text',
        text: '01 – Lead Intake (Facebook)      webhook receives the lead\n02 – Normalize Contact Data      clean phone/email format, one schema\n03 – Validate: Has Email or Phone?\n  ├─ true  → 04 – Upsert Contact (GHL)\n  │           → 05 – Apply Source Tag (GHL)\n  │           → 06 – Create Opportunity (GHL)\n  │           → 07 – Respond to Caller\n  │           → 08 – Log Success            (append: sheet)\n  └─ false → 09 – Log Rejected Lead         (append: sheet)\n\nany node error → 09a – Alert: Pipeline Failure  (Slack message)',
      },
      { type: 'h2', text: 'Lead Intake: One Schema Before Anything Else' },
      {
        type: 'p',
        text: 'The intake lane receives the lead from Facebook, cleans up the phone and email format, and checks that there is enough information to create a contact at all. Every source payload — whatever Facebook or the form builder decides to send — is reshaped into a single lead schema before any CRM call happens: name, email, phone in a consistent format, source. Downstream nodes only ever see that one shape, so adding a new lead source is a new mapping in one node, not a new copy of the whole workflow. And the validation gate (03) means a lead with no email and no phone never wastes an API call — it routes straight to the rejected-lead log instead.',
      },
      { type: 'h2', text: 'CRM Sync: Upsert, Tag, Opportunity' },
      {
        type: 'list',
        items: [
          '04 – Upsert Contact — GHL’s upsert endpoint creates the contact or updates the existing one, so the same person submitting twice never becomes two records. Duplicates split conversation history, fire the same sequence twice, and make every report lie; the upsert kills that class of bug at the API level.',
          '05 – Apply Source Tag — the contact is tagged by source (facebook, website, …). In GoHighLevel, tags are the cleanest bridge between the API and the workflow builder: the tag is what fires the matching GHL follow-up sequence — SMS, email drip, rep notification — which the client’s team owns natively inside GHL without ever touching n8n.',
          '06 – Create Opportunity — the lead lands in the sales pipeline immediately, so it exists where the sales team actually looks, not just in the contact list.',
        ],
      },
      { type: 'h2', text: 'Confirm + Log: Close the Loop' },
      {
        type: 'p',
        text: 'Once the CRM sync succeeds, 07 – Respond to Caller sends a confirmation back to the webhook caller, and 08 – Log Success appends the lead to a Google Sheet. That sheet is the running audit trail — every lead that entered the system, when, and from where — which makes “did lead X ever come through?” a ten-second lookup instead of an n8n archaeology session.',
      },
      {
        type: 'code',
        lang: 'json',
        text: '{\n  "status": "success",\n  "description": "Lead upserted and routed",\n  "data": {\n    "contactId": "ghl_8f2k1",\n    "action": "created",\n    "source": "fb-leadform",\n    "tags": ["src:fb-leadform", "campaign:june-promo"],\n    "sequenceTriggered": "fb-fast-followup"\n  },\n  "meta": { "trace": "LEAD-201-OK" }\n}',
      },
      { type: 'h2', text: 'Where Qualification Slots In' },
      {
        type: 'p',
        text: 'This pipeline is deliberately deterministic — capture and routing should be boring and instant. When a client wants qualification too, an AI scoring step slots in cleanly between normalization and tagging: the model reads the lead’s answers, scores fit and urgency, and the tag it produces (hot-lead, nurture, disqualify) routes to a different sequence. Same pipeline, one extra node — the capture layer doesn’t change, which is exactly why it’s worth building right the first time.',
      },
      { type: 'h2', text: 'Error Handling: Nothing Falls Through the Cracks' },
      {
        type: 'p',
        text: 'A lead pipeline has one unforgivable failure mode: silently dropping a lead someone paid ad money to generate. So every GHL node’s error output — and the validation gate’s false branch — routes into a dedicated error-handling lane. Rejected leads are appended to their own sheet (09 – Log Rejected Lead), and any pipeline failure fires 09a – Alert: Pipeline Failure, a Slack message with everything needed to recover the lead by hand:',
      },
      {
        type: 'img',
        src: '/uploads/lead-capture-slack-alert.png',
        alt: 'Slack alert showing a lead pipeline failure with client, source, timestamp, API error, and the lead contact details',
        caption: 'The real alert: client, source, timestamp, the exact API error (a 401 from GHL), the lead’s contact info, and recovery instructions.',
      },
      {
        type: 'p',
        text: 'The alert carries the client name, the source, the timestamp, the raw API error, and — critically — the lead’s email and phone, plus explicit instructions: this lead did NOT reach GHL, check the error log, re-run from n8n Executions. When this screenshot was taken, the alert caught a 401 auth error against the GHL API — exactly the kind of failure that would otherwise eat leads invisibly until someone noticed the pipeline had gone quiet. Instead it was a Slack ping with the lead’s details attached, recoverable in under a minute. The pipeline is allowed to fail; it is never allowed to fail quietly.',
      },
      {
        type: 'quote',
        text: 'Speed-to-lead wins deals. The pipeline’s job is making sure the follow-up starts before the lead’s coffee gets cold.',
      },
    ],
  },
];

export function getPost(slug) {
  return POSTS.find(p => p.slug === slug);
}
