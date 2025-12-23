import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Action from '../Action';

describe('src/containers/BillsAndPayment/Settlement/Detail/Users/elements/Action', () => {
  const props = {
    data: {
      totalUsage: '-',
    },
    handlePeriod: jest.fn(),
    onDownload: jest.fn(),
    period: '',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Action {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
