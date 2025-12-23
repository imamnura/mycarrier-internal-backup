import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TimePickerForm from '../Primary';

describe('src/components-v2/elements/TimePickerForm/Primary', () => {
  const props = {
    onChange: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TimePickerForm {...props} />);
    tree.props.children.props.onChange(new Date('10/10/2010'));
    tree.props.children.props.onChange(null);
    tree.props.children.props.renderInput({}, {});
    expect(tree).toMatchSnapshot();
  });
});
