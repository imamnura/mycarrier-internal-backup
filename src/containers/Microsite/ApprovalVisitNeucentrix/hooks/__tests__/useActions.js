import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import {
  getDataMicrositeVisitNCX,
  updateStatusVisitNCX,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('next/router');
jest.mock('../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (v) => [v, jest.fn()],
  useEffect: (cb) => cb(),
}));

describe('src/containers/Microsite/ApprovalVisitNeucentrix/hooks/useActions', () => {
  afterEach(cleanup);

  beforeEach(() => {
    useRouter.mockReturnValue({
      query: { params: 'am', id: 'MCR123' },
      push: jest.fn(),
    });
  });

  usePopupAlert.mockReturnValue({
    setFailedAlert: jest.fn(),
    setSuccessAlert: jest.fn(),
    setLoadingAlert: jest.fn(),
  });

  const props = { feature: [] };
  const resolvedData = {
    data: {
      document: [
        {
          type: 'SPK',
          fileUrl:
            'https://minio-assurance-staging.telkomdigitalsolution.co/tdscustomer/neucentrix_visit/spk_1674879189567_spk.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=iTuSf4n7p8T38rJXf2Ap%2F20230201%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230201T065236Z&X-Amz-Expires=120&X-Amz-SignedHeaders=host&X-Amz-Signature=e9674b81609310bc7b967f4137d27425604a78a308d1eac33798727a780795ac',
          fileName: 'spk_1674879189567_spk.pdf',
        },
        {
          type: 'KTP',
          fileUrl:
            'https://minio-assurance-staging.telkomdigitalsolution.co/tdscustomer/neucentrix_visit/ktp_1673512910253_ktpdummy.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=iTuSf4n7p8T38rJXf2Ap%2F20230201%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230201T065236Z&X-Amz-Expires=120&X-Amz-SignedHeaders=host&X-Amz-Signature=bda51ffd1a94c1e8caa9eb3234e4d7cb8631ea46635babfc914a057ec256273a',
          fileName: 'ktp_1673512910253_ktpdummy.png',
        },
      ],
    },
  };

  test('run properly', async () => {
    getDataMicrositeVisitNCX.mockResolvedValue(resolvedData);
    updateStatusVisitNCX.mockResolvedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      await result.current.onClose();
      await result.current.fetchUpdateStatus({ status: 'approved' });
      result.current.clearConfirmation();
      result.current.onClickApprove('am');
      result.current.onClickApprove('marketing');
      result.current.actionApprove({ type: 'marketing' })();
      res = result;
    });
    expect(res.current.detail).toBeTruthy();
  });

  test('run without id', async () => {
    useRouter.mockReturnValue({ query: {}, push: jest.fn() });
    const { result } = renderHook(() => useActions(props));
    expect(result.current.detail).toBeTruthy();
  });

  test('fetch rejected', async () => {
    getDataMicrositeVisitNCX.mockRejectedValue({ message: 'error' });
    updateStatusVisitNCX.mockRejectedValue({ message: 'error' });
    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      await result.current.fetchUpdateStatus({ status: 'approved' });
      res = result;
    });

    expect(res.current.detail).toBeTruthy();
  });
});
