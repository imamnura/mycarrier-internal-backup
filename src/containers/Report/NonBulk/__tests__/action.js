import * as actions from '../action';
import fetch from '@__old/utils/fetch';

jest.mock('@__old/utils/fetch');

const mockFnResolve = () =>
  new Promise((resolve) =>
    resolve({
      data: {},
    }),
  );
const mockFnResolveData = () =>
  new Promise((resolve) =>
    resolve({
      data: {
        detail: 'tes',
      },
    }),
  );

const mockFnReject = () => new Promise((resolve, reject) => reject({}));

describe('src/pages/LBAReport/action', () => {
  let dispatch;
  const callback = jest.fn();

  beforeEach(() => {
    dispatch = jest.fn();
  });

  const payload = {
    custAccntNum: '',
    reportTime: '',
    reportType: '',
    startDate: '',
    endDate: '',
    chartType: 'bar',
  };

  const params = {
    custAccntNum: 'test',
    reportTime: 'test',
    reportType: 'test',
    startDate: 'test',
    endDate: 'test',
  };

  it('call resetGraphData success', async () => {
    await actions.resetGraphData()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('calls dispatch getDataChart success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getDataChart(payload)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('calls dispatch getDataChart success with data', async () => {
    await fetch.mockImplementation(mockFnResolveData);
    await actions.getDataChart(payload)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch getDataChart error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getDataChart(payload)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch resetGraphData success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.resetGraphData()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch downloadReporting success', async () => {
    window.open = jest.fn();
    await fetch.mockImplementation(mockFnResolve);
    await actions.downloadReporting(params, callback)(dispatch);
    expect(callback).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch downloadReporting error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.downloadReporting(params, callback)(dispatch);
    expect(callback).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
  });
});
