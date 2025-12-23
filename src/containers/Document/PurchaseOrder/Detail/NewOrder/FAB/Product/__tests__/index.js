import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Product';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionsReturn = {
  action: jest.fn(),
  data: {},
  productName: 'gameqoo',
};

const props = { feature: ['read_attachment'] };

describe('src/containers/Document/PurchaseOrder/Detail/NewOrder/FAB/Product', () => {
  test('render properly', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
