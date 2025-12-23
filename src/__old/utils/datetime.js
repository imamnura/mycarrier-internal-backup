import moment from 'moment';
import momentTimezone from 'moment-timezone';

const datetime = (strDate, type = null, empty) => {
  if (empty && !strDate) {
    return empty;
  }

  let datetime = strDate !== '' ? moment(strDate) : moment();
  if (type === 'iso') {
    return datetime.toISOString();
  }

  if (type === 'object') {
    return datetime.toObject();
  }

  if (type === 'calendar') {
    return datetime.format('L hh:mm:ss');
  }

  if (type === 'choose') {
    return datetime.format('DD/MM/YYYY');
  }

  if (type === 'from-now') {
    return datetime.fromNow();
  }

  if (type === 'date-time') {
    return strDate && datetime.format('DD/MM/YYYY HH:mm');
  }

  if (type === 'today') {
    return datetime;
  }

  if (type === 'moment') {
    return datetime;
  }

  if (type === 'date-time-custom') {
    return strDate && datetime.format('DD MMMM YYYY HH:mm');
  }

  if (type === 'period') {
    return strDate && datetime.format('MMM Do, YYYY');
  }

  if (type === 'date-month') {
    return strDate && datetime.format('DD MMMM');
  }

  if (type === 'date-month-year') {
    return strDate && datetime.format('DD MMMM YYYY');
  }

  if (type === 'time') {
    return strDate && datetime.format('HH:mm');
  }

  if (type === 'date') {
    return strDate && datetime.format('YYYY-MM-DD');
  }

  if (type === 'timezone-jakarta') {
    return strDate && momentTimezone.tz(strDate, 'Asia/Jakarta').format();
  }
};

export default datetime;
