import routes from '@__old/configs/routes';
import FileJPG from '@assets/icon-v2/FileJPG';
import FileMP4 from '@assets/icon-v2/FileMP4';
import FileOther from '@assets/icon-v2/FileOther';
import FilePDF from '@assets/icon-v2/FilePDF';
import FilePNG from '@assets/icon-v2/FilePNG';
import FileTXT from '@assets/icon-v2/FileTXT';
import FileXLS from '@assets/icon-v2/FileXLS';
import FileZIP from '@assets/icon-v2/FileZIP';
import { key, route } from '@configs';
import { menuList } from '@configs/navigation';
import UserDataContext from '@context/UserData';
import { getFirebaseToken } from '@firebaseConfig/utils';
import { rsa, toHex } from 'crypsi.js';
import crypto from 'crypto';
import { useContext } from 'react';
import fetch from './fetch';

const storageName = key.storageName;

// Local Storage - Access Token
export const setUserData = (value) => {
  localStorage.setItem(storageName.userData, JSON.stringify(value));
};

export const getUserData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useContext(UserDataContext);

  return data || {};
};

// Local Storage - Access Token
export const setAccessToken = (value) => {
  localStorage.setItem(storageName.accessToken, value);
};

export const getAccessToken = () => {
  const token = localStorage.getItem(storageName.accessToken);

  if (!token) return null;

  return `Bearer ${token}`;
};

// Local Storage - Refreh Token
export const setRefreshToken = (value) => {
  localStorage.setItem(storageName.refreshToken, value);
};

export const getRefreshToken = () => {
  return localStorage.getItem(storageName.refreshToken);
};

// Local Storage - Generate Token
export const setGenerateToken = (value) => {
  localStorage.setItem(storageName.generateToken, value);
};

export const getGenerateToken = () => {
  return localStorage.getItem(storageName.generateToken);
};

// Local Storage - Previous Location
export const setPreviousLocation = (value) => {
  localStorage.setItem(storageName.prevLocation, value);
};

export const getPreviousLocation = () => {
  return localStorage.getItem(storageName.prevLocation);
};

// Clear Local Storage
export const clearStorage = () => {
  localStorage.clear();
};

// Auto Redirect Home
export const baseRedirect = async () => {
  const prevUrl = getPreviousLocation();
  const userData = JSON.parse(localStorage.getItem(key.storageName.userData));
  const privileges = userData?.privileges;

  if (prevUrl) {
    location.href = prevUrl;
  } else {
    let url = '/';
    if (privileges.find((p) => p.category === 'DASHBOARD_ROLE')) {
      url = '/dashboard';
    } else {
      const navigationMenu = await menuList(privileges);
      url = (await navigationMenu[0]?.menu[0]?.path) || 'unauthorize';
    }
    location.href = url;
  }
};

// Logout
export const logout = async () => {
  clearStorage();
  location.href = route.login();

  const options = {
    method: 'POST',
    url: '/users/user/v2/unsubscribe-topic',
    headers: {
      Authorization: getAccessToken(),
    },
    data: {
      firebaseToken: getFirebaseToken(),
    },
  };
  try {
    await fetch(options);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
};

// Redirect to Helpdesk
export const talkToHelpdesk = () => {
  window.open('https://wa.me/6282188885448');
};

// Get Object Value
export const getValueObject = ({ name, data }) => {
  try {
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
  } catch (error) {
    return '';
  }
};

// Has privilege feature
export const isHaveAccess = (allMenu = [], menu) =>
  allMenu.map((x) => x.toLowerCase()).includes(menu.toLowerCase());

// CssImportant
export const importantCss = (style) => `${style} !important`;

// Cleansing Onject
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

export const isWindowExist = () => typeof window !== 'undefined';

export const create_uuid = (length = 32) =>
  crypto.randomBytes(length).toString('hex');

export const getFileInformation = (url) => {
  const path = url.split('?')[0];
  const fileName = path?.split('/').pop();
  const extension = fileName.split('.').pop();

  return {
    name: fileName,
    extension: extension.toLowerCase(),
  };
};

export const getFileIcon = (extension) => {
  if (extension === 'pdf') {
    return FilePDF;
  } else if (['xls', 'xlsx'].includes(extension)) {
    return FileXLS;
  } else if (['doc', 'docx'].includes(extension)) {
    return FileXLS;
  } else if (extension === 'png') {
    return FilePNG;
  } else if (['jpg', 'jpeg'].includes(extension)) {
    return FileJPG;
  } else if (extension === 'zip') {
    return FileZIP;
  } else if (extension === 'mp4') {
    return FileMP4;
  } else if (extension === 'txt') {
    return FileTXT;
  } else {
    return FileOther;
  }
};

export const isAfterLogin = () => {
  if (
    location.pathname.includes(route.login()) ||
    location.pathname.includes(route.forgotPassword()) ||
    location.pathname.includes(routes.APPROVAL_LBA('')) ||
    location.pathname.includes(routes.APPROVAL_LINK('')) ||
    location.pathname.includes(routes.APPROVAL_QUOTATION('')) ||
    location.pathname.includes(routes.APPROVAL_BAKES(''))
  ) {
    return false;
  }

  return true;
};

export const dropdownValueParser = (value, options) => {
  const val = options.find((o) => o.value === value);

  return val || options[0];
};

//Capitalize First Letter in Each Word (Title Case)
export const titleCapitalize = (data) =>
  data && data.replace(/\b(\w)/g, (s) => s.toUpperCase());

export const phoneRegex = /^(^\+62)(\d{3,4}-?){2}\d{3,4}$/g;

export const onDownloadFile = (url) => {
  window.open(url, '_blank');
};

export const twitterRegex = /^@(?=.*\w)[\w]{1,40}$/;

export const letterRegex = /^[A-Za-z]+$/;

export const numberRegex = /^\d+$/;

// eslint-disable-next-line no-useless-escape
export const allCharRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;

export const iPv4Regex =
  /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;

export const iPv6Regex =
  /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-9]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-9]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-9]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-9]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])$/;

export const emptyFunc = () => {
  return;
};

export const isPreviewable = (ext) => {
  return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'xls', 'xlsx', 'pdf'].includes(
    ext,
  );
};

export const encrypt = async (str) => {
  const key = process.env.NEXT_PUBLIC_CRYPSI_PUBLIC_KEY;

  if (!key) {
    return str;
  }

  const publicKey = atob(key);

  const textEncoder = new TextEncoder();
  const encryptedUsername = await rsa.encryptWithOAEPSha256(
    publicKey,
    textEncoder.encode(str),
  );
  return toHex(new Uint8Array(encryptedUsername));
};

export const isUsingLayout = (path) =>
  ![
    '/_error',
    '/bakes/approval/[id]',
    '/bills-and-payment-management/billing-reminder/approval/[id]',
    '/design-system',
    '/document-viewer',
    '/login',
    '/maintenance',
    '/non-bulk-approval/[id]',
    '/offering-letter/approval/[id]',
    '/purchase-order/approval/neucentrix/[id]/[approverId]',
    '/purchase-order/approval/baso/[id]',
    '/reset-password',
    '/settlement/approval/[id]',
    '/visit-neucentrix/approval/[params]/[id]/[approverId]',
    '/service-assurance/digital-product/va-service/[id]',
  ].includes(path);

export const getTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
