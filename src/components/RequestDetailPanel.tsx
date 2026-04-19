import type { ReactNode } from "react"
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { formatSourceLabel, formatRelativeTime } from "../lib/format"
import type { Request, RequestStatus, Triage } from "../types/request"

type RequestDetailPanelProps = {
  request: Request | null
  onAnalyze: (requestId: string) => void
  onGenerateReply: (requestId: string) => void
  onTriageChange: <K extends keyof Triage>(
    requestId: string,
    field: K,
    value: Triage[K],
  ) => void
  onReplyChange: (requestId: string, value: string) => void
  isAnalyzing: boolean
  isGeneratingReply: boolean
  analysisError: string | null
  replyError: string | null
}

const statusChipPalette: Record<RequestStatus, { bg: string; color: string }> =
  {
    pending: { bg: "#ece4d8", color: "#6f5c39" },
    triaged: { bg: "#dceadf", color: "#2d6a43" },
    resolved: { bg: "#d8ebe6", color: "#146357" },
    escalated: { bg: "#f1ddd8", color: "#8c453b" },
    manual: { bg: "#ede4f4", color: "#6b4a87" },
  }

function SectionCard({
  title,
  action,
  children,
  dashed = false,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
  dashed?: boolean
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.25,
        borderRadius: 3,
        border: "1px solid",
        borderStyle: dashed ? "dashed" : "solid",
        borderColor: "#ece2d3",
        bgcolor: "rgba(255,255,255,0.72)",
      }}
    >
      <Stack spacing={1.75}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "1.05rem", fontWeight: 700 }}
          >
            {title}
          </Typography>
          {action}
        </Stack>
        {children}
      </Stack>
    </Paper>
  )
}

export function RequestDetailPanel({
  request,
  onAnalyze,
  onGenerateReply,
  onTriageChange,
  onReplyChange,
  isAnalyzing,
  isGeneratingReply,
  analysisError,
  replyError,
}: RequestDetailPanelProps) {
  if (!request) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: { md: "calc(100vh - 220px)" },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(255, 251, 246, 0.84)",
        }}
      >
        <Stack
          spacing={1.5}
          sx={{ minHeight: "100%", justifyContent: "center" }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "text.secondary",
              fontWeight: 700,
              letterSpacing: "0.16em",
            }}
          >
            Request Detail
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Select a request
          </Typography>
          <Typography sx={{ color: "text.secondary", maxWidth: 520 }}>
            Choose an item from the queue to load the AI triage, editable review
            surface, and reply composer scaffold.
          </Typography>
        </Stack>
      </Paper>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        height: { md: "calc(100vh - 220px)" },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(255, 251, 246, 0.84)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        spacing={2}
        sx={{ minHeight: 0, overflowY: { md: "auto" }, pr: { md: 0.5 } }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                letterSpacing: "0.16em",
              }}
            >
              Request Detail
            </Typography>
            <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 700 }}>
              {request.title}
            </Typography>
          </Box>
          <Chip
            label={request.status}
            size="small"
            sx={{
              textTransform: "capitalize",
              fontWeight: 700,
              bgcolor: statusChipPalette[request.status].bg,
              color: statusChipPalette[request.status].color,
            }}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1.5}
          useFlexGap
          sx={{ color: "text.secondary", flexWrap: "wrap" }}
        >
          <Typography variant="body2">{request.requester}</Typography>
          <Typography variant="body2">
            {formatSourceLabel(request.source)}
          </Typography>
          <Typography variant="body2">
            {formatRelativeTime(request.createdAt)}
          </Typography>
        </Stack>

        <SectionCard title="Incoming request">
          <Typography sx={{ color: "text.secondary" }}>
            {request.text}
          </Typography>
        </SectionCard>

        <SectionCard
          title="AI triage"
          dashed
          action={
            <Button
              variant="contained"
              disabled={Boolean(request.triage) || isAnalyzing}
              onClick={() => onAnalyze(request.id)}
              sx={{ minWidth: 112 }}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </Button>
          }
        >
          {analysisError ? (
            <Alert severity="error">{analysisError}</Alert>
          ) : null}
          <Typography sx={{ color: "text.secondary" }}>
            {isAnalyzing
              ? "Analyzing the selected request and preparing an initial triage recommendation."
              : request.triage
                ? "AI triage has been loaded for this request and can now be reviewed below."
                : "Run analysis to load the mock AI triage for the selected request."}
          </Typography>
        </SectionCard>

        <SectionCard
          title="Triage review"
          dashed
          action={
            <Chip
              label={request.triage ? "Editable review" : "Awaiting analysis"}
              size="small"
              sx={{ bgcolor: "#e9e0d1", color: "#5e543f", fontWeight: 700 }}
            />
          }
        >
          <Stack spacing={1.5}>
            <TextField
              label="Summary"
              placeholder="AI-generated summary will appear here"
              multiline
              minRows={3}
              value={request.triage?.summary ?? ""}
              onChange={(event) =>
                onTriageChange(request.id, "summary", event.target.value)
              }
              slotProps={{ input: { readOnly: !request.triage } }}
            />
            <Box
              sx={{
                display: "grid",
                gap: 1.5,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
              }}
            >
              <TextField
                label="Category"
                placeholder="Access / Hardware / HR"
                value={request.triage?.category ?? ""}
                onChange={(event) =>
                  onTriageChange(request.id, "category", event.target.value)
                }
                slotProps={{ input: { readOnly: !request.triage } }}
              />
              <TextField
                label="Priority"
                placeholder="Low / Medium / High"
                value={request.triage?.priority ?? ""}
                onChange={(event) =>
                  onTriageChange(
                    request.id,
                    "priority",
                    event.target.value as Triage["priority"],
                  )
                }
                slotProps={{ input: { readOnly: !request.triage } }}
              />
              <TextField
                label="Owner team"
                placeholder="IT Ops / HR / Finance"
                value={request.triage?.ownerTeam ?? ""}
                onChange={(event) =>
                  onTriageChange(request.id, "ownerTeam", event.target.value)
                }
                slotProps={{ input: { readOnly: !request.triage } }}
              />
              <TextField
                label="Confidence"
                placeholder="0.00 - 1.00"
                value={
                  request.triage ? request.triage.confidence.toFixed(2) : ""
                }
                onChange={(event) => {
                  const nextValue = Number(event.target.value)

                  if (Number.isNaN(nextValue)) {
                    return
                  }

                  onTriageChange(
                    request.id,
                    "confidence",
                    Math.min(1, Math.max(0, nextValue)),
                  )
                }}
                slotProps={{ input: { readOnly: !request.triage } }}
              />
            </Box>
            <TextField
              label="Next step"
              placeholder="Recommended action path"
              multiline
              minRows={3}
              value={request.triage?.nextStep ?? ""}
              onChange={(event) =>
                onTriageChange(request.id, "nextStep", event.target.value)
              }
              slotProps={{ input: { readOnly: !request.triage } }}
            />
          </Stack>
        </SectionCard>

        <SectionCard
          title="Reply draft"
          dashed
          action={
            <Button
              variant="outlined"
              disabled={!request.triage || isGeneratingReply}
              onClick={() => onGenerateReply(request.id)}
            >
              {isGeneratingReply ? "Generating..." : "Generate reply"}
            </Button>
          }
        >
          {replyError ? <Alert severity="error">{replyError}</Alert> : null}
          <TextField
            placeholder="Generated reply draft will be editable here"
            multiline
            minRows={4}
            value={request.replyDraft ?? ""}
            onChange={(event) => onReplyChange(request.id, event.target.value)}
          />
        </SectionCard>
      </Stack>
    </Paper>
  )
}
