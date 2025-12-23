import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Topology from '../Topology';

const props = {
  data: { onu: 'test' },
};

describe('src/containers/ServiceDelivery/ServiceList/Detail/MRTG/elements/Topology', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Topology {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
