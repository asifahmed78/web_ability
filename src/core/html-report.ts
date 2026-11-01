import type { JourneyReport } from "./run-journey";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] ?? character);
}

export function renderHtmlReport(report: JourneyReport): string {
  const rows = report.steps.map((step) => {
    const findings = [...step.violations.map((item) => ({ ...item, label: "Violation" })), ...step.manualReview.map((item) => ({ ...item, label: "Manual review" }))];
    const findingMarkup = findings.length
      ? `<ul>${findings.map((item) => `<li><strong>${escapeHtml(item.label)} · ${escapeHtml(item.id)}</strong> — ${escapeHtml(item.help)}<br><a href="${escapeHtml(item.helpUrl)}">Rule guidance</a><ul>${item.nodes.map((node) => `<li><code>${escapeHtml(node.target.join(", "))}</code>${node.summary ? `<p>${escapeHtml(node.summary)}</p>` : ""}</li>`).join("")}</ul></li>`).join("")}</ul>`
      : "<p>No automated findings at this step.</p>";
    return `<article class="step"><div class="step-head"><span class="status ${step.status}">${step.status}</span><h2>${escapeHtml(step.name)}</h2><span>${step.durationMs} ms</span></div><p class="muted">${escapeHtml(step.type)} · ${escapeHtml(step.url ?? "No page URL")}</p>${step.error ? `<p class="error">${escapeHtml(step.error)}</p>` : ""}${findingMarkup}</article>`;
  }).join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WebAbility report — ${escapeHtml(report.journey)}</title>
<style>
:root{color-scheme:light;font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#18231f;background:#f5f7f5}body{max-width:960px;margin:0 auto;padding:40px 20px}header,.step{background:#fff;border:1px solid #dce4de;border-radius:14px;padding:24px;margin-bottom:16px}h1{margin:8px 0}h2{font-size:1.1rem;margin:0}.muted{color:#65736a;font-size:.9rem;overflow-wrap:anywhere}.stats{display:flex;gap:24px;flex-wrap:wrap;margin-top:20px}.stats strong{display:block;font-size:1.5rem}.step-head{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.step-head h2{flex:1}.status{font-size:.8rem;text-transform:uppercase;font-weight:700}.passed{color:#187044}.failed{color:#b42318}.error{color:#b42318}li{margin:8px 0}code{overflow-wrap:anywhere}a{color:#176b4d}
</style></head><body><header><p class="muted">WEBABILITY · ACCESSIBILITY JOURNEY REPORT</p><h1>${escapeHtml(report.journey)}</h1><p class="muted">Target: ${escapeHtml(report.baseUrl)} · Started: ${escapeHtml(report.startedAt)} · Duration: ${report.durationMs} ms</p><div class="stats"><div><strong>${report.summary.passedSteps}/${report.summary.steps}</strong>Steps passed</div><div><strong>${report.summary.violations}</strong>Violations</div><div><strong>${report.summary.manualReview}</strong>Manual review</div><div><strong>${escapeHtml(report.status)}</strong>Run status</div></div></header><main>${rows}</main><footer class="muted">Automated results cover only a subset of accessibility requirements. Manual keyboard, screen-reader, and assistive-technology testing remains essential.</footer></body></html>`;
}
