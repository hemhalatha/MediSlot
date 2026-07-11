import test from 'node:test'
import assert from 'node:assert/strict'
import {
  isNonEmptyString,
  isStrongEnoughPassword,
  isValidEmail,
  isValidObjectId,
  parseJsonObject
} from '../utils/validation.js'

test('validates non-empty strings', () => {
  assert.equal(isNonEmptyString('MediSlot'), true)
  assert.equal(isNonEmptyString('   '), false)
  assert.equal(isNonEmptyString(undefined), false)
})

test('validates email and password boundaries', () => {
  assert.equal(isValidEmail('patient@example.com'), true)
  assert.equal(isValidEmail('not-an-email'), false)
  assert.equal(isStrongEnoughPassword('12345678'), true)
  assert.equal(isStrongEnoughPassword('short'), false)
})

test('validates MongoDB object ids', () => {
  assert.equal(isValidObjectId('507f1f77bcf86cd799439011'), true)
  assert.equal(isValidObjectId('bad-id'), false)
})

test('parses JSON objects safely', () => {
  assert.deepEqual(parseJsonObject('{"line1":"Main","line2":"Clinic"}'), { line1: 'Main', line2: 'Clinic' })
  assert.equal(parseJsonObject('["not","object"]'), null)
  assert.equal(parseJsonObject('invalid'), null)
})
