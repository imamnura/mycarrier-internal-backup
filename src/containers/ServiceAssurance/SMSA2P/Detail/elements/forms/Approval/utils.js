import { cleanObject } from '@utils/common';

const schema = [
  { name: 'bNumber', label: 'MSISDN' },
  { name: 'dateTime', label: 'Timestamp' },
  { name: 'logRequest', label: 'Log Request' },
  { name: 'respond', label: 'Log Respond' },
  { name: 'logSMSC', label: 'Log SMS C' },
];

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

export const filterSchema = (provider) => {
  if (provider === 'Telkomsel') {
    return schema.slice(0, -1);
  } else {
    return schema;
  }
};

export const mappingTroubleOccurs = (troubleOccurs) => {
  const mappingData = [];

  troubleOccurs?.map((v, provider) => {
    if (provider === 'Telkomsel') {
      mappingData.push({
        dateTime: v.dateTime,
        logRequest: v.logRequest,
        respond: v.respond,
        logSMSC: v.logSMSC,
      });
    } else {
      mappingData.push({
        bNumber: v.bNumber,
        dateTime: v.dateTime,
        logRequest: v.logRequest,
        respond: v.respond,
        logSMSC: v.logSMSC,
      });
    }
  });

  return mappingData;
};
