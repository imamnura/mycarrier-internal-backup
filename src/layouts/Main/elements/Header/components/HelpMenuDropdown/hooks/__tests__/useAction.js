import { renderHook, cleanup } from '@testing-library/react-hooks';
import { getVersionInfo } from '../../_repositories/repositories';
import useAction from '../useAction';
import { getAccessToken, isAfterLogin } from '@utils/common';

jest.mock('../../_repositories/repositories');
jest.mock('@utils/common');

describe('src/fragments/WhatsNew/hooks/useAction', () => {
  afterEach(() => {
    cleanup();
  });

  test('run properly', async () => {
    getAccessToken.mockReturnValue('Bearer xxxx');
    isAfterLogin.mockReturnValue(true);
    getVersionInfo.mockResolvedValue({
      data: {
        popUpStatus: true,
        content: 'xxxx',
      },
    });

    const { result, waitFor } = await renderHook(() => useAction());

    waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });
  });

  test('empty content', async () => {
    getAccessToken.mockReturnValue('Bearer xxxx');
    isAfterLogin.mockReturnValue(true);
    getVersionInfo.mockResolvedValue({
      data: {
        popUpStatus: true,
        content: '',
      },
    });

    const { result } = await renderHook(() => useAction());

    expect(result.current.data).toBeFalsy();
  });

  test('fetch rejected', async () => {
    getAccessToken.mockReturnValue('Bearer xxx');
    isAfterLogin.mockReturnValue(true);
    getVersionInfo.mockRejectedValue({});

    const { result } = await renderHook(() => useAction());

    expect(result.current.data).toBeFalsy();
  });

  test('run others', async () => {
    getAccessToken.mockReturnValue('');
    isAfterLogin.mockReturnValue(false);
    getVersionInfo.mockResolvedValue({
      data: {
        popUpStatus: true,
        content: '',
      },
    });

    const { result } = await renderHook(() => useAction());

    expect(result.current.data).toBeFalsy();
  });
});
