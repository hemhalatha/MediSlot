import jwt from 'jsonwebtoken'
import { getBearerToken } from '../utils/auth.js'
import { sendError } from '../utils/apiResponse.js'

const authDoctor = async (req, res, next) => {
  const token = getBearerToken(req, ['dtoken'])

  if (!token) {
    return sendError(res, 'Authentication required', 401)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id }
    next()
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401)
  }
}

export default authDoctor
