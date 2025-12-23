import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EstimateValue from '../EstimateValue';

describe('src/fragment-v2/Performance/lib/EstimateValue', () => {
  const props = {
    value: '123',
    loading: false,
  };

  test('render success', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EstimateValue {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render empty', () => {
    const customProps = {
      loading: false,
      value: null,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EstimateValue {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    const customProps = {
      loading: true,
      value: '-',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EstimateValue {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
