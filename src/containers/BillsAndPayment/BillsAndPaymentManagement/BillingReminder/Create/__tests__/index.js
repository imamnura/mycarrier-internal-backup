import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Create from '../Create';
import useAction from '../hooks/useAction';
import { breadcrumb, filterYearOptions } from '../utils';

jest.mock('../hooks/useAction');

const actions = {
  data: {},
  setData: jest.fn(),
  tab: 1,
  setTab: jest.fn(),
  loading: false,
  onDiscard: jest.fn(),
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create/index', () => {
  beforeEach(() => {
    useAction.mockImplementation(() => actions);
  });

  test('render PickInvoice', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create />);
    expect(tree).toMatchSnapshot();
  });

  test('render EmailTextAndAttachment', () => {
    useAction.mockReturnValue({ ...actions, tab: 2 });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create />);
    expect(tree).toMatchSnapshot();
  });

  test('render ApprovalData', () => {
    useAction.mockReturnValue({ ...actions, tab: 3 });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create />);
    expect(tree).toMatchSnapshot();
  });

  test('breadcrumb', () => {
    expect(breadcrumb()).toBeTruthy();
  });

  test('filterYearOptions', () => {
    expect(filterYearOptions()).toBeTruthy();
  });
});
