import React, { useEffect } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PreviewDocument from '../component';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

jest.mock('../action', () => ({
  generatePreviewFile: jest.fn(),
  generateFile: jest.fn(),
}));

describe('src/components/fragments/PreviewDocument', () => {
  const props = {
    classes: {},
    data: {},
    endpoint: {},
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    open: false,
    scale: 1,
  };

  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PreviewDocument {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render open', () => {
    const customProps = {
      ...props,
      open: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PreviewDocument {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render preview', () => {
    const customProps = {
      ...props,
      open: true,
      isPreview: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PreviewDocument {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
