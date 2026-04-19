import { useMemo, useState } from "react"
import { Box, Container, Stack, Typography } from "@mui/material"
import { ContextActionsPanel } from "./components/ContextActionsPanel"
import { RequestDetailPanel } from "./components/RequestDetailPanel"
import { RequestsList } from "./components/RequestsList"
import { mockAnswers } from "./data/mockAnswers"
import { mockReplies } from "./data/mockReplies"
import { mockRequests } from "./data/mockRequests"
import type { Request, Triage } from "./types/request"

function App() {
  const [requests, setRequests] = useState(mockRequests)
  const [selectedId, setSelectedId] = useState<string | null>(
    mockRequests[0]?.id ?? null,
  )
  const [analyzingRequestId, setAnalyzingRequestId] = useState<string | null>(
    null,
  )
  const [generatingReplyRequestId, setGeneratingReplyRequestId] = useState<
    string | null
  >(null)
  const [analysisErrorById, setAnalysisErrorById] = useState<
    Record<string, string>
  >({})
  const [replyErrorById, setReplyErrorById] = useState<Record<string, string>>(
    {},
  )

  const selectedRequest = useMemo(
    () => requests.find((request) => request.id === selectedId) ?? null,
    [requests, selectedId],
  )

  function handleAnalyze(requestId: string) {
    const answer = mockAnswers[requestId]

    if (!answer || analyzingRequestId) {
      return
    }

    setAnalysisErrorById((current) => ({ ...current, [requestId]: "" }))
    setAnalyzingRequestId(requestId)

    window.setTimeout(() => {
      setRequests((currentRequests) =>
        currentRequests.map((request) => {
          if (request.id !== requestId || request.triage) {
            return request
          }

          return {
            ...request,
            status: "triaged",
            triage: answer,
            triagedAt: Date.now(),
            activityLog: [...request.activityLog, "AI triage completed"],
          }
        }),
      )
      setAnalyzingRequestId((current) =>
        current === requestId ? null : current,
      )
    }, 700)
  }

  function handleGenerateReply(requestId: string) {
    const reply = mockReplies[requestId]

    if (!reply || generatingReplyRequestId) {
      return
    }

    setReplyErrorById((current) => ({ ...current, [requestId]: "" }))
    setGeneratingReplyRequestId(requestId)

    window.setTimeout(() => {
      setRequests((currentRequests) =>
        currentRequests.map((request) => {
          if (
            request.id !== requestId ||
            request.replyDraft ||
            !request.triage
          ) {
            return request
          }

          return {
            ...request,
            replyDraft: reply,
            activityLog: [...request.activityLog, "Reply draft generated"],
          }
        }),
      )
      setGeneratingReplyRequestId((current) =>
        current === requestId ? null : current,
      )
    }, 600)
  }

  function handleTriageChange<K extends keyof Triage>(
    requestId: string,
    field: K,
    value: Triage[K],
  ) {
    setRequests((currentRequests) =>
      currentRequests.map((request) => {
        if (request.id !== requestId || !request.triage) {
          return request
        }

        return {
          ...request,
          triage: {
            ...request.triage,
            [field]: value,
          },
        }
      }),
    )
  }

  function handleReplyChange(requestId: string, value: string) {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              replyDraft: value,
            }
          : request,
      ),
    )
  }

  function updateRequest(
    requestId: string,
    updater: (request: Request) => Request,
  ) {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId ? updater(request) : request,
      ),
    )
  }

  function handleConfirmAction(requestId: string) {
    updateRequest(requestId, (request) => ({
      ...request,
      status: "resolved",
      activityLog: [
        ...request.activityLog,
        "Action confirmed and request resolved",
      ],
    }))
  }

  function handleEscalate(requestId: string) {
    updateRequest(requestId, (request) => ({
      ...request,
      status: "escalated",
      activityLog: [
        ...request.activityLog,
        `Escalated to ${request.triage?.ownerTeam ?? "specialist support"}`,
      ],
    }))
  }

  function handleMarkManual(requestId: string) {
    updateRequest(requestId, (request) => ({
      ...request,
      status: "manual",
      activityLog: [...request.activityLog, "Marked for manual review"],
    }))
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, md: 4 },
        background:
          "radial-gradient(circle at top left, rgba(33, 87, 67, 0.18), transparent 28%), radial-gradient(circle at top right, rgba(181, 110, 47, 0.2), transparent 22%), linear-gradient(180deg, #f4efe6 0%, #efe7db 100%)",
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
        <Stack spacing={3}>
          <Stack
            spacing={2}
            sx={{
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: "text.secondary",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                }}
              >
                AI Request Review Panel
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  mt: 0.5,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  fontSize: { xs: "2.4rem", md: "3.75rem" },
                }}
              >
                💺Seat Support Desk
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gap: 2.5,
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(220px, 0.9fr) minmax(320px, 1.6fr) minmax(260px, 1.1fr)",
              },
              alignItems: "start",
            }}
          >
            <RequestsList
              requests={requests}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            <RequestDetailPanel
              request={selectedRequest}
              onAnalyze={handleAnalyze}
              onGenerateReply={handleGenerateReply}
              onTriageChange={handleTriageChange}
              onReplyChange={handleReplyChange}
              isAnalyzing={selectedRequest?.id === analyzingRequestId}
              isGeneratingReply={
                selectedRequest?.id === generatingReplyRequestId
              }
              analysisError={
                selectedRequest
                  ? (analysisErrorById[selectedRequest.id] ?? null)
                  : null
              }
              replyError={
                selectedRequest
                  ? (replyErrorById[selectedRequest.id] ?? null)
                  : null
              }
            />
            <ContextActionsPanel
              request={selectedRequest}
              onConfirmAction={handleConfirmAction}
              onEscalate={handleEscalate}
              onMarkManual={handleMarkManual}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default App
