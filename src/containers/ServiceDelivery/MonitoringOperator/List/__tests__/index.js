import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('../constant');

describe('src/containers/ServiceDelivery/MonitoringOperator/List/index', () => {
  const props = { features: [''] };

  const useActionsReturn = {
    classes: {},
    filter: {
      dateRange: {
        onChange: jest.fn(),
        value: [null, null],
      },
      operator: {
        onChange: jest.fn(),
        options: {},
        value: { label: 'All Operator', value: '' },
      },
      poi: {
        onChange: jest.fn(),
        options: {},
        value: { label: 'All POI', value: '' },
      },
    },
    list: {
      data: [{}],
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
      optionsOperator: false,
      optionsPoi: false,
    },
    onBottomPage: jest.fn(),
    search: '',
    setSearch: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
