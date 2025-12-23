import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AddCC from '../AddCC';
import useAction from '../hooks/useAction';
import useStyles from '../../../styles';

jest.mock('../hooks/useAction');
jest.mock('../../../styles');

const actions = {
  ccType: 1,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  onSubmitType: jest.fn(),
  open: false,
  setType: jest.fn(),
  type: 'test',
  list: {
    data: [
      { title: 'test', name: 'test', nik: 'test' },
      { title: 'test2', name: 'test2', nik: 'test2' },
    ],
  },
  search: 'test',
  setSearch: jest.fn(),
  loadingTable: false,
  setSelectedEmployee: jest.fn(),
  selectedEmployee: { nik: 'test', hierarchy: 'test' },
  onScrollList: jest.fn(),
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create/elements/AddCC/index', () => {
  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddCC />);
    expect(tree).toMatchSnapshot();
  });

  test('render ccType false', () => {
    useAction.mockReturnValue({ ...actions, ccType: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddCC />);
    expect(tree).toMatchSnapshot();
  });

  test('render ccType another value', () => {
    useAction.mockReturnValue({
      ...actions,
      ccType: 2,
      selectedEmployee: { nik: '', hierarchy: 'test' },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddCC />);
    expect(tree).toMatchSnapshot();
  });
});
