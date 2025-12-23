import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useActions';
import { optionsTypeOfLogin, optionsNewsletterStatus } from '../constant';

jest.mock('../hooks/useActions');
jest.mock('../constant');

describe('src/containers/ContentManagement/Brochure/List/index', () => {
  const props = {
    feature: [''],
  };

  const useActionsReturn = {
    filter: {
      loginType: {
        onChange: jest.fn(),
        options: optionsTypeOfLogin,
        value: { label: 'All Type of Login', value: '' },
      },
      newsletter: {
        onChange: jest.fn(),
        options: optionsNewsletterStatus,
        value: { label: 'All Newsletter Status', value: '' },
      },
      product: {
        onChange: jest.fn(),
        options: [null, null],
        value: { label: 'All Product', value: '' },
      },
      datePick: {
        onChange: jest.fn(),
        value: [null, null],
      },
    },
    list: {
      data: [
        {
          brochureDownloadId: 'BD-51253881',
          name: 'arham',
          email: 'test-developer@gmail.com',
          product: 'Homepage',
          source: 'https://dev.mycarrier.co.id/',
          afterLogin: false,
          allowNewsletter: false,
          dateDownload: '2023-02-21T03:47:33.881Z',
        },
        {
          brochureDownloadId: 'BD-31306495',
          name: 'Tytan',
          email: 'laras@getnada.com',
          product: 'Homepage',
          source: 'https://mycarrier-dev.telkomdigitalsolution.co/',
          afterLogin: true,
          allowNewsletter: true,
          dateDownload: '2022-10-13T03:21:46.495Z',
        },
      ],
      meta: {},
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    onBottomPage: jest.fn(),
    onClickRowTable: jest.fn(),
    onClickRefresh: jest.fn(),
    search: '',
    setSearch: jest.fn(),
    sort: 'asc',
    setSort: jest.fn(),
    orderBy: '',
    setOrderBy: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
