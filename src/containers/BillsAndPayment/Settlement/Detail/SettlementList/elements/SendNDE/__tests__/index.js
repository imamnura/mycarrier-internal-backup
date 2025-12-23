import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SendNDE from '../SendNDE';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  approvalType: null,
  control: {},
  edit: false,
  loadingGenerate: false,
  managerPositionOption: [],
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  onSubmitEdit: jest.fn(),
  onSubmitType: jest.fn(),
  open: false,
  setEdit: jest.fn(),
  setType: jest.fn(),
  type: '',
  reviewerFields: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
  onAddRecipient: jest.fn(),
  onDeleteReviewer: jest.fn(),
  handleSubmit: jest.fn(),
  fetchDeleteCC: jest.fn(),
  recepientCC: [{}],
};

describe('src/containers/BillsAndPayment/Settlement/Detail/SettlementList/elements/SendNDE', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SendNDE />);
    expect(tree).toMatchSnapshot();
  });

  test('render/approvalType = 1', () => {
    useAction.mockReturnValue({ ...actions, approvalType: '1' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SendNDE />);
    expect(tree).toMatchSnapshot();
  });
});
