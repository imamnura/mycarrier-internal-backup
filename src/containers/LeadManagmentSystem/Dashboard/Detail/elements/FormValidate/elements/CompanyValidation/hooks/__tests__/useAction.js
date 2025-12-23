import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { getListCompany } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/FormValidate/elements/CompanyValidation/hooks/useAction', () => {
  afterEach(cleanup);

  const props = {
    setActiveStep: jest.fn().mockReturnValue(jest.fn()),
    control: {},
    handleSubmit: jest.fn(),
    isOtherCustomer: false,
    feature: [],
  };

  test('run properly', async () => {
    getListCompany.mockResolvedValue({
      data: [{}],
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmit();
      // await result.current.customerAsyncProps.loadOptions('', [], { page: 1 });
      await result.current.customerAsyncProps.loadOptions('', [], { page: 1 });
      // await result.current.fetchOptionCompany(0);

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
