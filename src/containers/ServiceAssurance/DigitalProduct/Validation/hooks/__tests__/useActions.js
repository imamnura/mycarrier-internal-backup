import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import {
  getFirstCall,
  getProduct,
  getService,
  getSegment,
  getDetail,
  getDetailDummy,
  getComplaint,
  getUrgency,
  getSymptomp,
  // submitValidation,
  getDummySid,
  updateTicket,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('react-hook-form');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ServiceAssurance/Gameqoo/Validation/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      asPath: route.digitalProduct('gameqoo-validation', 'tes'),
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
      watch: jest.fn().mockReturnValue('productId'),
      getValues: jest.fn().mockReturnValue('productId'),
      reset: jest.fn(),
    });
  });

  test('run properly', async () => {
    getDetail.mockResolvedValue({
      data: { nipnas: '123', serviceId: 'serId', productName: 'productName' },
    });
    updateTicket.mockResolvedValue({ data: {} });
    getFirstCall.mockResolvedValue({
      data: [{}],
    });
    getProduct.mockResolvedValue({
      data: [{ productName: 'productName', productId: 'productId' }],
    });
    getService.mockResolvedValue({
      data: [{}],
    });
    getSegment.mockResolvedValue({
      data: [{}],
    });
    getDetailDummy.mockResolvedValue({});
    getComplaint.mockResolvedValue({
      data: [{}],
    });
    getUrgency.mockResolvedValue({
      data: [{}],
    });
    getSymptomp.mockResolvedValue({
      data: [{}],
    });
    getDummySid.mockResolvedValue({
      data: [{}],
    });

    const props = {
      feature: ['update_status_ticket_digital_product'],
      match: { params: { id: 'tes' } },
    };
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setValue('');
      await result.current.handleDummySid();
      await result.current.fetch.fetchDummySid();
      await result.current.handleCheck();
      await result.current.confirmValidation({});
      await result.current.handleValidationSubmit({ productId: 'id' });
      await result.current.handleSubmit({});
      await result.current.fetch.fetchSubmitValidation();

      res = await result;
    });

    await expect(res.current.detail).toMatchObject({});
  });

  test('run properly dummy sid', async () => {
    useForm.mockReturnValue({
      control: {},
      handleSubmit: jest.fn(),
      formState: {
        isDirty: false,
        isValid: false,
      },
      setValue: jest.fn(),
      watch: jest.fn().mockReturnValue('serviceId'),
      getValues: jest.fn(),
      reset: jest.fn(),
    });
    getDetail.mockResolvedValue({
      data: { nipnas: '123', serviceId: 'serId' },
    });
    updateTicket.mockResolvedValue({ data: {} });
    getFirstCall.mockResolvedValue({
      data: [{}],
    });
    getProduct.mockResolvedValue({
      data: [{ productName: 'productName', productId: 'productId' }],
    });
    getService.mockResolvedValue({
      data: [{}],
    });
    getSegment.mockResolvedValue({
      data: [{}],
    });
    getDetailDummy.mockResolvedValue({});
    getComplaint.mockResolvedValue({
      data: [{}],
    });
    getUrgency.mockResolvedValue({
      data: [{}],
    });
    getSymptomp.mockResolvedValue({
      data: [{}],
    });
    getDummySid.mockResolvedValue({
      data: [{ serviceId: 'serviceId', productName: 'productName' }],
    });

    const props = {
      feature: ['update_status_ticket_digital_product'],
      match: { params: { id: 'tes' } },
    };
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setValue('');
      await result.current.handleDummySid();
      await result.current.fetch.fetchDummySid();
      await result.current.handleCheck();
      await result.current.confirmValidation({});
      await result.current.handleValidationSubmit({ productId: 'id' });
      await result.current.handleSubmit({});
      await result.current.fetch.fetchSubmitValidation();

      res = await result;
    });

    await expect(res.current.detail).toMatchObject({});
  });

  test('run properly no feature', async () => {
    getFirstCall.mockResolvedValue({
      data: [{}],
    });
    getProduct.mockResolvedValue({
      data: [{}],
    });
    getService.mockResolvedValue({
      data: [{}],
    });
    getSegment.mockResolvedValue({
      data: [{}],
    });
    getDetail.mockResolvedValue({});
    getDetailDummy.mockResolvedValue({});
    getComplaint.mockResolvedValue({
      data: [{}],
    });
    getUrgency.mockResolvedValue({
      data: [{}],
    });
    getSymptomp.mockResolvedValue({
      data: [{}],
    });
    getDummySid.mockResolvedValue({
      data: [{}],
    });

    const props = {
      feature: [''],
      match: { params: { id: 'tes' } },
    };
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.detail).toMatchObject({});
  });

  test('run properly rejected error', async () => {
    getFirstCall.mockRejectedValue({ message: '' });
    getProduct.mockRejectedValue({ message: '' });
    getService.mockRejectedValue({ message: '' });
    getSegment.mockRejectedValue({ message: '' });
    getDetail.mockRejectedValue({ message: '' });
    updateTicket.mockRejectedValue({ message: '' });
    getDetailDummy.mockRejectedValue({ message: '' });
    getComplaint.mockRejectedValue({ message: '' });
    getUrgency.mockRejectedValue({ message: '' });
    getSymptomp.mockRejectedValue({ message: '' });
    getDummySid.mockRejectedValue({ message: '' });

    const props = {
      feature: ['update_status_ticket_digital_product'],
      match: { params: { id: 'tes' } },
    };
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetch.fetchDummySid();
      await result.current.handleValidationSubmit({});

      res = await result;
    });

    await expect(res.current.detail).toMatchObject({});
  });

  test('run properly rejected error product', async () => {
    getDetail.mockResolvedValue({
      data: { nipnas: '123', serviceId: 'serId' },
    });
    getProduct.mockRejectedValue({ message: '' });

    const props = {
      feature: ['update_status_ticket_digital_product'],
      match: { params: { id: 'tes' } },
    };
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.detail).toMatchObject({});
  });

  // test('run properly wrong route', async () => {
  //   useRouter.mockReturnValueOnce({ asPath: '/wrong-route', push: jest.fn(), query: { id: 'tes' } });
  //   getFirstCall.mockResolvedValue({
  //     data: [{}],
  //   });
  //   getProduct.mockResolvedValue({
  //     data: [{}],
  //   });
  //   getService.mockResolvedValue({
  //     data: [{}],
  //   });
  //   getSegment.mockResolvedValue({
  //     data: [{}],
  //   });
  //   getDetail.mockResolvedValue({});
  //   getDetailDummy.mockResolvedValue({});
  //   getComplaint.mockResolvedValue({
  //     data: [{}],
  //   });
  //   getUrgency.mockResolvedValue({
  //     data: [{}],
  //   });
  //   getSymptomp.mockResolvedValue({
  //     data: [{}],
  //   });
  //   getDummySid.mockResolvedValue({
  //     data: [{}],
  //   });
  //   const props = {
  //     feature: ['update_validate_ticket_general_product'],
  //     match: { params: { id: 'tes' } }
  //   };

  //   const {
  //     hydrate,
  //     result,
  //   } = await renderHook(() => useActions(props));

  //   hydrate();

  //   // act(() => {
  //   //   result.current.closeConfirmation();
  //   // });
  // });
});
