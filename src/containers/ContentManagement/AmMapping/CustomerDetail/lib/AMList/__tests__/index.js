import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AmList from '../AmList';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ContentManagement/AmMapping/CustomerDetail/lib/AMList/index', () => {
  const props = { loading: false };

  const useActionReturn = {
    list: { data: {} },
    loading: { tableRoot: false, tableRow: false },
    onBottomPage: jest.fn(),
    search: 'test',
    setSearch: jest.fn(),
    setFilterPosition: jest.fn(),
    filterSegment: {},
    filterSegmentOptions: [],
    setFilterSegment: jest.fn(),
    filterPositionOptions: [],
    filterPosition: {},
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AmList {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render not found', () => {
    useActions.mockReturnValue({ ...useActionReturn, id: '', data: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AmList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
