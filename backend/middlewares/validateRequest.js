import { isNonEmptyString, isStrongEnoughPassword, isValidEmail, isValidObjectId } from '../utils/validation.js'
import { sendError } from '../utils/apiResponse.js'

export const requireFields = (fields) => (req, res, next) => {
  const missing = fields.filter((field) => !isNonEmptyString(String(req.body?.[field] ?? '')))

  if (missing.length > 0) {
    return sendError(res, `Missing required fields: ${missing.join(', ')}`, 400)
  }

  next()
}

export const requireEmailPassword = (req, res, next) => {
  const { email, password } = req.body || {}

  if (!isValidEmail(email) || !isNonEmptyString(password)) {
    return sendError(res, 'Valid email and password are required', 400)
  }

  next()
}

export const requireStrongPassword = (req, res, next) => {
  if (!isStrongEnoughPassword(req.body?.password)) {
    return sendError(res, 'Password must be at least 8 characters', 400)
  }

  next()
}

export const requireObjectIds = (fields) => (req, res, next) => {
  const invalid = fields.filter((field) => !isValidObjectId(req.body?.[field]))

  if (invalid.length > 0) {
    return sendError(res, `Invalid id fields: ${invalid.join(', ')}`, 400)
  }

  next()
}
