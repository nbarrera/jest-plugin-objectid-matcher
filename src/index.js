import mongodb from 'mongodb'
import diff from 'jest-diff'

const { ObjectId } = mongodb

const COERCION_ERROR = 'coercion error'

function match(received, expected) {
  const _pass = this.equals(ObjectId(received), expected)
  const pass = this.isNot ? !_pass : _pass
  const message = pass
    ? () => `${this.utils.matcherHint('.not.toMatchObjectId')}\n\n
      Expected value to not equal (ObjectId):\n
          ${this.utils.printExpected(expected)}\n
      Received:\n
          ${this.utils.printReceived(received)}`
    : () => {
      const diffString = diff(expected, received, {
        expand: this.expand,
      })
      return `${this.utils.matcherHint('.toMatchObjectId')}\n\n
      Expected value to equal (ObjectId):\n
          ${this.utils.printExpected(expected)}\n
      Received:\n
          ${this.utils.printReceived(received)}
      ${(diffString ? `\n\nDifference:\n\n${diffString}` : '')}`
    }
  return { pass, message }
}

const coerceToObjectId = (value, name) => {
  if (value === undefined || value === null) return value
  try {
    return ObjectId(value)
  } catch (e) {
    const coercionError = new Error(COERCION_ERROR)
    coercionError.coerName = name
    throw coercionError
  }
}

const coerceReceived = value => coerceToObjectId(value, 'received')
const coerceExpected = value => coerceToObjectId(value, 'expected')

expect.extend({
  toMatchObjectId(received, expected) {
    try {
      const receivedObjectId = coerceReceived(received)
      const expectedObjectId = coerceExpected(expected)
      return match.bind(this)(receivedObjectId, expectedObjectId)
    } catch (e) {
      if (e.message === COERCION_ERROR) {
        return {
          pass: false,
          message: () => `${this.utils.matcherHint('.toMatchObjectId')}\n\n
          Expected "${e.coerName}" to be coercible to:\n
              ObjectId\n
          Received:\n
              ${this.utils.printReceived(e.coerName === 'received' ? received : expected)} (typeof: ${typeof expected})`
        }
      }
      throw e
    }
  }
})