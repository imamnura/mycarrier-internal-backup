import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Note from '../Note';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  feature: [],
  onClose: jest.fn(),
  variant: 'qualify',
};

describe('src/containers/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail/elements/FormFollowUp/elements/Note/index', () => {
  test('render properly', () => {
    useAction.mockReturnValueOnce({
      control: {},
      onSubmit: jest.fn(),
      handleSubmit: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Note {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
