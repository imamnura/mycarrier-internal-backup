import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  feature: [
    'read_list_broadcast_information_cdm',
    'read_detail_broadcast_information_cdm',
    'create_broadcast_information_cdm',
  ],
  filterCreatedDate: null,
  filterStatus: '',
  list: {
    data: [
      {
        broadcastId: 123,
        contactGroup: 'Blasting WA RAFI MyCarrier Customer',
        createdDate: '',
        name: 'Ucapan Idul Fitri 2022_Cust',
        status: 'preparation',
      },
      {
        broadcastId: 123,
        contactGroup: 'Blasting WA RAFI MyCarrier Customer',
        createdDate: '22/22/2222',
        name: 'Ucapan Idul Fitri 2022_Cust',
        status: 'preparation',
      },
    ],
  },
  loading: {
    tableRoot: true,
    tableRow: false,
  },
  onBottomPage: jest.fn(),
  onClickCreateBroadcast: jest.fn(),
  onClickRowTable: jest.fn(),
  search: '',
  setFilterCreatedDate: jest.fn(),
  setFilterStatus: jest.fn(),
  setSearch: jest.fn(),
};

describe('src/containers/Broadcast/BroadcastInformastion/List', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List feature={['']} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/others', () => {
    useAction.mockReturnValue({
      ...actions,
      feature: [],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List feature={['']} />);
    expect(tree).toMatchSnapshot();
  });
});
