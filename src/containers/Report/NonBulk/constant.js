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

const lbaReport = {
  color: ['#3071D9', '#FAB005', '#3BA064'],
  colorReverse: ['#3BA064', '#FAB005', '#3071D9'],
  label: ['Customer Request', 'In Progress', 'Completed'],
  labelReverse: ['Completed', 'In Progress', 'Customer Request'],
};

export const colorBarLbaReport = lbaReport.color;

export const labelBarLbaReport = lbaReport.label;

export const colorLineLbaReport = lbaReport.colorReverse;

export const labelLineLbaReport = lbaReport.labelReverse;

export const barChartProps = () => ({
  color: colorBarLbaReport,
  keys: labelBarLbaReport,
  label: 'NON BULK',
});

export const LineChartProps = () => ({
  color: colorLineLbaReport,
  keys: labelLineLbaReport,
  label: 'NON BULK',
});

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
    { label: 'Last Update', value: 'totalByUpdateStatus' },
    { label: 'Order Date', value: 'totalByOrderDate' },
  ],
};
