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

const smscReport = {
  color: ['#3BA064', '#FAB005', '#DE1B1B', '#FD7E14'],
  colorReverse: ['#FD7E14', '#DE1B1B', '#FAB005', '#3BA064'],
  labelReverse: ['Rejected', 'Failed', 'Expired', 'Success'],
  label: ['Success', 'Expired', 'Failed', 'Rejected'],
};

export const colorBarSMSCReport = smscReport.color;

export const labelBarSMSCReport = smscReport.label;

export const colorLineSMSCReport = smscReport.colorReverse;

export const labelLineSMSCReport = smscReport.labelReverse;

export const barChartProps = (data) => {
  const maxSuccess = Math.max(...data.map((o) => o.failed));
  const { symbol } = parsingValue(maxSuccess);

  return {
    color: colorBarSMSCReport,
    keys: labelBarSMSCReport,
    label: `SMSC${symbol && ` (${symbol})`}`,
    enableLabel: false,
  };
};

export const LineChartProps = () => ({
  color: colorLineSMSCReport,
  keys: labelLineSMSCReport,
  label: 'SMSC',
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
  operator: [
    { label: 'All Operator', value: '' },
    { label: 'Telkomsel', value: '1' },
    { label: 'Indosat', value: '2' },
    { label: 'XL & Axis', value: '3' },
    { label: 'Smartfren', value: '4' },
  ],
};

export const parsingValue = (num) => {
  if (!num) return null;

  let digits = 1;
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: '' },
    { value: 1e6, symbol: 'Million' },
    { value: 1e9, symbol: 'Billion' },
    { value: 1e12, symbol: 'Trillion' },
    { value: 1e15, symbol: 'Quadrillion' },
    { value: 1e18, symbol: 'Quintillion' },
  ];

  let item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item?.value);

  if (item?.value === 1e3) digits = 3;

  return {
    rx: /\.0+$|(\.[0-9]*[1-9])0+$/,
    divider: item ? item?.value : 1,
    digits: digits,
    symbol: item ? item?.symbol : '',
  };
};
