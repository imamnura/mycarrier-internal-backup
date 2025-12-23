import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import {
  getDetailOfferingLetter,
  updateStatusOfferingLetter,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/pages/Document/OfferingLetter/Detail/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  test('run properly', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ push: jest.fn(), query: { id: 'id-test' } });
    getDetailOfferingLetter.mockResolvedValue({
      data: {
        offeringLetterId: 'id-test',
      },
    });
    updateStatusOfferingLetter.mockResolvedValue({
      data: {},
    });

    const props = { feature: [] };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onEdit();
    });

    expect(result.current.data).toBeTruthy();
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ push: jest.fn(), query: { id: 'id-test' } });
    getDetailOfferingLetter.mockRejectedValue({});
    updateStatusOfferingLetter.mockRejectedValue({});

    const props = { feature: [] };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onEdit();
    });

    expect(result.current.data).toBeFalsy();
  });

  test('id undefined', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ push: jest.fn(), query: { id: undefined } });
    const props = { feature: [] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.offeringLetterId).toBeFalsy();
  });
});
