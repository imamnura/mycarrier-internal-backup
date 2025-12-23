import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useAction from '../hooks/useAction';
import UpdatePeriod from '../UpdatePeriod';

jest.mock('../hooks/useAction');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/UpdatePeriod', () => {
  test('render', () => {
    useAction.mockReturnValue({
      control: {},
      onClose: jest.fn(),
      onSubmit: jest.fn(),
      open: true,
      handleSubmit: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UpdatePeriod />);
    tree.props?.children?.[1]?.props?.children?.props?.children?.props?.children?.props?.render?.(
      {
        field: { onChange: jest.fn(), value: undefined },
        fieldState: { error: { message: '-' } },
      },
    );
    expect(tree).toMatchSnapshot();
  });
});
