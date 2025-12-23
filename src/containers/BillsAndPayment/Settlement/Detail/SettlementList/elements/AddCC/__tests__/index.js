import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AddCC from '../AddCC';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  ccType: null,
  loading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  onSubmitType: jest.fn(),
  open: true,
  setType: jest.fn(),
  type: '',
  list: { data: [{}], meta: {}, hasMore: false },
  search: '',
  setSearch: jest.fn(),
  loadingTable: { root: false, row: false },
  setSelectedEmployee: jest.fn(),
  selectedEmployee: [],
  scrollable: null,
  infinityScroll: jest.fn(),
};

describe('src/containers/BillsAndPayment/Settlement/Detail/SettlementList/elements/AddCC', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddCC />);
    expect(tree).toMatchSnapshot();
  });

  test('render/ccType = 1', () => {
    useAction.mockReturnValue({ ...actions, ccType: '1' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddCC />);
    expect(tree).toMatchSnapshot();
  });
});
