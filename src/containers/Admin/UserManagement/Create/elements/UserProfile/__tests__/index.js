import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import UserProfile from '../UserProfile';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

describe('src/containers/Admin/UserManagement/Create/elements/UserProfile/index', () => {
  const props = { loading: false };
  const useActionReturn = {
    control: {},
    customerNameAsyncProps: {
      loadOptions: jest.fn(),
      additional: { page: 1 },
    },
    formState: {
      isSubmitted: false,
      isDirty: false,
      isValid: false,
      errors: {
        phone: {
          dialCode: '+62',
          number: '',
        },
      },
    },
    formValues: { nik: '955856' },
    onAddFromNIK: jest.fn(),
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
    optionsSegment: {
      data: [],
      loading: false,
    },
    previewPrivilege: {
      data: [],
      loading: false,
    },
    roleAsyncProps: {
      loadOptions: jest.fn(),
      additional: { page: 1 },
    },
    userType: 'internal_staff',
    userId: 'test',
  };

  test('render userType internal_staff', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UserProfile {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render userType internal_staff nik', () => {
    useAction.mockReturnValue({ ...useActionReturn, userId: '' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UserProfile {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render userType internal_staff userId and nik null', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      userId: '',
      formValues: { nik: '' },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UserProfile {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render userType customer', () => {
    useAction.mockReturnValue({ ...useActionReturn, userType: 'customer' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UserProfile {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render userType internal_non_staff', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      userType: 'internal_non_staff',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UserProfile {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
