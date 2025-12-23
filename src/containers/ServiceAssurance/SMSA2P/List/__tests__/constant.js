import { filterOptions, tableHeader, statusOptions } from '../constant';

describe('src/pages/ServiceAssurance/SMSA2P/List/constant', () => {
  test('statusFilter', () => {
    expect(filterOptions).not.toBeNull();
  });

  test('tableHeader', () => {
    expect(tableHeader).not.toBeNull();
  });

  test('statusOptions', () => {
    expect(statusOptions('active')).not.toBeNull();
    expect(statusOptions('done')).not.toBeNull();
  });
});
