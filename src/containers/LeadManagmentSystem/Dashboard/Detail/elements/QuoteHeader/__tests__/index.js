import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import QuoteHeader from '../QuoteHeader';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const props = {
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/QuoteHeader', () => {
  test('run properly', () => {
    useActions.mockReturnValueOnce({
      dashboardId: '123',
      scQuoteId: '123',
      data: {},
      feature: [],
      loading: false,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<QuoteHeader {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
