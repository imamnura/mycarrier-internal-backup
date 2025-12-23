import {
  getListVisitNeucentrix,
  getDetailVisitNcx,
  updateStepVisitNcx,
  getAmList,
  getVisitHistoryList,
} from '../repositories';

describe('src/pages/Neucentrix/VisitNeucentrix/_repositories', () => {
  test('getDetailVisitNcx', () => {
    expect(getDetailVisitNcx({})).toBeTruthy();
  });

  test('getListVisitNeucentrix', () => {
    expect(getListVisitNeucentrix({})).toBeTruthy();
  });

  test('updateStepVisitNcx', () => {
    expect(updateStepVisitNcx({})).toBeTruthy();
  });

  test('getAmList', () => {
    expect(getAmList({})).toBeTruthy();
  });

  test('getVisitHistoryList', () => {
    expect(getVisitHistoryList({})).toBeTruthy();
  });
});
