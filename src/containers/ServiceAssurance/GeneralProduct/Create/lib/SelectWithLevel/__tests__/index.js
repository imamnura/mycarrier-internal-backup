import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SelectWithLevel from '../SelectWithLevel';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

describe('src/containers/ServiceAssurance/GeneralProduct/Create/lib/SelectWithLevel/index', () => {
  const useActionReturn = {
    data: [],
    open: false,
    refField: { current: null },
    setOpen: jest.fn(),
    onChange: jest.fn(),
    selected: '',
    value: null,
    handleValue: jest.fn(),
  };

  test('render', () => {
    const props = {
      data: [],
      isLoading: false,
      label: 'Select Date',
      name: 'selectLevel',
      value: null,
      onChange: jest.fn(),
    };
    useAction.mockReturnValue({
      ...useActionReturn,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SelectWithLevel {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render other condition', () => {
    const props = { isLoading: true, onChange: jest.fn() };
    useAction.mockReturnValue({
      ...useActionReturn,
      value: 'value',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SelectWithLevel {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
