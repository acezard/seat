import type { ReactNode } from "react"
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material"
import type { Request } from "../types/request"
import { formatRelativeTime } from "../lib/format"

type ContextActionsPanelProps = {
  request: Request | null
  onConfirmAction: (requestId: string) => void
  onEscalate: (requestId: string) => void
  onMarkManual: (requestId: string) => void
}

function SideSection({
  eyebrow,
  title,
  children,
  dashed = false,
  action,
}: {
  eyebrow?: string
  title?: string
  children: ReactNode
  dashed?: boolean
  action?: ReactNode
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
      <Stack spacing={1.5}>
        {(eyebrow || title || action) && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <Box>
              {eyebrow ? (
                <Typography
                  variant="overline"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                  }}
                >
                  {eyebrow}
                </Typography>
              ) : null}
              {title ? (
                <Typography
                  variant="h6"
                  sx={{
                    mt: eyebrow ? 0.5 : 0,
                    fontSize: "1.05rem",
                    fontWeight: 700,
                  }}
                >
                  {title}
                </Typography>
              ) : null}
            </Box>
            {action}
          </Stack>
        )}
        {children}
      </Stack>
    </Paper>
  )
}

export function ContextActionsPanel({
  request,
  onConfirmAction,
  onEscalate,
  onMarkManual,
}: ContextActionsPanelProps) {
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
            Context + Actions
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Awaiting selection
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            The enrichment panel, workflow controls, metrics, and activity
            timeline will appear here once a request is selected.
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
        <SideSection eyebrow="Context" title={request.context.department}>
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
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Manager
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {request.context.manager}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Device
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {request.context.device}
              </Typography>
            </Box>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            {request.context.apps.map((app) => (
              <Chip
                key={app}
                label={app}
                size="small"
                sx={{ bgcolor: "#efe6d8", color: "#5c4d32", fontWeight: 700 }}
              />
            ))}
          </Stack>
        </SideSection>

        <SideSection
          title="Workflow actions"
          dashed
          action={
            <Chip
              label={request.triage ? "Ready" : "Awaiting triage"}
              size="small"
              sx={{ bgcolor: "#e9e0d1", color: "#5e543f", fontWeight: 700 }}
            />
          }
        >
          <Typography sx={{ color: "text.secondary" }}>
            Workflow actions use the reviewed triage and reply draft for the
            selected request.
          </Typography>
          <Stack spacing={1.25}>
            <Button
              variant="contained"
              disabled={!request.triage || !request.replyDraft}
              onClick={() => onConfirmAction(request.id)}
            >
              Confirm action
            </Button>
            <Button
              variant="outlined"
              disabled={!request.triage}
              onClick={() => onEscalate(request.id)}
            >
              Escalate
            </Button>
            <Button
              variant="text"
              disabled={!request.triage}
              onClick={() => onMarkManual(request.id)}
            >
              Mark as manual
            </Button>
          </Stack>
        </SideSection>

        <SideSection eyebrow="Metrics" title="Resolution snapshot" dashed>
          <Stack spacing={1.25}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "space-between",
                pb: 1.25,
                borderBottom: "1px solid #eee3d6",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Time to triage
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {request.triagedAt
                  ? formatRelativeTime(request.triagedAt)
                  : "Pending"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "space-between",
                pb: 1.25,
                borderBottom: "1px solid #eee3d6",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Resolution status
              </Typography>
              <Typography sx={{ fontWeight: 700, textTransform: "capitalize" }}>
                {request.status}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                AI confidence
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {request.triage
                  ? request.triage.confidence.toFixed(2)
                  : "Not analyzed"}
              </Typography>
            </Stack>
          </Stack>
        </SideSection>

        <SideSection eyebrow="Activity Log">
          <Stack
            component="ul"
            spacing={1.25}
            sx={{ listStyle: "none", p: 0, m: 0 }}
          >
            {request.activityLog.map((entry) => (
              <Stack
                key={entry}
                component="li"
                direction="row"
                spacing={1.25}
                sx={{ alignItems: "center" }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    flexShrink: 0,
                  }}
                />
                <Typography>{entry}</Typography>
              </Stack>
            ))}
          </Stack>
        </SideSection>
      </Stack>
    </Paper>
  )
}
