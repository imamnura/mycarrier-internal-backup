import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StepperStatus from '../StepperStatus';

describe('src/components/StepperStatus', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <StepperStatus
        active={2}
        step={[
          {
            variant: 'success',
            label: '1',
          },
          {
            variant: 'warning',
            label: '2',
          },
          {
            variant: 'danger',
            label: '3',
          },
        ]}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
