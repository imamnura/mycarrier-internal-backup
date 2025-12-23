import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ApprovalVisit from '../component';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionsReturn = {
  params: '',
  detail: {
    visitId: 'MCR123',
    isAssigned: false,
    amApproved: false,
  },
  error: {},
  setModalUpdateStatus: jest.fn(),
  onClickApprove: jest.fn(),
};

describe('src/containers/Microsite/ApprovalVisitNeucentrix', () => {
  test('render', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalVisit />);
    expect(tree).toMatchSnapshot();
  });

  test('render as occ', () => {
    useActions.mockReturnValue({ ...useActionsReturn, params: 'occ' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalVisit />);
    expect(tree).toMatchSnapshot();
  });

  test('render as marketing', () => {
    useActions.mockReturnValue({ ...useActionsReturn, params: 'marketing' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalVisit />);
    expect(tree).toMatchSnapshot();

    //Action Button
    tree.props.children[0].props.action.props.actions[0].onClick();
    tree.props.children[0].props.action.props.actions[1].onClick();
  });

  test('render as marketing when its already approved', () => {
    useActions.mockReturnValue({
      ...useActionsReturn,
      params: 'marketing',
      detail: {
        isAssigned: true,
        isForwarded: false,
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalVisit />);
    expect(tree).toMatchSnapshot();
  });

  test('render as marketing when its already rejected', () => {
    useActions.mockReturnValue({
      ...useActionsReturn,
      params: 'marketing',
      detail: {
        status: 'rejected',
        isAssigned: true,
        isForwarded: false,
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalVisit />);
    expect(tree).toMatchSnapshot();
  });

  test('render as am', () => {
    useActions.mockReturnValue({
      ...useActionsReturn,
      params: 'am',
      detail: {
        isAssigned: true,
        isForwarded: false,
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalVisit />);
    expect(tree).toMatchSnapshot();
  });

  test('render as am when its already approved', () => {
    useActions.mockReturnValue({
      ...useActionsReturn,
      params: 'am',
      detail: {
        isAssigned: true,
        isForwarded: true,
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalVisit />);
    expect(tree).toMatchSnapshot();
  });

  test('render as am when its already rejected', () => {
    useActions.mockReturnValue({
      ...useActionsReturn,
      params: 'am',
      detail: {
        status: 'rejected',
        isAssigned: true,
        isForwarded: true,
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalVisit />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    useActions.mockReturnValue({ isLoading: true });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalVisit />);
    expect(tree).toMatchSnapshot();
  });
});
