import htmlParser from 'html-react-parser';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

export const stringToHtml = (str) => htmlParser(str);

export const dateFormat = ({ date, type, empty, pattern }) => {
  if (!date) {
    return empty || '';
  }

  let momentDate = moment(date);

  if (pattern) {
    momentDate = moment(date, pattern);
  }

  if (!momentDate.isValid()) {
    return empty || '-';
  }

  if (type === 'date') {
    return momentDate.format('DD/MM/YYYY');
  } else if (type === 'date-time') {
    return momentDate.format('DD/MM/YYYY HH:mm');
  } else if (type === 'time') {
    return momentDate.format('HH:mm');
  } else if (type === 'date-time-full') {
    return momentDate.format('DD/MM/YYYY HH:mm:ss');
  } else if (type === 'date-month') {
    return momentDate.format('DD MMMM');
  } else if (type === 'date-month-year') {
    return momentDate.format('DD MMM, YYYY');
  } else if (type === 'date-month-year-time') {
    return momentDate.format('DD MMMM YYYY HH:mm');
  } else if (type === 'full-string-date') {
    return momentDate.format('DD MMMM YYYY');
  } else if (type === 'params') {
    return momentDate.format('YYYY-MM-DD');
  } else if (type === 'period') {
    return moment(date, 'MMYYYY').format('MMMM YYYY');
  } else if (type === 'full-date-time') {
    return momentDate.format('DD MMMM YYYY HH:mm:ss');
  } else if (type === 'full-date-time-month-short') {
    return momentDate.format('DD MMM YYYY HH:mm:ss');
  } else if (type === 'iso') {
    return momentDate.toISOString();
  } else if (type === 'timezone-jakarta') {
    return momentTimezone.tz(momentDate, 'Asia/Jakarta').format();
  } else if (type === 'date-dash') {
    return momentDate.format('DD-MM-YYYY');
  } else {
    return empty || '';
  }
};

export const rupiahFormat = (_number, numberOnly = false) => {
  let number = 0;

  if (typeof _number === 'number') {
    number = _number;
  } else if (typeof _number === 'string') {
    const parsedNum = parseFloat(_number);
    if (!isNaN(parsedNum)) {
      number = parsedNum;
    }
  } else {
    return '-';
  }

  const formattedNum = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 2,
  }).format(number);
  if (numberOnly) {
    return `${formattedNum}`;
  }
  return `Rp ${formattedNum}`;
};

export const dateRangeToParams = (date) => {
  if (!date.length || !date[0] || !date[1]) {
    return '';
  }
  return date.map((d) => dateFormat({ date: d, type: 'params' })).join('/');
};

export const paramsToDateRange = (date, format) => {
  if (!date) {
    return [null, null];
  }

  if (format) {
    return date.split('/').map((d) => moment(d).format(format));
  }

  return date.split('/').map((d) => moment(d).toJSON());
};

export const dateDiff = (
  type = 'days',
  startDate,
  endDate,
  truncated = false,
) => {
  if (!startDate) return 0;

  const start = moment(startDate).startOf('day');
  const end = moment(endDate || moment()).startOf('day');

  return end.diff(start, type, truncated);
};

export const addRealDate = (type = 'days', startDate, duration = 0) => {
  if (!startDate) {
    return (startDate = moment());
  }

  const endDate = moment(startDate).add(duration, type).calendar();

  return moment(endDate).toISOString();
};

export const subtractRealDate = (type = 'days', endDate, duration = 0) => {
  if (!endDate) {
    return (endDate = moment());
  }

  const startDate = moment(endDate).subtract(duration, type).calendar();

  return moment(startDate).toISOString();
};

export const currencyToNumber = (value, destinationType) => {
  if (typeof value !== 'string') {
    return '';
  }

  const res = value.replace(/[^\d]/g, '');

  if (destinationType === 'string') {
    return res;
  }

  return parseInt(res);
};

export const removePhoneSpace = (phoneNumber) => {
  if (!phoneNumber) {
    return '+62';
  }

  return phoneNumber.replace(/^\s+|\s+$/gm, '');
};

export const getRangeOfMonth = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return 0;
  }
  const rangeDate = [moment(startDate).toJSON(), moment(endDate).toJSON()];
  const months = rangeDate.map((date) => moment(date).month() + 1); // +1 because month() returns 0-11

  const minMonth = Math.min(...months);
  const maxMonth = Math.max(...months);

  return maxMonth - minMonth + 1;
};

export const getFirstMonthOfYear = () => {
  const firstMonthOfYear = moment().startOf('year');
  const result = firstMonthOfYear.format('YYYY/MM/DD');

  return result;
};
