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
];

export function getPost(slug) {
  return POSTS.find(p => p.slug === slug);
}
