import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useAction from '../hooks/useAction';
import SummaryInvoice from '../SummaryInvoice';
import useStyles from '../styles';

jest.mock('../hooks/useAction');
jest.mock('../styles');

const actions = {
  period: 'test',
  requestTime: {},
  setPeriod: jest.fn(),
  setRequestTime: jest.fn(),
  data: {
    base: {
      totalAll: 0,
      totalInitial: 0,
      totalInprogress: 0,
      totalFinish: 0,
    },
    all: 0,
    requested: 0,
    inProgress: 0,
    completed: 0,
  },
  loading: false,
  onViewAll: jest.fn(),
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/Main/elements/Dashboard/elements/SummaryInvoice/index', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('11 August 2023 08:08:08 UTC'));
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SummaryInvoice />);
    expect(tree).toMatchSnapshot();
    tree.props.children[1].props.children[0].props.children[0].props.colors({
      data: { color: '#52BD94' },
    });
  });

  test('render loading true', () => {
    useAction.mockReturnValue({ ...actions, loading: true });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SummaryInvoice />);
    expect(tree).toMatchSnapshot();
  });
});
