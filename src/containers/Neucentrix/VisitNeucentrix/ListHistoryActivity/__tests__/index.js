import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/Neucentrix/VisitNeucentrix/ListHistoryActivity', () => {
  const props = {
    feature: [],
  };

  const useActionReturn = {
    filterStatus: { label: 'All Status', value: '' },
    list: {
      historyActivity: [
        {
          activity: 'CHECKIN',
        },
      ],
      meta: {},
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    search: '',
    setFilterVisitor: jest.fn(),
    setSearch: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
