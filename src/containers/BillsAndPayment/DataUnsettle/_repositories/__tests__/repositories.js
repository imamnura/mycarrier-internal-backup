import { getListDataUnsettle, getDetailDataUnsettle } from '../repositories';

describe('src/Pages/BillsAndaPayment/DataUnsettle/repositories', () => {
  test('list', () => {
    expect(getListDataUnsettle({})).not.toBeNull();
  });
  test('detail', () => {
    expect(getDetailDataUnsettle({})).not.toBeNull();
  });
});
