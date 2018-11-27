import mongodb from 'mongodb'

import setupMatcher from './index'

const { ObjectId } = mongodb

setupMatcher()

describe('toMatchObjectId', () => {
  const id1 = '5af3365a1883d5c5661fd84c'
  const id2 = '5af3365a1883d5c5661fd84d'
  const nonCoercible = '1234'

  it('should not match two different ObjectIds', () => {
    try {
      expect(ObjectId(id1)).toMatchObjectId(ObjectId(id2))
      expect(true).toBeFalsy()
      // eslint-disable-next-line no-empty
    } catch (e) {}
  })
  it('should match two equal ObjectIds', () => {
    expect(ObjectId(id1)).toMatchObjectId(ObjectId(id1))
  })
  it('should coerce the expected to objectid', () => {
    expect(ObjectId(id1)).toMatchObjectId(id1)
  })
  it('should coerce both expected and received', () => {
    expect(id1).toMatchObjectId(id1)
  })
  it('should fail when impossible to coerce expected', () => {
    try {
      expect(id1).toMatchObjectId(nonCoercible)
    // eslint-disable-next-line no-empty  
    } catch (e) {}
  })
  it('should fail when impossible to coerce received', () => {
    try {
      expect(nonCoercible).toMatchObjectId(id2)
      // eslint-disable-next-line no-empty
    } catch (e) {}
  })
})