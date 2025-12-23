import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Trial';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionsReturn = {
  action: jest.fn(),
  data: {},
  feature: ['read_attachment'],
};

const props = { feature: ['read_attachment'] };

describe('src/containers/Document/PurchaseOrder/Detail/Trial', () => {
  test('render properly', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
