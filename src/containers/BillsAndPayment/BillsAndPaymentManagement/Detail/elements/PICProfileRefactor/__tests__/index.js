import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PICProfileRefactor from '../PICProfileRefactor';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  data: [{}, {}],
  type: 'customer',
  updatePicProfile: jest.fn(),
  feature: ['*'],
};

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/PICProfileRefactor', () => {
  test('render', () => {
    useAction.mockReturnValueOnce(props);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PICProfileRefactor {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty', () => {
    useAction.mockReturnValueOnce({ ...props, data: [] });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PICProfileRefactor {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
