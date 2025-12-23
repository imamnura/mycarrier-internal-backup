import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { useRouter } from 'next/router';
import { route } from '@configs';
import {
  getAMProfile,
  getCustomerProfile,
  // addAMMapping,
} from '@containers/ContentManagement/AmMapping/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@containers/ContentManagement/AmMapping/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ContentManagement/AmMapping/Add/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  // const event = {
  //   preventDefault() {},
  //   target: { value: 'the-value' },
  // };

  const returnAction = {
    optionsAMProfile: [],
    loadingAMProfile: false,
    optionsCustomerProfile: [],
    loadingCustomerProfile: false,
    onClickCancel: jest.fn(),
    buttonDisable: false,
    loading: false,
    profile: {
      fullname: 'test',
      userId: 'test',
      metaData: {
        ccHandled: [
          { nipnas: 'test', custAccntNum: 'test', divre: '0' },
          { nipnas: 'test 2', custAccntNum: 'test 2', divre: '1' },
        ],
      },
    },
    customer: {},
    typeProfil: 'name',
    labelProfile: 'fullName',
    typeCustomer: 'name',
    labelCustomer: 'custAccntName',
    handleSubmit: jest.fn(),
    handleGetValueAM: jest.fn(),
    handleGetValueCustomer: jest.fn(),
    handleTypeSearchProfil: jest.fn(),
    handleTypeSearchCustomer: jest.fn(),
  };

  const resolvedAM = {
    data: {
      nik: 'test',
      email: 'test@example.com',
      metaData: {
        fullname: 'test',
        ccHandled: [
          { nipnas: 'test', custAccntNum: 'test', divre: '0' },
          { nipnas: 'test 2', custAccntNum: 'test 2', divre: '1' },
        ],
      },
    },
  };

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
    getAMProfile.mockResolvedValue(resolvedAM);
    getCustomerProfile.mockResolvedValue({});

    useRouter.mockReturnValue({
      pathname: route.amMapping('create'),
      push: jest.fn(),
    });
  });

  test('run properly', async () => {
    useRouter.mockReturnValue({
      pathname: route.amMapping('create'),
      push: jest.fn(),
    });

    getAMProfile.mockResolvedValue(resolvedAM);
    getCustomerProfile.mockResolvedValue({
      custAccntName: 'custName',
      name: 'test',
    });

    const { result, waitForNextUpdate, hydrate } = await renderHook(() =>
      useActions(returnAction),
    );

    hydrate();

    await waitForNextUpdate();
    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() });
      result.current.handleGetValueAM({ fullname: 'test 3' });
      result.current.handleGetValueCustomer({ fullname: 'test 4' });
      result.current.handleTypeSearchProfil('name');
      result.current.handleTypeSearchCustomer('custAccntName');
      result.current.onClickCancel();
    });
  });

  test('run properly others', async () => {
    useRouter.mockReturnValue({
      pathname: route.amMapping('create'),
      push: jest.fn(),
    });

    getAMProfile.mockResolvedValue(resolvedAM);
    getCustomerProfile.mockResolvedValue({
      custAccntName: 'custName',
      name: 'test',
    });

    const { result, waitForNextUpdate, hydrate } = await renderHook(() =>
      useActions(returnAction),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.handleTypeSearchProfil('test');
      result.current.handleTypeSearchCustomer('test');
    });

    expect(result.current).not.toBeUndefined();
  });
});
