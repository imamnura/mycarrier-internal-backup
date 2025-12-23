import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LineItems from '../LineItems';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const props = {
  feature: [],
  quoteId: 1,
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/LineItems', () => {
  test('run properly', () => {
    useActions.mockReturnValueOnce({
      list: [],
      loadingTable: false,
      useCollapseChild: ['', jest.fn().mockReturnValue(jest.fn())],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LineItems {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
