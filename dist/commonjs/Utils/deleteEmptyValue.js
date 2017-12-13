'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var deleteEmptyValue = function deleteEmptyValue(obj) {
  var cleaned = Object.keys(obj).reduce(function (accu, key) {
    var value = obj[key];

    if (value === '') {
      return accu;
    }

    if (value === undefined) {
      return accu;
    }

    if (value === null) {
      return accu;
    }

    // if value is NaN(Not-A-Number)
    if (value !== value) {
      // eslint-disable-line
      return accu;
    }

    accu[key] = value;
    return accu;
  }, {});

  return cleaned;
};

exports.default = deleteEmptyValue;