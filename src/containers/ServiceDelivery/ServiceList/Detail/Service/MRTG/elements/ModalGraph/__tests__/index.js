import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ModalGraph from '../ModalGraph';

const props = {
  modalGraph: {},
  setModalGraph: jest.fn(),
};

describe('src/containers/ServiceDelivery/ServiceList/Detail/MRTG/elements/ModalGraph', () => {
  test('render', () => {
    ModalGraph.defaultProps.setModalGraph();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalGraph {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.onClose();
    tree.props.children.props.children[5].props.children.props.children.props.onClick();
  });
});
