import * as actions from '../action';
import fetch from '../../../../../__old/utils/fetch';

jest.mock('@__old/utils/fetch');

const mockFnResolve = () =>
  new Promise((resolve) =>
    resolve({
      data: {},
    }),
  );

const mockFnReject = () => new Promise((resolve, reject) => reject({}));

describe('src/containers/ContentManagement/InterestedList/Report/action', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  const payload = {
    reportTime: '',
    status: '',
    source: '',
    startDate: '',
    endDate: '',
  };

  test('getInterestedGraph success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getInterestedGraph(payload)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getInterestedGraph error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getInterestedGraph(payload)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getInterestedGraphProduct success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getInterestedGraphProduct(payload)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getInterestedGraphProduct error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getInterestedGraphProduct(payload)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getProduct success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getProduct()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getProduct error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getProduct()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getSource success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getSource()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getSource error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getSource()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getInterestedGraphAM success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getInterestedGraphAM({ filter: '', search: 'test' })(
      dispatch,
    );
    expect(dispatch).toHaveBeenCalled();
  });

  test('getInterestedGraphAM error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getInterestedGraphAM({ filter: '', search: 'test' })(
      dispatch,
    );
    expect(dispatch).toHaveBeenCalled();
  });

  test('getInterestedGraphSegment success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getInterestedGraphSegment({ filter: '', search: 'test' })(
      dispatch,
    );
    expect(dispatch).toHaveBeenCalled();
  });

  test('getInterestedGraphSegment error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getInterestedGraphSegment({ filter: '', search: 'test' })(
      dispatch,
    );
    expect(dispatch).toHaveBeenCalled();
  });

  test('getAMValid success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getAMValid()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getAMValid error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getAMValid()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getSegmentValid success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getSegmentValid()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getSegmentValid error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getSegmentValid()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});
