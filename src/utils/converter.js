import { dateFormat, rupiahFormat } from './parser';

export const dateFormatConverter =
  ({ type, empty, pattern }) =>
  (date) =>
    dateFormat({ date, type, empty, pattern });

export const currencyConverter = (number) => rupiahFormat(number);

export const phoneNumberConverter =
  ({ prefix }) =>
  (phone) => {
    return prefix + phone.toString();
  };
