import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../index';

describe('src/containers/SMSA2P/NonBulk/Edit/elements/Step2', () => {
  const props = {
    detailedCampaign: [{}, {}],
    control: {},
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
