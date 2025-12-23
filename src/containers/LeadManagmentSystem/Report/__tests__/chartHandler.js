import {
  normalizeChart,
  emptyValueHandler,
  labelHandler,
} from '../chartHandler';

describe('src/containers/ContentManagement/InterestedList/Report/chartHandler', () => {
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

  test('normalizeChart test', async () => {
    const data = [
      {
        _id: '',
        invalid: '',
        valid: '',
        waiting: '',
      },
    ];
    await normalizeChart(data, { reportTime: '', chartType: '', view: '' });
  });

  test('normalizeChart test pie', async () => {
    const data = [
      {
        _id: '',
        invalid: '',
        valid: '',
        waiting: '',
      },
    ];
    await normalizeChart(data, { reportTime: '', chartType: 'pie', view: '' });
  });

  test('normalizeChart test pie view count', async () => {
    const data = [
      {
        _id: '',
        invalid: '',
        valid: '',
        waiting: '',
      },
    ];
    await normalizeChart(data, {
      reportTime: '',
      chartType: 'pie',
      view: 'count',
    });
  });

  test('normalizeChart test bar', async () => {
    const data = [
      {
        _id: '',
        invalid: '',
        valid: '',
        waiting: '',
      },
    ];
    await normalizeChart(data, { reportTime: '', chartType: 'bar', view: '' });
  });

  test('normalizeChart test line', async () => {
    const data = [
      {
        _id: '',
        invalid: '',
        valid: '',
        waiting: '',
      },
    ];
    await normalizeChart(data, { reportTime: '', chartType: 'line', view: '' });
  });
});
