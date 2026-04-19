import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { formatRelativeTime, formatSourceLabel } from "../lib/format"
import type { Request, RequestStatus } from "../types/request"

type RequestsListProps = {
  requests: Request[]
  selectedId: string | null
  onSelect: (requestId: string) => void
}

const statusChipPalette: Record<RequestStatus, { bg: string; color: string }> = {
  pending: { bg: "#ece4d8", color: "#6f5c39" },
  triaged: { bg: "#dceadf", color: "#2d6a43" },
  resolved: { bg: "#d8ebe6", color: "#146357" },
  escalated: { bg: "#f1ddd8", color: "#8c453b" },
}

export function RequestsList({
  requests,
  selectedId,
  onSelect,
}: RequestsListProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(255, 251, 246, 0.84)",
        backdropFilter: "blur(12px)",
        position: { md: "sticky" },
        top: { md: 32 },
        height: { md: "calc(100vh - 220px)" },
        maxHeight: { md: "calc(100vh - 220px)" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={2} sx={{ minHeight: 0, flex: 1 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: "0.16em" }}>
              Queue
            </Typography>
            <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 700 }}>
              Requests
            </Typography>
          </Box>
          <Chip label={`${requests.length} open`} size="small" sx={{ bgcolor: "#e9e0d1", color: "#5e543f", fontWeight: 700 }} />
        </Stack>

        <Stack
          spacing={1.5}
          sx={{
            minHeight: 0,
            overflowY: { md: "auto" },
            pr: { md: 0.5 },
          }}
        >
          {requests.map((request) => {
            const isSelected = request.id === selectedId

            return (
              <Paper
                key={request.id}
                component="button"
                type="button"
                onClick={() => onSelect(request.id)}
                elevation={0}
                sx={{
                  width: "100%",
                  p: 2,
                  borderRadius: 3,
                  textAlign: "left",
                  border: "1px solid",
                  borderColor: isSelected ? "#305c49" : "#e5ddcf",
                  bgcolor: "#fffdfa",
                  boxShadow: isSelected
                    ? "0 14px 32px rgba(48, 92, 73, 0.16)"
                    : "none",
                  transition: "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    borderColor: isSelected ? "#305c49" : "#9d8b69",
                    boxShadow: "0 12px 28px rgba(88, 72, 50, 0.08)",
                  },
                }}
              >
                <Stack spacing={1.25}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ justifyContent: "space-between", flexWrap: "wrap" }}
                  >
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
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {formatRelativeTime(request.createdAt)}
                    </Typography>
                  </Stack>

                  <Typography sx={{ fontWeight: 700 }}>{request.title}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {request.requester}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ justifyContent: "space-between", flexWrap: "wrap" }}
                  >
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {formatSourceLabel(request.source)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {request.triage ? request.triage.priority : "Awaiting AI triage"}
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            )
          })}
        </Stack>
      </Stack>
    </Paper>
  )
}
