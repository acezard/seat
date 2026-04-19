# AI Request Review Panel — Spec

## 1. Goal

Build a small **React + TypeScript** single-page interface that simulates how an AI-powered service desk (like Siit) handles incoming support requests.

The interface must allow a user (internal operator) to:

* review incoming requests
* analyze them using a simulated AI
* inspect contextual data
* validate or edit AI suggestions
* trigger an action (workflow)
* generate and send a reply

This is a **frontend-only exercise** focused on:

* state modeling
* async UI flows
* controlled inputs
* product thinking (AI + human loop)
* clean React fundamentals

---

## 2. Constraints

### Required

* React
* TypeScript
* Local component state only
* Fake async functions using `setTimeout`

### Forbidden

* Backend
* Router
* External state libraries (Redux, Zustand, etc.)
* React Query / SWR
* Form libraries (React Hook Form, Formik)
* Real LLM APIs
* Real integrations (Slack, etc.)

---

## 3. High-Level Layout

Single screen with 3 columns:

```
| Requests List | Request Detail | Context + Actions |
```

### Column breakdown

#### Left (25%)

* List of requests

#### Center (45%)

* Request detail
* AI triage
* Reply draft

#### Right (30%)

* Context panel
* Workflow / actions
* Metrics

---

## 4. Data Model

### Types

```ts
type RequestStatus = "pending" | "triaged" | "resolved" | "escalated"

type Source = "slack" | "email" | "portal"

type Priority = "low" | "medium" | "high"

type Triage = {
  summary: string
  category: string
  priority: Priority
  ownerTeam: string
  nextStep: string
  confidence: number // 0-1
}

type Context = {
  department: string
  manager: string
  apps: string[]
  device: string
  history: string[]
}

type Request = {
  id: string
  title: string
  requester: string
  source: Source
  text: string
  status: RequestStatus
  createdAt: number

  context: Context

  triage?: Triage
  replyDraft?: string

  activityLog: string[]
}
```

---

## 5. Initial Data

Provide 5–8 mock requests with varied cases:

### Examples

* Access issue (Figma, Notion)
* Hardware issue (laptop slow)
* HR-related request
* Finance request (invoice, reimbursement)
* Ambiguous request (low confidence AI)

Each request must:

* have different `source`
* have realistic `context`
* have empty `triage` initially

---

## 6. Functional Requirements

## 6.1 Requests List

Display all requests in a vertical list.

Each item shows:

* title
* requester
* status
* priority (if triaged)

### Behavior

* Clicking selects the request
* Selected item is visually highlighted

---

## 6.2 Request Detail Panel

If a request is selected, display:

* title
* requester
* source
* status
* full request text

If none selected:

* show empty state

---

## 6.3 Analyze Action (AI Simulation)

Add an **"Analyze" button**.

### Behavior

On click:

* disable button
* show loading state
* call fake async function (1–2s delay)

### On success:

* populate `triage`
* update `status` → `triaged`
* append to `activityLog`

### On failure:

* show error message
* allow retry

---

## 6.4 Triage Section (Editable)

If `triage` exists, display a form with:

* summary (textarea)
* category (input/select)
* priority (select)
* owner team (input/select)
* next step (textarea)
* confidence (readonly or slider)

### Requirements

* All fields must be **controlled inputs**
* Editing updates the selected request in state
* No form library allowed

---

## 6.5 Context Panel

Display contextual data:

* department
* manager
* apps list
* device
* history (list of past actions)

### Goal

Simulate **data enrichment** from external systems.

---

## 6.6 Workflow / Actions

Based on triage, display suggested action:

Examples:

* "Grant access"
* "Reset password"
* "Escalate to HR"

### Buttons

* Confirm action → sets status to `resolved`
* Escalate → sets status to `escalated`
* Mark as manual → no automation

### Behavior

* Update status
* Append to `activityLog`

---

## 6.7 Reply Draft

Add **"Generate reply" button**

### Behavior

* fake async call
* generate `replyDraft`

### UI

* textarea (editable)
* "Send reply" button

### On send:

* append to activity log
* no real network call

---

## 6.8 Activity Log

Display a simple timeline:

Examples:

* "Request received"
* "AI triage completed"
* "Priority updated"
* "Workflow executed"
* "Reply sent"

---

## 6.9 Metrics (Lightweight)

Display simple computed values:

* Time to triage (createdAt → triaged)
* Resolution status
* AI confidence

No persistence required.

---

## 7. Async Simulation

Create helper functions:

```ts
analyzeRequest(request): Promise<Triage>
generateReply(request): Promise<string>
```

### Requirements

* Use `setTimeout`
* Random delay (500–1500ms)
* Optional random failure (10–20%)

---

## 8. State Management

Single top-level state:

```ts
const [requests, setRequests] = useState<Request[]>()
const [selectedId, setSelectedId] = useState<string | null>()
```

### Derived state

* selected request via `useMemo`
* no duplicated state

### Updates

* immutable updates only
* never mutate arrays directly

---

## 9. UI States (Important)

Must explicitly handle:

* loading (analysis, reply)
* error (API simulation)
* empty (no selection)
* success

---

## 10. UX Expectations

* Clear visual hierarchy
* Fast to scan
* Minimal but clean styling
* No over-engineering

Focus on:

* readability
* clarity of AI vs human decisions
* editability

---

## 11. Non-Functional Requirements

* Type-safe (strict TypeScript)
* No obvious React anti-patterns
* Clean component structure (not everything in one file)
* Avoid unnecessary re-renders
* Reasonable naming

---

## 12. Suggested Folder Structure

```
/src
  /components
  /features/requests
  /lib
  /data
  /types
```

Keep it simple.

---

## 13. Out of Scope

* Authentication
* Real APIs
* Persistence
* Real-time updates
* Notifications
* Mobile responsiveness

---

## 14. Evaluation Criteria

This project should demonstrate:

### Engineering

* clean state modeling
* async handling
* controlled forms
* separation of concerns

### Product thinking

* understanding of AI-assisted workflows
* human-in-the-loop design
* handling uncertainty (confidence, editability)

### UX clarity

* readable UI
* obvious flow
* minimal friction

---

## 15. Optional Enhancements (if time allows)

* Retry button on failure
* Confidence-based UI (warning if low)
* Filtering/sorting requests
* Highlight AI-generated fields
* Basic search

---

## 16. Deliverable

* Working local app
* Minimal README including:

  * architecture choices
  * trade-offs
  * what you would do next with more time
