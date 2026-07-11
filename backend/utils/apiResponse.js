export const sendSuccess = (res, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({ success: true, ...data })
}

export const sendError = (res, message = 'Request failed', statusCode = 400, details = undefined) => {
  const payload = { success: false, message }

  if (details && process.env.NODE_ENV !== 'production') {
    payload.details = details
  }

  return res.status(statusCode).json(payload)
}

export const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next)
  } catch (error) {
    next(error)
  }
}
