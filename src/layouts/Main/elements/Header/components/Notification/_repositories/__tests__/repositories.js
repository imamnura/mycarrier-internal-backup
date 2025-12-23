import { isRole } from '@__old/utils/common';
import {
  clickNotificationBell,
  getListNotification,
  readNotification,
} from '../repositories';

jest.mock('@__old/utils/common');

describe('src/layouts/Main/elements/Header/components/Notification/_repositories/repositories', () => {
  test('clickNotificationBell', () => {
    expect(clickNotificationBell({})).not.toBeUndefined();
  });

  test('getListNotification', () => {
    isRole.mockReturnValueOnce(true);
    expect(getListNotification()).not.toBeUndefined();
  });

  test('readNotification', () => {
    isRole.mockReturnValueOnce(true);
    expect(readNotification('id')).not.toBeUndefined();
  });
});
