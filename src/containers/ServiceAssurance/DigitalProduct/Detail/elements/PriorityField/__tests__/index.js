import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PriorityField from '../PriorityField';

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/elements/PriorityField', () => {
  test('render', () => {
    const props = { priority: 'low' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PriorityField {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render null', () => {
    const props = { priority: '' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PriorityField {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
