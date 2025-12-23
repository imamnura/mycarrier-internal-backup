import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { getDetailReportNeucentrix } from '../../../_repositories/repositories';
import useActions from '../useActions';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('next/router');

describe('src/pages/Document/ReportNeucentrix/Detail/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  const props = { feature: [] };

  test('run properly', async () => {
    useRouter.mockReturnValue({
      pathname: route.reportNcx('detail', 'RP123'),
      push: jest.fn(),
      query: { id: 'rId-1' },
    });
    getDetailReportNeucentrix.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      await result.current.fetchDetail('RP123');
      // result.current.clearConfirmation();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });

  test('run with wrong path', async () => {
    useRouter.mockReturnValue({
      pathname: route.reportNcx('detail', 'RP123'),
      push: jest.fn(),
      query: { id: 'rId-1' },
    });
    getDetailReportNeucentrix.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      await result.current.fetchDetail('RP124');
      // result.current.clearConfirmation();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      pathname: route.reportNcx('detail', 'RP123'),
      push: jest.fn(),
      query: { id: 'rId-1' },
    });
    getDetailReportNeucentrix.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      await result.current.fetchDetail('RP123');
      // result.current.clearConfirmation();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });
});
