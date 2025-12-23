import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { configure } from 'enzyme';
import Worklog from '../worklog';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/pages/ContentManagement/InterestedList/Detail/worklog', () => {
  const props = {
    status: 'Waiting',
    stepperProps: {
      steps: ['1', '2', '3'],
      activeSteps: 0,
    },
    data: [
      {
        status: 'Waiting',
        timestamp: '2021-11-10 19:42:20',
      },
    ],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Worklog {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render without stepperProps', () => {
    const customProps = {
      ...props,
      stepperProps: null,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Worklog {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
