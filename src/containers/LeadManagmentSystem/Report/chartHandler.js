import moment from 'moment';
import { labelLineGraph } from './constant';

export function normalizeChart(data, { reportTime, chartType, view = '' }) {
  switch (chartType) {
    case 'bar':
      return normalizeBar(data, reportTime);
    case 'line':
      return normalizeLine(data, reportTime);
    case 'pie':
      return normalizePie(data, view);
    default:
      return;
  }
}

export function normalizeBar(data, reportTime) {
  const normalize = data.map(({ _id, waiting, valid, invalid }) => {
    return {
      name: labelHandler(_id, reportTime),
      Invalid: invalid,
      Valid: valid,
      Waiting: waiting,
    };
  });

  return emptyValueHandler(normalize);
}

export function normalizePie(data, view) {
  const normalize = data.map(({ productName, total, percentage, color }, i) => {
    if (view === 'count') {
      return {
        id: `${i + 1}-${productName}`,
        label: productName,
        value: total,
        color: color,
      };
    } else {
      return {
        id: `${i + 1}-${productName}`,
        label: productName,
        value: percentage,
        color: color,
      };
    }
  });

  return normalize;
}

export function normalizeLine(data, reportTime) {
  const statusTotal = ['waiting', 'valid', 'invalid'].reverse();

  const status = statusTotal;

  const label = labelLineGraph;

  return label.map((name, index) => {
    return {
      id: name,
      data: [
        {
          x: '',
          y: null,
        },
        ...data.map(({ _id, ...item }) => {
          return {
            x: labelHandler(_id, reportTime),
            y: item[status[index]],
          };
        }),
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
      Invalid: 0,
      Valid: 0,
      Waiting: 0,
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
