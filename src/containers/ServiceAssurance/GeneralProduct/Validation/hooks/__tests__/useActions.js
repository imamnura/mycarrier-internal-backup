import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import { useForm } from 'react-hook-form';
import {
  getFirstCall,
  getProduct,
  getService,
  getSegment,
  getDetailGeneralProduct,
  getDetailDummy,
  getComplaint,
  getUrgency,
  getSymptomp,
  // submitValidation,
  getDummySid,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('react-hook-form');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ServiceAssurance/GeneralProduct/List/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      asPath: route.generalProduct('validation', 'tes'),
      push: jest.fn(),
      query: { id: 'tes' },
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
    });
    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });
    useForm.mockReturnValue({
      control: {},
      handleSubmit: jest.fn(),
      formState: {
        isDirty: false,
        isValid: false,
      },
      setValue: jest.fn(),
      watch: jest.fn(),
      getValues: jest.fn(),
    });
  });

  test('run properly', async () => {
    getDetailGeneralProduct.mockResolvedValue({
      data: {
        nipnas: '123',
        productId: '123',
        productName: 'product',
        serviceId: '123',
      },
    });
    getFirstCall.mockResolvedValue({ data: [{}] });
    getProduct.mockResolvedValue({
      data: [{ productId: '123', productName: 'product' }],
    });
    getService.mockResolvedValue({ data: [{}] });
    getSegment.mockResolvedValue({ data: [{}] });
    getComplaint.mockResolvedValue({ data: [{}] });
    getUrgency.mockResolvedValue({ data: [{}] });
    getSymptomp.mockResolvedValue({ data: [{}] });
    getDummySid.mockResolvedValue({
      data: [{ value: { serviceId: '123' } }, { value: { serviceId: '1234' } }],
    });
    getDetailDummy.mockResolvedValue({});
    const props = {
      feature: ['update_validate_ticket_general_product'],
      match: { params: { id: 'tes' } },
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleDummySid();
      await result.current.confirmValidation({});
      await result.current.handleCheck();
      await result.current.fetch.fetchDummySid();
      await result.current.fetch.fetchSubmitValidation();
      await result.current.handleChangeSymptomp({})();

      res = await result;
    });

    await expect(res.current.detail).toMatchObject({});
  });

  test('run properly no feature', async () => {
    getFirstCall.mockResolvedValue({ data: [{}] });
    getProduct.mockResolvedValue({ data: [{}] });
    getService.mockResolvedValue({ data: [{}] });
    getSegment.mockResolvedValue({ data: [{}] });
    getDetailGeneralProduct.mockResolvedValue({});
    getDetailDummy.mockResolvedValue({});
    getComplaint.mockResolvedValue({ data: [{}] });
    getUrgency.mockResolvedValue({ data: [{}] });
    getSymptomp.mockResolvedValue({ data: [{}] });
    getDummySid.mockResolvedValue({ data: [{}] });
    const props = {
      feature: [''],
      match: { params: { id: 'tes' } },
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.confirmValidation({});
      await result.current.handleCheck();
      await result.current.handleDummySid();
      await result.current.fetch.fetchDummySid();
      await result.current.fetch.fetchSubmitValidation();
      await result.current.handleChangeSymptomp({})();

      res = await result;
    });

    await expect(res.current.detail).toMatchObject({});
  });

  test('run properly rejected error', async () => {
    getFirstCall.mockRejectedValue({ message: '' });
    getProduct.mockRejectedValue({ message: '' });
    getService.mockRejectedValue({ message: '' });
    getSegment.mockRejectedValue({ message: '' });
    getDetailGeneralProduct.mockRejectedValue({ message: '' });
    getDetailDummy.mockRejectedValue({ message: '' });
    getComplaint.mockRejectedValue({ message: '' });
    getUrgency.mockRejectedValue({ message: '' });
    getSymptomp.mockRejectedValue({ message: '' });
    getDummySid.mockRejectedValue({ message: '' });
    const props = {
      feature: ['update_validate_ticket_general_product'],
      match: { params: { id: 'tes' } },
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleDummySid();

      res = await result;
    });

    await expect(res.current.detail).toMatchObject({});
  });

  test('run properly wrong route', async () => {
    useRouter.mockReturnValueOnce({
      asPath: '/wrong-route',
      push: jest.fn(),
      query: { id: 'tes' },
    });
    getFirstCall.mockResolvedValue({ data: [{}] });
    getProduct.mockResolvedValue({ data: [{}] });
    getService.mockResolvedValue({ data: [{}] });
    getSegment.mockResolvedValue({ data: [{}] });
    getDetailGeneralProduct.mockResolvedValue({});
    getDetailDummy.mockResolvedValue({});
    getComplaint.mockResolvedValue({ data: [{}] });
    getUrgency.mockResolvedValue({ data: [{}] });
    getSymptomp.mockResolvedValue({ data: [{}] });
    getDummySid.mockResolvedValue({ data: [{}] });
    const props = {
      feature: ['update_validate_ticket_general_product'],
      match: { params: { id: 'tes' } },
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.detail).toMatchObject({});
  });
});
