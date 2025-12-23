import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Mttr from '../MTTR';

const props = {
  schema: [],
  data: [{ period: 'test' }],
  setModalMTTR: jest.fn(),
};

describe('src/containers/ServiceDelivery/ServiceList/Detail/MRTG/elements/MTTR', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Mttr {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[1].props.children.props.children.props.onClick();
  });
});
