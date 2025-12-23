import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import { getSymptomp } from '@containers/ServiceAssurance/Gameqoo/_repositories/repositories';

jest.mock('@containers/ServiceAssurance/Gameqoo/_repositories/repositories');

describe('src/containers/ServiceAssurance/Gameqoo/Validation/lib/SelectWithLevel/lib/ListItem/hooks', () => {
  afterEach(cleanup);

  const props = {
    value: 'CONNECTIVITY,CONNECTIVITY-DATIN,Non Teknikal',
    symptompPath: 'C_CONN  C_CONN_001  C_CONN_001_002',
  };

  test('run properly', async () => {
    const payload = { content: 1 };
    getSymptomp.mockResolvedValue(payload);

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDataItems(1);
      await result.current.toggleItem(2);
      await result.current.handleCombineValue();
      await result.current.handleSymptompPath();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });

  test('run properly failed', async () => {
    const payload = { content: 1 };
    getSymptomp.mockRejectedValue(payload);

    let res;

    const customProps = {
      value: '',
      symptompPath: '',
    };

    await act(async () => {
      const { result } = await renderHook(() => useActions(customProps));

      await result.current.fetchDataItems(1);
      await result.current.handleCombineValue();
      await result.current.handleSymptompPath();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });
});
