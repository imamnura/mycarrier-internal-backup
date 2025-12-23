import * as actions from '../action';
import fetch from '@__old/utils/fetch';

jest.mock('@__old/utils/fetch');

const mockFnResolve = () =>
  new Promise((resolve) =>
    resolve({
      data: [],
      params: {
        chartType: 1,
        reportTime: 10,
        operatorId: 10,
      },
    }),
  );

const mockFnReject = () => new Promise((resolve, reject) => reject({}));

describe('src/pages/SMSCReport/action', () => {
  let dispatch;
  const callback = jest.fn();

  beforeEach(() => {
    dispatch = jest.fn();
  });

  const data = {
    custAccntNum: '',
    reportTime: 'daily',
    operatorId: '',
    startDate: '',
    endDate: '',
    chartType: 'bar',
  };

  const payloadDownload = {
    operatorId: '',
    reportTime: '',
    custAccntNum: '',
    startDate: '',
    endDate: '',
  };

  test('call dispatch getDataChart success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getDataChart(data)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch getDataChart error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getDataChart(data)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch resetGraphData success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.resetGraphData()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch downloadReporting success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.downloadReporting(payloadDownload, callback)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  test('call dispatch downloadReporting error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.downloadReporting(payloadDownload, callback)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  test('call dispatch getListCustomerSMSC success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getListCustomerSMSC()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch getListCustomerSMSC error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getListCustomerSMSC()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});
