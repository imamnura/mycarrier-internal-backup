import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ApproveForm from '../ApproveForm';
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
  loading: {
    port: false,
    node: false,
  },
  options: {
    port: [],
    node: [],
  },
  createNewPort: true,
  node: false,
};

const props = {
  content: {
    title: 'Test Title',
    textInfo: 'Test text info',
    caption: 'Caption',
    open: true,
  },
};

describe('src/containers/ServiceDelivery/IPPrefix/lib/ApproveForm', () => {
  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApproveForm {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render other conditions', () => {
    useActions.mockReturnValue({
      ...actions,
      formState: {
        isValid: true,
        isDirty: false,
      },
      createNewPort: false,
      node: true,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApproveForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
