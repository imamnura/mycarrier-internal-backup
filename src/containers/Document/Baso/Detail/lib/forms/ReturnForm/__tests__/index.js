import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReturnForm from '../ReturnForm';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const actions = {
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
  modalReturn: {
    title: 'Test Title',
    textInfo: 'Test text info',
    caption: 'Caption',
  },
};

describe('src/containers/Document/ModificationOrder/Detail/lib/forms/ReturnForm', () => {
  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ReturnForm {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render other conditions', () => {
    useActions.mockReturnValue({
      ...actions,
      formState: {
        isValid: true,
        isDirty: false,
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ReturnForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
