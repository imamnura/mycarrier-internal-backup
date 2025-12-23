import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useAction from '../hooks/useAction';
import SendInvoiceEmail from '../SendInvoiceEmail';

jest.mock('../hooks/useAction');

const props = {
  onClose: jest.fn(),
  type: 'billingReminder',
  updateSendLog: jest.fn(),
};

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/SendInvoiceEmail', () => {
  test('render', () => {
    useAction.mockReturnValue({
      filter: [],
      onScrollList: jest.fn(),
      search: {},
      table: {},
      onSubmit: jest.fn(),
      selectedRow: [],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SendInvoiceEmail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  // test('render/empty', () => {
  //   useAction.mockReturnValue({
  //     setFormPic: jest.fn(),
  //     formPic: {},
  //     closeFormPic: jest.fn(),
  //     deleteProfile: jest.fn(),
  //   });
  //   const shallow = new ShallowRenderer();
  //   const tree = shallow.render(<SendInvoiceEmail {...props} data={[]} />);
  //   expect(tree).toMatchSnapshot();
  // });
});
