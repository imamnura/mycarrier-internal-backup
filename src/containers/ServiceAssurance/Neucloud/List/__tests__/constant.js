import { statusFilter, tableHeader } from '../constant';

describe('src/pages/ServiceAssurance/Neucloud/List/constant', () => {
  test('statusFilter', () => {
    expect(statusFilter).not.toBeNull();
  });

  test('tableHeader', () => {
    expect(tableHeader).not.toBeNull();
  });
});
