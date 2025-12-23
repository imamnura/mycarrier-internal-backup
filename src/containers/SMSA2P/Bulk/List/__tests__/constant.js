import { optionsFilterStatus, tableHeader } from '../constant';

describe('src/containers/SMSA2P/Bulk/List/constant', () => {
  test('optionsFilterStatus', () => {
    expect(optionsFilterStatus('onprogress')).not.toBeNull();
    expect(optionsFilterStatus('done')).not.toBeNull();
  });
  test('tableHeader', () => {
    expect(tableHeader('done')).not.toBeNull();
    expect(tableHeader('onprogress')).not.toBeNull();
  });
});
