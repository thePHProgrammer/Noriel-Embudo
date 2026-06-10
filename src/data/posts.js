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
    slug: 'content-repurposer',
    title: 'Content Repurposer: One Blog URL → A Twitter Thread + LinkedIn Post, Automatically',
    excerpt:
      'Paste a blog URL and a niche into a form, and an n8n + Claude pipeline turns it into a TL;DR, a ready-to-post Twitter thread, and a LinkedIn post — delivered straight into Notion, with Telegram alerts if anything breaks.',
    date: '2026-05-19',
    readTime: '5 min read',
    tags: ['n8n', 'Claude API', 'Notion', 'Automation'],
    content: [
      {
        type: 'p',
        text: 'Content Repurposer is a hands-off pipeline that takes one piece of long-form content and turns it into the social posts you actually need to promote it. You give it a blog URL and a niche; it gives you a clean TL;DR, a full Twitter thread, and a polished LinkedIn post — written for your audience and dropped straight into Notion, ready to publish.',
      },
      { type: 'h2', text: 'The Problem' },
      {
        type: 'p',
        text: 'Great content dies in a tab. Turning a single article into a Twitter thread and a LinkedIn post is repetitive, time-consuming work that most people skip — so the content never gets the reach it deserves. This pipeline does that repurposing automatically and consistently, every time.',
      },
      { type: 'h2', text: 'How It Works' },
      {
        type: 'list',
        items: [
          '1 — Pick a piece of content worth amplifying (for example, an article like "Agentic AI vs. Generative AI: Key Differences and Use Cases").',
          '2 — Paste the blog post URL into the Content Repurposer form and set the niche (e.g. "AI").',
          '3 — Hit submit. The form confirms with "Thanks for Submitting! Check your Notion now!" and the pipeline takes over.',
          '4 — An n8n workflow fetches, cleans, and rewrites the article with Claude.',
          '5 — The finished TL;DR, Twitter thread, and LinkedIn post land as a new row in Notion.',
        ],
      },
      { type: 'h2', text: 'The Workflow' },
      {
        type: 'p',
        text: 'The form submission triggers an n8n workflow that runs the article through a clean, observable pipeline:',
      },
      {
        type: 'code',
        lang: 'text',
        text: 'Tally Trigger\n  → GET_WebsiteDetails        (fetch the blog post)\n  → REMOVE_HTMLTags           (strip markup to clean text)\n  → POST_ClaudeAPI            (rewrite into TL;DR + thread + post)\n  → NORMALIZE_ClaudeResponse  (parse + validate the model output)\n  → CREATE_DatabaseRow        (write the result into Notion)',
      },
      {
        type: 'p',
        text: 'Claude does the heavy lifting — reading the cleaned article and rewriting it into a TL;DR, a numbered Twitter thread, and a LinkedIn post tuned to the niche you specified. The normalize step guarantees the output is well-formed before anything is written downstream.',
      },
      { type: 'h2', text: 'What You Get' },
      {
        type: 'p',
        text: 'Each run creates a structured Notion entry with everything you need to publish — no copy-pasting, no reformatting:',
      },
      {
        type: 'list',
        items: [
          'Title — a clean, rewritten headline.',
          'Source URL — a link back to the original article.',
          'TL;DR — a tight summary of the piece.',
          'Tweet Thread — a numbered, ready-to-post Twitter thread.',
          'LinkedIn Post — a long-form post written for the chosen niche.',
          'Date Created — an automatic timestamp.',
        ],
      },
      { type: 'h2', text: 'Reliability & Edge Cases' },
      {
        type: 'p',
        text: 'Automation is only useful if it tells you when it breaks. If fetching the article fails, the workflow branches to a SEND_ErrorMessage step that pings me directly on Telegram with the failure — so a broken run is a notification, not a silent gap you discover days later when a post is missing.',
      },
      {
        type: 'quote',
        text: 'Write once, repurpose automatically — the reach should be the easy part.',
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
    slug: 'rpa-to-agentic-automation',
    title: 'From RPA to Agentic Automation: Lessons from 100,000+ Hours Saved',
    excerpt:
      'After shipping 70+ RPA solutions across five countries, I learned exactly where deterministic automation stops paying for itself — and how agentic AI changes the unit of work from "scripted steps" to "goal plus tools".',
    date: '2026-06-03',
    readTime: '7 min read',
    tags: ['Agentic AI', 'RPA', 'UiPath', 'n8n'],
    content: [
      {
        type: 'p',
        text: 'At DFI Retail Group I built and deployed 70+ automation solutions with UiPath, Power Automate, Python, and C# across Indonesia, Hong Kong, Malaysia, Taiwan, and Vietnam — over 100,000 hours a year handed back to the business. That portfolio taught me two things: deterministic RPA is still wildly underrated, and there is a hard ceiling it will never break through. Agentic AI is what finally moved that ceiling.',
      },
      { type: 'h2', text: 'What Classic RPA Gets Right' },
      {
        type: 'p',
        text: 'When a process is stable, rule-based, and high-volume, nothing beats a deterministic bot. It does the same thing every time, it is cheap to run, it is easy to audit, and finance can verify the savings line by line. Most of those 100,000 hours came from exactly this kind of work — invoice processing, report generation, data reconciliation between systems that were never designed to talk to each other.',
      },
      { type: 'h2', text: 'Where It Breaks' },
      {
        type: 'list',
        items: [
          'Brittle selectors — a vendor redesigns one screen and the bot is down until someone re-records the flow.',
          'Unstructured input — the moment the process involves reading an email, a PDF, or a free-text field, rules explode into unmaintainable branching.',
          'Exceptions — the bot handles the 80% happy path, and the 20% of exceptions quietly become a human queue that nobody budgeted for.',
          'Change velocity — every process tweak is a development ticket, so the backlog grows faster than the team.',
        ],
      },
      {
        type: 'p',
        text: 'The pattern across all four: deterministic automation encodes the steps, so anything that changes the steps breaks the automation. We were not automating the work — we were automating one snapshot of the work.',
      },
      { type: 'h2', text: 'The Shift: From Steps to Goals' },
      {
        type: 'p',
        text: 'Agentic automation changes the unit of work. Instead of scripting "click here, copy this, paste there", you give a model a goal, a set of narrow tools, and guardrails — and it works out the steps at runtime. The email that would have broken a rules engine becomes just another input the model reads. The exception queue becomes the part the agent is best at, because exceptions are exactly the cases that need judgment instead of repetition.',
      },
      {
        type: 'code',
        lang: 'text',
        text: 'Classic RPA:   trigger → step 1 → step 2 → ... → step N   (breaks if any step changes)\nAgentic:       trigger → goal + tools + guardrails → agent decides the steps\n                          ↳ validate output → act / escalate to human',
      },
      { type: 'h2', text: 'A Decision Framework' },
      {
        type: 'p',
        text: 'Agentic does not replace RPA — it sits above it. This is the framework I use to decide which tool each process deserves:',
      },
      {
        type: 'list',
        items: [
          'Stable, rule-based, high-volume → deterministic RPA. An LLM in this loop is cost and latency for nothing.',
          'Unstructured inputs, judgment calls, natural language → agentic. This is where rules engines go to die.',
          'High blast radius (payments, compliance, systems of record) → either approach, but always with validation and human approval gates.',
          'Hybrid is the real answer: an agent doing the reasoning, calling deterministic workflows as its tools. The bot becomes the hands; the model becomes the dispatcher.',
        ],
      },
      { type: 'h2', text: 'What I’d Tell a Team Starting Today' },
      {
        type: 'p',
        text: 'Do not throw away your RPA estate — it is a library of reliable, audited tools your agents can call. Start agentic where deterministic already failed: the exception queues, the inbox triage, the processes that never got automated because they were "too messy". That is the work with no incumbent solution, the cleanest ROI story, and the fastest path to leadership trusting the approach.',
      },
      {
        type: 'quote',
        text: 'RPA automates a snapshot of the work. Agents automate the work.',
      },
    ],
  },
  {
    slug: 'ghl-n8n-ai-pipeline',
    title: 'GoHighLevel + n8n + Claude: Building an AI Lead-Qualification Pipeline',
    excerpt:
      'GHL is excellent at capturing leads and firing follow-up sequences — but deciding which lead is worth chasing takes reasoning. Here is the architecture I use: GHL webhook → n8n → Claude scores the lead and drafts the follow-up → results written back to GHL, where a tag-triggered workflow takes over.',
    date: '2026-06-10',
    readTime: '8 min read',
    tags: ['GoHighLevel', 'n8n', 'Claude API', 'CRM Automation'],
    content: [
      {
        type: 'p',
        text: 'GoHighLevel is the operating system of a huge number of agencies and local businesses: funnels, calendars, pipelines, SMS, and email in one place. Its workflow builder is genuinely good at linear sequences — when X happens, wait, send Y. What it cannot do natively is reason: read a messy form submission, judge intent, score fit, and write a follow-up that sounds like it was written for that specific person. This post is the architecture I use to bolt that reasoning layer onto GHL with n8n and Claude — without fighting the platform.',
      },
      { type: 'h2', text: 'The Problem' },
      {
        type: 'p',
        text: 'Every lead that hits a GHL funnel gets the same treatment: the same drip sequence, the same generic first message, the same priority in the pipeline. But leads are not equal. One form submission says "need a quote for 40 units by Friday" and another says "just looking" — and a keyword rule cannot reliably tell the difference, because real humans write real sentences. The result is sales teams wading through unqualified leads while the urgent ones wait in the same queue.',
      },
      { type: 'h2', text: 'The Architecture' },
      {
        type: 'p',
        text: 'The principle: let GHL do what GHL is great at — capture, sequences, and sending — and route the thinking through n8n. GHL fires a webhook on every new lead; n8n enriches it, asks Claude for a structured verdict, writes that verdict back onto the contact; and a tag applied by the API triggers the right GHL workflow. GHL stays the system of record and the delivery engine. n8n and Claude are just the brain in the middle.',
      },
      {
        type: 'code',
        lang: 'text',
        text: 'GHL Webhook (new lead / form submission)\n  → NORMALIZE_LeadPayload      (validate + reshape the inbound JSON)\n  → GET_ContactContext         (pull history & custom fields via GHL API)\n  → POST_ClaudeAPI             (score fit, urgency, intent + draft follow-up)\n  → VALIDATE_ClaudeResponse    (strict JSON schema check on the verdict)\n  → PUT_GHLContact             (write score & summary to custom fields)\n  → POST_GHLTag                (apply hot-lead / nurture / disqualify tag)\n       ↳ tag triggers the matching GHL workflow (SMS / email / pipeline move)\n  → on any failure: SEND_ErrorMessage → Telegram alert with trace code',
      },
      { type: 'h2', text: 'The Claude Step' },
      {
        type: 'p',
        text: 'The prompt gives Claude the lead’s form answers, source, and any prior conversation history, and demands a single JSON object back: a fit score, an urgency score, a one-line reasoning summary, a routing decision, and a drafted first follow-up written in the business’s voice. Demanding structured output is what makes the model a component instead of a chatbot — the verdict either matches the schema or the run fails loudly.',
      },
      {
        type: 'code',
        lang: 'json',
        text: '{\n  "status": "success",\n  "data": {\n    "fitScore": 87,\n    "urgency": "high",\n    "route": "hot-lead",\n    "reasoning": "Asked for 40-unit quote with a Friday deadline; budget owner.",\n    "draftFollowUp": "Hi Maria — saw you need 40 units by Friday. We can do that. Quick call at 2pm today to lock pricing?"\n  },\n  "meta": { "trace": "GHL-200-OK" }\n}',
      },
      { type: 'h2', text: 'Writing Back to GHL' },
      {
        type: 'list',
        items: [
          'Custom fields — AI Fit Score, AI Summary, and the drafted follow-up land on the contact, so reps see the verdict right inside GHL.',
          'Tags as the trigger surface — applying hot-lead, nurture, or disqualify is what fires the matching GHL workflow. Tags are the cleanest API-to-workflow bridge the platform has.',
          'Hot leads get the drafted message and an immediate pipeline move plus a rep notification; nurture leads drop into the long-game sequence; disqualified leads exit politely.',
          'The draft is a starting point, not an auto-send — for higher-stakes messages, keep a human approving before delivery.',
        ],
      },
      { type: 'h2', text: 'When Native GHL AI Is Enough' },
      {
        type: 'p',
        text: 'GHL ships its own AI features — Conversation AI for chat-style replies and Workflow AI steps for lightweight decisions — and for many accounts they are genuinely enough. If you need a bot that answers FAQs and books appointments, use the native features and skip the engineering. Reach for the n8n + Claude layer when you need things the native tools cannot give you: full control of the prompt and model, structured multi-field verdicts, enrichment from systems outside GHL, your own logging and alerting, and logic you can version, test, and reuse across every sub-account instead of rebuilding it funnel by funnel.',
      },
      { type: 'h2', text: 'Reliability Notes' },
      {
        type: 'p',
        text: 'The same production rules from my enterprise n8n work apply unchanged here: every payload validated on the way in and out, every run stamped with a trace code, every failure branching to a Telegram alert instead of dying silently. A lead-qualification pipeline that silently drops leads is worse than no pipeline at all — the failure mode must be a notification, never a missing follow-up nobody noticed.',
      },
      {
        type: 'quote',
        text: 'Let GHL run the sequences. Let the model make the judgment calls. Never confuse the two.',
      },
    ],
  },
];

export function getPost(slug) {
  return POSTS.find(p => p.slug === slug);
}
