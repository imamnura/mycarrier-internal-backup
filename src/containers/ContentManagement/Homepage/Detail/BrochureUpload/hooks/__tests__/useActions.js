import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  getDetailBrochure,
  deleteBrochure,
} from '@containers/ContentManagement/Homepage/_repositories/repositories';
import { ASSETS_URL } from '@constants/env';

jest.mock('@containers/ContentManagement/Homepage/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

const resolvedDetail = {
  createdAt: '2023-02-08T05:03:48.328Z',
  description: 'sample 12 desc',
  fileType: 'pdf',
  id: 'DOC-32628418',
  name: 'sample-12.pdf',
  path: `${ASSETS_URL}/ewz-mycarrier-pub-dev/homepage/sample-12.pdf`,
  size: '0.00 MB',
  document: {
    fileUrl: `${ASSETS_URL}/ewz-mycarrier-pub-dev/homepage/sample-12.pdf`,
    fileName: 'sample-12.pdf',
  },
};

describe('src/containers/ContentManagement/Homepage/Detail/BrochureUpload/hooks/useActions', () => {
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
      asPath: route.brochure('detail', '1'),
      push: jest.fn(),
      query: { id: '1' },
    });
    getDetailBrochure.mockResolvedValue(resolvedDetail);
  });

  const feature = [''];

  test('run properly', async () => {
    useRouter.mockReturnValue({
      asPath: route.brochure('detail', '1'),
      push: jest.fn(),
      query: { id: '1' },
    });

    getDetailBrochure.mockResolvedValue(resolvedDetail);

    deleteBrochure.mockResolvedValue({ success: true });

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.editBrochure('1');
      await result.current.confirmDelete('1');
      await result.current.redirectList()();
      await result.current.onDelete()();

      res = await result;
    });

    await expect(res.current.detailBrochure).toBeTruthy();
  });

  test('run properly with feature', async () => {
    useRouter.mockReturnValue({
      asPath: route.brochure('detail', '1'),
      push: jest.fn(),
      query: { id: '1' },
    });

    getDetailBrochure.mockResolvedValue(resolvedDetail);

    deleteBrochure.mockResolvedValue({ success: true });

    const props = { feature: ['delete_brochure', 'update_brochure'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.editBrochure('1');
      await result.current.confirmDelete('1');

      res = await result;
    });

    await expect(res.current.detailBrochure).toBeTruthy();
  });

  test('run properly failed', async () => {
    useRouter.mockReturnValue({
      asPath: route.brochure('detail', '1'),
      push: jest.fn(),
      query: { id: '1' },
    });

    getDetailBrochure.mockRejectedValue({ success: false });
    deleteBrochure.mockRejectedValue({ message: 'Failed to Delete Brochure' });

    const props = { feature: ['delete_brochure'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onDelete()();

      res = await result;
    });

    await expect(res.current.detailBrochure).toBeTruthy();
  });
});
