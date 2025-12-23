import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DetailInvoice from '../DetailInvoice';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/DetailInvoice', () => {
  test('render', () => {
    useAction.mockReturnValueOnce({
      data: {
        invoiceIbssAttachment: {
          invoice: {
            fileUrl: 'url',
          },
          invoiceAttachment: {
            fileUrl: 'url',
          },
          invoiceEfaktur: {
            fileUrl: 'url',
          },
        },
        invoiceReceipt: {},
      },
      paymentHistory: [{}],
      loading: false,
      onUploadAttachment: jest.fn(),
      onDeleteAttachment: jest.fn().mockReturnValue(jest.fn()),
      fetcherUploadAttachment: jest.fn(),
      fetchRefreshDocument: jest.fn(),
      onRefreshDocument: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailInvoice />);
    expect(tree).toMatchSnapshot();
  });

  test('render/emptyData', () => {
    useAction.mockReturnValueOnce({
      data: null,
      loading: false,
      onUploadAttachment: jest.fn(),
      onDeleteAttachment: jest.fn().mockReturnValue(jest.fn()),
      fetcherUploadAttachment: jest.fn(),
      paymentHistory: [{}],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailInvoice />);
    expect(tree).toMatchSnapshot();
  });
});
