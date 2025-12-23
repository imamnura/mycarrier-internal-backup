import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LeadDetail from '../LeadDetail';

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/StageInformation/elements/LeadDetail', () => {
  test('run properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LeadDetail />);
    expect(tree).toMatchSnapshot();
  });
});
