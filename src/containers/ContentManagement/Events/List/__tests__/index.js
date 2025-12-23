import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useActions';
import { optionsEventsStatus, optionsContentStatus } from '../constant';

jest.mock('../hooks/useActions');
jest.mock('../constant');

describe('src/containers/ContentManagement/Events/List/index', () => {
  const props = {
    action: jest.fn(),
  };

  const useActionsReturn = {
    filter: {
      dateRange: {
        onChange: jest.fn(),
        value: [null, null],
      },
      eventsStatus: {
        onChange: jest.fn(),
        options: optionsEventsStatus,
        value: { label: 'All Event Status', value: '' },
      },
      contentStatus: {
        onChange: jest.fn(),
        options: optionsContentStatus,
        value: { label: 'All Content Status', value: '' },
      },
    },
    list: {
      data: [
        {
          dateHeld: '20 September 2022 07:00 - 10:00',
          endDate: '2022-09-20T10:00:00+07:00',
          eventId: 'EV-1663573335182',
          eventStatus: 'past',
          id: 418,
          startDate: '2022-09-20T07:00:00+07:00',
          status: 'publish',
          title: 'Acara v4',
        },
      ],
      meta: {
        page: 1,
        size: 10,
        totalData: 2,
        totalPages: 1,
      },
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    onClickRowTable: jest.fn(),
    onBottomPage: jest.fn(),
    onUpdateEvents: jest.fn(),
    confirmDeleteEvents: jest.fn(),
    addEvents: jest.fn(),
    search: '',
    setSearch: jest.fn(),
    sort: 'asc',
    setSort: jest.fn(),
    orderBy: '',
    setOrderBy: jest.fn(),
  };

  const E = jest.fn();

  test('render', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.table.data[0].operations.props.children[0].props.onClick(
      E,
      'id',
    ); //updateEvents
    tree.props.table.data[0].operations.props.children[1].props.onClick(
      E,
      'id',
    ); //deleteEvents
  });
});
