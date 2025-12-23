import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../DetailProject';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const props = { feature: ['read_detail_service_list'] };

describe('src/containers/ServiceDelivery/ServiceList/Detail/Project', () => {
  test('render properly', () => {
    useActions.mockReturnValue({
      custAccntNum: 123,
      projectId: 123,
      data: {},
      setData: jest.fn(),
      loading: false,
      setLoading: jest.fn(),
      action: jest.fn(),
      hasAccess: true,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render properly without data', () => {
    useActions.mockReturnValue({
      custAccntNum: 123,
      projectId: 123,
      setData: jest.fn(),
      loading: false,
      setLoading: jest.fn(),
      action: jest.fn(),
      hasAccess: true,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
