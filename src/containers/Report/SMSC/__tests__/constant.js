import { dateRange, LineChartProps } from '../constant';

describe('src/pages/SMSCReport/constant', () => {
  test('dateRange test', () => {
    expect(dateRange('weekly')).not.toBeNull();
    expect(dateRange('monthly')).not.toBeNull();
    expect(dateRange('yearly')).not.toBeNull();
    expect(dateRange('')).not.toBeNull();
  });

  test('LineChartProps test', () => {
    expect(LineChartProps()).not.toBeNull();
  });
});
