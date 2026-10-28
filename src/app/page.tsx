const steps = [
  { number: "01", title: "Define a journey", description: "Describe the task a person needs to complete, from the first page to the final checkpoint." },
  { number: "02", title: "Run it in a browser", description: "Replay the same actions consistently and record where the journey succeeds or gets blocked." },
  { number: "03", title: "Understand the findings", description: "Connect accessibility-engine results to the exact journey step, page, and element." },
];

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="WebAbility home"><span className="brand-mark" aria-hidden="true">W</span>WebAbility</a>
        <nav aria-label="Main navigation">
          <a href="#approach">Approach</a>
          <a href="#status">Project status</a>
          <a href="https://github.com/asifahmed78/web_ability">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <section className="hero" id="main-content" aria-labelledby="hero-title">
        <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> OPEN SOURCE · EARLY DEVELOPMENT</p>
        <h1 id="hero-title">Accessibility is more than a checklist.</h1>
        <p className="hero-copy">Test whether people can complete real website journeys — and discover the accessibility barriers that get in their way.</p>
        <div className="hero-actions">
          <a className="button primary" href="https://github.com/asifahmed78/web_ability">Explore the project <span aria-hidden="true">↗</span></a>
          <a className="button secondary" href="#approach">See the approach</a>
        </div>
        <aside className="status-note"><strong>Honest status:</strong> the landing page and project docs are in place. The browser runner and accessibility scanner are planned, not implemented yet.</aside>
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
      <section className="section example-section" aria-labelledby="example-title">
        <div>
          <p className="eyebrow">A FUTURE TEST JOURNEY</p>
          <h2 id="example-title">Can someone complete checkout with a keyboard?</h2>
          <p className="muted">WebAbility aims to show where a keyboard-only shopper encounters a barrier — with the step and evidence needed to reproduce it.</p>
        </div>
        <div className="journey-preview">
          <div className="preview-row"><span aria-hidden="true">✓</span><div><strong>Find a product</strong><small>Journey step 01</small></div><em>Planned</em></div>
          <div className="preview-row"><span aria-hidden="true">✓</span><div><strong>Add to cart</strong><small>Journey step 02</small></div><em>Planned</em></div>
          <div className="preview-row warning"><span aria-hidden="true">!</span><div><strong>Reach checkout</strong><small>Keyboard and focus checks</small></div><em>Example</em></div>
          <p className="preview-caption">Concept illustration — not a live scan or test result.</p>
        </div>
      </section>
      <section className="status-section" id="status" aria-labelledby="status-title">
        <div><p className="eyebrow">BUILDING IN THE OPEN</p><h2 id="status-title">A small foundation. A clear roadmap.</h2><p>The first milestone is a reproducible local journey, a real accessibility finding, and tests that prove the output.</p></div>
        <a className="button light" href="https://github.com/asifahmed78/web_ability/blob/main/docs/ROADMAP.md">Read the roadmap <span aria-hidden="true">↗</span></a>
      </section>
      <footer className="site-footer">
        <a className="wordmark" href="/"><span className="brand-mark" aria-hidden="true">W</span>WebAbility</a>
        <p>Make important journeys more accessible.</p>
        <a href="https://github.com/asifahmed78/web_ability">Open source on GitHub <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  );
}
