import {
  colorBarGraph,
  labelBarGraph,
  colorLineGraph,
  labelLineGraph,
  filterStatusOptions,
  filterStatusTimeOption,
  filterViewOption,
  chartTypeOptions,
  barChartProps,
  lineChartProps,
} from '../constant';

describe('src/containers/ContentManagement/InterestedList/Report/constant', () => {
  test('colorBarGraph not null', () => {
    expect(colorBarGraph).not.toBeNull();
  });

  test('colorBarGraph matches even if received contains additional elements', () => {
    const expected = ['#FAB005', '#3BA064', '#DE1B1B'];
    expect(colorBarGraph).toEqual(expect.arrayContaining(expected));
  });

  test('labelBarGraph not null', () => {
    expect(labelBarGraph).not.toBeNull();
  });

  test('colorLineGraph not null', () => {
    expect(colorLineGraph).not.toBeNull();
  });

  test('labelLineGraph not null', () => {
    expect(labelLineGraph).not.toBeNull();
  });

  test('filterStatusOptions not null', () => {
    expect(filterStatusOptions).not.toBeNull();
  });

  test('filterStatusTimeOption not null', () => {
    expect(filterStatusTimeOption).not.toBeNull();
  });

  test('filterViewOption not null', () => {
    expect(filterViewOption).not.toBeNull();
  });

  test('chartTypeOptions not null', () => {
    expect(chartTypeOptions).not.toBeNull();
  });

  test('chartTypeOptions matches even if received contains additional elements', () => {
    const expected = [
      { label: 'Bar', value: 'bar' },
      { label: 'Line', value: 'line' },
    ];
    expect(chartTypeOptions).toEqual(expect.arrayContaining(expected));
  });

  test('barChartProps not null', () => {
    expect(barChartProps()).not.toBeNull();
  });

  test('lineChartProps not null', () => {
    expect(lineChartProps()).not.toBeNull();
  });
});
