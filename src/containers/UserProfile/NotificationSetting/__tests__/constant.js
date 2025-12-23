import { tableHeader } from '../constant';

describe('src/containers/UserProfile/NotificationSetting/constant', () => {
  test('tableHeader', () => {
    expect(tableHeader('purchaseOrder')).not.toBeUndefined();
  });
});
