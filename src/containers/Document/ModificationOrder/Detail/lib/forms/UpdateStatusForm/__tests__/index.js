import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import UpdateStatusForm from '../UpdateStatusForm';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionReturn = {
  control: {},
  formState: {
    isValid: false,
    isDirty: false,
  },
  handleSubmit: jest.fn(),
};

const props = {
  onClose: jest.fn(),
  modalUpdateStatus: {
    title: 'Test Title',
    textInfo: 'Test text info',
    caption: 'Caption',
  },
};

describe('src/pages/Document/ModificationOrder/Detail/lib/forms/UpdateStatusForm', () => {
  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UpdateStatusForm {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render while Valid', () => {
    const actionReturn = {
      ...useActionReturn,
      formState: {
        isValid: true,
        isDirty: true,
      },
    };
    useActions.mockReturnValue(actionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UpdateStatusForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
