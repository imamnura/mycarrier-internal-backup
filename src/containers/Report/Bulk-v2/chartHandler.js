import moment from 'moment';
import { labelLineTotalSender, labelLineDeliveryTime } from './utils';

export function normalizeChart(data, { reportTime, reportType, chartType }) {
  if (reportType === 'totalSender' || reportType === 'totalSenderByOrderDate') {
    if (chartType === 'bar') {
      return normalizeBarTotal(data, reportTime);
    } else {
      return normalizeLine(data, reportTime, 'totalSender');
    }
  } else {
    if (chartType === 'bar') {
      return normalizeBarDelivery(data, reportTime);
    } else {
      return normalizeLine(data, reportTime, 'deliveryTime');
    }
  }
}

export function normalizeBarTotal(data, reportTime) {
  const normalize = data.map(
    ({ _id, completed, inprocess, rejected, returned, request }) => {
      return {
        name: labelHandler(_id, reportTime),
        'Customer Request': request,
        'In Process': inprocess,
        Returned: returned,
        Completed: completed,
        Rejected: rejected,
      };
    },
  );

  return emptyValueHandler(normalize);
}

export function normalizeBarDelivery(data, reportTime) {
  const normalize = data.map(
    ({
      _id,
      avgDelivery,
      avgDeliveryDws,
      avgDeliveryOperator,
      avgDeliveryCustomer,
    }) => {
      return {
        name: labelHandler(_id, reportTime),
        empty1: 0,
        'Time Delivery DWS': avgDeliveryDws,
        'Time Delivery Operator': avgDeliveryOperator,
        'Time Delivery Customer': avgDeliveryCustomer,
        'Time Delivery Total': avgDelivery,
      };
    },
  );

  return emptyValueHandler(normalize);
}

export function normalizeLine(data, reportTime, type) {
  const statusTotal = [
    'request',
    'inprocess',
    'returned',
    'completed',
    'rejected',
  ].reverse();
  const statusDelivery = [
    'avgDelivery',
    'avgDeliveryCustomer',
    'avgDeliveryOperator',
    'avgDeliveryDws',
  ];

  const status = type === 'totalSender' ? statusTotal : statusDelivery;

  const label =
    type === 'totalSender' ? labelLineTotalSender : labelLineDeliveryTime;

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
      'Customer Request': 0,
      'In Process': 0,
      Returned: 0,
      Completed: 0,
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
