import { renderHook } from '@testing-library/react-hooks';
import useAction from '../useAction';

describe('src/component/Form/Approval/hooks/useAction', () => {
  test('run properly', async () => {
    const { result } = await renderHook(() =>
      useAction({
        labelValidate: 'xxx',
        onSubmit: jest.fn(),
      }),
    );

    expect(result.current.control).toBeTruthy();
  });
});
