import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ContentManagement/Homepage/List/index', () => {
  const props = {
    feature: [
      'view_list',
      'view_list_popup_banner',
      'create_brochure',
      'create_banner',
      'create_popup_banner',
    ],
  };

  const useActionReturn = {
    list: {
      data: [
        {
          bannerId: 1,
          lang: 'id',
          linkedTo: 'metro-ethernet',
          status: 'active',
          title: 'Banner Baru v5',
          type: 'banner',
        },
        {
          bannerId: 2,
          lang: 'id',
          linkedTo: 'metro-ethernet',
          status: 'active',
          title: 'Banner Baru v6',
          type: 'banner',
        },
      ],
      meta: {},
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    search: '',
    setSearch: jest.fn(),
    sort: 'asc',
    setSort: jest.fn(),
    orderBy: '',
    setOrderBy: jest.fn(),
    filter: {
      dateRange: {},
      type: {},
      eventsType: {},
    },
    onBottomPage: jest.fn(),
    onClickRowTable: jest.fn(),
    onChangeStatusPopUp: jest.fn(),
    onUpdatePopUp: jest.fn(),
    onDeletePopUp: jest.fn(),
    onAddContent: jest.fn(),
    onUpdateBanner: jest.fn(),
    confirmDeleteBanner: jest.fn(),
    onUpdateEvents: jest.fn(),
    confirmDeleteEvant: jest.fn(),
    onCloseDialog: jest.fn(),
    openDialog: false,
    setOpenDialog: jest.fn(),
    normalizePeriod: jest.fn(),
    activeBtnGoAhead: false,
    addContent: jest.fn(),
    contentMenuList: [
      { id: 1, label: 'Banner Hero' },
      { id: 2, label: 'Brochure Upload' },
    ],
    setChoosedContent: jest.fn(),
    choosedContent: 0,
    tab: 'bannerHero',
    setTab: jest.fn(),
    dateStarEnd: jest.fn(),
    onChangeStatusBanner: jest.fn(),
  };

  test('render tab banner', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      tab: 'bannerHero',
      choosedContent: 1,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.table.data[0].operations.props.children[0].props.onClick(); //onUpdateBanner
    tree.props.children[0].props.table.data[0].operations.props.children[1].props.onClick(); //confirmDeleteBanner
  });

  test('render tab brochure', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      tab: 'brochure',
      choosedContent: 2,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab popup', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      tab: 'popup',
      choosedContent: 3,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render without access to add', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      tab: 'popup',
      choosedContent: 3,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });
});
