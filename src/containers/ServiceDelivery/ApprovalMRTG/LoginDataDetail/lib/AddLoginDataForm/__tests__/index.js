import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AddLoginDataForm from '../AddLoginDataForm';
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
  modalAddLoginData: {
    title: 'Test Title',
    textInfo: 'Test text info',
    caption: 'Caption',
  },
};

describe('src/containers/ServiceDelivery/ApprovalMRTG/LoginDataDetail/lib/AddLoginDataForm', () => {
  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddLoginDataForm {...props} />);
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
    const tree = shallow.render(<AddLoginDataForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
