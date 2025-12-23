import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceDelivery/IPPrefix/List/Request', () => {
  let useActionReturn = {
    list: {
      data: [
        {
          requestId: 'LOA652208289',
          createdAt: '2023-10-06T06:34:12.069Z',
          asNumber: 'Edit4321sd',
          originAsNumber: 'Edit4321sd',
          status: 'on progress',
        },
        {
          requestId: 'LOA340721418',
          createdAt: '2023-10-06T02:03:23.248Z',
          asNumber: '54321',
          originAsNumber: '54321',
          status: 'completed',
        },
      ],
      meta: {},
    },
    loadingTable: {
      tableRoot: false,
      tableRow: false,
    },
    onBottomPage: jest.fn(),
    onClickRowTable: jest.fn(),
    search: '',
    setSearch: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });
});
