import { cleanObject } from '@utils/common';

/* eslint-disable no-prototype-builtins */
export function GetValues(obj, key) {
  let objects = [];
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object') {
      objects = objects.concat(GetValues(cleanObject(obj[i]), key));
    } else if (i === key) {
      objects.push(obj[i]);
    }
  }
  return objects;
}
