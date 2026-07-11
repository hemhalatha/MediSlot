import jwt from 'jsonwebtoken'
import { getBearerToken } from '../utils/auth.js'
import { sendError } from '../utils/apiResponse.js'

const authUser = async (req, res, next) => {
  const token = getBearerToken(req, ['token'])

  if (!token) {
    return sendError(res, 'Authentication required', 401)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id }
    if (!req.body) req.body = {}
    req.body.userId = decoded.id
    next()
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401)
  }
}

export default authUser
