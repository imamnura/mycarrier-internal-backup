import React from 'react';
import preloadAll from 'jest-next-dynamic';
import ShallowRenderer from 'react-test-renderer/shallow';
import Texteditor from '../texteditor';

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/ProductDescription/component/texteditor.js', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    preloadAll();
    jest.runAllTimers();
  });

  const props = {
    onChange: jest.fn(),
    value: 'test',
    tab: 'id',
    editableDescInitialValue: false,
    previewMode: false,
  };

  test('run properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Texteditor {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children.props.onClick();
  });

  test('render tab en description', () => {
    const customProps = { ...props, tab: 'en' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Texteditor {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children.props.onClick();
  });

  test('render another editableDesc true tab id', () => {
    const customProps = {
      ...props,
      editableDescInitialValue: true,
      value: 'Ketik deskripsi konten di sini dalam Bahasa..',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Texteditor {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children.props.children[0].props.getStory();
    tree.props.children.props.children[1].props.children[0].props.onClick(); //SaveDesc
    tree.props.children.props.children[1].props.children[1].props.onClick(); //Cancel
  });

  test('render another editableDesc true tab en', () => {
    const customProps = {
      ...props,
      editableDescInitialValue: true,
      value: 'Type content description here in English..',
      tab: 'en',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Texteditor {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children.props.children[0].props.getStory();
    tree.props.children.props.children[1].props.children[0].props.onClick(); //SaveDesc
    tree.props.children.props.children[1].props.children[1].props.onClick(); //Cancel
  });

  test('render another editableDesc false tab en', () => {
    const customProps = {
      ...props,
      tab: 'en',
      previewMode: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Texteditor {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children.props.onClick()();
  });
});
