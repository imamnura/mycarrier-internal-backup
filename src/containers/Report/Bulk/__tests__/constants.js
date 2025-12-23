import { dateRange, barChartProps, LineChartProps } from '../constants';

describe('src/pages/SenderIDReport/constant', () => {
  test('dateRange not null', () => {
    expect(dateRange('daily')).not.toBeNull();
    expect(dateRange('weekly')).not.toBeNull();
    expect(dateRange('monthly')).not.toBeNull();
    expect(dateRange('yearly')).not.toBeNull();
    expect(dateRange('')).not.toBeNull();
  });

  test('barChartProps not null', () => {
    expect(barChartProps(0)).not.toBeNull();
    expect(barChartProps(1)).not.toBeNull();
  });

  test('LineChartProps not null', () => {
    expect(LineChartProps(0)).not.toBeNull();
    expect(LineChartProps(1)).not.toBeNull();
  });
});
