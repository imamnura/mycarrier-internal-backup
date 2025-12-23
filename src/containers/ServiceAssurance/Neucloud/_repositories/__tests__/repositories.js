import { getList, downloadData, updateTicket } from '../repositories';

describe('src/pages/ServiceAssurance/Neucloud/_repositories/repositories', () => {
  test('getList', () => {
    expect(getList({})).not.toBeNull();
  });

  test('downloadData', () => {
    expect(downloadData({})).not.toBeNull();
  });

  test('updateTicket', () => {
    expect(updateTicket('', {})).not.toBeNull();
  });
});
