import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CardInfo from '../CardInfo';

describe('src/components/CardInfo', () => {
  test('render/card summary', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CardInfo />);
    expect(tree).toMatchSnapshot();
  });

  test('render/loading', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CardInfo loading />);
    expect(tree).toMatchSnapshot();
  });
});
