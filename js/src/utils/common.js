/* @flow */

/**
* Utility function to execute callback for eack key->value pair.
*/
export function forEach(obj: Object, callback: Function) {
  if (obj) {
    for (const key in obj) { // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
    }
  }
}

export function hasProperty(obj: Object, property: string) {
  let result = false;
  if (obj) {
    for (const key in obj) { // eslint-disable-line no-restricted-syntax
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
export function isEmptyString(str: string): boolean {
  if (str === undefined || str === null || str.length === 0 || str.trim().length === 0) {
    return true;
  }
  return false;
}

/**
* The function will return true for simple javascript object,
* which is not any other built in type like Array.
*/
export function isMap(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
* The function will return filter out props fron and return new props.
*/
export function filter(obj, keys) {
  const filteredKeys = Object.keys(obj).filter(key => keys.indexOf(key) < 0);
  const filteredObject = {};
  if (filteredKeys && filteredKeys.length > 0) {
    filteredKeys.forEach((key) => {
      filteredObject[key] = obj[key];
    });
  }
  return filteredObject;
}

export function stopPropagation(event) {
  event.stopPropagation();
};

export const generateArray = (x: number, insertItem = '') => {
  const array = []
  for (let j = 0; j < x; j++) {
    array.push(insertItem)
  }
  return array
}

export const generate2dArray = (x: number, y: number) => {
  const array2d = []
  for (let i = 0; i < y; i++) {
    array2d.push([])
    for (let j = 0; j < x; j++) {
      array2d[i].push('')
    }
  }
  return array2d
}
