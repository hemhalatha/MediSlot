import jwt from 'jsonwebtoken'
import { getBearerToken } from '../utils/auth.js'
import { sendError } from '../utils/apiResponse.js'

const authAdmin = async (req, res, next) => {
  const token = getBearerToken(req, ['atoken'])

  if (!token) {
    return sendError(res, 'Authentication required', 401)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== 'admin') {
      return sendError(res, 'Admin access required', 403)
    }

    req.user = { role: 'admin', email: decoded.email }
    next()
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401)
  }
}

export default authAdmin
