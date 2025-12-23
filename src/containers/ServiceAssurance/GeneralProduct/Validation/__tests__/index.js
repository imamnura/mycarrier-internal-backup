import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Validation from '../validation';
import useAction from '../hooks/useActions';
import { useRouter } from 'next/router';

jest.mock('../hooks/useActions');
jest.mock('next/router');

describe('src/containers/ServiceAssurance/GeneralProduct/Validation', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({ query: { id: '' } });
  });

  const useActionReturn = {
    control: {},
    formState: {},
    handleSubmit: jest.fn(),
    confirmValidation: jest.fn(),
    confirmation: { actions: [], content: '' },
    clearConfirmation: jest.fn(),
    handleCheck: jest.fn(),
    checking: false,
    dropdown: {},
    fetch: {},
    loading: {},
    detail: {},
    serviceId: '',
    onChangeDropdown: {},
    handleDummySid: jest.fn(),
    dummy: false,
    handleChangeSymptomp: jest.fn(),
  };

  test('render', () => {
    const props = {};
    useAction.mockReturnValue({
      ...useActionReturn,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Validation {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no feature', () => {
    const props = {};
    useAction.mockReturnValue({
      ...useActionReturn,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Validation {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
