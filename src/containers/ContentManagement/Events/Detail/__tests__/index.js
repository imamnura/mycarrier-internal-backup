import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import PageViewer from '../../Add-v2/lib/components/PageViewer';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const actions = {
  detailEvent: {
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
  clearConfirmation: jest.fn(),
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

describe('src/containers/ContentManagement/Events/Detail/index', () => {
  test('render', () => {
    const props = { feature: ['delete_event'] };

    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty', () => {
    const props = { feature: [] };

    useActions.mockReturnValue({ ...actions, data: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.onClose();
    tree.props.children[0].props.action[0].onClick(); //preview page
    tree.props.children[0].props.action[1].onClick(); //delete
  });

  test('render page preview', () => {
    const propsAction = {
      ...actions,
      openPreview: true,
      idPreviewPage: 'id',
    };
    const props = {
      eventId: 'id',
      idPreviewPage: 'id',
      onClose: () => jest.fn(),
      open: true,
      title: 'title',
    };

    useActions.mockReturnValue({ ...propsAction });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PageViewer {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render page preview another state', () => {
    const propsAction = {
      ...actions,
      openPreview: true,
      idPreviewPage: 'id',
    };
    const props = {
      eventId: '',
      idPreviewPage: 'id',
      onClose: () => jest.fn(),
      open: true,
      title: 'title',
      tab: 'en',
      actionButton: [],
    };

    useActions.mockReturnValue({ ...propsAction });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PageViewer {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
