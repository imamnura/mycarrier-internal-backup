import React from 'react';
// import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Header from '../Header';
import useResponsive from '@utils/hooks/useResponsive';

jest.mock('@utils/common', () => ({
  getUserData: () => ({ fullName: 'x' }),
}));

jest.mock('@utils/hooks/useResponsive');

// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(),
//   useDispatch: () => jest.fn(),
// }));

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('src/layouts/Main/elements/Header', () => {
  test('render', () => {
    // useSelector.mockImplementation((selectorFn) => selectorFn({ search: '' }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Header setExpand={jest.fn()} />);
    // tree.props.children[2].props.children.props.onChange({ target: { value: 'test' } });
    expect(tree).toMatchSnapshot();
  });

  test('render/xs', () => {
    // useSelector.mockImplementation((selectorFn) => selectorFn({ search: '' }));
    useResponsive.mockImplementation(() => true);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Header setExpand={jest.fn()} />);
    // tree.props.children[4].props.children[0].props.onClick();
    expect(tree).toMatchSnapshot();
  });
});
