const interestedListGraph = {
  color: ['#FAB005', '#3BA064', '#DE1B1B'],
  colorReverse: ['#DE1B1B', '#3BA064', '#FAB005'],
  label: ['Waiting', 'Valid', 'Invalid'],
  labelReverse: ['Invalid', 'Valid', 'Waiting'],
};

export const colorBarGraph = interestedListGraph.color;

export const labelBarGraph = interestedListGraph.label;

export const colorLineGraph = interestedListGraph.colorReverse;

export const labelLineGraph = interestedListGraph.labelReverse;

export const filterStatusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Waiting', value: 'waiting' },
  { label: 'Invalid', value: 'invalid' },
  { label: 'Valid', value: 'valid' },
];

export const filterStatusTimeOption = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

export const filterViewOption = [
  { label: 'View By Count', value: 'count' },
  { label: 'View By Percentage', value: 'percent' },
];

export const chartTypeOptions = [
  { label: 'Bar', value: 'bar' },
  { label: 'Line', value: 'line' },
];

export const barChartProps = () => ({
  color: colorBarGraph,
  keys: labelBarGraph,
  label: 'LIST',
});

export const lineChartProps = () => ({
  color: colorLineGraph,
  keys: labelLineGraph,
  label: 'SMSC',
});

export const getFilter = (activeTab, state, options = {}) => {
  switch (activeTab) {
    case '0':
      return [
        {
          type: 'rangeDate',
          input: {
            onChange: state.setStatusDateRange,
            value: state.statusDateRange,
          },
          grid: {
            xs: 12,
            sm: 'auto',
          },
        },
        {
          type: 'dropdown',
          onChange: state.setStatusSource,
          value: state.statusSource,
          options: options.source,
          // options: optionsSource(listSource),
          customWidth: 160,
          grid: { xs: 6, sm: 'auto' },
        },
        {
          type: 'dropdown',
          onChange: state.setStatusStatus,
          value: state.statusStatus,
          options: filterStatusOptions,
          customWidth: 160,
          grid: { xs: 6, sm: 'auto' },
        },
        {
          type: 'dropdown',
          onChange: state.setStatusTime,
          value: state.statusTime,
          options: filterStatusTimeOption,
          customWidth: 160,
          grid: { xs: 6, sm: 'auto' },
        },
        {
          type: 'dropdown',
          onChange: state.setChartType,
          value: state.chartType,
          options: chartTypeOptions,
          grid: { xs: 6, sm: 'auto' },
        },
      ];
    case '1':
      return [
        {
          type: 'rangeDate',
          input: {
            onChange: state.setProductDateRange,
            value: state.productDateRange,
          },
          grid: {
            xs: 12,
            sm: 'auto',
          },
        },
        {
          type: 'dropdown',
          onChange: state.setProductProducts,
          value: state.productProducts,
          options: options.product,
          // options: optionsProduct(listProduct),
          customWidth: 160,
          grid: { xs: 6, sm: 'auto' },
        },
        {
          type: 'dropdown',
          onChange: state.setProductSource,
          value: state.productSource,
          options: options.source,
          // options: optionsSource(listSource),
          customWidth: 160,
          grid: { xs: 6, sm: 'auto' },
        },
        {
          type: 'dropdown',
          onChange: state.setProductStatus,
          value: state.productStatus,
          options: filterStatusOptions,
          customWidth: 160,
          grid: { xs: 6, sm: 'auto' },
        },
        {
          type: 'dropdown',
          onChange: state.setProductView,
          value: state.productView,
          options: filterViewOption,
          customWidth: 160,
          grid: { xs: 6, sm: 'auto' },
        },
      ];
    case '2':
      return;
    case '3':
      return;
    default:
      return {};
  }
};
