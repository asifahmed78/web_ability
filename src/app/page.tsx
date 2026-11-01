import Link from "next/link";

const steps = [
  { number: "01", title: "Define a journey", description: "Describe the task a person needs to complete with a small, validated JSON file." },
  { number: "02", title: "Run it locally", description: "Replay browser actions in Chromium and inspect the page after each meaningful step." },
  { number: "03", title: "Fix what blocks people", description: "See axe-core findings, affected selectors, and manual-review checks in a step-aware report." },
];

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="WebAbility home"><span className="brand-mark" aria-hidden="true">W</span>WebAbility</Link>
        <nav aria-label="Main navigation">
          <a href="#approach">Approach</a>
          <a href="#quickstart">Quick start</a>
          <a href="https://github.com/asifahmed78/web_ability">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <section className="hero" id="main-content" aria-labelledby="hero-title">
        <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> OPEN SOURCE · EARLY DEVELOPMENT</p>
        <h1 id="hero-title">Test real journeys. Find accessibility barriers.</h1>
        <p className="hero-copy">WebAbility runs browser journeys and connects accessibility findings to the exact step where someone can get blocked.</p>
        <div className="hero-actions">
          <a className="button primary" href="https://github.com/asifahmed78/web_ability">Explore the project <span aria-hidden="true">↗</span></a>
          <a className="button secondary" href="#quickstart">Run the demo</a>
        </div>
        <aside className="status-note"><strong>Current status:</strong> the local CLI runner supports Playwright journeys, axe-core scans, JSON and HTML reports, keyboard focus assertions, and browser integration tests. Remote scanning is not supported.</aside>
      </section>
      <section className="section journey-section" id="approach" aria-labelledby="approach-title">
        <div className="section-heading">
          <p className="eyebrow">THE JOURNEY-FIRST APPROACH</p>
          <h2 id="approach-title">From isolated issues to real tasks.</h2>
          <p>Accessibility findings are easier to act on when they are tied to what someone is trying to do.</p>
        </div>
        <ol className="steps">
          {steps.map((step) => <li className="step-card" key={step.number}>
            <span className="step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>)}
        </ol>
      </section>
      <section className="section quickstart-section" id="quickstart" aria-labelledby="quickstart-title">
        <div className="section-heading">
          <p className="eyebrow">TRY THE FIRST RUNNER</p>
          <h2 id="quickstart-title">Run a real accessibility journey.</h2>
          <p>Start the included local checkout fixture, then run a journey that finds an intentional accessibility issue.</p>
        </div>
        <div className="quickstart">
          <span className="terminal-label">TERMINAL · INSTALL</span>
          <pre><code>npm install{"\n"}npx playwright install chromium</code></pre>
          <span className="terminal-label">TERMINAL 1 · START THE FIXTURE</span>
          <pre><code>npm run fixture</code></pre>
          <span className="terminal-label">TERMINAL 2 · RUN THE JOURNEY</span>
          <pre><code>npm run webability -- run examples/checkout.journey.json --out report.json</code></pre>
          <a href="https://github.com/asifahmed78/web_ability/blob/main/docs/CLI.md">Read the CLI guide <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="section example-section" aria-labelledby="example-title">
        <div>
          <p className="eyebrow">WHAT A FINDING MEANS</p>
          <h2 id="example-title">Know which step needs attention.</h2>
          <p className="muted">The demo checkout includes an icon-only submit button without an accessible name. WebAbility reports the axe-core rule against the journey step where it appears.</p>
        </div>
        <div className="journey-preview">
          <div className="preview-row"><span aria-hidden="true">✓</span><div><strong>Checkout page is ready</strong><small>Journey step 01</small></div><em>Scanned</em></div>
          <div className="preview-row"><span aria-hidden="true">✓</span><div><strong>Enter an email address</strong><small>Journey step 02</small></div><em>Scanned</em></div>
          <div className="preview-row warning"><span aria-hidden="true">!</span><div><strong>Continue to the next step</strong><small>Example: button-name</small></div><em>Finding</em></div>
          <p className="preview-caption">Illustrative expected result from the bundled local fixture, not a scan of a remote website.</p>
        </div>
      </section>
      <section className="status-section" id="status" aria-labelledby="status-title">
        <div><p className="eyebrow">BUILDING IN THE OPEN</p><h2 id="status-title">A working foundation. A bigger roadmap.</h2><p>The local runner is the first step. Next: richer CI annotations, cancellation and recovery, additional keyboard and screen-reader workflows, and carefully reviewed remote testing.</p></div>
        <a className="button light" href="https://github.com/asifahmed78/web_ability/blob/main/docs/ROADMAP.md">Read the roadmap <span aria-hidden="true">↗</span></a>
      </section>
      <footer className="site-footer">
        <Link className="wordmark" href="/"><span className="brand-mark" aria-hidden="true">W</span>WebAbility</Link>
        <p>Make important journeys more accessible.</p>
        <a href="https://github.com/asifahmed78/web_ability">Open source on GitHub <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  );
}
