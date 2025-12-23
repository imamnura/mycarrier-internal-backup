import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Prerequisite from '../Prerequisite';

const props = {
  isHaveError: false,
  data: [{ status: 'test', label: 'test' }],
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/Prerequisite', () => {
  test('run properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Prerequisite {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('no data', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Prerequisite data={[{}]} isHaveError={false} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
