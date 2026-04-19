export type RequestStatus =
  | "pending"
  | "triaged"
  | "resolved"
  | "escalated"
  | "manual"

export type Source = "slack" | "email" | "portal"

export type Priority = "low" | "medium" | "high"

export type Triage = {
  summary: string
  category: string
  priority: Priority
  ownerTeam: string
  nextStep: string
  confidence: number
}

export type Context = {
  department: string
  manager: string
  apps: string[]
  device: string
  history: string[]
}

export type Request = {
  id: string
  title: string
  requester: string
  source: Source
  text: string
  status: RequestStatus
  createdAt: number
  context: Context
  triage?: Triage
  triagedAt?: number
  replyDraft?: string
  activityLog: string[]
}
