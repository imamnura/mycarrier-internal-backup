import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  fetchSubmitBrochure,
  getDetailBrochure,
} from '@containers/ContentManagement/Homepage/_repositories/repositories';
import { ASSETS_URL } from '@constants/env';

jest.mock('@containers/ContentManagement/Homepage/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ContentManagement/Homepage/Create/BrochureUpload/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      asPath: route.brochure('edit'),
      push: jest.fn(),
      query: { id: '1' },
    });
  });

  const resolvedDetail = {
    data: {
      description: 'sample 14 desc',
      fileType: 'pdf',
      id: '1',
      name: 'sample-14.pdf',
      path: `${ASSETS_URL}/ewz-mycarrier-pub-dev/catalogpublic/name.png`,
      size: '0.00 MB',
    },
  };

  const payload = {
    name: 'name1.png',
    description: 'description here',
    file: {},
    media: {},
    type: 'homepage',
  };

  const feature = [''];

  test('run properly edit', async () => {
    useRouter.mockReturnValue({
      asPath: route.brochure('edit', '1'),
      push: jest.fn(),
      query: { id: '1' },
    });

    getDetailBrochure.mockResolvedValue(resolvedDetail);
    fetchSubmitBrochure.mockRejectedValue({});

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setFile({ name: 'name.png' });
      await result.current.handleUploadFile({ name: 'name.png' });
      await result.current.confirmUpload({});
      await result.current.handleSubmit({});
      await result.current.handleCancel();
      await result.current.redirectToList()();
      await result.current.redirectToDetail('1')();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
    await expect(res.current.detail).toBeTruthy();
  });

  test('run properly edit other state file name', async () => {
    useRouter.mockReturnValue({
      asPath: route.brochure('edit', '1'),
      push: jest.fn(),
      query: { id: '1' },
    });

    getDetailBrochure.mockResolvedValue(resolvedDetail);
    fetchSubmitBrochure.mockResolvedValue(payload);

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setFile({ name: 'name1.png' });
      await result.current.handleUploadFile({ name: 'name1.png' });
      await result.current.confirmUpload({});
      await result.current.handleSubmit({});
      await result.current.submitUpload(payload)();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
    await expect(res.current.detail).toBeTruthy();
  });

  test('run properly reject', async () => {
    useRouter.mockReturnValue({
      asPath: route.brochure('edit', '1'),
      push: jest.fn(),
      query: { id: '1' },
    });

    getDetailBrochure.mockRejectedValue({ message: 'error' });
    fetchSubmitBrochure.mockRejectedValue({ message: 'error' });

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.confirmUpload(payload);
      await result.current.handleSubmit(payload);
      await result.current.submitUpload(payload)();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run properly other state edit', async () => {
    useRouter.mockReturnValue({
      asPath: route.brochure('edit', '1'),
      push: jest.fn(),
      query: { id: '1' },
    });

    getDetailBrochure.mockResolvedValue(resolvedDetail);

    const props = { feature: ['update_brochure', 'create_brochure'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.confirmUpload({});
      await result.current.handleSubmit({});
      await result.current.submitUpload(payload)();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('fetch submit create', async () => {
    useRouter.mockReturnValue({
      asPath: route.brochure('create'),
      push: jest.fn(),
      query: { id: '' },
    });

    fetchSubmitBrochure.mockResolvedValue(payload);

    const props = { feature: ['create_brochure'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.confirmUpload(payload);
      await result.current.handleSubmit(payload);
      await result.current.submitUpload(payload)();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
