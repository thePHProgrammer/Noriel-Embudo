// Blog posts. Each post renders an index card + a full article page at #/post/<slug>.
//
// content[] is an ordered list of blocks. Supported block types:
//   { type: 'p',      text: '...' }                 paragraph
//   { type: 'h2',     text: '...' }                 section heading
//   { type: 'list',   items: ['...', '...'] }       bulleted list
//   { type: 'quote',  text: '...' }                 pull quote
//   { type: 'code',   lang: 'python', text: '...' }  code block
//   { type: 'img',    src: '/uploads/x.jpg', alt: '...', caption: '...' }
//
// TODO(Noriel): replace the placeholder prose below with your real write-ups.

export const POSTS = [
  {
    slug: 'sirenatech',
    title: 'SirenaTech: Real-Time Water Quality Monitoring with IoT + CNNs',
    excerpt:
      'A portable system that brings lab-grade water assessments to the field — combining IoT sensors with convolutional neural networks to make safe water decisions in seconds.',
    date: '2024-03-15',
    readTime: '6 min read',
    tags: ['CNN', 'Python', 'Kotlin', 'IoT'],
    award: '🏆 Best Innovative Thesis · CS Expo 2023–24',
    content: [
      {
        type: 'p',
        text: 'SirenaTech is a portable water quality monitoring platform that pairs low-cost IoT sensors with a convolutional neural network to deliver real-time, lab-comparable assessments straight to an Android phone. TODO(Noriel): replace this intro with the story you want to tell.',
      },
      { type: 'h2', text: 'The Problem' },
      {
        type: 'p',
        text: 'Millions of people in the Philippines lack reliable access to safe drinking water, and traditional lab testing is slow, expensive, and rarely available where it is needed most. Field workers needed a way to make a safe / unsafe call on the spot.',
      },
      { type: 'h2', text: 'The Approach' },
      {
        type: 'list',
        items: [
          'IoT sensor array captures turbidity, pH, temperature, and TDS readings.',
          'A CNN classifies water quality from sensor signatures and sample imagery.',
          'An Android app surfaces the result with a clear, color-coded verdict.',
          'Edge-first design so it works with intermittent connectivity.',
        ],
      },
      {
        type: 'p',
        text: 'TODO(Noriel): describe the model architecture, dataset, and how you trained/validated it.',
      },
      { type: 'h2', text: 'Results' },
      {
        type: 'p',
        text: 'The system produced reliable assessments in seconds and was recognized as Best Innovative Thesis at CS Expo 2023–24. TODO(Noriel): add accuracy numbers, field test results, and impact.',
      },
      {
        type: 'quote',
        text: 'TODO(Noriel): a memorable takeaway or lesson learned from this project.',
      },
    ],
  },
  {
    slug: 'enterprise-workflow-orchestration',
    title: 'Enterprise Workflow Orchestration: A Production-Grade n8n Architecture',
    excerpt:
      'How a centralized n8n sub-workflow architecture with standardized logging, JSON validation, and dynamic routing made enterprise API integrations consistent and observable at scale.',
    date: '2024-09-02',
    readTime: '7 min read',
    tags: ['n8n', 'AWS', 'MuleSoft', 'PostgreSQL'],
    content: [
      {
        type: 'p',
        text: 'This post walks through a production-grade n8n architecture designed for consistent, observable enterprise integrations. TODO(Noriel): replace with your real narrative.',
      },
      { type: 'h2', text: 'The Problem' },
      {
        type: 'p',
        text: 'Integration logic was duplicated across workflows, logging was ad hoc, and inconsistent response shapes made downstream consumers fragile. We needed one standard.',
      },
      { type: 'h2', text: 'The Architecture' },
      {
        type: 'list',
        items: [
          'Reusable sub-workflows for shared logic instead of copy-paste.',
          'Standardized log codes for traceability across every run.',
          'Dynamic routing via Switch nodes driven by request metadata.',
          'End-to-end JSON validation on input and output.',
        ],
      },
      {
        type: 'p',
        text: 'Every response follows a predictable envelope so consumers can rely on a single contract:',
      },
      {
        type: 'code',
        lang: 'json',
        text: '{\n  "status": "success",\n  "description": "Record processed",\n  "data": { "id": 1024 },\n  "meta": { "trace": "WF-200-OK" }\n}',
      },
      { type: 'h2', text: 'Impact' },
      {
        type: 'p',
        text: 'TODO(Noriel): add the numbers — hours automated, error-rate reduction, countries deployed, teams onboarded.',
      },
      {
        type: 'quote',
        text: 'TODO(Noriel): the principle that made this architecture hold up in production.',
      },
    ],
  },
];

export function getPost(slug) {
  return POSTS.find(p => p.slug === slug);
}
