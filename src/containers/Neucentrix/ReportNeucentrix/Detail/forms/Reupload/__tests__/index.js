import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../component';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/Neucentrix/ReportNeucentrix/Detail/forms/Reupload', () => {
  const props = { modalReupload: true };

  const useActionReturn = {
    control: {},
    handleReupload: jest.fn(),
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
    formState: { isValid: false },
    file: null,
    setFile: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
    // tree.props.children.props.children.props.children[2].props.children.props.handleDelete();
    tree.props.children.props.children.props.children[2].props.children.props.onChange();
  });

  test('render disabled button', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      formState: { isValid: true },
      file: { name: 'test' },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
