import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  data: {
    id: '634e2ea9bd93f000eb986c85',
    am: null,
    sid: '1706658412',
    product: 'Metro E',
    customerName: 'TEST API MYCARRIER',
    isolateBy: null,
    isolateDate: '2022-09-02 00:00:00',
    submitDate: '2022-10-18T04:42:17.768Z',
    address:
      ' Jl. C. Simanjuntak, Terban, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa , KOTA YOGYAKARTA,0',
    regional: 'REGION 4',
    receipt: [],
    status: 'Isolatedd',
  },
  feature: ['read_list_isolate_cdm', 'read_detail_isolate_cdm'],
  loading: false,
  isolateId: 'id',
};

describe('src/containers/BillsAndPayment/Isolate/Detail', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty', () => {
    useAction.mockReturnValue({ ...actions, data: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
});
