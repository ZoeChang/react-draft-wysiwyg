'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;
exports.hasProperty = hasProperty;
exports.isEmptyString = isEmptyString;
exports.isMap = isMap;
exports.filter = filter;
exports.stopPropagation = stopPropagation;


/**
* Utility function to execute callback for eack key->value pair.
*/
function forEach(obj, callback) {
  if (obj) {
    for (var key in obj) {
      // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
    }
  }
}

function hasProperty(obj, property) {
  var result = false;
  if (obj) {
    for (var key in obj) {
      // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(obj, key) && property === key) {
        result = true;
        break;
      }
    }
  }
  return result;
}

/**
* The function returns true if the string passed to it has no content.
*/
function isEmptyString(str) {
  if (str === undefined || str === null || str.length === 0 || str.trim().length === 0) {
    return true;
  }
  return false;
}

/**
* The function will return true for simple javascript object,
* which is not any other built in type like Array.
*/
function isMap(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
* The function will return filter out props fron and return new props.
*/
function filter(obj, keys) {
  var filteredKeys = Object.keys(obj).filter(function (key) {
    return keys.indexOf(key) < 0;
  });
  var filteredObject = {};
  if (filteredKeys && filteredKeys.length > 0) {
    filteredKeys.forEach(function (key) {
      filteredObject[key] = obj[key];
    });
  }
  return filteredObject;
}

function stopPropagation(event) {
  event.stopPropagation();
};

var generateArray = exports.generateArray = function generateArray(x) {
  var insertItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var array = [];
  for (var j = 0; j < x; j++) {
    array.push(insertItem);
  }
  return array;
};

var generate2dArray = exports.generate2dArray = function generate2dArray(x, y) {
  var array2d = [];
  for (var i = 0; i < y; i++) {
    array2d.push([]);
    for (var j = 0; j < x; j++) {
      array2d[i].push('');
    }
  }
  return array2d;
};