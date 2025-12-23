import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ActivityHistory from '../ActivityHistory';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const props = {
  data: [{ name: 'Justin' }],
  schema: [{ name: 'name', label: 'Name' }],
  visitId: 'VST123',
};

describe('src/containers/Neucentrix/VisitNeucentrix/Detail-v2/lib/ActivityHistory', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ActivityHistory {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.children.props.children.props.onClick();
  });
});
