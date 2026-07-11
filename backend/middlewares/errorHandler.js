export const notFoundHandler = (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
}

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const message = statusCode >= 500 ? 'Internal server error' : error.message

  if (process.env.NODE_ENV !== 'test') {
    console.error(error)
  }

  res.status(statusCode).json({ success: false, message })
}
