import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useAction';
import { normalizeStatus } from '../constant';

jest.mock('../hooks/useAction');

const returnValueData = {
  feature: [
    'read_list_need_validation_lead',
    'read_list_valid_lead',
    'read_list_invalid_lead',
    'read_list_dispatch_lead',
  ],
  filterDateSubmit: [],
  filterLastContacted: [],
  filterLastUpdate: [],
  filterSource: 'test',
  filterStatus: 'test',
  list: { data: [{}, {}] },
  loading: false,
  onBottomPage: jest.fn(),
  onClickRowTable: jest.fn(),
  optionSource: [{}],
  search: 'test',
  setFilterDateSubmit: jest.fn(),
  setFilterLastContacted: jest.fn(),
  setFilterLastUpdate: jest.fn(),
  setFilterSource: jest.fn(),
  setFilterStatus: jest.fn(),
  setSearch: jest.fn(),
  setTab: jest.fn(),
  tab: 'leadValid',
};

describe('src/containers/LeadManagmentSystem/Dashboard/List/elements/List/index', () => {
  test('render', () => {
    useAction.mockReturnValueOnce(returnValueData);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab null', () => {
    useAction.mockReturnValueOnce({ ...returnValueData, tab: '' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });

  test('normalizeStatus', () => {
    expect(normalizeStatus('valid')).toBeTruthy();
  });
});
