import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import UpdateStatusForm from '../UpdateStatus';
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
  content: {
    title: 'Test Title',
    textInfo: 'Test text info',
    caption: 'Caption',
    open: true,
    schema: [{ name: '1' }],
  },
};

describe('src/components-v2/Form/UpdateStatusForm', () => {
  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UpdateStatusForm {...props} />);
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
    const tree = shallow.render(<UpdateStatusForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
