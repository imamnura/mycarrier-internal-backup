import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../Detail';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('../constant');

let useActionReturn = {
  data: {
    customerAccountNumber: 'tes123',
    customerAccountName: 'PT TELEKOMUNIKASI',
    isNewRequest: false,
    activatedDate: '2022-11-21T16:41:26+07:00',
    lastUpdate: '2023-01-30T22:26:59+07:00',
    loginData: [],
    noteLoginData: '',
    noteIntegrated: 'test',
    status: '',
  },
  loading: false,
  customerAccountNumber: 'tes123',
  filter: {
    customer: {},
    campaignType: {},
    dateRange: {},
  },
  list: {
    data: [
      {
        status: '',
      },
      {
        status: 'ON PROGRESS',
      },
      {
        status: 'COMPLETED',
      },
      {
        status: 'CUSTOMER REQUEST',
      },
      {
        status: 'INTEGRATED',
      },
    ],
    meta: {},
  },
  loadingTable: {
    tableRoot: false,
    tableRow: false,
  },
  onBottomPage: jest.fn(),
  onClickRefresh: jest.fn(),
  onClickRowTable: jest.fn(),
  tab: 'request-mrtg',
  setTab: jest.fn(),
  search: '',
  setSearch: jest.fn(),
  tabsProps: jest.fn(),
  filterProps: jest.fn(),
};

const props = {
  feature: [
    'read_detail_custMrtg',
    'read_list_reqMrtg',
    'read_detail_reqMrtg',
    'read_list_login_data',
    'read_detail_login_data',
  ],
};

describe('src/containers/ServiceDelivery/ApprovalMRTG/CustomerMRTGDetail-v2', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with no privilege & no tab', () => {
    const newProps = {
      feature: [],
    };

    useActionReturn = {
      ...useActionReturn,
      tab: '',
    };

    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...newProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with tab done', () => {
    useActionReturn = {
      ...useActionReturn,
      tab: 'login-data',
    };
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
