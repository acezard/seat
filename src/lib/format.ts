export function formatRelativeTime(timestamp: number): string {
  const diffMinutes = Math.max(
    1,
    Math.round((Date.now() - timestamp) / (60 * 1000)),
  )

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`
  }

  const diffHours = Math.round(diffMinutes / 60)

  if (diffHours < 24) {
    return `${diffHours}h ago`
  }

  const diffDays = Math.round(diffHours / 24)
  return `${diffDays}d ago`
}

export function formatSourceLabel(source: string): string {
  return source.charAt(0).toUpperCase() + source.slice(1)
}
