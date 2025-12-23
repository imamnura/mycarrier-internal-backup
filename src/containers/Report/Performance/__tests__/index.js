import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PerformanceReport from '../Performance';
import useAction from '../hooks/useActions';
import { useRouter } from 'next/router';
import { route } from '@configs/index';

jest.mock('../hooks/useActions');
jest.mock('next/router');

describe('src/pages/PerformanceReport', () => {
  const props = {
    feature: [
      'read_downloadDetaildata_purchaseOrder',
      'read_downloadDetaildata_baso',
      'read_performance_purchaseOrder',
      'read_performance_baso',
      'read_offering_letter_performance',
      'read_performance_bakes',
      'read_download_performance_detail_data_smsa2p',
      'read_download_detail_data_neucentrix_visiting_performance',
      'read_download_performance_detail_data_neucloud',
      'read_download_performance_detail_data_general_product',
    ],
  };

  const useActionReturn = {
    feature: [
      'read_downloadDetaildata_purchaseOrder',
      'read_downloadDetaildata_baso',
      'read_performance_purchaseOrder',
      'read_performance_baso',
      'read_offering_letter_performance',
      'read_performance_bakes',
    ],
    filterCustomer: { label: 'All Company', value: '' },
    filterCustomerOptions: [],
    filterPeriod: [null, null],
    list: {
      data: [
        {
          startDate: '2021-09-09T07:16:04.511Z',
          endDate: '2021-09-09T07:16:04.511Z',
          status: 'Status',
          orderType: 'ordertype',
        },
      ],
      meta: [],
    },
    chartData: {
      documentPie: [{ count: 1, title: 'title' }],
      orderTypePie: [{ count: 1, title: 'title' }],
      productPie: [{ count: 1, title: 'title' }],
      customerBar: [{ count: 1, title: 'title' }],
      performanceBar: [{ count: 1, title: 'title' }],
      documentValue: {
        value: 'Rp. 999',
        totalValue: '999',
      },
    },
    loading: {
      chart: false,
      tableRow: false,
      tableRoot: false,
      filterCustomer: false,
      download: false,
    },
    filter: jest.fn(),
    onBottomPage: jest.fn(),
    onClickDownload: jest.fn(),
    onClickRefresh: jest.fn(),
    setFilterCustomer: jest.fn(),
    setFilterPeriod: jest.fn(),
    setTab: jest.fn(),
    setTabL2: jest.fn(),
    validateProductPie: jest.fn(),
    validatePoBasoVIsitNCX: (x) => x,
    validateBakesOfferingLetter: (x) => x,
    validateBakesOfferingLetterServiceAssurance: (x) => x,
    tab: 'document',
    tabL2: '',
  };

  beforeAll(() => {
    useRouter.mockReturnValue({
      pathname: route.reportPerformance(),
      push: jest.fn(),
      query: {},
      replace: jest.fn(),
    });
  });

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PerformanceReport {...props} />);
    window.scrollY = 1;
    window.innerHeight = 1000;
    // window.onscroll();
    expect(tree).toMatchSnapshot();
  });

  test('render case po', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      tabL2: 'po',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PerformanceReport {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render case baso', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      tabL2: 'baso',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PerformanceReport {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render case smsa2p', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      tabL2: 'smsa2p',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PerformanceReport {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render case visitNCX', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      tabL2: 'visitNCX',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PerformanceReport {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render case timeApproveVisit', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      tabL2: 'timeApproveVisit',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PerformanceReport {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render case neucloud', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      tabL2: 'neucloud',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PerformanceReport {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render case gp', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      tabL2: 'gp',
    });

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PerformanceReport {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
