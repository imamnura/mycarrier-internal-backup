import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useAction from '../hooks/useAction';
import PopUpListSubmittedCustomer from '../PopUpListSubmittedCustomer';
import useStyles from '../styles';

jest.mock('../hooks/useAction');
jest.mock('../styles');

const props = {
  type: 'test',
  open: false,
  onClose: jest.fn(),
  date: 'test',
};

const actions = {
  companyName: {},
  companyNameAsyncProps: {
    loadOptions: jest.fn(),
    additional: { page: 1 },
  },
  data: [{}, {}],
  onAddNewData: jest.fn(),
  onDeleteData: jest.fn(),
  setCompanyName: jest.fn(),
  newData: {},
  onSubmitNewData: jest.fn(),
  onCancelNewData: jest.fn(),
  onSend: jest.fn(),
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/Main/elements/Dashboard/elements/PaymentHistorical/elements/PopUpListSubmittedCustomer/index', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('11 August 2023 08:08:08 UTC'));
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopUpListSubmittedCustomer {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render newData null', () => {
    const customActions = { ...actions, newData: null };
    useAction.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopUpListSubmittedCustomer {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
