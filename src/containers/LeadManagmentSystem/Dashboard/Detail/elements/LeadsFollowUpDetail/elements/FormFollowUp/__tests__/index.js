import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FormFollowUp from '../FormFollowUp';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  feature: [],
  followUpForm: {
    type: 'activities',
  },
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail/elements/FormFollowUpDetail', () => {
  test('run properly', () => {
    useAction.mockReturnValueOnce({
      categoryForm: {},
      followUpForm: {},
      Form: jest.fn(),
      onCloseCategory: jest.fn(),
      onCloseFollowUp: jest.fn(),
      onSubmitCategory: jest.fn(),
      onSubmitFollowUp: jest.fn(),
      status: 'Valid',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormFollowUp {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
