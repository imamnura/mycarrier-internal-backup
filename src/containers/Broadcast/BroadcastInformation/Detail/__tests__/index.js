import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  approvalForm: {},
  closeApprovalForm: jest.fn(),
  data: {
    broadcastInfo: { status: 'need_approval' },
  },
  feature: [
    'update_broadcast_information_reject_cdm',
    'update_broadcast_information_return_cdm',
    'update_broadcast_information_approve_cdm',
    'update_broadcast_information_without_status_need_approval_cdm',
  ],
  loading: false,
  loadingUpdateReturn: false,
  onSubmitFormApproval: jest.fn(),
  setApprovalForm: jest.fn(),
  updateFromReturned: jest.fn(),
};

describe('src/containers/Broadcast/BroadcastInformation/Detail', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render/feature empty', () => {
    useAction.mockReturnValue({ ...actions, feature: [] });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status return', () => {
    useAction.mockReturnValue({
      ...actions,
      data: { broadcastInfo: { status: 'returned' } },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render/data empty', () => {
    useAction.mockReturnValue({ ...actions, data: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status others', () => {
    useAction.mockReturnValue({
      ...actions,
      data: { broadcastInfo: { status: 'error' } },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
});
