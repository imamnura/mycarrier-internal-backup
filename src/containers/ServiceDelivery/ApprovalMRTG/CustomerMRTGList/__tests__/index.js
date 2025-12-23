import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceDelivery/ApprovalMRTG/CustomerMRTGList', () => {
  const props = {
    feature: [],
  };

  let useActionReturn = {
    list: {
      data: [
        {
          customerAccountName: 'PT TELEKOMUNIKASI',
          lastUpdate: '2022-11-21T16:41:26+07:00',
          isNewRequest: false,
        },
        {
          customerAccountName: 'PT TELEKOMUNIKASI',
          lastUpdate: '2022-11-21T16:41:26+07:00',
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
