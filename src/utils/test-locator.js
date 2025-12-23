export function addTestLocator(obj, prefix) {
  const updatedObj = {};

  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      updatedObj[key] = `${prefix}-${obj[key]}`;
    } else if (typeof obj[key] === 'object') {
      updatedObj[key] = addTestLocator(obj[key], prefix);
    }
  }

  return updatedObj;
}

export const maskLocatorLabel = (str) => {
  let res = str;
  res = res.toLowerCase().split(' ').join('-');
  res = res.toLowerCase().split('_').join('-');

  return res;
};

export function addTypeToObject(obj, str) {
  const updatedPopup = {};
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      updatedPopup[key] = obj[key] + '-' + str;
    }
  }
  return updatedPopup;
}

function camelToDash(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function testLocatorGenerator(baseObj, prefix, path = '') {
  let obj = baseObj;
  for (const key in obj) {
    // Convert camelCase keys to dash-case (kebab-case)
    const dashedKey = camelToDash(key);
    const currentPath = path ? `${path}-${dashedKey}` : dashedKey;

    if (typeof obj[key] === 'string') {
      // Replace string with the correct dashed object path
      if (key !== 'id') {
        obj[key] = `${prefix}-${currentPath}`;
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // If the value is an object, add an `id` key and fill with path
      obj[key].id = `${prefix}-${currentPath}`;
      // Recursively call the function for nested objects
      testLocatorGenerator(obj[key], prefix, currentPath);
    }
  }

  return obj;
}
