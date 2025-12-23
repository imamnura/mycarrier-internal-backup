import {
  emptyValueHandler,
  labelHandler,
  normalizeChart,
} from '../chartHandler';

describe('src/pages/SMSCReport/chartHandler', () => {
  test('emptyValueHandler test', () => {
    expect(emptyValueHandler(['1'])).not.toBeNull();
    expect(emptyValueHandler(['1', '2'])).not.toBeNull();
    expect(emptyValueHandler(['1', '2', '3'])).not.toBeNull();
    expect(emptyValueHandler(['1', '2', '3', '4'])).not.toBeNull();
    expect(emptyValueHandler(['1', '2', '3', '4', '5'])).not.toBeNull();
  });

  test('labelHandler test', () => {
    expect(labelHandler('', 'daily')).not.toBeNull();
    expect(labelHandler('', 'weekly')).not.toBeNull();
    expect(labelHandler('', 'monthly')).not.toBeNull();
    expect(labelHandler('', 'yearly')).not.toBeNull();
  });

  it('normalize chart', async () => {
    const data = [
      {
        _id: {
          date: '',
          week: '',
          month: '',
          yearly: '',
        },
        date: '2022-04-06',
        expired: 7081794,
        failed: 55510026,
        rejected: 3646299,
        success: 822076465,
      },
    ];
    await normalizeChart(data, { reportTime: '', chartType: 'bar' });
  });

  it('normalize chart 2', async () => {
    const data = [
      {
        _id: {
          date: '',
          week: '',
          month: '',
          yearly: '',
        },
        date: '2022-04-06',
        expired: 7081794,
        failed: 55510026,
        rejected: 3646299,
        success: 822076465,
      },
    ];
    await normalizeChart(data, { reportTime: '', chartType: 'line' });
  });
});
