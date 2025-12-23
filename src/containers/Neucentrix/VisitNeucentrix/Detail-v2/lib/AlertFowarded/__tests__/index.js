import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AlertFowarded from '../AlertFowarded';

describe('src/containers/Neucentrix/VisitNeucentrix/Detail-v2/lib/AlertFowarded', () => {
  const props = {
    value: ['test'],
  };

  test('render success', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AlertFowarded {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
