import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../GameQoo';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionsReturn = {
  action: jest.fn(),
  data: {},
  productName: 'gameqoo',
};

const props = { feature: ['read_attachment'] };

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall/GameQoo', () => {
  test('render properly', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly product smarthand', () => {
    useActions.mockReturnValue({
      ...useActionsReturn,
      productName: 'smarthand',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();

    //converter activity & quantity
    tree.props.children[0].props.schema[0].content[0].properties.schema[10].converter(
      10,
    );
    tree.props.children[0].props.schema[0].content[0].properties.schema[11].converter(
      2,
    );
  });
});
