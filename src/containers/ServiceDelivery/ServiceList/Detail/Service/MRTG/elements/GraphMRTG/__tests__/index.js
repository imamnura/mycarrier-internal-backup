import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import GraphMRTG from '../MRTG';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

const props = {
  schema: [],
  setModalGraph: jest.fn(),
};

const useActionReturn = {
  dataMRTGgraph: [{ data: [] }],
  setFilterDateRange: jest.fn(),
};

describe('src/containers/ServiceDelivery/ServiceList/Detail/MRTG/elements/GraphMRTG', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<GraphMRTG {...props} />);
    expect(tree).toMatchSnapshot();

    //full screen view onclick
    tree.props.children[2][0].props.children[2].props.children.props.children.props.onClick();
  });

  test('render without data when loading', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      dataMRTGgraph: [],
      isLoading: true,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<GraphMRTG {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render without data', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      dataMRTGgraph: [],
      isLoading: false,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<GraphMRTG {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
