import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import { getSymptomp } from '../../../../../../../_repositories/repositories';

jest.mock('../../../../../../../_repositories/repositories');

describe('src/containers/ServiceAssurance/GeneralProduct/Validation/lib/SelectWithLevel/lib/ListItem/hooks/useActions', () => {
  afterEach(cleanup);

  test('run properly', async () => {
    getSymptomp.mockResolvedValue({ data: [{}] });
    const props = {
      value: '',
      symptompPath: '',
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDataItems('tes');
      await result.current.toggleItem('tes')();
      await result.current.handleCombineValue();
      await result.current.handleSymptompPath();

      res = await result;
    });

    await expect(res.current.visible).toMatchObject({});
  });

  test('run properly with props', async () => {
    getSymptomp.mockResolvedValue({ data: [{}] });
    const props = {
      value: 'value',
      symptompPath: 'path',
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDataItems('tes');
      await result.current.toggleItem('tes')();
      await result.current.handleCombineValue();
      await result.current.handleSymptompPath();

      res = await result;
    });

    await expect(res.current.visible).toMatchObject({});
  });

  test('run properly rejected error', async () => {
    getSymptomp.mockRejectedValue({ message: '' });
    const props = {
      value: '',
      symptompPath: '',
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDataItems('tes');

      res = await result;
    });

    await expect(res.current.visible).toMatchObject({});
  });
});
