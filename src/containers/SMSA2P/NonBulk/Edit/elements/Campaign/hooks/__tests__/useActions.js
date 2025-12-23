import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { route } from '@configs';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock('next/router');
jest.mock('react-hook-form');

describe('src/containers/SMSA2P/NonBulk/Edit/elements/Campaign/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      asPath: route.nonBulk('edit', 'id'),
      push: jest.fn(),
      query: { id: 'id' },
    });
    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
    });
    useForm.mockReturnValue({
      control: {},
      handleSubmit: jest.fn(),
      formState: {
        isDirty: false,
        isValid: false,
      },
      watch: jest.fn().mockReturnValue('wording'),
    });
  });

  const props = {
    defaultValues:{
      documentAttachment: []
    },
    channel: 'MMS',
    setButton: jest.fn(),
    onSubmit: jest.fn(),
  };

  test('run properly', async () => {
    let res;
    await act(async () => {
      const { result } = await renderHook(() => useAction(props));
      await result.current.handleSubmit();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });

  test('run properly documentAttachment', async () => {
    const customProps = {
      ...props,
      defaultValues: {
        documentAttachment: [
          { fileName: 'test', fileUrl: 'http://example.com', fileType: 'test' },
          { fileName: 'test', fileUrl: 'http://example.com', fileType: 'test' },
        ],
      },
    };

    let res;
    await act(async () => {
      const { result } = await renderHook(() => useAction(customProps));
      await result.current.handleSubmit();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });
});
