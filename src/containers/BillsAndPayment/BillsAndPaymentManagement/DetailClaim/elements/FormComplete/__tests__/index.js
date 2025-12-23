import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FormComplete from '../FormComplete';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/DetailClaim/elements/FormComplete', () => {
  const action = {
    control: {},
    onSubmit: jest.fn(),
  };

  const props = {
    open: true,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValueOnce(action);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormComplete {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
