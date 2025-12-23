import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/Neucentrix/AvailabilityRack/List', () => {
  const useActionReturn = {
    data: {},
    list: {
      data: [],
      meta: {},
    },
    loading: false,
    loadingTable: {
      root: false,
      row: false,
    },
    onBottomPage: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });
});
