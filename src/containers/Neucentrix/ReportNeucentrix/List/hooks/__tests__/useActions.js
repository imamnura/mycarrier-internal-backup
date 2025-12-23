import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { getListReportNeucentrix } from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

const props = { feature: ['read_detail_report_ncx'] };

describe('src/pages/Neucentrix/ReportNeucentrix/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  test('run properly', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.reportNcx('list'),
      push: jest.fn(),
    });
    getListReportNeucentrix.mockResolvedValue({
      data: [{}],
      meta: { totalPage: 2, page: 1 },
    });
    window.open = jest.fn();

    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.onClickUploadReport();
      result.current.onClickRowTable('RP-123');
      // result.current.onBottomPage();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly/others states', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.reportNcx('list'),
      push: jest.fn(),
    });
    getListReportNeucentrix.mockResolvedValue({
      data: null,
      meta: { totalPage: 2, page: 4 },
    });
    const props = { feature: [] };

    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.onClickRowTable('RP-123');
      // result.current.onBottomPage();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: route.reportNcx('list') });
    getListReportNeucentrix.mockRejectedValue({ messsage: '' });

    const { result } = renderHook(() => useActions(props));

    expect(result.current.list.data).not.toBeUndefined();
  });
});
