import validator from 'validator'

export const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0

export const isValidEmail = (value) => isNonEmptyString(value) && validator.isEmail(value.trim())

export const isStrongEnoughPassword = (value) => isNonEmptyString(value) && value.length >= 8

export const isValidObjectId = (value) => isNonEmptyString(value) && validator.isMongoId(value)

export const parseJsonObject = (value, fallback = null) => {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return value
  }

  if (!isNonEmptyString(value)) {
    return fallback
  }

  try {
    const parsed = JSON.parse(value)
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed) ? parsed : fallback
  } catch (error) {
    return fallback
  }
}
