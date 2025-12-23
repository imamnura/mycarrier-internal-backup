import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AlertWDM from '../Alert';

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/AlertWDM', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AlertWDM />);
    expect(tree).toMatchSnapshot();
  });
});
