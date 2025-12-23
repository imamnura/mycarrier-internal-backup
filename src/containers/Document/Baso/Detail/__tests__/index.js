import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../Detail';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('../../utils');

const useActionReturn = {
  fetchDetail: jest.fn(),
  orderNumber: 'test123',
  data: {
    orderNumber: 'test123',
    status: 'RETURNED',
  },
  loading: false,
  detailSchema: [],
  action: jest.fn(),
};

const props = { feature: [] };

describe('src/containers/Document/Baso/Detail-v2', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render without ordernumber', () => {
    useAction.mockReturnValue({ ...useActionReturn, orderNumber: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
