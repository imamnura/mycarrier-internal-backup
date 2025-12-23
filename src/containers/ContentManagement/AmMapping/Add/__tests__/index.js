import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../component';
import useStyles from '../hooks/useStyles';
import useActions from '../hooks/useActions';
import { theme } from '@styles/theme';

jest.mock('../hooks/useActions');
jest.mock('../hooks/useStyles');

describe('src/containers/ContentManagement/AmMapping/Add/index', () => {
  const useActionReturn = {
    handleSubmit: jest.fn(),
    onClickCancel: jest.fn(),
    buttonDisable: false,
    loading: false,
    clearConfirmation: jest.fn(),
    confirmation: {},

    handleGetValueAM: jest.fn(),
    handleTypeSearchProfil: jest.fn(),
    labelProfile: 'fullName',
    loadingAMProfile: false,
    optionsAMProfile: [],
    profile: {},
    typeProfil: 'name',

    customer: {},
    handleGetValueCustomer: jest.fn(),
    handleTypeSearchCustomer: jest.fn(),
    labelCustomer: 'custAccntName',
    loadingCustomerProfile: false,
    optionsCustomerProfile: [],
    typeCustomer: 'name',
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading true', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      loading: true,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component />);
    expect(tree).toMatchSnapshot();
  });

  test('render style', () => {
    expect(useStyles(theme)).not.toBeNull();
  });
});
