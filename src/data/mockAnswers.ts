import type { Triage } from "../types/request"

export const mockAnswers: Record<string, Triage> = {
  "req-001": {
    summary:
      "Employee lost access to the Brand Figma workspace after an internal team transfer and needs restoration before an afternoon review.",
    category: "Access Management",
    priority: "high",
    ownerTeam: "IT Ops",
    nextStep:
      "Verify the completed team transfer in the identity system, add Maya to the Brand Figma group, and confirm workspace visibility before the campaign review.",
    confidence: 0.95,
  },
  "req-002": {
    summary:
      "Performance degradation began immediately after an overnight endpoint security patch, affecting boot time and video call stability.",
    category: "Hardware / Endpoint",
    priority: "high",
    ownerTeam: "Endpoint Engineering",
    nextStep:
      "Review the latest security update logs on the device, check for resource spikes from the new agent, and prepare rollback or remediation guidance if the patch is the cause.",
    confidence: 0.93,
  },
  "req-003": {
    summary:
      "Employee is requesting clarification on Germany-specific parental leave coverage before discussing next steps with payroll.",
    category: "HR Policy",
    priority: "medium",
    ownerTeam: "People Operations",
    nextStep:
      "Route to regional HR policy support to confirm Germany leave eligibility, benefit coverage, and any payroll coordination requirements.",
    confidence: 0.97,
  },
  "req-004": {
    summary:
      "Expense reimbursement appears stuck after manager approval, indicating a likely workflow or finance system handoff issue.",
    category: "Finance Operations",
    priority: "medium",
    ownerTeam: "Finance Systems",
    nextStep:
      "Inspect the reimbursement workflow state in Navan and NetSuite, identify the blocked approval transition, and requeue the pending finance step if needed.",
    confidence: 0.91,
  },
  "req-005": {
    summary:
      "A new contractor started today without the required Notion workspace access needed for onboarding and product documentation.",
    category: "Access Management",
    priority: "high",
    ownerTeam: "IT Ops",
    nextStep:
      "Confirm contractor identity and sponsorship, assign the correct onboarding app bundle, and grant the Product wiki permission set in Notion.",
    confidence: 0.96,
  },
  "req-006": {
    summary:
      "Manager change likely affected shared folder permissions, but approval ownership is unclear because the request spans both access control and policy rules.",
    category: "Access / Policy",
    priority: "medium",
    ownerTeam: "IT Ops + People Ops",
    nextStep:
      "Validate the new reporting line, review recent shared folder permission changes, and determine the correct approver under the current access policy before restoring access.",
    confidence: 0.82,
  },
  "req-007": {
    summary:
      "Design employee needs Adobe Creative Suite installed on a managed laptop for an upcoming project and may require license assignment plus device approval.",
    category: "Software Request",
    priority: "medium",
    ownerTeam: "IT Support",
    nextStep:
      "Verify license availability and manager approval, then deploy Adobe Creative Cloud through the managed software workflow or provide self-service install steps.",
    confidence: 0.94,
  },
  "req-008": {
    summary:
      "Remote employee is experiencing repeated VPN disconnects from a home network, blocking access to internal resources.",
    category: "Network / VPN",
    priority: "high",
    ownerTeam: "Network Operations",
    nextStep:
      "Collect VPN client logs, confirm whether the issue is tied to the home network or client configuration, and guide the user through certificate, DNS, and reconnect checks.",
    confidence: 0.92,
  },
}
