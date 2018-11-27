'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mongodb = _interopDefault(require('mongodb'));
var jest = _interopDefault(require('jest'));

var ObjectId = mongodb.ObjectId;
console.log('>>>>', jest.expect.extend);
jest.expect.extend({
  matchObjectId: function matchObjectId(value) {
    return {};
  }
});
//# sourceMappingURL=index-cjs.js.map
