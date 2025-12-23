import { ROUTES, SERVICES } from '../configs';
import fetch from './fetch';
import { ROLE } from '../../constants/roles';
import appId from '../../constants/appId';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_DATA,
  PREV_LOCATION,
  ROLE_DATA,
} from '../../constants/token';
import { getFirebaseToken } from '../../firebase/utils';
import { getFilteredMenu } from '../../constants/temp-nav';
import { getUserData } from '../../utils/common';
import CryptoJS from 'crypto-js';
import { destroyCookie } from 'nookies';

export function validateApp(apps) {
  const { assurance, activate, catalog } = appId;

  const listApp = apps.map((item) => item.appId);

  return listApp.some((app) => [assurance, activate, catalog].includes(app));
}

export function setAccessToken(value) {
  localStorage.setItem(ACCESS_TOKEN, value);
}

export function setRefreshToken(value) {
  localStorage.setItem(REFRESH_TOKEN, value);
}

export function setRoleData(value) {
  localStorage.setItem(ROLE_DATA, JSON.stringify(value));
}

export function setUserData({ fullName, role: { roleId }, privileges }) {
  const normalize = {
    fullName,
    role: roleId,
    privileges,
  };

  localStorage.setItem(USER_DATA, JSON.stringify(normalize));
}

export function setPrevLocation(value) {
  localStorage.setItem(PREV_LOCATION, value);
}

export function clearStorages() {
  localStorage.clear();
}

export function getPrevLocation() {
  return localStorage.getItem(PREV_LOCATION);
}

export function removePrevLocation() {
  localStorage.removeItem(PREV_LOCATION);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN);
}

export function getToken() {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    return 'Bearer ' + token;
  }

  return null;
}

export function getAppId() {
  let roleData = localStorage.getItem(ROLE_DATA);

  if (roleData) {
    roleData = JSON.parse(roleData);
    return roleData.apps.map((item) => item.appId);
  }

  return [];
}

export function getValueObject({ name, data }) {
  let value = '';
  const nameSplit = name.split('.');
  if (nameSplit.length > 2) {
    value = data[nameSplit[0]][nameSplit[1]][nameSplit[2]];
  } else if (nameSplit.length > 1) {
    value = data[nameSplit[0]][nameSplit[1]];
  } else {
    value = data[name];
  }
  return value;
}

export const noop = () => {};

export const detectChangeState = ({ changed, prevState, state }) => {
  let isChanged;
  changed.forEach((item) => {
    isChanged = isChanged || Boolean(prevState[item] !== state[item]);
  });
  return isChanged;
};

export function checkStrictPath() {
  if (
    location.pathname.includes(ROUTES.LOGIN) ||
    location.pathname.includes(ROUTES.FORGOT_PASSWORD)
  )
    return false;
  return true;
}

export function checkBothPage() {
  if (location.pathname.includes('/sys/')) return true;
  if (location.pathname.includes(ROUTES.APPROVAL_LBA(''))) return true;
  if (location.pathname.includes(ROUTES.APPROVAL_LINK(''))) return true;
  if (location.pathname.includes(ROUTES.APPROVAL_QUOTATION(''))) return true;
  if (location.pathname.includes(ROUTES.APPROVAL_BAKES(''))) return true;
  return false;
}

export function logout() {
  destroyCookie(undefined, 'userId');

  const options = {
    method: 'POST',
    url: SERVICES.UNSUBSRIBE_TOPIC,
    headers: {
      Authorization: getToken(),
    },
    data: {
      firebaseToken: getFirebaseToken(),
    },
  };
  fetch(options)
    .then(() => {
      clearStorages();
      location.href = ROUTES.LOGIN;
    })
    .catch(() => {
      clearStorages();
      location.href = ROUTES.LOGIN;
    });
}

export const isRole = (type) => {
  const { role: { roleId } = { roleId: '' } } = getUserData() || {
    role: { roleId: '' },
  };
  return roleId === ROLE[type];
};

export function getPathRedirect() {
  // const { assurance, activate } = appId;

  // const apps = getAppId();

  let url = '/';

  // if (apps.includes(activate)) {
  //   url = ROUTES.LINK_ACTIVATION;
  // } else if (apps.includes(assurance)) {
  //   url = ROUTES.FAULT_HANDLING;
  // } else if (isRole('cc') || isRole('mk')) {
  //   url = ROUTES.PRODUCT_MANAGEMENT;
  // } else if (isRole('wdm')) {
  //   url = ROUTES.USER_MANAGEMENT;
  // } else {
  //   url = '/';
  // }

  const menuList = getFilteredMenu();

  url = menuList[0]?.menu[0]?.path;
  return url;
}

export function redirectTo() {
  location.href = getPathRedirect();
}

export function cleanObject(obj) {
  let normalize = obj;
  const propNames = Object.getOwnPropertyNames(normalize);

  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (
      normalize[propName] === null ||
      normalize[propName] === undefined ||
      normalize[propName] === ''
    ) {
      delete normalize[propName];
    }
  }

  return normalize;
}

export const isHaveAccess = (allMenu = [], menu) => allMenu.includes(menu);

export function decrypt(obj) {
  if (!obj) {
    return null;
  }

  try {
    let decData = CryptoJS.enc.Base64.parse(obj).toString(CryptoJS.enc.Utf8);
    let bytes = CryptoJS.AES.decrypt(decData, 'newobj').toString(
      CryptoJS.enc.Utf8,
    );
    return JSON.parse(bytes);
  } catch (error) {
    return null;
  }
}

export function encrypt(obj) {
  const encJson = CryptoJS.AES.encrypt(
    JSON.stringify(obj),
    'newobj',
  ).toString();
  const encData = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encJson),
  );
  return encData;
}
