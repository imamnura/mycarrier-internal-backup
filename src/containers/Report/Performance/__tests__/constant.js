import { tableHeader } from '../constant';

describe('src/pages/PerformanceReport/constant', () => {
  test('tableHeader', () => {
    expect(tableHeader('po')).not.toBeNull();
    expect(tableHeader('baso')).not.toBeNull();
    expect(tableHeader('default')).toBeNull();
    expect(tableHeader('visitNCX')).not.toBeNull();
  });
});
