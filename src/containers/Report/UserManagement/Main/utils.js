import color from '@styles/color';
import { capitalize } from '@utils/text';
import moment from 'moment';

// type: 'days' | 'months' | 'weeks
export const getDateDifference = (start, end, type = 'days') => {
  if (!start || !end) {
    return null;
  }

  const startDate = moment(start);
  const endDate = moment(end);

  return endDate.diff(startDate, type) + 1;
};

const generateLabelLineChart = (_date, period) => {
  const splittedDate = _date.split('-');
  const date = moment(
    `${splittedDate[1]}/${splittedDate[0]}/${splittedDate[2]}`,
  );
  const format = {
    daily: date.format('D MMM'),
    weekly: `W-${Math.ceil(date.format('D') / 7)} ${date.format('MMM')}`,
    monthly: date.format('MMM YYYY'),
    yearly: date.format('YYYY'),
  };
  return format[period];
};

export const defaultPalette = [
  color.blue.main,
  color.yellow.main,
  color.primary.mid,
  color.primary.main,
  color.green.main,
  color.green.soft,
  color.orange.main,
  '#ffd180',
  '#b388ff',
  '#ea80fc',
  '#8c9eff',
  '#1F3D99',
  '#ff80ab',
  '#ff4081',
  '#80d8ff',
  '#00bcd4',
  '#0097a7',
  '#ec407a',
  '#E69A8DFF',
  '#8bc34a',
  '#33691e',
];

export const normalizeLine = (_data, period = null) => {
  if (!_data) return [];

  return _data.map(({ name, title, ...d }, i) => {
    const finalData = d.period_value.map(({ x, y }) => ({
      x: period ? generateLabelLineChart(x, period) : x,
      y: y,
    }));

    return {
      id: capitalize(name || title),
      data: [
        {
          x: '',
          y: 0,
        },
        ...finalData,
      ],
      color: defaultPalette[i],
    };
  });
};

export const normalizePie = (_data) => {
  if (!_data) return null;

  let totalData = 0;

  const data = _data.map(({ average, name, title, ...d }, i) => {
    totalData += average;
    return {
      ...d,
      // id: i,
      value: average,
      label: capitalize(name || title),
      color: defaultPalette[i],
    };
  });

  return { data, totalData };
};

export const normalizeGroupedBar = (_data) => {
  if (!_data) return null;
  let legends = [],
    keys = [],
    data = [],
    values = [],
    color = [];
  let dataChild = {};

  _data.forEach(({ total, name, title }, i) => {
    legends.push({
      label: capitalize(name || title),
      color: defaultPalette[i],
    });
    keys.push(capitalize(name || title));
    values.push(total);
    color.push(defaultPalette[i]);
  });

  keys.forEach((key, i) => (dataChild[key] = values[i]));
  keys.forEach((key, i) => (dataChild[key + 'Color'] = color[i]));
  data.push(dataChild);

  const temp = {
    legends,
    keys,
    data,
  };

  return temp;
};

export const handlePaddingBarChart = (data) => {
  const dataLength = data ? Object.keys(data[0]).length / 2 : 0;
  if (dataLength > 10) {
    return 0;
  }

  if (dataLength > 5) {
    return 0.3;
  }

  return 0.6;
};

export const formatPercentage = (val, totalData) => {
  const percentage = (val / totalData) * 100;
  return `${Math.round(percentage)}% (${val})`;
};
