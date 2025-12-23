import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PickupProductItems from '../PickupProductItems';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail/elements/PickUpProductItems', () => {
  test('run properly', () => {
    useAction.mockReturnValueOnce({
      optionProduct: [],
      open: true,
      onSubmit: jest.fn(),
      onClosePickupProduct: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PickupProductItems {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
