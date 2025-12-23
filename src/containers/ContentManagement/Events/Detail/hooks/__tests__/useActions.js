import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import {
  getDetailContent,
  deleteEvent,
  savePriviewPage,
} from '@containers/ContentManagement/Events/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@containers/ContentManagement/Events/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ContentManagement/Events/Detail/hooks/useActions', () => {
  afterEach(cleanup);

  const resolvedDetail = {
    data: {
      eventId: 'EV-1666153163827',
      type: 'event',
      isDisplay: true,
      eventRegistration: 'https://www.google.com/',
      pastLink: null,
      relatedProduct: {
        isDisplay: false,
        items: [],
      },
      imageBanner: {
        mediaId: '0267fc094855665622c6629f03a5b51d',
        mediaName: 'Event Bann',
        mediaPath: 'test path',
      },
      startDate: '2022-10-24T07:00:00+07:00',
      endDate: '2022-10-24T09:00:00+07:00',
      location: 'Jakarta',
      typeLocation: 'online',
      status: 'publish',
      speakers: {
        isDisplay: false,
        items: [],
      },
      attendees: {
        isDisplay: false,
        items: [],
      },
      sponsors: {
        isDisplay: false,
        items: [],
      },
      localizations: [
        {
          id: '9e065cf807f25f8dd30a59c387b2cd5c',
          language: 'id',
          baseLanguage: true,
          title: 'Acara v1',
          description: '<p>Desk indo</p>',
          slug: 'acara-v1',
          rundown: {
            isDisplay: true,
            items: [
              {
                items: [],
                date: '2022-10-24T00:00:00+07:00',
                title: '24 October 2022',
              },
            ],
          },
        },
        {
          id: '67b1b83ab109af58851aa3ef4117387a',
          language: 'en',
          baseLanguage: false,
          title: 'Event v1',
          description: '<p>Desc english</p>',
          slug: 'event-v1',
          rundown: {
            isDisplay: true,
            items: [
              {
                items: [],
                date: '2022-10-24T00:00:00+07:00',
                title: '24 October 2022',
              },
            ],
          },
        },
      ],
      createdAt: '2022-10-19T11:19:23+07:00',
      updatedAt: '2022-10-19T11:19:23+07:00',
      id: 135,
      eventStatus: 'upcoming',
      dateHeld: '24 October 2022 07:00 - 09:00',
    },
    id: 'id',
    router: jest.fn(),
    confirmation: {},
    isLoading: false,
    openPreview: false,
    setOpenPreview: jest.fn(),
    confirmDeleteEvent: jest.fn(),
    status: {
      children: 'past event',
      variant: 'success',
    },
    handlePreviewPage: jest.fn(),
    idPreviewPage: '',
  };

  beforeAll(() => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
    });

    getDetailContent.mockResolvedValue(resolvedDetail);
    deleteEvent.mockResolvedValue({ success: true });
    savePriviewPage.mockResolvedValue({ success: true });

    useRouter.mockReturnValue({
      asPath: route.events('detail', 'id'),
      push: jest.fn(),
      query: { id: 'id' },
    });
  });

  const feature = ['delete_event'];

  test('run properly & delete success', async () => {
    const props = { feature };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.detailEvent);

      result.current.confirmDeleteEvent();
      result.current.fetchDelete()();

      res = await result;
    });

    await expect(res.current.detailEvent).toBeTruthy();
  });

  test('run properly delete failed', async () => {
    deleteEvent.mockRejectedValueOnce();

    const props = { feature };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.detailEvent);

      result.current.confirmDeleteEvent();
      result.current.fetchDelete()();

      res = await result;
    });

    await expect(res.current.detailEvent).toBeTruthy();
  });

  test('run properly without feature', async () => {
    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.detailEvent);

      result.current.confirmDeleteEvent();
      result.current.fetchDelete()();
      result.current.handleEdit();

      res = await result;
    });

    await expect(res.current.detailEvent).toBeTruthy();
  });

  test('run preview page success', async () => {
    const props = { feature: [''] };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.detailEvent);

      result.current.handlePreviewPage();

      res = await result;
    });

    await expect(res.current.detailEvent).toBeTruthy();
  });

  test('run preview page another state', async () => {
    const detail = {
      data: {
        ...resolvedDetail.data,
        eventStatus: 'past',
        relatedProduct: { isDisplay: true, items: [] },
        localizations: [
          {
            title: '',
            description: '',
            rundown: { isDisplay: false },
          },
        ],
        speakers: { isDisplay: true },
        attendees: { isDisplay: true },
        sponsors: { isDisplay: true },
      },
    };

    getDetailContent.mockResolvedValue(detail);

    const props = { feature: [] };
    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.detailEvent);

      result.current.handlePreviewPage();

      res = await result;
    });

    await expect(res.current.detailEvent).toBeTruthy();
  });

  test('run preview page failed', async () => {
    savePriviewPage.mockRejectedValueOnce();
    getDetailContent.mockRejectedValueOnce();

    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      result.current.handlePreviewPage();

      res = await result;
    });

    await expect(res.current.detailEvent).toEqual({});
  });

  test('failed get detail', async () => {
    getDetailContent.mockRejectedValueOnce();

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.detailEvent).toEqual({});
  });

  test('empty id', async () => {
    useRouter.mockReturnValue({
      asPath: route.events('detail', 'id'),
      push: jest.fn(),
      query: { id: '' },
    });
    const props = { feature };

    const { result } = await renderHook(() => useActions(props));

    await expect(result.current.detailEvent).toEqual({});
  });
});
