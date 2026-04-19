import { formatSourceLabel, formatRelativeTime } from '../lib/format'
import type { Request } from '../types/request'

type RequestDetailPanelProps = {
  request: Request | null
}

export function RequestDetailPanel({ request }: RequestDetailPanelProps) {
  if (!request) {
    return (
      <section className="panel column">
        <div className="empty-state">
          <p className="eyebrow">Request Detail</p>
          <h2>Select a request</h2>
          <p>Choose an item from the queue to load the AI triage, editable review surface, and reply composer scaffold.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="panel column detail-column">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Request Detail</p>
          <h2>{request.title}</h2>
        </div>
        <span className={`badge badge-status badge-${request.status}`}>{request.status}</span>
      </header>

      <div className="detail-meta">
        <span>{request.requester}</span>
        <span>{formatSourceLabel(request.source)}</span>
        <span>{formatRelativeTime(request.createdAt)}</span>
      </div>

      <section className="content-block">
        <h3>Incoming request</h3>
        <p>{request.text}</p>
      </section>

      <section className="content-block scaffold-block">
        <div className="section-title-row">
          <h3>AI triage</h3>
          <button type="button" disabled>
            Analyze
          </button>
        </div>
        <p>This scaffold reserves space for the async analysis flow, loading/error states, and AI-generated summary.</p>
      </section>

      <section className="content-block scaffold-block">
        <div className="section-title-row">
          <h3>Triage review</h3>
          <span className="badge badge-neutral">Controlled form next</span>
        </div>
        <div className="form-scaffold">
          <label>
            Summary
            <textarea value="" placeholder="AI-generated summary will appear here" readOnly />
          </label>
          <div className="form-grid">
            <label>
              Category
              <input value="" placeholder="Access / Hardware / HR" readOnly />
            </label>
            <label>
              Priority
              <input value="" placeholder="Low / Medium / High" readOnly />
            </label>
            <label>
              Owner team
              <input value="" placeholder="IT Ops / HR / Finance" readOnly />
            </label>
            <label>
              Confidence
              <input value="" placeholder="0.00 - 1.00" readOnly />
            </label>
          </div>
          <label>
            Next step
            <textarea value="" placeholder="Recommended action path" readOnly />
          </label>
        </div>
      </section>

      <section className="content-block scaffold-block">
        <div className="section-title-row">
          <h3>Reply draft</h3>
          <button type="button" disabled>
            Generate reply
          </button>
        </div>
        <textarea value="" placeholder="Generated reply draft will be editable here" readOnly />
      </section>
    </section>
  )
}
