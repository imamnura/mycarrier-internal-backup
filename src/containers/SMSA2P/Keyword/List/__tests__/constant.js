import { optionsFilterStatus } from '../constant';

describe('src/containers/SMSA2P/Keyword/List/constant', () => {
  test('optionsFilterStatus', () => {
    expect(optionsFilterStatus('progress')).not.toBeNull();
    expect(optionsFilterStatus('')).not.toBeNull();
  });
});
