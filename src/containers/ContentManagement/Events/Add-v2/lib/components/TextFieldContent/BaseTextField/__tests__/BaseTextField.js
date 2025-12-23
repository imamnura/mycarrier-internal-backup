import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import BaseTextField, { Adornment } from '../BaseTextField';
import { create, act } from 'react-test-renderer';
import { removePhoneSpace } from '@utils/parser';
import Lba from '@assets/icon-v2/Lba';

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/TextFieldContent/BaseTextField', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<BaseTextField />);
    // tree.props.children[0].props.inputProps.onWheel({ currentTarget: { blur: jest.fn() } });
    expect(tree).toMatchSnapshot();
  });

  test('render max length and adornment', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <BaseTextField
        leftAdornment="L"
        maxLength={10}
        required
        rightAdornment="R"
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('adornment', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Adornment children="X" classes={{}} />);
    expect(tree).toMatchSnapshot();

    const treeIcon = shallow.render(<Adornment children={Lba} classes={{}} />);
    expect(treeIcon).toMatchSnapshot();

    const treeOthers = shallow.render(
      <Adornment children={<span />} classes={{}} />,
    );
    expect(treeOthers).toMatchSnapshot();
  });

  test('render type password', async () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<BaseTextField type="password" />);
    await tree.props.children[0].props.InputProps.endAdornment.props.children.props.onClick();
    await tree.props.children[0].props.InputProps.endAdornment.props.children.props.onClick();
    expect(tree).toMatchSnapshot();
  });

  test('onChange', () => {
    const shallow = new ShallowRenderer();

    const tree = shallow.render(
      <BaseTextField
        maxLength={10}
        onChange={jest.fn()}
        valueMasking={removePhoneSpace}
      />,
    );
    tree.props.children[0].props.onChange({ target: { value: 'short' } });
    tree.props.children[0].props.onChange({
      target: { value: 'long long long string' },
    });
    expect(tree).toMatchSnapshot();

    const treeInputPropsOnChange = shallow.render(
      <BaseTextField inputProps={{ onChange: jest.fn() }} maxLength={10} />,
    );
    treeInputPropsOnChange.props.children[0].props.onChange({
      target: { value: 'short' },
    });
    treeInputPropsOnChange.props.children[0].props.onChange({
      target: { value: 'long long long string' },
    });
    expect(treeInputPropsOnChange).toMatchSnapshot();

    const treeWithoutOnChange = shallow.render(
      <BaseTextField maxLength={10} />,
    );
    treeWithoutOnChange.props.children[0].props.onChange({
      target: { value: 'short' },
    });
    expect(treeWithoutOnChange).toMatchSnapshot();
  });

  test('counter', () => {
    let root;

    act(() => {
      root = create(<BaseTextField />);
    });

    expect(root.toJSON()).toMatchSnapshot();

    act(() => {
      root.update(<BaseTextField maxLength={2} value="xxxx" />);
    });

    expect(root.toJSON()).toMatchSnapshot();

    act(() => {
      root.update(<BaseTextField maxLength={2} value="" />);
    });

    expect(root.toJSON()).toMatchSnapshot();
  });
});
