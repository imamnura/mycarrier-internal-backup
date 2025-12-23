import useActions from '../useActions';
import { useSnackbar } from 'notistack';
import { renderHook, act } from '@testing-library/react-hooks/server';

jest.mock('notistack');

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall/Msight/lib/KeyData/hooks/useActions', () => {
  useSnackbar.mockReturnValue({
    enqueueSnackbar: jest.fn(),
  });

  global.navigator.clipboard = {
    writeText: jest.fn(),
  };

  test('run properly', () => {
    const { result } = renderHook(() => useActions());
    act(() => {
      result.current.copyToClipboard('value', 'label')();
    });

    expect(result.current.hidden).toBeTruthy();
    expect(result.current.copyToClipboard).toBeTruthy();
  });
});
