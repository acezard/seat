import { useMemo, useState } from "react"
import { Box, Container, Stack, Typography } from "@mui/material"
import { ContextActionsPanel } from "./components/ContextActionsPanel"
import { RequestDetailPanel } from "./components/RequestDetailPanel"
import { RequestsList } from "./components/RequestsList"
import { mockRequests } from "./data/mockRequests"

function App() {
  const [requests] = useState(mockRequests)
  const [selectedId, setSelectedId] = useState<string | null>(
    mockRequests[0]?.id ?? null,
  )

  const selectedRequest = useMemo(
    () => requests.find((request) => request.id === selectedId) ?? null,
    [requests, selectedId],
  )

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
                sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: "0.18em" }}
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
            <RequestDetailPanel request={selectedRequest} />
            <ContextActionsPanel request={selectedRequest} />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default App
