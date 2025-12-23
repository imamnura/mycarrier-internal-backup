import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useAction';
import { optionsFilterStatus } from '../constant';

jest.mock('../hooks/useAction');

const actions = {
  feature: ['read_list_user_settlement_cdm', 'read_settlement_list_cdm'],
  filterStatus: '',
  filterBillingType: '',
  filterPeriod: '',
  list: { data: [{}], meta: {} },
  loading: false,
  onBottomPage: jest.fn(),
  onClickRowTable: jest.fn(),
  search: '',
  setFilterStatus: jest.fn(),
  setFilterBillingType: jest.fn(),
  setFilterPeriod: jest.fn(),
  setSearch: jest.fn(),
  setTab: jest.fn(),
  tab: 'settlement',
};

describe('src/containers/BillsAndPayment/Settlement/List', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });

  test('render/tab users', () => {
    useAction.mockReturnValue({
      ...actions,
      tab: 'users',
      feature: [],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });

  test('render/others', () => {
    useAction.mockReturnValue({
      ...actions,
      feature: ['read_settlement_list_am'],
      tab: '',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });

  test('optionsFilterStatus', () => {
    expect(optionsFilterStatus('progress')).toHaveLength(4);
    expect(optionsFilterStatus('elses')).toHaveLength(3);
  });
});
