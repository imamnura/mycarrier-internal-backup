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
  getFilter,
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

  test('getFilter', () => {
    const state = {
      setStatusDateRange: jest.fn(),
      statusDateRange: '',
      setStatusSource: jest.fn(),
      statusSource: '',
      setStatusStatus: jest.fn(),
      statusStatus: '',
      setStatusTime: jest.fn(),
      statusTime: '',
      setChartType: jest.fn(),
      chartType: 'line',
      setProductDateRange: jest.fn(),
      productDateRange: '',
      setProductProducts: jest.fn(),
      productProducts: '',
      setProductSource: jest.fn(),
      productSource: '',
      setProductStatus: jest.fn(),
      productStatus: '',
      setProductView: jest.fn(),
      productView: '',
    };

    const options = {
      source: '',
    };

    expect(getFilter('0', state, options)).not.toBeNull();
    expect(getFilter('1', state, options)).not.toBeNull();
    expect(getFilter('2', state, options)).not.toBeNull();
    expect(getFilter('3', state, options)).not.toBeNull();
    expect(getFilter('')).not.toBeNull();
  });
});
