import type { Request } from "../types/request"

const now = Date.now()
const minutes = 60 * 1000

export const mockRequests: Request[] = [
  {
    id: "req-001",
    title: "Figma workspace access missing after team transfer",
    requester: "Maya Chen",
    source: "slack",
    text: "I moved from Growth to Brand yesterday and I no longer see the Brand Figma workspace. I need access before the campaign review this afternoon.",
    status: "pending",
    createdAt: now - 35 * minutes,
    context: {
      department: "Brand",
      manager: "Elena Rossi",
      apps: ["Slack", "Figma", "Google Drive"],
      device: 'MacBook Pro 14"',
      history: [
        "Transferred from Growth on April 18",
        "Last access review completed 2 weeks ago",
      ],
    },
    activityLog: ["Request received via Slack"],
  },
  {
    id: "req-002",
    title: "Laptop is extremely slow after the latest security update",
    requester: "Jonas Patel",
    source: "portal",
    text: "My laptop takes 15 minutes to boot and video calls freeze every few minutes. This started right after the security update that ran overnight.",
    status: "pending",
    createdAt: now - 92 * minutes,
    context: {
      department: "Engineering",
      manager: "Priya Singh",
      apps: ["Zoom", "Linear", "VS Code"],
      device: "Dell Latitude 7440",
      history: [
        "Endpoint patch installed at 02:13",
        "Battery replaced last quarter",
      ],
    },
    activityLog: ["Request submitted in employee portal"],
  },
  {
    id: "req-003",
    title: "Need confirmation on parental leave policy for Germany",
    requester: "Sofia Keller",
    source: "email",
    text: "Hi team, I am planning leave later this year and need to understand what the Germany policy covers for my situation before I talk with payroll.",
    status: "pending",
    createdAt: now - 4 * 60 * minutes,
    context: {
      department: "People Operations",
      manager: "Martin Weber",
      apps: ["Workday", "Gmail", "Notion"],
      device: "MacBook Air",
      history: [
        "HR handbook viewed last month",
        "Payroll profile updated this quarter",
      ],
    },
    activityLog: ["Email ingested into support queue"],
  },
  {
    id: "req-004",
    title: "Invoice reimbursement stuck in approval",
    requester: "Noah Dubois",
    source: "portal",
    text: "I submitted a client dinner reimbursement 10 days ago and it still shows pending. Finance asked me to contact support because the approval step seems blocked.",
    status: "pending",
    createdAt: now - 7 * 60 * minutes,
    context: {
      department: "Sales",
      manager: "Camille Bernard",
      apps: ["Navan", "NetSuite", "Slack"],
      device: "ThinkPad X1 Carbon",
      history: [
        "Expense submitted on April 9",
        "Manager approval completed on April 10",
      ],
    },
    activityLog: ["Request submitted in employee portal"],
  },
  {
    id: "req-005",
    title: "Notion access request for new contractor",
    requester: "Avery Brooks",
    source: "slack",
    text: "Can someone help get our new contractor into the product wiki? They start today and currently cannot open the Notion workspace links.",
    status: "pending",
    createdAt: now - 18 * minutes,
    context: {
      department: "Product",
      manager: "Nina Alvarez",
      apps: ["Notion", "Slack", "Jira"],
      device: 'MacBook Pro 16"',
      history: [
        "Contractor onboarding started this morning",
        "No app bundle assigned yet",
      ],
    },
    activityLog: ["Request received via Slack"],
  },
  {
    id: "req-006",
    title: "Need help with a weird access and policy issue",
    requester: "Luca Moretti",
    source: "email",
    text: "I am not sure if this is an IT thing or a people thing, but I lost access to a shared folder after a manager change and there may also be a policy issue tied to who should approve it.",
    status: "pending",
    createdAt: now - 53 * minutes,
    context: {
      department: "Operations",
      manager: "Sabine Laurent",
      apps: ["Google Drive", "Workday", "Slack"],
      device: "HP EliteBook 840",
      history: [
        "Manager changed this week",
        "Shared folder ownership recently updated",
      ],
    },
    activityLog: ["Email ingested into support queue"],
  },
]
