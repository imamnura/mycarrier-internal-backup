import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ListOfDocument, { ListContent } from '../ListOfDocument';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { cleanup } from '@testing-library/react-hooks';

jest.mock('next/router');

const props = {
  setSendInvoiceEmail: jest.fn(),
  feature: [
    'update_periode_bill_and_payment',
    'update_send_billing_reminder',
    'update_thanks_letter',
  ],
  setUpdatePeriod: jest.fn(),
  setRemindingOption: jest.fn(),
};

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/ListOfDocument', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'bpNumber', type: 'invoice' },
      asPath: route.billsAndPayment('detail', 'bpNumber') + `?type=invoice`,
      push: jest.fn(),
    });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListOfDocument {...props} />);
    tree.props.children[1].props.children.props.onChange('payment');
    tree.props.children[1].props.children.props.onChange('claim');
    tree.props.children[1].props.children.props.onChange('xxx');
    expect(tree).toMatchSnapshot();
  });

  test('render ListContent', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <ListContent useList={jest.fn().mockReturnValue({})} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
