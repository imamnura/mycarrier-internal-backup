import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import useActions from '../useActions';

jest.mock('next/router');

describe('src/containers/ServiceAssurance/Gameqoo/Detail/lib/forms/ApproveIssueForm/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({ push: jest.fn() });
  });

  const props = {
    modalApproveIssue: null,
    setModalApproveIssue: jest.fn(),
    referenceId: 'referenceId',
    setModalChooseCategory: jest.fn(),
  };

  test('run properly', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setNetworkType(null)();
      await result.current.onSubmit('referenceId');
      await result.current.onClose();

      res = await result;
    });

    await expect(res.current.networkType).toBeFalsy();
  });

  test('run properly type network', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setNetworkType('network')();
      await result.current.onSubmit('referenceId');
      await result.current.onClose();

      res = await result;
    });

    await expect(res.current.networkType).toBe('network');
  });

  test('run properly type non network', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setNetworkType('nonNetwork')();
      await result.current.onSubmit('referenceId');
      await result.current.onClose();

      res = await result;
    });

    await expect(res.current.networkType).toBe('nonNetwork');
  });
});
