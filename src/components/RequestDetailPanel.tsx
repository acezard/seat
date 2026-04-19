import type { ReactNode } from "react"
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { formatSourceLabel, formatRelativeTime } from "../lib/format"
import type { Request, RequestStatus } from "../types/request"

type RequestDetailPanelProps = {
  request: Request | null
}

const statusChipPalette: Record<RequestStatus, { bg: string; color: string }> = {
  pending: { bg: "#ece4d8", color: "#6f5c39" },
  triaged: { bg: "#dceadf", color: "#2d6a43" },
  resolved: { bg: "#d8ebe6", color: "#146357" },
  escalated: { bg: "#f1ddd8", color: "#8c453b" },
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
          <Typography variant="h6" sx={{ fontSize: "1.05rem", fontWeight: 700 }}>
            {title}
          </Typography>
          {action}
        </Stack>
        {children}
      </Stack>
    </Paper>
  )
}

export function RequestDetailPanel({ request }: RequestDetailPanelProps) {
  if (!request) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: { md: "72vh" },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(255, 251, 246, 0.84)",
        }}
      >
        <Stack spacing={1.5} sx={{ minHeight: "100%", justifyContent: "center" }}>
          <Typography variant="overline" sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: "0.16em" }}>
            Request Detail
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Select a request
          </Typography>
          <Typography sx={{ color: "text.secondary", maxWidth: 520 }}>
            Choose an item from the queue to load the AI triage, editable review surface, and reply
            composer scaffold.
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
        height: { md: "72vh" },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(255, 251, 246, 0.84)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={2} sx={{ minHeight: 0, overflowY: { md: "auto" }, pr: { md: 0.5 } }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: "0.16em" }}>
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
          <Typography variant="body2">{formatSourceLabel(request.source)}</Typography>
          <Typography variant="body2">{formatRelativeTime(request.createdAt)}</Typography>
        </Stack>

        <SectionCard title="Incoming request">
          <Typography sx={{ color: "text.secondary" }}>{request.text}</Typography>
        </SectionCard>

        <SectionCard
          title="AI triage"
          dashed
          action={
            <Button variant="contained" disabled sx={{ minWidth: 112 }}>
              Analyze
            </Button>
          }
        >
          <Typography sx={{ color: "text.secondary" }}>
            This scaffold reserves space for the async analysis flow, loading/error states, and
            AI-generated summary.
          </Typography>
        </SectionCard>

        <SectionCard
          title="Triage review"
          dashed
          action={<Chip label="Controlled form next" size="small" sx={{ bgcolor: "#e9e0d1", color: "#5e543f", fontWeight: 700 }} />}
        >
          <Stack spacing={1.5}>
            <TextField
              label="Summary"
              placeholder="AI-generated summary will appear here"
              multiline
              minRows={3}
              value=""
              slotProps={{ input: { readOnly: true } }}
            />
            <Box
              sx={{
                display: "grid",
                gap: 1.5,
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
              }}
            >
              <TextField label="Category" placeholder="Access / Hardware / HR" value="" slotProps={{ input: { readOnly: true } }} />
              <TextField label="Priority" placeholder="Low / Medium / High" value="" slotProps={{ input: { readOnly: true } }} />
              <TextField label="Owner team" placeholder="IT Ops / HR / Finance" value="" slotProps={{ input: { readOnly: true } }} />
              <TextField label="Confidence" placeholder="0.00 - 1.00" value="" slotProps={{ input: { readOnly: true } }} />
            </Box>
            <TextField
              label="Next step"
              placeholder="Recommended action path"
              multiline
              minRows={3}
              value=""
              slotProps={{ input: { readOnly: true } }}
            />
          </Stack>
        </SectionCard>

        <SectionCard
          title="Reply draft"
          dashed
          action={
            <Button variant="outlined" disabled>
              Generate reply
            </Button>
          }
        >
          <TextField
            placeholder="Generated reply draft will be editable here"
            multiline
            minRows={4}
            value=""
            slotProps={{ input: { readOnly: true } }}
          />
        </SectionCard>
      </Stack>
    </Paper>
  )
}
