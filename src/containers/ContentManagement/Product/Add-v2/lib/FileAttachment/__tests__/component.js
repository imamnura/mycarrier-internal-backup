import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../component';
import { cleanup } from '@testing-library/react-hooks/server';
import useStyles from '../styles';

jest.mock('../styles');

describe('src/containers/ContentManagement/Product/Add-v2/lib/components/FileAttachment', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  const props = {
    classes: {},
    file: {},
    fileName: 'test',
    url: 'test',
    type: 'png',
    onDelete: () => jest.fn(),
    tab: 'id',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[1].props.onClose();
  });

  test('render type pdf', () => {
    const customProps = { ...props, type: 'PDF' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type ZIP', () => {
    const customProps = { ...props, type: 'ZIP' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type JPG', () => {
    const customProps = { ...props, type: 'JPG' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type EDIT', () => {
    const customProps = { ...props, type: 'EDIT' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type DELETE', () => {
    const customProps = { ...props, type: 'DELETE' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
