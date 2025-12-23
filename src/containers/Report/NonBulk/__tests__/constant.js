import {
  dateRange,
  colorBarLbaReport,
  labelBarLbaReport,
  colorLineLbaReport,
  labelLineLbaReport,
  barChartProps,
  LineChartProps,
  options,
} from '../constant';

describe('src/pages/LBAReport/constant', () => {
  test('dateRange not null', () => {
    expect(dateRange('')).not.toBeNull();
    expect(dateRange('daily')).not.toBeNull();
    expect(dateRange('weekly')).not.toBeNull();
    expect(dateRange('monthly')).not.toBeNull();
    expect(dateRange('yearly')).not.toBeNull();
  });

  test('colorBarLbaReport not null', () => {
    expect(colorBarLbaReport).not.toBeNull();
  });

  test('labelBarLbaReport not null', () => {
    expect(labelBarLbaReport).not.toBeNull();
  });

  test('colorLineLbaReport not null', () => {
    expect(colorLineLbaReport).not.toBeNull();
  });

  test('labelLineLbaReport not null', () => {
    expect(labelLineLbaReport).not.toBeNull();
  });

  test('barChartProps not null', () => {
    expect(barChartProps()).not.toBeNull();
  });

  test('LineChartProps not null', () => {
    expect(LineChartProps()).not.toBeNull();
  });

  test('options not null', () => {
    expect(options).not.toBeNull();
  });
});
