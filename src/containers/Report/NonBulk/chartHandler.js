import moment from 'moment';
import { labelLineLbaReport } from './constant';

export function normalizeChart(data, { reportTime, chartType }) {
  if (chartType === 'bar') {
    return normalizeBarTotal(data, reportTime);
  } else {
    return normalizeLine(data, reportTime);
  }
}

export function normalizeBarTotal(data, reportTime) {
  const normalize = data.map(({ _id, checking, onprogress, completed }) => {
    return {
      name: labelHandler(_id, reportTime),
      Completed: completed,
      'In Progress': onprogress,
      'Customer Request': checking,
    };
  });

  return emptyValueHandler(normalize);
}

export function normalizeLine(data, reportTime) {
  const statusTotal = ['checking', 'onprogress', 'completed'].reverse();

  const status = statusTotal;

  const label = labelLineLbaReport;

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
      Completed: 0,
      'In Process': 0,
      'Customer Request': 0,
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
