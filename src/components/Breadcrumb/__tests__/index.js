import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Breadcrumb from '../Breadcrumb';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('src/components/Breadcrumb', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Breadcrumb
        data={[
          { label: 'Root Name', url: '/root' },
          { label: 'Sub-Root Name 1', back: true },
          { label: 'Sub-Root Name 2', onClick: jest.fn() },
          { label: 'Sub-Root Name 3' },
          { label: 'Sub-Root Name 4' },
        ]}
      />,
    );
    tree.props.children[0].props.children[0].props.onClick();
    tree.props.children[1].props.children[0].props.onClick();
    tree.props.children[2].props.children[0].props.onClick();
    expect(tree).toMatchSnapshot();
  });
});
