import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import OrderHeader from '../OrderHeader';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const props = {
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/OrderHeader', () => {
  test('run properly', () => {
    useActions.mockReturnValueOnce({
      dashboardId: '123',
      orderId: '123',
      data: {},
      feature: [],
      loading: false,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<OrderHeader {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
