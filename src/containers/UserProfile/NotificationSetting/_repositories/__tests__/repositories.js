import { getListNotification, putUpdateNotification } from '../repositories';

describe('src/containers/UserProfile/NotificationSetting/_repositories', () => {
  test('putUpdateNotification', () => {
    expect(putUpdateNotification({})).toBeTruthy();
  });

  test('getListNotification', () => {
    expect(getListNotification({})).toBeTruthy();
  });
});
