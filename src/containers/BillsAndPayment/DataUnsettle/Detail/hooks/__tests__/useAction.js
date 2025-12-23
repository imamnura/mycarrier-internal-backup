import { getDownloadDataUnsettle } from '@containers/BillsAndPayment/DataUnsettle/_repositories/repositories';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useQueryParams from '@utils/hooks/useQueryParams';
import { useRouter } from 'next/router';
import useAction from '../useAction';

jest.mock('../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/useQueryParams');

describe('src/containers/BillsAndPayment/DataUnsettle/Detail/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { segment: 'BMS', invoiceGroup: 'SARTL' },
    });
    useQueryParams.mockReturnValue({ queryParams: { cutOffDate: new Date() } });
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    window.open = jest.fn();
  });

  test('run properly', async () => {
    const props = { feature: [''] };
    getDownloadDataUnsettle.mockResolvedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onDownload();

      res = await result;
    });

    await expect(res.current.data.segment).not.toBeUndefined();
    await expect(res.current.data.invoiceGroup).not.toBeUndefined();
  });

  test('run fetch error', async () => {
    useQueryParams.mockReturnValueOnce({ queryParams: { cutOffDate: null } });
    const props = { feature: [''] };
    getDownloadDataUnsettle.mockRejectedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onDownload();

      res = await result;
    });

    await expect(res.current.data.segment).not.toBeUndefined();
    await expect(res.current.data.invoiceGroup).not.toBeUndefined();
  });
});
