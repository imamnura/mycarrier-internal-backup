import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../component';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/elements/TicketNumber/component', () => {
  const props = {
    modalTicketNumber: { open: false },
    type: 'Add',
    setModalTicketNumber: jest.fn(),
  };

  const useActionReturn = {
    control: {},
    formState: {
      isValid: false,
      isDirty: false,
    },
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
    searchError: 'test',
    asyncValidating: false,
    confirmation: {},
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type edit', () => {
    const customProps = {
      ...props,
      modalTicketNumber: { open: true },
      type: 'Edit',
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

  test('render asyncValidating true', () => {
    const useActionsReturnCustom = {
      ...useActionReturn,
      formState: {
        isValid: true,
        isDirty: true,
      },
      asyncValidating: true,
    };
    useActions.mockReturnValue(useActionsReturnCustom);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
