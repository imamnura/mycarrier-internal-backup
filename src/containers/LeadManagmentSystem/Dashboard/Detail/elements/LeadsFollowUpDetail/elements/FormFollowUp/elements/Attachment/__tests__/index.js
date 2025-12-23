import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Attachment from '../Attachment';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  feature: [],
  onClose: jest.fn(),
  variant: 'qualify',
};

describe('src/containers/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail/elements/FormFollowUp/elements/Attachment/index', () => {
  test('render properly', () => {
    useAction.mockReturnValueOnce({
      control: {},
      onSubmit: jest.fn(),
      handleSubmit: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Attachment {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
