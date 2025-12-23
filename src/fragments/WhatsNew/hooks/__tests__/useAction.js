import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { getWhatsNewContent } from '../../_repositories/repositories';
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
    getWhatsNewContent.mockResolvedValue({
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
    getWhatsNewContent.mockResolvedValue({
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
    getWhatsNewContent.mockRejectedValue({});

    const { result } = await renderHook(() => useAction());

    act(() => {
      result.current.onClose();
    });

    expect(result.current.data).toBeFalsy();
  });

  test('run others', async () => {
    getAccessToken.mockReturnValue('');
    isAfterLogin.mockReturnValue(false);
    getWhatsNewContent.mockResolvedValue({
      data: {
        popUpStatus: true,
        content: '',
      },
    });

    const { result } = await renderHook(() => useAction());

    expect(result.current.data).toBeFalsy();
  });
});
