import { useMemo, useState } from 'react'
import './App.css'
import { ContextActionsPanel } from './components/ContextActionsPanel'
import { RequestDetailPanel } from './components/RequestDetailPanel'
import { RequestsList } from './components/RequestsList'
import { mockRequests } from './data/mockRequests'

function App() {
  const [requests] = useState(mockRequests)
  const [selectedId, setSelectedId] = useState<string | null>(mockRequests[0]?.id ?? null)

  const selectedRequest = useMemo(
    () => requests.find((request) => request.id === selectedId) ?? null,
    [requests, selectedId],
  )

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">AI Request Review Panel</p>
          <h1>Support desk scaffold</h1>
        </div>
        <p className="app-summary">
          Structural implementation only: queue, detail, context, and placeholder AI workflow surfaces are ready for the next pass.
        </p>
      </header>

      <section className="workspace-grid">
        <RequestsList requests={requests} selectedId={selectedId} onSelect={setSelectedId} />
        <RequestDetailPanel request={selectedRequest} />
        <ContextActionsPanel request={selectedRequest} />
      </section>
    </main>
  )
}

export default App
