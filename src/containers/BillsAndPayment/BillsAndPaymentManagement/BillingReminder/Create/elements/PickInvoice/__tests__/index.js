import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PickInvoice from '../PickInvoice';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  data: {},
  bpNumber: 'test',
  count: 1,
  reminderId: 'test',
  loading: false,
  onSubmit: jest.fn(),
  submitLoading: false,
  onStepperClick: jest.fn(),
  list: {
    data: [{ invoiceInternalFile: { fileName: 'test', fileUrl: 'test' } }],
  },
  loadings: false,
  onBottomPage: jest.fn(),
  useSelectedRow: jest.fn(),
  search: 'test',
  setSearch: jest.fn(),
  onPreviewDocument: jest.fn(),
  filter: [],
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create/elements/PickInvoice/index', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PickInvoice />);
    expect(tree).toMatchSnapshot();
  });

  test('render invoiceInternalFile null', () => {
    useAction.mockReturnValue({ ...actions, list: { data: [{}, {}] } });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PickInvoice />);
    expect(tree).toMatchSnapshot();
  });
});
