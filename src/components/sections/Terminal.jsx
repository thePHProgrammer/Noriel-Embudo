import { useState, useEffect, useRef } from 'react';

const COMMANDS = {
  help: () => [
    `<span class="term-gold">Available Commands:</span>`,
    `  <span class="term-cmd">whoami</span>        — About Noriel`,
    `  <span class="term-cmd">skills</span>        — Tech stack`,
    `  <span class="term-cmd">experience</span>    — Work history`,
    `  <span class="term-cmd">projects</span>      — Deployed missions`,
    `  <span class="term-cmd">certifications</span>— Credentials`,
    `  <span class="term-cmd">contact</span>       — Get in touch`,
    `  <span class="term-cmd">clear</span>         — Clear terminal`,
    `  <span class="term-cmd">banner</span>        — Show intro banner`,
  ],
  whoami: () => [
    `<span class="term-gold">┌── NORIEL JOY EMBUDO ──────────────────────┐</span>`,
    `  Role    : <span class="term-hi">Automation Software Engineer</span>`,
    `  Location: <span class="term-hi">Quezon City, Philippines</span>`,
    `  Focus   : <span class="term-orange">Agentic AI · RPA · Cloud · Enterprise Automation</span>`,
    `  Impact  : <span class="term-green">100,000+ hours of manual work eliminated annually</span>`,
    `<span class="term-gold">└───────────────────────────────────────────┘</span>`,
  ],
  skills: () => [
    `<span class="term-gold">── TECH STACK ──────────────────────────────</span>`,
    `  Automation : <span class="term-hi">n8n · UiPath · Power Automate · MuleSoft</span>`,
    `  Languages  : <span class="term-hi">Python · C# · Java · Bash · C++ · VB.NET</span>`,
    `  Cloud      : <span class="term-hi">AWS Lambda · SQS · SNS · DynamoDB · Docker</span>`,
    `  AI / ML    : <span class="term-hi">Agentic AI · Google ADK · TensorFlow · CNNs</span>`,
    `  Frameworks : <span class="term-hi">FastAPI · Spring Boot · React · AngularJS · SAP</span>`,
  ],
  experience: () => [
    `<span class="term-gold">── EXPERIENCE ─────────────────────────────</span>`,
    `  <span class="term-orange">Cambridge University Press &amp; Assessment</span>`,
    `  Automation Software Engineer · Jan 2026–Present`,
    `  → Agentic AI systems, n8n orchestration, SAP integration`,
    ``,
    `  <span class="term-orange">DFI Retail Group</span>`,
    `  Analyst Programmer, Process Automation · Aug 2024–Jan 2026`,
    `  → 70+ automations · 100K+ hours/yr saved · 5 countries`,
    ``,
    `  <span class="term-orange">FactSet Philippines Inc.</span>`,
    `  Software Engineer Intern · Apr–Jul 2024`,
    `  → AWS Lambda/SQS/SNS · FastAPI · AngularJS`,
  ],
  projects: () => [
    `<span class="term-gold">── DEPLOYED MISSIONS ──────────────────────</span>`,
    `  <span class="term-cyan">SirenaTech</span> — Water Quality Prediction`,
    `  Stack : CNN · Python · Kotlin · IoT`,
    `  Award : <span class="term-green">🏆 Best Innovative Thesis, CS Expo 2023–24</span>`,
    ``,
    `  <span class="term-cyan">Enterprise Workflow Orchestration Platform</span>`,
    `  Stack : n8n · AWS · MuleSoft · PostgreSQL`,
    `  Feat  : Centralized sub-workflow architecture, standardized JSON validation`,
  ],
  certifications: () => [
    `<span class="term-gold">── CERTIFICATIONS ─────────────────────────</span>`,
    `  <span class="term-green">✓</span> Certified Lean Six Sigma: White Belt`,
    `  <span class="term-green">✓</span> IT Specialist – Python`,
    `  <span class="term-green">✓</span> DevNet Associate`,
    `  <span class="term-green">✓</span> CCNA: Introduction to Networks`,
    `  <span class="term-green">✓</span> IT Specialist – Java`,
    `  <span class="term-green">✓</span> OCI Generative AI`,
    `  <span class="term-green">✓</span> OCI AI Foundations`,
  ],
  contact: () => [
    `<span class="term-gold">── CONTACT ────────────────────────────────</span>`,
    `  Answer   : <span class="term-cyan">The Contact Form Below is for Contacting me</span>`,
    `  Status  : <span class="term-green">Open to new missions</span>`,
    ``,
    `  <span class="term-dim">→ Scroll to Contact section to send a message</span>`,
  ],
  banner: () => [
    `<span class="term-gold"> ███╗   ██╗     ██╗    ███████╗</span>`,
    `<span class="term-gold"> ████╗  ██║     ██║    ██╔════╝</span>`,
    `<span class="term-gold"> ██╔██╗ ██║     ██║    █████╗  </span>`,
    `<span class="term-gold"> ██║╚██╗██║██   ██║    ██╔══╝  </span>`,
    `<span class="term-gold"> ██║ ╚████║╚█████╔╝    ███████╗</span>`,
    `<span class="term-gold"> ╚═╝  ╚═══╝ ╚════╝     ╚══════╝</span>`,
    `  Noriel Joy Embudo — <span class="term-orange">Automation Software Engineer</span>`,
    `  <span class="term-dim">Type 'help' to see all commands</span>`,
  ],
};

