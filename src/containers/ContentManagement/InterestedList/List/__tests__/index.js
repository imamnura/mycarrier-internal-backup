import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/ContentManagement/InterestedList/List/index', () => {
  const useActionReturn = {
    filter: {
      status: {
        onChange: jest.fn(),
        options: [],
        value: { label: 'All Status On MyCarrier', value: '' },
      },
      starclickStatus: {
        onChange: jest.fn(),
        options: [],
        value: { label: 'All Status By Starclick', value: '' },
      },
      source: {
        onChange: jest.fn(),
        options: [],
        value: { label: 'All Source', value: '' },
      },
      dateRange: {
        onChange: jest.fn(),
        value: [null, null],
      },
    },
    loading: {
      tableRoot: false,
      tableRow: true,
      download: false,
      loadingFilterSource: false,
    },
    list: {
      data: [
        {
          businessType: 'Content Providers',
          companyName: 'CREATE  CA TEST 3',
          description: 'Test',
          interestId: 4242,
          name: 'dc3450c4c936257f178aeda7fe94602f737a12474838a628f5f49d9273339419',
          productName: 'Managed Service (Network Connectivity)',
          source: 'https://mycarrier.telkom.co.id',
          starclickStatus: null,
          status: 'Valid',
          updatedAt: '2023-02-13T02:57:53.322Z',
        },
      ],
      meta: [],
    },
    search: '',
    setSearch: jest.fn(),
    sort: 'asc',
    setSort: jest.fn(),
    orderBy: '',
    setOrderBy: jest.fn(),
    onBottomPage: jest.fn(),
    onClickRefresh: jest.fn(),
    onClickRowTable: jest.fn(),
    scIntegrationStatus: true,
    setModalDownload: jest.fn(),
    modalDownload: false,
    filterParams: {},
    setLoadingDownload: false,
    loadingScIntegrationStatus: false,
  };

  const props = { feature: [''] };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.action[1].onClick(true); //btn download
  });

  test('render starclickStatus Create_Opportunity', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      list: {
        data: [
          {
            businessType: 'Content Providers',
            companyName: 'CREATE  CA TEST 3',
            description: 'Test',
            interestId: 4242,
            name: 'dc3450c4c936257f178aeda7fe94602f737a12474838a628f5f49d9273339419',
            productName: 'Managed Service (Network Connectivity)',
            source: 'https://mycarrier.telkom.co.id',
            starclickStatus: 'Create_Opportunity',
            status: 'Valid',
            updatedAt: '2023-02-13T02:57:53.322Z',
          },
        ],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render starclickStatus Delayed_Convert', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      list: {
        data: [
          {
            businessType: 'Content Providers',
            companyName: 'CREATE  CA TEST 3',
            description: 'Test',
            interestId: 4242,
            name: 'dc3450c4c936257f178aeda7fe94602f737a12474838a628f5f49d9273339419',
            productName: 'Managed Service (Network Connectivity)',
            source: 'https://mycarrier.telkom.co.id',
            starclickStatus: 'Delayed_Convert',
            status: 'Valid',
            updatedAt: '2023-02-13T02:57:53.322Z',
          },
        ],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render filter', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      list: {
        data: [
          { status: 'Waiting' },
          { status: 'Invalid' },
          { status: 'Valid' },
        ],
        meta: {},
      },
      filter: {
        dateRange: {
          onChange: jest.fn(),
          value: ['2021-10-07T05:13:42.986Z', '2021-10-07T05:13:42.986Z'],
        },
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
