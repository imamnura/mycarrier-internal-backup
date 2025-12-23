import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Form from '../index';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/GeneralProduct/Detail/lib/forms/ReturnForm/index', () => {
  const returnValueData = {
    control: {},
    formState: {
      isValid: false,
      isDirty: false,
    },
    handleUpdateStatus: jest.fn(),
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  const props = {
    modalReturn: {},
  };

  test('render', () => {
    useActions.mockReturnValueOnce(returnValueData);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Form {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with full props', () => {
    useActions.mockReturnValueOnce(returnValueData);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Form
        modalReturn={{
          title: 'title',
          textInfo: 'test info',
          caption: 'caption',
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('render with formState true', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      formState: { isValid: true, isDirty: true },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Form {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
