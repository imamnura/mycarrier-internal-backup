import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useAction from '../hooks/useAction';
import VirtualMachine from '../VirtualMachine';

jest.mock('../hooks/useAction');

describe('src/containers/BillsAndPayment/Settlement/Detail/Users/elements/VirtualMachine', () => {
  const props = {
    data: [],
    classes: {},
  };

  const action = {
    data: [{}, { currentStatus: 'Running' }],
    onPaginationChange: jest.fn(),
    page: 0,
    search: '',
    setSearch: jest.fn(),
    size: 5,
  };

  test('render', () => {
    useAction.mockReturnValue(action);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<VirtualMachine {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/others', () => {
    useAction.mockReturnValue({ ...action, page: 0, size: 0 });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<VirtualMachine {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
