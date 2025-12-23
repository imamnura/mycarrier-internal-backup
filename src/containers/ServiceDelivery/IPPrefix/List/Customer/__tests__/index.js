import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceDelivery/IPPrefix/List/Customer', () => {
  const props = {
    feature: [],
  };

  let useActionReturn = {
    list: {
      data: [
        {
          custAccntNum: '0003700029',
          custAccntName: 'GRATIKA',
          lastUpdate: '10/05/2019 01:05',
          isNewRequest: false,
        },
        {
          custAccntNum: '0003700029',
          custAccntName: 'GRATIKA',
          lastUpdate: '10/05/2019 01:05',
          isNewRequest: true,
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
    search: '',
    setSearch: jest.fn(),
    filter: {
      dateRange: {
        onChange: jest.fn(),
        value: [null, null],
      },
    },
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with no privilege & no tab', () => {
    const newProps = {
      feature: [],
    };

    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...newProps} />);
    expect(tree).toMatchSnapshot();
  });
});
