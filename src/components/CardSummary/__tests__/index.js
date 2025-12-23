import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CardSummary from '../CardSummary';

describe('src/components-v2/CardSummary', () => {
  test('render/card summary', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CardSummary />);
    expect(tree).toMatchSnapshot();
  });

  test('render/loading', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CardSummary loading />);
    expect(tree).toMatchSnapshot();
  });
});
