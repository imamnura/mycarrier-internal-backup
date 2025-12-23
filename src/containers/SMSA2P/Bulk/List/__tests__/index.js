import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/SMSA2P/Bulk/List', () => {
  const props = {
    feature: [],
  };

  const useActionReturn = {
    filterStatus: { label: 'All Status', value: '' },
    list: {
      data: [
        {
          activationStatus: 'rejected',
          messageType: ['tes'],
          contentPurpose: ['tes2'],
        },
      ],
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
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with access feature', () => {
    const newProps = {
      feature: ['read_list_bulk_request', 'read_list_bulk_active'],
    };

    const newActionReturn = {
      ...useActionReturn,
      tab: 'done',
      list: {
        data: [
          {
            activationStatus: 'rejected',
            messageType: ['tes', 'tes2'],
            contentPurpose: [],
          },
        ],
        meta: {},
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...newProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with status customer request', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [
          {
            activationStatus: 'customer request',
            messageType: ['tes'],
            contentPurpose: ['tes2'],
          },
        ],
        meta: {},
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with status checking', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [
          {
            activationStatus: 'checking',
            messageType: ['tes'],
            contentPurpose: ['tes2'],
          },
        ],
        meta: {},
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with status checking order telkom', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [
          {
            activationStatus: 'checking order telkom',
            messageType: ['tes'],
            contentPurpose: ['tes2'],
          },
        ],
        meta: {},
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with status checking order provider', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [
          {
            activationStatus: 'checking order provider',
            messageType: ['tes'],
            contentPurpose: ['tes2'],
          },
        ],
        meta: {},
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
        data: [
          {
            activationStatus: 'completed',
            messageType: ['tes'],
            contentPurpose: ['tes2'],
          },
        ],
        meta: {},
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with status onprogress', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [
          {
            activationStatus: 'onprogress',
            messageType: ['tes'],
            contentPurpose: ['tes2'],
          },
        ],
        meta: {},
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with status returned', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [
          {
            activationStatus: 'returned',
            messageType: ['tes'],
            contentPurpose: ['tes2'],
          },
        ],
        meta: {},
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
        data: [
          {
            activationStatus: 'tes',
            messageType: ['tes'],
            contentPurpose: ['tes2'],
          },
        ],
        meta: {},
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
