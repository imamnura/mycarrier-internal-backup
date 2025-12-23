import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Summary from '../Summary';

jest.mock('@utils/hooks/useResponsive');

describe('src/containers/ServiceDelivery/ServiceList/lib/Summary', () => {
  const props = {
    loading: true,
    schema: [
      {
        title: 'Total Service',
        content: 1,
        variant: 'general',
        sm: 6,
      },
      {
        title: 'Active',
        content: 1,
        variant: 'success',
        useDivider: true,
        sm: 6,
      },
      {
        title: 'On Delivery',
        content: 1,
        variant: 'info',
        sm: 4,
      },
      {
        title: 'Isolated',
        content: 1,
        variant: 'alert',
        sm: 4,
      },
      {
        title: 'Disconnect',
        content: 1,
        variant: 'danger',
        sm: 4,
      },
    ],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Summary {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
