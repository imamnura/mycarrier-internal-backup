import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Category from '../Category';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  onClose: jest.fn(),
  variant: 'qualify',
};

describe('src/containers/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail/elements/FormFollowUp/elements/Category/index', () => {
  test('render properly', () => {
    useAction.mockReturnValueOnce({
      data: { status: 'quote' },
      feature: [
        'create_follow_up_activity_lead',
        'create_follow_up_note_lead',
        'create_follow_up_attachment_lead',
        'create_follow_up_product_lead',
        'create_follow_up_contact_lead',
      ],
      onSubmit: jest.fn(),
      category: '',
      setCategory: jest.fn().mockReturnValue(jest.fn()),
      open: true,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Category {...props} variant="opportunity" />);
    expect(tree).toMatchSnapshot();
  });

  test('render variant opportunity', () => {
    useAction.mockReturnValueOnce({
      data: { status: 'quote' },
      feature: [
        'create_follow_up_activity_lead',
        'create_follow_up_note_lead',
        'create_follow_up_attachment_lead',
        'create_follow_up_product_lead',
        'create_follow_up_contact_lead',
      ],
      onSubmit: jest.fn(),
      category: '',
      setCategory: jest.fn().mockReturnValue(jest.fn()),
      open: true,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Category {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
