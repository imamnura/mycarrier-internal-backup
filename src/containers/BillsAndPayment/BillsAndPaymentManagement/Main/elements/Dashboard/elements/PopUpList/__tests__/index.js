import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useAction from '../hooks/useAction';
import PopUpList from '../PopUpList';
import useStyles from '../styles';

jest.mock('../hooks/useAction');
jest.mock('../styles');

const props = {
  type: 'invoice',
  subType: 'all',
  open: true,
  onClose: jest.fn(),
};

const actions = {
  filterStatus: {},
  search: 'test',
  setFilterStatus: jest.fn(),
  setSearch: jest.fn(),
  list: { data: [{}, {}] },
  onLoadMore: jest.fn(),
  loading: false,
  onDownload: jest.fn(),
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/Main/elements/Dashboard/elements/PopUpList/index', () => {
  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopUpList {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type billingReminder', () => {
    const customProps = { ...props, type: 'billingReminder' };
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopUpList {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type thanksLetter', () => {
    const customProps = {
      ...props,
      type: 'thanksLetter',
      subType: 'In Progress',
    };
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopUpList {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
