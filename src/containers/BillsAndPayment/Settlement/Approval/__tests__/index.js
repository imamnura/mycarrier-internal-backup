import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Approval from '../Approval';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  data: {
    activeReviewer: 2,
    reviewer: [
      { note: 'x', email: 'x' },
      { note: 'y', email: 'y', status: 'waiting approval' },
    ],
  },
  loading: false,
  approvalForm: {},
  redirect: jest.fn(),
  onApprovalAction: jest.fn().mockReturnValue(jest.fn()),
  closeApprovalForm: jest.fn(),
  onSubmitFormApproval: jest.fn().mockReturnValue(jest.fn()),
};

describe('src/containers/BillsAndPayment/Settlement/Approval', () => {
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
});
