import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../Detail';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('../constant');

let useActionReturn = {
  action: jest.fn(),
  data: {
    requestId: 'MP-123',
    noteRequest: '',
    noteLoginData: '',
    noteIntegrated: '',
    serviceLocation:
      'telkom palembang centrum Jl Kapten anwar sastro sungai pangeran kec ilir timur palembang PALEMBANG Indonesia',
    activatedDate: '2022-10-20T20:07:18+07:00',
    lastUpdate: '2022-10-20T20:07:18+07:00',
    status: 'CUSTOMER REQUEST',
    customerAccountName: '',
    customerAccountNumber: '0003700029',
  },
  loading: false,
  customerAccountNumber: 'tes123',
  requestId: 'tes123',
  list: {
    data: [
      {
        status: '',
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
  search: '',
  setSearch: jest.fn(),
};

const props = {
  feature: ['read_list_service', 'read_detail_reqMrtg', 'update_login_data'],
};

describe('src/containers/ServiceDelivery/ApprovalMRTG/RequestMRTGDetail-v2', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
