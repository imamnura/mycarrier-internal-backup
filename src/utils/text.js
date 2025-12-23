import { create_uuid } from './common';

export function toLowerCase(text) {
  if (!text) {
    return '';
  }

  return text.toLowerCase();
}

export function textLimit(text = '', length) {
  if (!length) {
    return text;
  }

  if (!text) {
    return '';
  }
  return text.length > length ? text.substring(0, length) + '...' : text;
}

export function formatBytes(a, b) {
  if (0 === a) return '0 Bytes';
  let c = 1024,
    d = b || 2,
    e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
}

export const capitalize = (a) => {
  if (!a) return '';
  let b = a.toLowerCase();
  let split = b.split('_');

  if (split.length > 0) {
    let res = split.map((v) => {
      return v.charAt(0).toUpperCase() + v.slice(1);
    });

    res = res.join(' ');
    return res
      .split(' ')
      .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
      .join(' ');
  }

  return b.charAt(0).toUpperCase() + b.slice(1);
};

export function convertToRupiah(angka) {
  if (!angka || angka === '-') {
    return 'Rp0';
  }

  let rupiah = '';
  let angkarev = angka.toString().split('').reverse().join('');

  for (let i = 0; i < angkarev.length; i++)
    if (i % 3 === 0) {
      rupiah += angkarev.substr(i, 3) + '.';
    }

  return (
    'Rp' +
    rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  );
}

export const slugValidate = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // eslint-disable-line
    .replace(/\-\-+/g, '-'); // eslint-disable-line
};

export const normalizeRupiah = (v) => {
  if (!v) return '';
  const cleanedInput = v.replace(/[^\d]/g, '');
  if (cleanedInput) {
    const convertedInput = new Intl.NumberFormat().format(cleanedInput);
    return `Rp ${convertedInput}`;
  } else return '';
};

export const normalizeOnlyNumber = (v) => {
  if (!v) return '';
  const cleanedInput = v.replace(/[^\d]/g, '');
  return cleanedInput ? cleanedInput : '';
};

export const create_UUID = (short) => {
  return create_uuid(short ? 16 : 32);
};

export const spaceToUnderscore = (text) => {
  return text.toLowerCase().replace(/\s+/g, '_');
};

export const changeSpaceToUnderscore = (v) => {
  if (!v) return '';
  const cleanText = v.replace(/\s+/g, '_');
  return cleanText ? cleanText : '';
};
