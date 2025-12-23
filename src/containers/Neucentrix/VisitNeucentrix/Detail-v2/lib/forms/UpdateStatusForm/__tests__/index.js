import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import UpdateStatusForm from '../UpdateStatusForm';
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
  modalUpdateStatus: {
    title: 'Test Title',
    textInfo: 'Test text info',
    caption: 'Caption',
  },
};

describe('src/containers/Neucentrix/VisitNeucentrix/Detail-v2/lib/forms/UpdateStatusForm', () => {
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
