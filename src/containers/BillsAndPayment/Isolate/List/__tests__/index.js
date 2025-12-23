import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  feature: ['read_list_isolate_cdm', 'read_detail_isolate_cdm'],
  filterProduct: '',
  list: {
    list: [
      {
        id: '634ceb581a110e163f56e373',
        am: 'AGA CHRISTIE NUR VANTOKO',
        customer: 'PT. LAYANAN PRIMA DIGITAL',
        regional: 'REGION 2',
        sid: '300105862-0031060031',
        product: 'IP PBX',
        billing: 26310000,
        isolateBy: '900096',
        serviceLocation: 'C3001058626_HR RASUNA SAID_70',
        isolateDate: '2022-09-01T00:00:00.000Z',
        submitDate: '2022-10-17T05:42:48.462Z',
        status: 'Isolated',
      },
    ],
  },
  loading: false,
  onBottomPage: jest.fn(),
  onClickRowTable: jest.fn(),
  optionFilterProduct: [],
  search: '',
  setFilterProduct: jest.fn(),
  setSearch: jest.fn(),
};

describe('src/containers/BillsAndPayment/Isolate/List', () => {
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
