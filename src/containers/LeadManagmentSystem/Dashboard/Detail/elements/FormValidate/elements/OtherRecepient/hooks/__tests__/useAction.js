import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/FormValidate/elements/OtherRecepient/hooks/useAction', () => {
  afterEach(cleanup);

  const props = {
    setActiveStep: jest.fn().mockReturnValue(jest.fn()),
    control: {},
    handleSubmit: jest.fn(),
    onSubmit: jest.fn(),
    formState: {},
    feature: [],
  };

  test('run properly', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmit();
      await result.current.onPrevious();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
