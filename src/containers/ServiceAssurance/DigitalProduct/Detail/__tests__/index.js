import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useDetail from '../hooks/useDetail';

jest.mock('../hooks/useDetail');

const actions = {
  referenceId: '1',
  data: {
    product: 'antares',
    status: 'CHECKING',
    worklog: [
      {
        step: 0,
        status: 'Checking',
        dateTime: '2023-03-24T08:21:57.398Z',
        note: 'Create Gameqoo Ticket',
        noteProgress: '',
        createdBy: 'DENA HARDIANTO',
      },
      {
        step: 1,
        status: 'On Progress',
        dateTime: '2023-03-24T08:22:55.138Z',
        note: '[Worklog From FAB Digital]',
        noteProgress: 'okee onprogress',
        createdBy: 'FAB',
        file: {
          fileUrl:
            'https://storage-assurance-dev.mytens.id/tdscustomerpublic/evidence-ticket-gameqoo/REFID-1679646055488/onprogress - oke-onprogress.jpg',
          fileName: 'oke-onprogress.jpg',
          fileType: 'jpg',
        },
      },
      {
        step: 2,
        status: 'On Hold',
        dateTime: '2023-03-24T08:23:26.539Z',
        note: '[Worklog From FAB Digital]',
        noteProgress: 'okee onhold',
        createdBy: 'FAB',
        file: {
          fileUrl:
            'https://storage-assurance-dev.mytens.id/tdscustomerpublic/evidence-ticket-gameqoo/REFID-1679646055488/onhold - oke-onhold.jpg',
          fileName: 'oke-onhold.jpg',
          fileType: 'jpg',
        },
      },
      {
        step: 3,
        status: 'Solved',
        dateTime: '2023-03-24T08:23:47.016Z',
        note: '[Worklog From FAB Digital]',
        noteProgress: 'okee solved',
        createdBy: 'FAB',
        file: {
          fileUrl:
            'https://storage-assurance-dev.mytens.id/tdscustomerpublic/evidence-ticket-gameqoo/REFID-1679646055488/solved - oke-solved.jpg',
          fileName: 'oke-solved.jpg',
          fileType: 'jpg',
        },
      },
      {
        step: 4,
        status: 'closed',
        dateTime: '2023-03-24T08:24:11.241Z',
        note: '[Worklog From FAB Digital]',
        noteProgress: 'okee closed',
        createdBy: 'FAB',
        file: {
          fileUrl:
            'https://storage-assurance-dev.mytens.id/tdscustomerpublic/evidence-ticket-gameqoo/REFID-1679646055488/closed - oke-closed.jpg',
          fileName: 'oke-closed.jpg',
          fileType: 'jpg',
        },
      },
    ],
  },
  onPreviewWorklog: jest.fn(),
  loading: false,
  fetchDetail: jest.fn(),
  productAction: {
    onClickModalReturn: jest.fn(),
    onApprove: jest.fn(),
    onClickValidation: jest.fn(),
    handleFormTicketNumber: () => jest.fn(),
    handleFormUpdateStatus: jest.fn(),
    handleFormProgress: jest.fn(),
    modalReturn: {},
    setModalReturn: jest.fn(),
    modalApproveIssue: false,
    setModalApproveIssue: jest.fn(),
    setModalChooseCategory: jest.fn(),
    modalChooseCategory: false,
    setOpenFormTicketNumber: jest.fn(),
    openFormTicketNumber: { type: '' },
    openFormUpdateStatus: false,
    setOpenFormUpdateStatus: jest.fn(),
    openFormProgress: false,
    setOpenFormProgress: jest.fn(),
  },
};

describe('src/containers/ServiceAssurance/DigitalProduct/Detail', () => {
  test('render antares', () => {
    useDetail.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render gameqoo', () => {
    const customActions = {
      ...actions,
      data: {
        ...actions.data,
        product: 'gameqoo',
        status: 'CHECKING',
      },
    };
    useDetail.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render neucloud', () => {
    const customActions = {
      ...actions,
      data: {
        ...actions.data,
        product: 'neucloud',
        ticketId: 'test',
        status: 'ON PROGRESS',
      },
    };
    useDetail.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render neucloud ticket null', () => {
    const customActions = {
      ...actions,
      data: {
        ...actions.data,
        product: 'neucloud',
        ticketId: '',
        status: 'ON PROGRESS',
      },
    };
    useDetail.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render referenceId null', () => {
    const customActions = {
      ...actions,
      referenceId: '',
      data: {
        ...actions.data,
        status: 'REPORT CHECKING',
      },
    };
    useDetail.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render antares REPORT CHECKING', () => {
    const customActions = {
      ...actions,
      data: {
        ...actions.data,
        status: 'REPORT CHECKING',
      },
    };
    useDetail.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
