import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MenuDropdown from '../MenuDropdown';
import useResponsive from '@utils/hooks/useResponsive';

jest.mock('@utils/hooks/useResponsive');

window.open = jest.fn();

describe('src/layouts/Main/elements/Header/components/MenuDropdown', () => {
  test('render', () => {
    useResponsive.mockReturnValue(true);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MenuDropdown name={'x'} />);
    tree.props.children[1].props.onClose();
    tree.props.children[0].props.onClick({ currentTarget: {} });
    expect(tree).toMatchSnapshot();
  });

  test('render 2', () => {
    useResponsive.mockReturnValue(false);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MenuDropdown name={'x'} />);
    expect(tree).toMatchSnapshot();
  });
});