export function Terminal() {
  const [lines, setLines] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const boot = [
        ...COMMANDS.banner(),
        '',
        `  <span class="term-dim">Type a command to explore Noriel's portfolio.</span>`,
        '',
      ];
      setLines(boot.map(html => ({ html })));
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  function runCommand(cmd) {
    const echo = { html: `<span class="term-prompt">nje@portfolio:~$ </span><span class="term-cmd">${cmd}</span>` };
    if (cmd.trim() === 'clear') {
      setLines([]);
      return;
    }
    const fn = COMMANDS[cmd.trim().toLowerCase()];
    const output = fn
      ? fn().map(html => ({ html }))
      : [{ html: `<span style="color:#f87171">command not found: ${cmd}. Type 'help' for available commands.</span>` }];
    setLines(prev => [...prev, echo, ...output]);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && inputVal.trim()) {
      runCommand(inputVal.trim());
      setInputVal('');
    }
  }

  return (
    <section id="terminal" className="visible" style={{ opacity: 1, transform: 'none' }}>
      <div className="terminal-wrap">
        <div className="section-label" style={{ textAlign: 'center', marginBottom: '24px' }}>07 · Interactive Terminal</div>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>Explore via Command Line</h2>
        <div className="terminal-box" onClick={() => inputRef.current?.focus()}>
          <div className="terminal-header">
            <div className="term-dot" style={{ background: '#FF5F57' }} />
            <div className="term-dot" style={{ background: '#FFBD2E' }} />
            <div className="term-dot" style={{ background: '#28C840' }} />
            <div className="term-title">nje@portfolio ~ bash</div>
          </div>
          <div className="terminal-body" ref={bodyRef}>
            {lines.map((line, i) => (
              <div key={i} className="term-line" dangerouslySetInnerHTML={{ __html: line.html }} />
            ))}
          </div>
          <div className="terminal-input-row">
            <span className="term-input-prompt">nje@portfolio:~$</span>
            <input
              id="term-input"
              ref={inputRef}
              type="text"
              autoComplete="off"
              spellCheck="false"
              placeholder="type a command..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>
        </div>
        <div className="term-help">
          Commands: <span>whoami</span> · <span>skills</span> · <span>experience</span> · <span>projects</span> · <span>contact</span> · <span>certifications</span> · <span>help</span> · <span>clear</span>
        </div>
      </div>
    </section>
  );
}
