import moment from 'moment';
import { labelLineSMSCReport, parsingValue } from './constant';

export function normalizeChart(data, { reportTime, chartType }) {
  if (chartType === 'bar') {
    return normalizeBarTotal(data, reportTime);
  } else {
    return normalizeLine(data, reportTime);
  }
}

export function normalizeBarTotal(data, reportTime) {
  const maxSuccess = Math.max(...data.map((o) => o.failed));
  const { divider, digits, rx } = parsingValue(maxSuccess);

  const normalize = data.map(({ _id, failed, success, expired, rejected }) => {
    return {
      name: labelHandler(_id, reportTime),
      Failed: (failed / divider).toFixed(digits).replace(rx, '$1'),
      Success: (success / divider).toFixed(digits).replace(rx, '$1'),
      Expired: (expired / divider).toFixed(digits).replace(rx, '$1'),
      Rejected: (rejected / divider).toFixed(digits).replace(rx, '$1'),
    };
  });

  return emptyValueHandler(normalize);
}

export function normalizeLine(data, reportTime) {
  const statusTotal = ['success', 'expired', 'failed', 'rejected'].reverse();

  const status = statusTotal;

  const label = labelLineSMSCReport;

  return label.map((name, index) => {
    return {
      id: name,
      data: [
        {
          x: '',
          y: null,
        },
        ...data.map(({ _id, ...item }) => ({
          x: labelHandler(_id, reportTime),
          y: item[status[index]],
        })),
        {
          x: '\n',
          y: null,
        },
      ],
    };
  });
}

const emptyDummy = () => {
  let empty = [];

  const emptyLabelAppend = (length) => {
    let str = '';
    for (let e = 0; e < length; e++) str += '\n';
    return str;
  };

  for (let i = 0; i < 7; i++) {
    empty.push({
      name: emptyLabelAppend(i),
      Success: 0,
      Expired: 0,
      Failed: 0,
      Rejected: 0,
    });
  }
  return empty;
};

export function emptyValueHandler(data) {
  const lenghtData = data.length;
  const finalData = emptyDummy();

  if (lenghtData === 1) {
    finalData[3] = data[0];
  } else if (lenghtData === 2) {
    finalData[2] = data[0];
    finalData[4] = data[1];
  } else if (lenghtData === 3) {
    finalData[2] = data[0];
    finalData[3] = data[1];
    finalData[4] = data[2];
  } else if (lenghtData === 4) {
    finalData[0] = data[0];
    finalData[2] = data[1];
    finalData[4] = data[2];
    finalData[6] = data[3];
  } else if (lenghtData === 5) {
    finalData[1] = data[0];
    finalData[2] = data[1];
    finalData[3] = data[2];
    finalData[4] = data[3];
    finalData[5] = data[4];
  } else {
    return data;
  }

  return finalData;
}

export function labelHandler(item, type) {
  const { month, week, date, year } = item;

  switch (type) {
    case 'daily':
      return moment(date).format('DD MMMM');
    case 'weekly':
      return `Week ${week} - ${moment.months()[month - 1]} ${year}`;
    case 'monthly':
      return `${moment.months()[month - 1]} ${year}`;
    case 'yearly':
      return year;
  }
}
