import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ApprovalData from '../ApprovalData';
import useAction from '../hooks/useAction';
import useStyles from '../../../styles';

jest.mock('../hooks/useAction');
jest.mock('../../../styles');

const actions = {
  ccType: 1,
  onCancel: jest.fn(),
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

  data: {},
  bpNumber: 'test',
  count: 1,
  reminderId: 'test',
  loading: false,
  onSubmit: jest.fn(),
  submitLoading: jest.fn(),
  onStepperClick: jest.fn(),
  reviewerFields: [{ id: 'test' }, { id: 'test2' }],
  onAddRecipient: jest.fn(),
  onDeleteReviewer: jest.fn(),
  control: {},
  onAddCC: jest.fn(),
  onDeleteCC: jest.fn(),
  tempCC: [{ name: 'test' }, { name: 'test2' }],
  setTempCC: jest.fn(),
  popUpcc: false,
  closePopUpCC: jest.fn(),
  formState: {},
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create/elements/ApprovalData/index', () => {
  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalData />);
    expect(tree).toMatchSnapshot();
  });

  test('render isValid true', () => {
    useAction.mockReturnValue({
      ...actions,
      formState: { isValid: true },
      tempCC: [],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApprovalData />);
    expect(tree).toMatchSnapshot();
  });
});
