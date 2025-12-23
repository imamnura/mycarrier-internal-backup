import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TextField from '../component';

describe('src/components/elements/TextField', () => {
  const props = {
    classes: {},
    input: {},
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TextField {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render disbled', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TextField disabled {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render error', () => {
    const customProps = {
      ...props,
      meta: { touched: true, invalid: true, error: 'error' },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TextField {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
