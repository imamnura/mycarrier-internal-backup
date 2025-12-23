import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ValidationAndSendMOM from '../ValidationAndSendMOM';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  control: {},
  generateLoading: false,
  momDocument: {},
  onCancel: jest.fn(),
  onDownloadRawMom: jest.fn(),
  onPrevious: jest.fn(),
  onSendDocument: jest.fn(),
  onSubmitValidation: jest.fn(),
  open: false,
  setMomDocument: jest.fn(),
  settlementId: '',
  step: 1,
  handleSubmit: jest.fn(),
  customerFields: [{}],
  onAddCustomer: jest.fn(),
  onDeleteCustomer: jest.fn(),
};

describe('src/containers/BillsAndPayment/Settlement/Detail/SettlementList/elements/ValidationAndSendMOM', () => {
  test('render 1', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ValidationAndSendMOM />);
    expect(tree).toMatchSnapshot();
  });

  test('render 2', () => {
    useAction.mockReturnValue({ ...actions, step: 2 });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ValidationAndSendMOM />);
    expect(tree).toMatchSnapshot();
  });
});
