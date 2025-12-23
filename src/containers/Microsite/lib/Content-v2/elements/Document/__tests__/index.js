import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Document from '../Document';

describe('src/containers/Microsite/lib/Content-v2/elements/Document/index', () => {
  const props = {
    value: [
      { fileName: 'test', fileUrl: 'test' },
      { fileName: 'test', fileUrl: 'test' },
    ],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Document {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[0].props.children[0].props.children.props.children.props.onClick(); //setPreviewFile
    tree.props.children[1].props.onClose(); //setPreviewFile
  });

  test('render fileName not found', () => {
    const props = { value: [{ fileUrl: 'test' }, { fileUrl: 'test' }] };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Document {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render value null', () => {
    const props = { value: [] };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Document {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render value not array', () => {
    const props = { value: '' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Document {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
