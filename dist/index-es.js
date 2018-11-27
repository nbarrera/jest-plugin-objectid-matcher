import mongodb from 'mongodb';
import jest from 'jest';

var ObjectId = mongodb.ObjectId;
console.log('>>>>', jest.expect.extend);
jest.expect.extend({
  matchObjectId: function matchObjectId(value) {
    return {};
  }
});
//# sourceMappingURL=index-es.js.map
