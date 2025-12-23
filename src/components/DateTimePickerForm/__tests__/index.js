import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DateTimePickerForm from '../DateTimePickerForm';

describe('src/components-v2/DateTimePickerForm', () => {
  const props = {
    onChange: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DateTimePickerForm {...props} />);
    tree.props.children.props.onChange(new Date('10/10/2010'));
    tree.props.children.props.onChange(null);
    tree.props.children.props.renderInput({}, {});
    expect(tree).toMatchSnapshot();
  });

  test('render/other', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DateTimePickerForm {...props} disabled />);
    expect(tree).toMatchSnapshot();
  });
});
