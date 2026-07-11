export const getBearerToken = (req, legacyHeaderNames = []) => {
  const authHeader = req.headers.authorization

  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim()
  }

  if (authHeader) {
    return authHeader.trim()
  }

  for (const headerName of legacyHeaderNames) {
    const value = req.headers[headerName.toLowerCase()]
    if (value) return String(value).trim()
  }

  return null
}
