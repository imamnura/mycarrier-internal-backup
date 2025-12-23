import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDownloadLeadManagementSystem } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/pages/LeadManagementSystem/Dashboard/List/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'dashboardId' },
      push: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
  });

  const props = {
    feature: ['read_download_list_lead', 'create_new_lead_by_am_lead'],
  };

  test('run properly', async () => {
    getDownloadLeadManagementSystem.mockResolvedValue({ data: {} });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.setFormDownload('test')();
      await result.current.onCreate();
      await result.current.onDownload({ email: 'test' });

      res = await result;
    });

    await expect(res.current.feature).toBeTruthy();
  });

  test('run failed fetch', async () => {
    getDownloadLeadManagementSystem.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onDownload({ email: 'test' });

      res = await result;
    });

    await expect(res.current.feature).toBeTruthy();
  });
});
