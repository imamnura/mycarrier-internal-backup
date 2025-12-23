import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useActions from '../hooks/useActions';
import { getUserManagementStatus } from '../utils';

jest.mock('../hooks/useActions');

describe('src/containers/Admin/UserManagement/Detail/index', () => {
  const useActionReturn = {
    approvalForm: {
      type: 'rejected',
      title: 'Please give note of reject',
      caption:
        'Once you rejected this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to reject this user?',
      open: false,
    },
    closeApprovalForm: jest.fn(),
    data: {
      metaData: {
        status: 'Active',
        userType: 'customer',
      },
      historyWorklog: [
        {
          step: 0,
          status: 'CHECKING',
          dateTime: '2025-03-17T06:05:55.651Z',
          note: 'Create Ticket',
          noteProgress: '',
          createdBy: null,
        },
        {
          step: 1,
          status: 'On Progress',
          dateTime: '2025-03-17T06:05:55.651Z',
          note: '',
          noteProgress: '',
          createdBy: 'Super Admin Stage',
        },
        {
          step: 2,
          status: 'SOLVED',
          dateTime: '2025-03-17T06:06:12.108Z',
          note: 'DCS Telkom updating status to Solved',
          noteProgress: 'solva',
          createdBy: 'Super Admin Stage',
        },
        {
          step: 3,
          status: 'closed',
          dateTime: '2025-03-17T06:06:29.006Z',
          note: 'Closed ticket',
          noteProgress: null,
          createdBy: 'Super Admin Stage',
        },
        {
          step: 6,
          status: 'CLOSED',
          statusAlias: 'report completed',
          dateTime: '2025-03-17T07:42:04.754Z',
          note: 'ok',
          createdBy: 'Syahrul Rasyid',
          noteProgress:
            'Your report has completed. Thank you for your feedback',
        },
      ],
      worklog: [
        {
          status: 'Checking',
          label: 'active',
          dateTime: '',
        },
        {
          status: 'Requested',
          label: 'active',
          dateTime: '',
        },
        {
          status: 'Registered',
          label: 'disabled',
          dateTime: '',
        },
        {
          status: 'Active',
          label: 'active',
          dateTime: '',
        },
      ],
      updatedBy: 'test',
    },
    feature: [
      'update_user',
      'update_disable',
      'update_enable',
      'update_reject',
      'update_approval_user',
      'update_return_user_customer',
      'update_request_user_customer',
    ],
    isAccountManager: true,
    loading: false,
    onEdit: jest.fn(),
    onSubmitFormApproval: jest.fn(),
    onUpdateStatus: jest.fn(),
    roleAsyncProps: {
      loadOptions: jest.fn(),
      additional: { page: 1 },
    },
    selectRole: {},
    setApprovalForm: jest.fn(),
    setSelectRole: jest.fn(),
    userId: 'test',
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render status Non_active', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      data: {
        metaData: { status: 'Non_active' },
        historyWorklog: [
          {
            step: 0,
            status: 'CHECKING',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: 'Create Ticket',
            noteProgress: '',
            createdBy: null,
          },
          {
            step: 1,
            status: 'On Progress',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: '',
            noteProgress: '',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 2,
            status: 'SOLVED',
            dateTime: '2025-03-17T06:06:12.108Z',
            note: 'DCS Telkom updating status to Solved',
            noteProgress: 'solva',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 3,
            status: 'closed',
            dateTime: '2025-03-17T06:06:29.006Z',
            note: 'Closed ticket',
            noteProgress: null,
            createdBy: 'Super Admin Stage',
          },
          {
            step: 6,
            status: 'CLOSED',
            statusAlias: 'report completed',
            dateTime: '2025-03-17T07:42:04.754Z',
            note: 'ok',
            createdBy: 'Syahrul Rasyid',
            noteProgress:
              'Your report has completed. Thank you for your feedback',
          },
        ],
        worklog: [
          {
            status: 'Checking',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Requested',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Registered',
            label: 'disabled',
            dateTime: '',
          },
          {
            status: 'Active',
            label: 'active',
            dateTime: '',
          },
        ],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render status Requested 1', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      data: {
        metaData: { status: 'Requested' },
        historyWorklog: [
          {
            step: 0,
            status: 'CHECKING',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: 'Create Ticket',
            noteProgress: '',
            createdBy: null,
          },
          {
            step: 1,
            status: 'On Progress',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: '',
            noteProgress: '',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 2,
            status: 'SOLVED',
            dateTime: '2025-03-17T06:06:12.108Z',
            note: 'DCS Telkom updating status to Solved',
            noteProgress: 'solva',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 3,
            status: 'closed',
            dateTime: '2025-03-17T06:06:29.006Z',
            note: 'Closed ticket',
            noteProgress: null,
            createdBy: 'Super Admin Stage',
          },
          {
            step: 6,
            status: 'CLOSED',
            statusAlias: 'report completed',
            dateTime: '2025-03-17T07:42:04.754Z',
            note: 'ok',
            createdBy: 'Syahrul Rasyid',
            noteProgress:
              'Your report has completed. Thank you for your feedback',
          },
        ],
        worklog: [
          {
            status: 'Checking',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Requested',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Registered',
            label: 'disabled',
            dateTime: '',
          },
          {
            status: 'Active',
            label: 'active',
            dateTime: '',
          },
        ],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render status Requested 2', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      data: {
        metaData: { status: 'Requested' },
        historyWorklog: [
          {
            step: 0,
            status: 'CHECKING',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: 'Create Ticket',
            noteProgress: '',
            createdBy: null,
          },
          {
            step: 1,
            status: 'On Progress',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: '',
            noteProgress: '',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 2,
            status: 'SOLVED',
            dateTime: '2025-03-17T06:06:12.108Z',
            note: 'DCS Telkom updating status to Solved',
            noteProgress: 'solva',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 3,
            status: 'closed',
            dateTime: '2025-03-17T06:06:29.006Z',
            note: 'Closed ticket',
            noteProgress: null,
            createdBy: 'Super Admin Stage',
          },
          {
            step: 6,
            status: 'CLOSED',
            statusAlias: 'report completed',
            dateTime: '2025-03-17T07:42:04.754Z',
            note: 'ok',
            createdBy: 'Syahrul Rasyid',
            noteProgress:
              'Your report has completed. Thank you for your feedback',
          },
        ],
        worklog: [
          {
            status: 'Checking',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Requested',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Registered',
            label: 'disabled',
            dateTime: '',
          },
          {
            status: 'Active',
            label: 'active',
            dateTime: '',
          },
        ],
      },
      isAccountManager: false,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render status Checking', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      data: {
        metaData: { status: 'Checking' },
        historyWorklog: [
          {
            step: 0,
            status: 'CHECKING',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: 'Create Ticket',
            noteProgress: '',
            createdBy: null,
          },
          {
            step: 1,
            status: 'On Progress',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: '',
            noteProgress: '',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 2,
            status: 'SOLVED',
            dateTime: '2025-03-17T06:06:12.108Z',
            note: 'DCS Telkom updating status to Solved',
            noteProgress: 'solva',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 3,
            status: 'closed',
            dateTime: '2025-03-17T06:06:29.006Z',
            note: 'Closed ticket',
            noteProgress: null,
            createdBy: 'Super Admin Stage',
          },
          {
            step: 6,
            status: 'CLOSED',
            statusAlias: 'report completed',
            dateTime: '2025-03-17T07:42:04.754Z',
            note: 'ok',
            createdBy: 'Syahrul Rasyid',
            noteProgress:
              'Your report has completed. Thank you for your feedback',
          },
        ],
        worklog: [
          {
            status: 'Checking',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Requested',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Registered',
            label: 'disabled',
            dateTime: '',
          },
          {
            status: 'Active',
            label: 'active',
            dateTime: '',
          },
        ],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render status Registered', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      data: {
        metaData: { status: 'Registered' },
        historyWorklog: [
          {
            step: 0,
            status: 'CHECKING',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: 'Create Ticket',
            noteProgress: '',
            createdBy: null,
          },
          {
            step: 1,
            status: 'On Progress',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: '',
            noteProgress: '',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 2,
            status: 'SOLVED',
            dateTime: '2025-03-17T06:06:12.108Z',
            note: 'DCS Telkom updating status to Solved',
            noteProgress: 'solva',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 3,
            status: 'closed',
            dateTime: '2025-03-17T06:06:29.006Z',
            note: 'Closed ticket',
            noteProgress: null,
            createdBy: 'Super Admin Stage',
          },
          {
            step: 6,
            status: 'CLOSED',
            statusAlias: 'report completed',
            dateTime: '2025-03-17T07:42:04.754Z',
            note: 'ok',
            createdBy: 'Syahrul Rasyid',
            noteProgress:
              'Your report has completed. Thank you for your feedback',
          },
        ],
        worklog: [
          {
            status: 'Checking',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Requested',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Registered',
            label: 'disabled',
            dateTime: '',
          },
          {
            status: 'Active',
            label: 'active',
            dateTime: '',
          },
        ],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render status Registered isAccountManager false', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      data: {
        metaData: { status: 'Registered' },
        historyWorklog: [
          {
            step: 0,
            status: 'CHECKING',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: 'Create Ticket',
            noteProgress: '',
            createdBy: null,
          },
          {
            step: 1,
            status: 'On Progress',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: '',
            noteProgress: '',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 2,
            status: 'SOLVED',
            dateTime: '2025-03-17T06:06:12.108Z',
            note: 'DCS Telkom updating status to Solved',
            noteProgress: 'solva',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 3,
            status: 'closed',
            dateTime: '2025-03-17T06:06:29.006Z',
            note: 'Closed ticket',
            noteProgress: null,
            createdBy: 'Super Admin Stage',
          },
          {
            step: 6,
            status: 'CLOSED',
            statusAlias: 'report completed',
            dateTime: '2025-03-17T07:42:04.754Z',
            note: 'ok',
            createdBy: 'Syahrul Rasyid',
            noteProgress:
              'Your report has completed. Thank you for your feedback',
          },
        ],
        worklog: [
          {
            status: 'Checking',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Requested',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Registered',
            label: 'disabled',
            dateTime: '',
          },
          {
            status: 'Active',
            label: 'active',
            dateTime: '',
          },
        ],
      },
      isAccountManager: false,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render status Returned', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      data: {
        metaData: { status: 'Returned' },
        historyWorklog: [
          {
            step: 0,
            status: 'CHECKING',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: 'Create Ticket',
            noteProgress: '',
            createdBy: null,
          },
          {
            step: 1,
            status: 'On Progress',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: '',
            noteProgress: '',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 2,
            status: 'SOLVED',
            dateTime: '2025-03-17T06:06:12.108Z',
            note: 'DCS Telkom updating status to Solved',
            noteProgress: 'solva',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 3,
            status: 'closed',
            dateTime: '2025-03-17T06:06:29.006Z',
            note: 'Closed ticket',
            noteProgress: null,
            createdBy: 'Super Admin Stage',
          },
          {
            step: 6,
            status: 'CLOSED',
            statusAlias: 'report completed',
            dateTime: '2025-03-17T07:42:04.754Z',
            note: 'ok',
            createdBy: 'Syahrul Rasyid',
            noteProgress:
              'Your report has completed. Thank you for your feedback',
          },
        ],
        worklog: [
          {
            status: 'Checking',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Requested',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Registered',
            label: 'disabled',
            dateTime: '',
          },
          {
            status: 'Active',
            label: 'active',
            dateTime: '',
          },
        ],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render status Rejected 1', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      data: {
        metaData: { status: 'Rejected' },
        historyWorklog: [
          {
            step: 0,
            status: 'CHECKING',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: 'Create Ticket',
            noteProgress: '',
            createdBy: null,
          },
          {
            step: 1,
            status: 'On Progress',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: '',
            noteProgress: '',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 2,
            status: 'SOLVED',
            dateTime: '2025-03-17T06:06:12.108Z',
            note: 'DCS Telkom updating status to Solved',
            noteProgress: 'solva',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 3,
            status: 'closed',
            dateTime: '2025-03-17T06:06:29.006Z',
            note: 'Closed ticket',
            noteProgress: null,
            createdBy: 'Super Admin Stage',
          },
          {
            step: 6,
            status: 'CLOSED',
            statusAlias: 'report completed',
            dateTime: '2025-03-17T07:42:04.754Z',
            note: 'ok',
            createdBy: 'Syahrul Rasyid',
            noteProgress:
              'Your report has completed. Thank you for your feedback',
          },
        ],
        worklog: [
          {
            status: 'Checking',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Requested',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Registered',
            label: 'disabled',
            dateTime: '',
          },
          {
            status: 'Active',
            label: 'active',
            dateTime: '',
          },
        ],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render status Rejected 2', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      data: {
        metaData: { status: 'Rejected' },
        historyWorklog: [
          {
            step: 0,
            status: 'CHECKING',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: 'Create Ticket',
            noteProgress: '',
            createdBy: null,
          },
          {
            step: 1,
            status: 'On Progress',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: '',
            noteProgress: '',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 2,
            status: 'SOLVED',
            dateTime: '2025-03-17T06:06:12.108Z',
            note: 'DCS Telkom updating status to Solved',
            noteProgress: 'solva',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 3,
            status: 'closed',
            dateTime: '2025-03-17T06:06:29.006Z',
            note: 'Closed ticket',
            noteProgress: null,
            createdBy: 'Super Admin Stage',
          },
          {
            step: 6,
            status: 'CLOSED',
            statusAlias: 'report completed',
            dateTime: '2025-03-17T07:42:04.754Z',
            note: 'ok',
            createdBy: 'Syahrul Rasyid',
            noteProgress:
              'Your report has completed. Thank you for your feedback',
          },
        ],
        worklog: [
          {
            status: 'Checking',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Requested',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Registered',
            label: 'disabled',
            dateTime: '',
          },
          {
            status: 'Active',
            label: 'active',
            dateTime: '',
          },
        ],
      },
      isAccountManager: false,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render metaData null 1', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      data: {
        metaData: null,
        historyWorklog: [
          {
            step: 0,
            status: 'CHECKING',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: 'Create Ticket',
            noteProgress: '',
            createdBy: null,
          },
          {
            step: 1,
            status: 'On Progress',
            dateTime: '2025-03-17T06:05:55.651Z',
            note: '',
            noteProgress: '',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 2,
            status: 'SOLVED',
            dateTime: '2025-03-17T06:06:12.108Z',
            note: 'DCS Telkom updating status to Solved',
            noteProgress: 'solva',
            createdBy: 'Super Admin Stage',
          },
          {
            step: 3,
            status: 'closed',
            dateTime: '2025-03-17T06:06:29.006Z',
            note: 'Closed ticket',
            noteProgress: null,
            createdBy: 'Super Admin Stage',
          },
          {
            step: 6,
            status: 'CLOSED',
            statusAlias: 'report completed',
            dateTime: '2025-03-17T07:42:04.754Z',
            note: 'ok',
            createdBy: 'Syahrul Rasyid',
            noteProgress:
              'Your report has completed. Thank you for your feedback',
          },
        ],
        worklog: [
          {
            status: 'Checking',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Requested',
            label: 'active',
            dateTime: '',
          },
          {
            status: 'Registered',
            label: 'disabled',
            dateTime: '',
          },
          {
            status: 'Active',
            label: 'active',
            dateTime: '',
          },
        ],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render metaData null 2', () => {
    expect(getUserManagementStatus('')).toBeFalsy();
    expect(getUserManagementStatus('Example')).toBeTruthy();
    expect(getUserManagementStatus('Rejected')).toBeTruthy();
  });
});
