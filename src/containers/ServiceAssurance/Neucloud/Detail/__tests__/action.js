import * as actions from '../action';
import fetch from '../../../../../__old/utils/fetch';

jest.mock('@__old/utils/fetch');

const mockFnResolve = () => new Promise((resolve) => resolve({ data: {} }));
const mockFnReject = () => new Promise((resolve, reject) => reject({}));

describe('src/pages/ServiceAssurance/Neucloud/Detail/action', () => {
  let dispatch;
  const callback = jest.fn();

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('call cleanUp success', async () => {
    await actions.cleanUp()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  it('call get detail FaultHandlingDetailNeucloud success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getDetailServiceAssuranceNeucloud(1)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    // expect(callback).toHaveBeenCalled();
  });

  it('call get detail FaultHandlingDetailNeucloud error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getDetailServiceAssuranceNeucloud(1)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  it('call update status FaultHandlingDetailNeucloud success', async () => {
    let payload = {
      status: 'checking',
    };
    await fetch.mockImplementation(mockFnResolve);
    await actions.updateStatus(1, payload, 'UpdateStatus', callback)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it('call update status FaultHandlingDetailNeucloud error', async () => {
    let payload = {
      status: 'checking',
    };
    await fetch.mockImplementation(mockFnReject);
    await actions.updateStatus(1, payload, 'UpdateStatus', callback)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });
});
