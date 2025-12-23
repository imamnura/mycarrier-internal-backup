import { getFirebaseToken } from '@firebaseConfig/utils';
import { isSubscribeFirebase } from '../utils';

jest.mock('../../../../../../firebase/utils');

describe('src/pages/Authentication/Login/elements/LoginForm/utils', () => {
  test('isSubscribeFirebase empty privilege', () => {
    getFirebaseToken.mockReturnValue('token');
    const privileges = [];
    expect(isSubscribeFirebase(privileges)).toBeFalsy();
  });

  test('isSubscribeFirebase empty token', () => {
    getFirebaseToken.mockReturnValue('-');
    const privileges = [];
    expect(isSubscribeFirebase(privileges)).toBeFalsy();
  });

  test('isSubscribeFirebase true', () => {
    getFirebaseToken.mockReturnValue('token');
    const privileges = [{ category: 'SMSA2P' }];
    expect(isSubscribeFirebase(privileges)).toBeTruthy();
  });
});
