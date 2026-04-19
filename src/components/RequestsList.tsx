import { formatRelativeTime } from "../lib/format"
import type { Request } from "../types/request"

type RequestsListProps = {
  requests: Request[]
  selectedId: string | null
  onSelect: (requestId: string) => void
}

export function RequestsList({
  requests,
  selectedId,
  onSelect,
}: RequestsListProps) {
  return (
    <section className="panel column">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Queue</p>
          <h2>Requests</h2>
        </div>
        <span className="badge badge-neutral">{requests.length} open</span>
      </div>

      <div className="request-list">
        {requests.map((request) => {
          const isSelected = request.id === selectedId

          return (
            <button
              key={request.id}
              type="button"
              className={`request-card${isSelected ? " request-card-selected" : ""}`}
              onClick={() => onSelect(request.id)}
            >
              <div className="request-card-topline">
                <span className={`badge badge-status badge-${request.status}`}>
                  {request.status}
                </span>
                <span className="timestamp">
                  {formatRelativeTime(request.createdAt)}
                </span>
              </div>
              <strong>{request.title}</strong>
              <p>{request.requester}</p>
              <div className="request-card-footer">
                <span>{request.source}</span>
                <span>
                  {request.triage
                    ? request.triage.priority
                    : "Awaiting AI triage"}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
