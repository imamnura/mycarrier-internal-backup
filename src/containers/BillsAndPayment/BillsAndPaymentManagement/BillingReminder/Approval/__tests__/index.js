import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Approval from '../Approval';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  approvalForm: {
    type: 'approve',
    title: 'test',
    caption: 'test',
    open: false,
  },
  closeApprovalForm: jest.fn(),
  data: {
    reviewer: [
      {
        name: 'Reviewer 1 ',
        email: 'denacoba@mailinator.com',
        status: 'waiting approval',
        reason: 'ok',
        createdAt: '2023-08-03T09:03:12.903Z',
      },
      {
        name: 'Reviewer 2 ',
        email: 'denacoba@mailinator.com',
        status: 'waiting approval',
        reason: 'ok',
        createdAt: '2023-08-03T09:03:12.903Z',
      },
    ],
    billReminderPdf: { fileName: 'test', fileUrl: 'test' },
  },
  loading: false,
  onApprovalAction: jest.fn(),
  onSubmitFormApproval: jest.fn(),
  redirect: jest.fn(),
  stateType: 'approved',
  editTemplate: false,
  setEditTemplate: jest.fn(),
  onSubmitEdit: jest.fn(),
  fileTemplate: 'test',
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Approval/index', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Approval />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty', () => {
    useAction.mockReturnValue({ ...actions, data: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Approval />);
    expect(tree).toMatchSnapshot();
  });

  test('render status reviewer null', () => {
    useAction.mockReturnValue({
      ...actions,
      data: {
        reviewer: [
          {
            name: 'Reviewer 1 ',
            email: 'denacoba@mailinator.com',
            status: 'waiting approval',
            reason: 'ok',
          },
          {
            name: 'Reviewer 2 ',
            email: 'denacoba@mailinator.com',
            status: 'waiting approval',
            reason: 'ok',
          },
        ],
        billReminderPdf: { fileName: 'test', fileUrl: 'test' },
      },
      stateType: '',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Approval />);
    expect(tree).toMatchSnapshot();
  });
});
