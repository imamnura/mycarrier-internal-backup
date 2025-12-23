import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import {
  getDetailBakes,
  putBakesReviewer,
  putStatusBakes,
  uploadSignedBakes,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/pages/Document/Bakes/Detail/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  test('run properly', async () => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({ push: jest.fn(), query: { id: 'id-test' } });
    getDetailBakes.mockResolvedValue({
      data: {
        bakesId: 'id-test',
      },
    });
    putStatusBakes.mockResolvedValue({
      data: {},
    });
    uploadSignedBakes.mockResolvedValue({
      data: {},
    });
    putBakesReviewer.mockResolvedValue({
      data: {},
    });

    const props = { feature: [] };

    const { result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    await waitForNextUpdate();

    await act(async () => {
      await result.current.onEdit();
      await result.current.setPopUp({})();
      await result.current.closePopUp();
      await result.current.setUploadSignedBakes()();
      await result.current.onSubmitUploadSignedBakes({ file: { file: {} } });
      await result.current.onSubmitEditReviewer({});
    });

    await expect(result.current.data).toBeTruthy();
  });

  test('run failed fetch', async () => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({ push: jest.fn(), query: { id: 'id-test' } });
    getDetailBakes.mockRejectedValue({
      data: {
        bakesId: 'id-test',
      },
    });
    putStatusBakes.mockRejectedValue({
      data: {},
    });
    uploadSignedBakes.mockRejectedValue({
      data: {},
    });
    putBakesReviewer.mockRejectedValue({
      data: {},
    });

    const props = { feature: [] };

    const { result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    await waitForNextUpdate();

    await act(async () => {
      await result.current.onEdit();
      await result.current.onSubmitUploadSignedBakes({ file: { file: {} } });
      await result.current.onSubmitEditReviewer({});
    });

    await expect(result.current.data).toBeFalsy();
  });

  test('empty id', async () => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({ push: jest.fn(), query: { id: '' } });
    getDetailBakes.mockRejectedValue({
      data: {
        bakesId: 'id-test',
      },
    });

    const props = { feature: [] };

    const { result } = await renderHook(() => useActions(props));

    await expect(result.current.data).toBeFalsy();
  });
});
