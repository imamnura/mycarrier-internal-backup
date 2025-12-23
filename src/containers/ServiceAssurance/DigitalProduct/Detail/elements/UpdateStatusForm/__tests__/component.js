import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../component';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/elements/UpdateStatusForm/component', () => {
  const props = {
    step: 'updateStatus',
    modalStatus: {
      open: false,
    },
    caption: 'updated the status',
    title: 'update status',
  };

  const useActionReturn = {
    control: {},
    formState: {
      isValid: false,
      isDirty: false,
    },
    handleSubmit: jest.fn(),
    confirmationStatus: jest.fn(),
    confirmationProgress: jest.fn(),
    onClose: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render step updateProgress', () => {
    const customProps = {
      ...props,
      modalStatus: { open: true },
      step: 'updateProgress',
    };
    const useActionsReturnCustom = {
      ...useActionReturn,
      formState: {
        isValid: true,
        isDirty: false,
      },
    };
    useActions.mockReturnValue(useActionsReturnCustom);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render isDirty true', () => {
    const useActionsReturnCustom = {
      ...useActionReturn,
      formState: {
        isValid: true,
        isDirty: true,
      },
    };
    useActions.mockReturnValue(useActionsReturnCustom);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
