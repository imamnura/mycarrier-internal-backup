import { verifyCaptcha, login, subscribeNotification } from '../repositories';

describe('src/pages/Authentication/_repositories/repositories', () => {
  test('verifyCaptcha', () => {
    expect(verifyCaptcha('token')).not.toBeUndefined();
  });

  test('login', () => {
    expect(login({}, 'token')).not.toBeUndefined();
  });

  test('subscribeNotification', () => {
    expect(subscribeNotification('token')).not.toBeUndefined();
  });
});
