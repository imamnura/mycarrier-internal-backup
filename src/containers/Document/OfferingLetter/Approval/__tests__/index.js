import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Approval from '../Approval';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  approvalForm: {
    statusPayload: 'approve',
    title: 'test',
    caption: 'test',
    open: false,
  },
  closeApprovalForm: jest.fn(),
  data: {
    status: 'test',
    offeringLetterId: 'test',
    detailCreatedBy: { name: 'test' },
    agreement: [
      { note: 'test', email: 'test', name: 'test', position: 'test' },
    ],
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
  closeOtp: jest.fn(),
  otpForm: false,
  otpRepository: {
    send: jest.fn(),
    reSend: jest.fn(),
  },
  onSubmitOtp: jest.fn(),
};

describe('src/containers/Document/OfferingLetter/Approval/index', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Approval />);
    expect(tree).toMatchSnapshot();
  });
  test('render stateType false', () => {
    useAction.mockReturnValue({ ...actions, stateType: '' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Approval />);
    expect(tree).toMatchSnapshot();
  });
});
