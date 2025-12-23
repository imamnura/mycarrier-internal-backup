import { create_uuid } from '@utils/common';

export const create_UUID = () => {
  return create_uuid();
  // let dt = new Date().getTime();
  // let uuid = '';
  // uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //   let r = (dt + Math.random() * 16) % 16 | 0;
  //   dt = Math.floor(dt / 16);
  //   return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  // });
  // return 'ID-'+uuid;
};

export const replacer = (page, index, block) => {
  let data = [...page];
  data[index] = block;
  return data;
};

export const transformTextToAlias = (text, type) => {
  if (type === 'lowerCase') {
    return text.replaceAll(' ', '_').toLowerCase();
  }
  return text.replaceAll(' ', '_').toUpperCase();
};

export const getValues = (obj, key) => {
  let objects = [];
  for (let i in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object') {
      objects = objects.concat(getValues(obj[i], key));
    } else if (i === key) {
      objects.push(obj[i]);
    }
  }
  return objects;
};

export const func = (id) => [
  {
    _id: id(),
    title: '',
    titleAlias: '',
    alias: '',
    description: '',
    isChecked: false,
  },
];

export const feature = (id) => [
  {
    _id: id(),
    name: '',
    nameAlias: '',
    isChecked: false,
    function: func(create_UUID),
  },
];

export const category = (id) => [
  {
    _id: id(),
    title: '',
    titleAlias: '',
    feature: feature(create_UUID),
  },
];

export const toFindDuplicates = (arry) => {
  let resultToReturn = false;
  // call some function with callback function as argument
  resultToReturn = arry.some((element, index) => {
    return arry.indexOf(element) !== index;
  });
  if (resultToReturn) {
    return true;
  } else {
    return false;
  }
};

export const checkEmpty = (array) => {
  // return arr.indexOf('') !== -1;

  for (let i = 0; i < array.length; i++) {
    if (array[i].trim() === '') {
      return true;
    }
  }
  return false;
};
