import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Index from '../index';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Main/elements/Dashboard/index', () => {
  test('render dashboard', () => {
    useAction.mockReturnValueOnce({
      popUpList: {
        open: true,
        type: 'invoice',
        subType: 'all',
      },
      setPopUpList: jest.fn(),
      onClosePopUpList: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Index feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
