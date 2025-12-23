import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Complete from '../Complete';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  control: {},
  invoiceNumberOption: [],
  onClose: jest.fn(),
  onSubmit: jest.fn(),
  handleSubmit: jest.fn(),
  open: false,
};

describe('src/containers/BillsAndPayment/Settlement/Detail/SettlementList/elements/Complete', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Complete />);
    expect(tree).toMatchSnapshot();
  });
});
