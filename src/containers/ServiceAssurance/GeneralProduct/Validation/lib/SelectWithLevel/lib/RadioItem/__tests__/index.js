import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RadioItem from '../RadioItem';

describe('src/containers/ServiceAssurance/GeneralProduct/Validation/lib/SelectWithLevel/lib/RadioItem/index', () => {
  test('render', () => {
    const props = {
      handleValue: jest.fn(),
      keyItem: 'key',
      label: 'Select Date',
      value: {},
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RadioItem {...props} />);
    RadioItem.defaultProps.handleValue();
    expect(tree).toMatchSnapshot();
  });
});
