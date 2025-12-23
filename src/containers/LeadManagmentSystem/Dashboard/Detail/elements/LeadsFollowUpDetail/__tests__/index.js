import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LeadsFollowUpDetail from '../LeadsFollowUpDetail';
import useFormFollowUp from '../hooks/useFormFollowUp';

jest.mock('../hooks/useFormFollowUp');

const props = {
  variant: 'opportunity',
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail', () => {
  test('run properly', () => {
    useFormFollowUp.mockReturnValueOnce({
      tab: 'product',
      setTab: jest.fn().mockReturnValue(jest.fn()),
      data: { status: 'Quote' },
      dashboardId: '123',
      fetchDetail: jest.fn(),
      categoryForm: {},
      followUpForm: {},
      setCategoryForm: jest.fn().mockReturnValue(jest.fn()),
      setFollowUpForm: jest.fn().mockReturnValue(jest.fn()),
      onDeleteFollowUp: jest.fn(),
      onEditFollowUp: jest.fn(),
      onPreviewDocument: jest.fn(),
      pickupProductModal: {},
      setPickupProductModal: jest.fn().mockReturnValue(jest.fn()),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LeadsFollowUpDetail {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
