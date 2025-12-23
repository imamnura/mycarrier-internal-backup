import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FormPICProfile from '../FormPICProfile';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  formPic: { open: jest.fn() },
  onClose: jest.fn(),

  control: {},
  onSubmit: jest.fn(),
  labels: { title: 'tes' },
  customerAsyncProps: {},
  handleSubmit: jest.fn(),
};

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/PICProfileRefactor/element/FormPICProfile', () => {
  test('render', () => {
    useAction.mockReturnValueOnce(props);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormPICProfile {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
