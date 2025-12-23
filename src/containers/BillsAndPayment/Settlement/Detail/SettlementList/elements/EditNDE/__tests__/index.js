import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EditNDE, { Transition } from '../EditNDE';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  onClose: jest.fn(),
  onSubmit: jest.fn(),
  open: false,
  value: '',
  setValue: jest.fn(),
};

describe('src/containers/BillsAndPayment/Settlement/Detail/SettlementList/elements/EditNDE', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EditNDE />);
    expect(tree).toMatchSnapshot();
  });

  test('render/transition', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Transition />);
    expect(tree).toMatchSnapshot();
  });
});
