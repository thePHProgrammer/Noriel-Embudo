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
    tags: ['n8n', 'Claude API', 'Document AI', 'Google Sheets', 'Slack'],
    content: [
      {
        type: 'p',
        text: 'Every business has a version of this job: documents arrive — invoices, purchase orders, intake forms, scanned applications — and a human reads each one and retypes the important fields into a spreadsheet or a system. It is slow, error-prone, and nobody wants to do it. This post walks through the pipeline I built to replace it: drop a document into a folder, Claude extracts the structured fields, validation proves the extraction is trustworthy, and clean rows land in Google Sheets — with anything questionable routed to a review queue instead of silently corrupting the records.',
      },
      {
        type: 'img',
        src: '/uploads/Document_Extraction_Pipeline.png',
        alt: 'n8n document extraction workflow with ingest, extract & validate, and route lanes',
        caption: 'The full n8n build: Ingest (Drive folder) → Extract & Validate (Claude) → Route valid vs invalid.',
      },
      { type: 'h2', text: 'The Problem' },
      {
        type: 'p',
        text: 'Classic OCR gives you text, not answers. It will happily read an invoice into a wall of characters, but it cannot tell you which number is the total, which line is the vendor, or that page 3 is actually a different document. Template-based extractors solve one layout and break on the next vendor’s format. What businesses actually need is layout-independent extraction: hand the system any reasonable document and get back the same named fields, every time.',
      },
      { type: 'h2', text: 'The Pipeline' },
      {
        type: 'p',
        text: 'The workflow is organized into three labeled lanes on the n8n canvas — Ingest, Extract & Validate, and Route — so the business logic reads straight off the canvas:',
      },
      {
        type: 'code',
        lang: 'text',
        text: '01 – Watch Intake Folder       (Google Drive trigger: fileCreated)\n02 – Download Source File\n03 – Encode Image to Base64\n04 – Extract Fields via Claude (POST api.anthropic.com)\n05 – Parse Claude JSON\n06 – Validate Extraction       (schema + math checks)\n07 – Route Valid vs Invalid\n  ├─ valid   → 08a – Format Invoice Summary Row → 09a – Append to Invoices Tab\n  │            08b – Split Line Items Array → 09b – Format Line Item Row\n  │                → 10b – Append to Line Items Tab\n  └─ invalid → 08c – Format Error Row → 09c – Append to Errors Tab\n                   → 10c – Notify Reviewer (Slack)',
      },
      {
        type: 'p',
        text: 'Two design choices carry the whole thing. First, the intake is a watched Drive folder — anyone on the team can feed the pipeline by dropping a file in, no form, no training, no new tool to learn. Second, the model is never asked to “read the document” — it is asked to fill a specific JSON schema, field by field, with an explicit instruction to return null for anything it cannot find rather than guessing.',
      },
      { type: 'h2', text: 'The Extraction Step' },
      {
        type: 'p',
        text: 'Claude reads documents as images, which means scanned forms, photographed receipts, and digital PDFs all go through the same door — no separate OCR stage to maintain. The prompt pins down the schema, the units, the date format, and the null policy. Here is one of the test documents — a commercial invoice with five line items:',
      },
      {
        type: 'img',
        src: '/uploads/Sample_Receipt.png',
        alt: 'Sample commercial invoice from Cybernetic Logistics Solutions with five line items',
        caption: 'A test input: photographed commercial invoice, five line items, tax and shipping.',
      },
      {
        type: 'p',
        text: 'Claude returns it as one strict JSON object — vendor, invoice number, date, the amounts, and every line item as structured data:',
      },
      {
        type: 'code',
        lang: 'json',
        text: '{\n  "vendor": "Cybernetic Logistics Solutions",\n  "invoice_number": "F1000876/23",\n  "invoice_date": "14/08/2023",\n  "subtotal": 740.0,\n  "shipping": 100.0,\n  "insurance": 0.0,\n  "tax": 86.06,\n  "total": 926.06,\n  "line_items": [\n    { "description": "Control Panel Assembly", "hs_code": "88565.2252", "units": 2, "unit_price": 200.0, "line_total": 400.0 },\n    { "description": "Power Cable Loom", "hs_code": "88565.2545", "units": 1, "unit_price": 85.0, "line_total": 85.0 }\n  ]\n}',
      },
      { type: 'h2', text: 'Validation: Where Trust Is Earned' },
      {
        type: 'p',
        text: 'Model output is user input — the same rule I apply to every agentic system. Extraction only counts after it survives the checks in node 06, and we verify the math ourselves rather than trust the model blindly:',
      },
      {
        type: 'list',
        items: [
          'Schema validation — every field present, correctly typed, dates parseable. Malformed output fails the run; it never gets “cleaned up” downstream.',
          'Math checks — line items must sum to the subtotal, and subtotal + shipping + insurance + tax must equal the total. Math the model cannot fake.',
          'Routing — valid extractions flow to the live sheet; anything questionable goes to a review queue instead of silently corrupting the records.',
        ],
      },
      {
        type: 'p',
        text: 'This is not theoretical. During testing, the validator caught Claude extracting a subtotal of 485 from an invoice whose line items summed to 740 — and instead of a wrong number landing in the books, the reviewer got a Slack alert with the vendor, the file, and the exact discrepancy:',
      },
      {
        type: 'img',
        src: '/uploads/Document_Extraction_Error.png',
        alt: 'Slack alert saying invoice extraction needs review, with vendor, invoice number, file, and the math discrepancy',
        caption: 'The validator at work: “line items sum to 740, but invoice subtotal is 485” — caught before it touched the live sheet.',
      },
      {
        type: 'p',
        text: 'The rejected extraction lands in a dedicated Errors tab with the raw extracted JSON, the failure reason, and a Reviewed column — a review queue where a human confirms in seconds instead of retyping in minutes. The goal is not 100% automation; it is 100% of documents handled correctly, with the model doing the bulk and humans only touching the genuinely ambiguous ones.',
      },
      {
        type: 'img',
        src: '/uploads/Document_Extraction_Error(1).png',
        alt: 'Errors tab in Google Sheets with timestamp, file name, vendor, raw extracted JSON, error text, and a Reviewed column',
        caption: 'The Errors tab: raw JSON preserved for the reviewer, failure reason spelled out, Reviewed column to track the queue.',
      },
      { type: 'h2', text: 'Writing to the Destination' },
      {
        type: 'p',
        text: 'Valid extractions are written to Google Sheets in a properly normalized shape — not one blob row. The Invoices tab gets a summary row per document (vendor, invoice number, date, subtotal, shipping, tax, total, line-item count), and a separate Line Items tab gets one row per item, keyed by invoice number, so the data is immediately usable for lookups and pivots:',
      },
      {
        type: 'img',
        src: '/uploads/Document_Extraction_Invoices_File.png',
        alt: 'Invoices tab in Google Sheets with one summary row per extracted invoice',
        caption: 'Invoices tab: one summary row per document — totals, dates, and line-item count at a glance.',
      },
      {
        type: 'img',
        src: '/uploads/Document_Extraction_Line_Items.png',
        alt: 'Line Items tab in Google Sheets with one row per invoice line item, keyed by invoice number',
        caption: 'Line Items tab: every item as its own row, keyed by invoice number — ready for pivots and reconciliation.',
      },
      {
        type: 'p',
        text: 'Sheets is the destination here because that is where this team lives, but the write step is just the last node — the same pipeline lands rows in Airtable or Postgres by swapping one node, with the extraction and validation layers untouched.',
      },
      { type: 'h2', text: 'Lessons from Enterprise Pipelines' },
      {
        type: 'p',
        text: 'This is the same discipline as the Zendesk and report pipelines I run in my enterprise work, transplanted onto documents: strict JSON contracts on every hop, validation before anything touches a system of record, and failures that ping a reviewer on Slack instead of dying silently. A document pipeline that silently drops one invoice a week is worse than no pipeline — the failure mode must always be a loud notification, never a missing row someone finds at month-end close.',
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
        src: '/uploads/Lead_Capture_Pipeline.png',
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
        src: '/uploads/Lead_Pipeline_Error.png',
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
