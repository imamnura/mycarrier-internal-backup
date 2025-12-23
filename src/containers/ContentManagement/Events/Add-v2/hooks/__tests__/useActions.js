import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  fetchSubmitContent,
  getListProduct,
  getDetailContent,
} from '@containers/ContentManagement/Events/_repositories/repositories';
import { useSnackbar } from 'notistack';
import { ASSETS_URL } from '@constants/env';

jest.mock('@containers/ContentManagement/Events/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('notistack');

describe('src/containers/ContentManagement/Events/Add-v2/hooks/useActions', () => {
  afterEach(cleanup);

  const resolvedProduct = [
    { catId: 'a1', name: 'Cloud & Data Center' },
    { catId: 'a2', name: 'Cloud & Data Center B' },
  ];

  const resolvedFetch = {
    data: {
      type: 'event',
      eventRegistration: 'test',
      pastLink: 'test',
      relatedProduct: ['test'],
      imageBanner: 'test',
      startDate: 'test',
      endDate: 'test',
      location: 'test',
      typeLocation: 'test',
      status: 'draft',
      localizations: [
        {
          id: 'test',
          language: 'id',
          baseLanguage: true,
          title: 'test',
          description: 'test',
          slug: 'test',
          rundown: {
            isDisplay: true,
            items: [
              {
                startTime: 'test',
                endTime: 'test',
                items: [
                  { startTime: 'test', endTime: 'test' },
                  { startTime: 'test', endTime: 'test' },
                ],
              },
              {
                startTime: 'test 2',
                endTime: 'test 2',
                items: [
                  { startTime: 'test 2', endTime: 'test 2' },
                  { startTime: 'test 2', endTime: 'test 2' },
                ],
              },
            ],
          },
        },
        {
          id: 'test',
          language: 'id',
          baseLanguage: true,
          title: 'test',
          description: 'test',
          slug: 'test',
          rundown: {
            isDisplay: true,
            items: [
              { startTime: 'test', endTime: 'test' },
              { startTime: 'test 2', endTime: 'test 2' },
            ],
          },
        },
      ],
      speakers: [],
      attendees: [],
      sponsors: [],
    },
  };

  const value = {
    rundownid: [
      { items: [{ startTime: 'test', endTime: 'test' }] },
      { items: [{ startTime: 'test 2', endTime: 'test 2' }] },
    ],
    rundownen: [
      { items: [{ startTime: 'test', endTime: 'test' }] },
      { items: [{ startTime: 'test 2', endTime: 'test 2' }] },
    ],
    startDate: 'test',
    endDate: 'test',
    eventRegistration: 'test',
    pastLink: 'test',
    imageBanner: 'test',
    location: 'test',
    typeLocation: 'test',
    titleid: 'test',
    titleen: 'test',
    descriptionid: 'test',
    descriptionen: 'test',
    slugid: 'test',
    slugen: 'test',
  };

  const saveAsDraft = true;
  const display = {
    isDisplayRelatedProduct: false,
    isDisplayRundown: false,
    isDisplaySpeakers: false,
    isDisplayAttendees: false,
    isDisplaySponsor: false,
  };
  const dataEvent = {
    isDisplay: false,
    items: 'speakers',
  };
  const id = '';
  const passCheck = false;

  const resolvedDetail = {
    eventId: 'EV-1663573335182',
    type: 'event',
    isDisplay: true,
    eventRegistration: 'https://www.google.com/',
    pastLink: '',
    relatedProduct: {
      isDisplay: true,
      items: ['test'],
    },
    imageBanner: {
      mediaId: '7e1f4db91ace1a0c1a2f6984ac50a537',
      mediaName: 'Event Bann',
      mediaPath: `${ASSETS_URL}/ewz-mycarrier-pub-dev/mycarrier-explore/catalogpublic/mycarrier/assets/medias/Event-Banner-1.png`,
    },
    startDate: '2022-09-20T07:00:00+07:00',
    endDate: '2022-09-20T10:00:00+07:00',
    location: 'Bandung',
    typeLocation: 'hybrid',
    status: 'publish',
    speakers: {
      isDisplay: true,
      items: ['test'],
    },
    attendees: {
      isDisplay: true,
      items: ['test'],
    },
    sponsors: {
      isDisplay: true,
      items: ['test'],
    },
    localizations: [
      {
        id: 'cd027ed0025fa0f1f0cbd20d47460ea6',
        language: 'id',
        baseLanguage: true,
        title: 'Acara v4',
        description: '<p>It</p>',
        slug: 'acara-v4',
        rundown: {
          isDisplay: true,
          items: [
            {
              items: [
                {
                  endTime: '2022-09-20T10:00:00+07:00',
                  startTime: '2022-09-20T07:00:00+07:00',
                  title: 'Session A',
                },
                {
                  endTime: '2022-09-20T10:00:00+07:00',
                  startTime: '2022-09-20T07:00:00+07:00',
                  title: 'Session B',
                },
              ],
              date: '2022-09-20T00:00:00+07:00',
              title: '20 September 2022',
            },
            {
              items: [
                {
                  endTime: '2022-09-20T10:00:00+07:00',
                  startTime: '2022-09-20T07:00:00+07:00',
                  title: 'Session C',
                },
                {
                  endTime: '2022-09-20T10:00:00+07:00',
                  startTime: '2022-09-20T07:00:00+07:00',
                  title: 'Session D',
                },
              ],
              date: '2022-09-20T00:00:00+07:00',
              title: '21 September 2022',
            },
          ],
        },
      },
      {
        id: 'b91a6d35a5dbc37dac214a99204267b5',
        language: 'en',
        baseLanguage: false,
        title: 'Event v4',
        description: '<p>It is</p>',
        slug: 'event-v4',
        rundown: {
          isDisplay: true,
          items: [
            {
              items: [
                {
                  endTime: '2022-09-20T10:00:00+07:00',
                  startTime: '2022-09-20T07:00:00+07:00',
                  title: 'Session A',
                },
                {
                  endTime: '2022-09-20T10:00:00+07:00',
                  startTime: '2022-09-20T07:00:00+07:00',
                  title: 'Session B',
                },
              ],
              date: '2022-09-20T00:00:00+07:00',
              title: '20 September 2022',
            },
            {
              items: [
                {
                  endTime: '2022-09-20T10:00:00+07:00',
                  startTime: '2022-09-20T07:00:00+07:00',
                  title: 'Session C',
                },
                {
                  endTime: '2022-09-20T10:00:00+07:00',
                  startTime: '2022-09-20T07:00:00+07:00',
                  title: 'Session D',
                },
              ],
              date: '2022-09-20T00:00:00+07:00',
              title: '21 September 2022',
            },
          ],
        },
      },
    ],
    createdAt: '2022-09-19T14:42:15+07:00',
    updatedAt: '2022-09-19T14:43:07+07:00',
    id: 1,
    eventStatus: 'past',
    dateHeld: '20 September 2022 07:00 - 10:00',
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
    useSnackbar.mockReturnValue({
      enqueueSnackbar: jest.fn(),
    });

    getListProduct.mockResolvedValue({ data: resolvedProduct });

    useRouter.mockReturnValue({
      asPath: route.events('create'),
      push: jest.fn(),
      query: { id: '' },
    });
  });

  test('render create fetch submit saveAsDraft', async () => {
    useRouter.mockReturnValue({
      asPath: route.events('create'),
      push: jest.fn(),
      query: { id: '' },
    });

    fetchSubmitContent.mockResolvedValue(resolvedFetch);

    const props = { feature: ['create_event'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleSubmit();
      await result.current.getValues();
      await result.current.watch();
      await result.current.setOpenPreview(true);
      await result.current.displaySpeakers.setIsDisplaySpeakers(true);
      await result.current.displayAttendees.setIsDisplayAttendees(true);
      await result.current.displaySponsor.setIsDisplaySponsor(true);
      await result.current.displayRelatedProduct.setIsDisplayRelatedProduct(
        true,
      );
      await result.current.displayRundown.setIsDisplayRundown(true);
      await result.current.tabsProps.onChange('en');
      await result.current.handleAddEvent(
        value,
        saveAsDraft,
        display,
        dataEvent,
        id,
        passCheck,
      );
      await result.current.fetchEvent(
        value,
        saveAsDraft,
        display,
        dataEvent,
        id,
        passCheck,
      )();
      await result.current.handlePreviewPage();
      await result.current.filterSectionTree.options[1].customOption.onChange();
      await result.current.filterSectionTree.options[4].customOption.onChange();
      await result.current.filterSectionTree.options[5].customOption.onChange();
      await result.current.filterSectionTree.options[6].customOption.onChange();
      await result.current.filterSectionTree.options[7].customOption.onChange();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('render create fetch submit', async () => {
    const displayCustom = {
      ...display,
      isDisplayRundown: true,
    };

    useRouter.mockReturnValue({
      asPath: route.events('create'),
      push: jest.fn(),
      query: { id: '' },
    });

    fetchSubmitContent.mockResolvedValue(resolvedFetch);

    const props = { feature: ['create_event'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleSubmit();
      await result.current.getValues();
      await result.current.watch();
      await result.current.handleAddEvent(
        value,
        false,
        displayCustom,
        dataEvent,
        id,
        passCheck,
      );
      await result.current.fetchEvent(
        value,
        false,
        displayCustom,
        dataEvent,
        id,
        passCheck,
      )();
      await result.current.handleAfterSubmit()();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('render edit fetch submit saveAsDraft', async () => {
    useRouter.mockReturnValue({
      asPath: route.events('edit', 1),
      push: jest.fn(),
      query: { id: 1 },
    });

    getDetailContent.mockResolvedValue(resolvedDetail);
    fetchSubmitContent.mockResolvedValue(resolvedDetail);

    const props = { feature: ['update_event'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleAddEvent(
        value,
        true,
        display,
        dataEvent,
        id,
        passCheck,
      );
      await result.current.fetchEvent(
        value,
        true,
        display,
        dataEvent,
        id,
        passCheck,
      )();
      await result.current.handlePreviewPage();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  // test('render edit fetch submit', async () => {

  //   useRouter.mockReturnValue({
  //     asPath: route.events('edit', 1),
  //     push: jest.fn(),
  //     query: { id: 1 }
  //   });

  //   getDetailContent.mockResolvedValue(resolvedDetail);
  //   fetchSubmitContent.mockResolvedValue(resolvedDetail);

  //   const props = { feature: ['update_event'] };

  //   let res;

  //   await act(async () => {

  //     const { result } = await renderHook(() => useActions(props));

  //     await result.current.handleAddEvent(value, false, display, dataEvent, id, passCheck);
  //     await result.current.fetchEvent(value, false, display, dataEvent, id, passCheck)();
  //     await result.current.handleAfterSubmit()();
  //     await result.current.handlePreviewPage();

  //     res = await result;
  //   });

  //   await expect(res.current.control).toBeTruthy();
  // });

  test('render failed', async () => {
    useRouter.mockReturnValue({
      asPath: route.events('edit', 1),
      push: jest.fn(),
      query: { id: 1 },
    });

    getDetailContent.mockRejectedValue({});
    fetchSubmitContent.mockRejectedValue({});
    getListProduct.mockRejectedValue({ message: 'error' });

    const props = { feature: ['create_event'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleAddEvent(
        value,
        true,
        display,
        dataEvent,
        id,
        passCheck,
      );
      await result.current.fetchEvent(
        value,
        true,
        display,
        dataEvent,
        id,
        passCheck,
      )();
      await result.current.handlePreviewPage();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
