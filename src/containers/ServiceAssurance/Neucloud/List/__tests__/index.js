import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/ServiceAssurance/Neucloud/List', () => {
  const props = {
    feature: [],
  };

  const useActionReturn = {
    list: {
      data: [
        {
          status: 'completed',
        },
        {
          status: 'onprogress',
        },
        {
          status: 'checking',
        },
      ],
      meta: [],
    },
    loading: {
      tableRoot: false,
      tableRow: false,
      download: false,
    },
    filterStatus: { label: 'All Status', value: '' },
    search: '',
    confirmation: { content: '', actions: [] },
    sort: 'asc',
    orderBy: '',
    openFormTicketNumber: {
      open: false,
      refId: '',
    },
    updateTicketNumber: jest.fn(),
    onBottomPage: jest.fn(),
    onClickRowTable: jest.fn(),
    handleFormTicketNumber: jest.fn(),
    clearConfirmation: jest.fn(),
    handleRefresh: jest.fn(),
    onClickDownload: jest.fn(),
    setFilterStatus: jest.fn(),
    setSearch: jest.fn(),
    setConfirmation: jest.fn(),
    setSort: jest.fn(),
    setOrderBy: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render case 2', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      list: {
        data: [],
        meta: {},
      },
      feature: [
        'read_detail_ticket_neucloud',
        'update_status_ticket_neucloud',
        'read_list_ticket_neucloud',
      ],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
