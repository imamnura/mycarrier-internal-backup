import moment from 'moment';

export const dateRange = (type) => {
  switch (type) {
    case 'daily':
      return [moment().add(-7, 'days'), moment()];
    case 'weekly':
      return [moment().add(-5, 'weeks'), moment()];
    case 'monthly':
      return [moment().add(-6, 'months'), moment()];
    case 'yearly':
      return [moment().add(-6, 'years'), moment()];
  }
  return [null, null];
};

const totalSender = {
  color: ['#3071D9', '#FAB005', '#9657D6', '#3BA064', '#DE1B1B'],
  colorReverse: ['#DE1B1B', '#3BA064', '#9657D6', '#FAB005', '#3071D9'],
  label: [
    'Customer Request',
    'In Process',
    'Returned',
    'Completed',
    'Rejected',
  ],
  labelReverse: [
    'Rejected',
    'Completed',
    'Returned',
    'In Process',
    'Customer Request',
  ],
};

const deliveryTime = {
  color: ['#DE1B1B', '#3071D9', '#FAB005', '#3BA064'],
  colorReverse: ['#3BA064', '#FAB005', '#3071D9', '#DE1B1B'],
  label: [
    'Time Delivery DWS',
    'Time Delivery Operator',
    'Time Delivery Customer',
    'Time Delivery Total',
  ],
  labelReverse: [
    'Time Delivery Total',
    'Time Delivery Customer',
    'Time Delivery Operator',
    'Time Delivery DWS',
  ],
};

export const colorBarTotalSender = totalSender.color;

export const colorBarDeliveryTime = deliveryTime.color;

export const labelBarTotalSender = totalSender.label;

export const labelBarDeliveryTime = deliveryTime.label;

export const colorLineTotalSender = totalSender.colorReverse;

export const colorLineDeliveryTime = deliveryTime.colorReverse;

export const labelLineTotalSender = totalSender.labelReverse;

export const labelLineDeliveryTime = deliveryTime.labelReverse;

export const barChartProps = (type, dateRange) => {
  return type === 0
    ? {
        color: colorBarTotalSender,
        keys: labelBarTotalSender,
        label: 'BULK',
        axisBottom: {
          ...(dateRange === 'weekly' && { tickRotation: 10 }),
        },
      }
    : {
        color: colorBarDeliveryTime,
        keys: labelBarDeliveryTime,
        label: 'HOUR',
        axisBottom: {
          ...(dateRange === 'weekly' && { tickRotation: 10 }),
        },
      };
};

export const LineChartProps = (type, dateRange) => {
  return type === 0
    ? {
        color: colorLineTotalSender,
        keys: labelLineTotalSender,
        label: 'BULK',
        axisBottom: {
          ...(dateRange === 'weekly' && { tickRotation: 10 }),
        },
      }
    : {
        color: colorLineDeliveryTime,
        keys: labelLineDeliveryTime,
        label: 'HOUR',
        axisBottom: {
          ...(dateRange === 'weekly' && { tickRotation: 10 }),
        },
      };
};

export const options = {
  type: [
    { label: 'Bar', value: 'bar' },
    { label: 'Line', value: 'line' },
  ],
  time: [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ],
  date: [
    { label: 'Last Update', value: 'totalSender' },
    { label: 'Order Date', value: 'totalSenderByOrderDate' },
  ],
};
