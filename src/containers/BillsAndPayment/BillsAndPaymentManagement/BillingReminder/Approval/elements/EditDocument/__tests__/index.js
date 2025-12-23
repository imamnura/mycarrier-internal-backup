import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EditDocument, { Transition } from '../EditDocument';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  onClose: jest.fn(),
  onSubmit: jest.fn(),
  open: false,
  value: 'test',
  setValue: jest.fn(),
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Approval/elements/EditDocument/index', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EditDocument />);
    expect(tree).toMatchSnapshot();
  });

  test('render/transition', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Transition />);
    expect(tree).toMatchSnapshot();
  });
});
