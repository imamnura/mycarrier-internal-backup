import { optionsFilterStatus, tableHeader } from '../constant';

describe('src/containers/SMSA2P/UMB/List/constant', () => {
  test('optionsFilterStatus', () => {
    expect(optionsFilterStatus('progress')).not.toBeNull();
    expect(optionsFilterStatus('')).not.toBeNull();
  });
  test('tableHeader', () => {
    expect(tableHeader).not.toBeNull();
  });
});
