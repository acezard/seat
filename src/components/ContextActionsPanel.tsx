import type { Request } from "../types/request"

type ContextActionsPanelProps = {
  request: Request | null
}

export function ContextActionsPanel({ request }: ContextActionsPanelProps) {
  if (!request) {
    return (
      <section className="panel column">
        <div className="empty-state">
          <p className="eyebrow">Context + Actions</p>
          <h2>Awaiting selection</h2>
          <p>
            The enrichment panel, workflow controls, metrics, and activity
            timeline will appear here once a request is selected.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="panel column side-column">
      <div className="content-block">
        <p className="eyebrow">Context</p>
        <h3>{request.context.department}</h3>
        <dl className="context-grid">
          <div>
            <dt>Manager</dt>
            <dd>{request.context.manager}</dd>
          </div>
          <div>
            <dt>Device</dt>
            <dd>{request.context.device}</dd>
          </div>
        </dl>

        <div className="token-list">
          {request.context.apps.map((app) => (
            <span key={app} className="token">
              {app}
            </span>
          ))}
        </div>
      </div>

      <div className="content-block scaffold-block">
        <div className="section-title-row">
          <h3>Workflow actions</h3>
          <span className="badge badge-neutral">Scaffold</span>
        </div>
        <p>
          Suggested action logic will key off the triage output in the next
          pass.
        </p>
        <div className="button-stack">
          <button type="button" disabled>
            Confirm action
          </button>
          <button type="button" disabled>
            Escalate
          </button>
          <button type="button" disabled>
            Mark as manual
          </button>
        </div>
      </div>

      <div className="content-block scaffold-block">
        <p className="eyebrow">Metrics</p>
        <h3>Resolution snapshot</h3>
        <ul className="metric-list">
          <li>
            <span>Time to triage</span>
            <strong>Pending</strong>
          </li>
          <li>
            <span>Resolution status</span>
            <strong>{request.status}</strong>
          </li>
          <li>
            <span>AI confidence</span>
            <strong>
              {request.triage ? request.triage.confidence : "Not analyzed"}
            </strong>
          </li>
        </ul>
      </div>

      <div className="content-block">
        <p className="eyebrow">Activity Log</p>
        <ul className="activity-list">
          {request.activityLog.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
