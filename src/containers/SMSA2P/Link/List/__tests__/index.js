import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';
import { LOCATOR } from '../test-locator';

jest.mock('../hooks/useActions');

describe('src/pages/SMSA2P/Link/List', () => {
  const props = {
    feature: [],
  };

  const testLocator = LOCATOR;

  const useActionReturn = {
    filterStatus: { label: 'All Status', value: '' },
    list: {
      data: [{ activationStatus: 'rejected' }],
      meta: {},
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    tab: 'onprogress',
    filter: {},
    setTab: jest.fn(),
    onBottomPage: jest.fn(),
    onClickRowTable: jest.fn(),
    testLocator,
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with access feature', () => {
    const newProps = {
      feature: ['read_list_request', 'read_list_active'],
    };

    const newActionReturn = {
      ...useActionReturn,
      tab: '',
      list: {
        data: [{ activationStatus: 'checking' }],
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...newProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with status customerrequest', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [{ activationStatus: 'customerrequest' }],
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with status approval_am', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [{ activationStatus: 'approval_am' }],
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with status approval_provider', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [{ activationStatus: 'approval_provider' }],
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with status customerreview', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [{ activationStatus: 'customerreview' }],
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with status completed', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [{ activationStatus: 'completed' }],
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with no status', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [{ activationStatus: '' }],
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
