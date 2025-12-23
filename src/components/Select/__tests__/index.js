import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Select from '../Select';

describe('src/components/Select', () => {
  test('render/Desktop', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Select onChange={jest.fn()} value={''} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/Mobile', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Select onChange={jest.fn()} value={''} variant="secondary" />,
    );
    expect(tree).toMatchSnapshot();
  });
});
