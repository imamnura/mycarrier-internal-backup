import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReassignSalesTeam from '../ReassignSalesTeam';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  show: true,
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/ReassignSalesTeam', () => {
  test('run properly', () => {
    useAction.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ReassignSalesTeam {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
