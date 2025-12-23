import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const actions = {
  bakesId: 'id',
  closePopUp: jest.fn(),
  data: {
    status: 'telkom approval',
    telkomApprovalStatus: true,
    approvalType: 'manual',
    worklog: [],
  },
  feature: ['update_doc_manual', 'update_reviewer'],
  loading: false,
  onEdit: jest.fn(),
  onSubmitUploadSignedBakes: jest.fn(),
  setUploadSignedBakes: jest.fn(),
  onSubmitEditReviewer: jest.fn(),
  popUp: {
    type: 'uploadSignedBakes',
    open: true,
  },
  setPopUp: jest.fn(),
  action: jest.fn(),
};

describe('src/pages/Document/Bakes/Detail', () => {
  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/returned', () => {
    useActions.mockReturnValue({
      ...actions,
      popUp: { type: 'editReviewer', open: true },
      data: {
        ...actions.data,
        status: 'returned',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty', () => {
    useActions.mockReturnValue({ ...actions, data: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
