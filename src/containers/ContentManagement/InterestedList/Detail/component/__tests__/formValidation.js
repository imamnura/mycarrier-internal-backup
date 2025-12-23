import React, { useState, useEffect } from 'react';
import Component from '../formValidation';
import { configure, shallow } from 'enzyme';
import { useRouter } from 'next/router';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('next/router');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/components/containers/ContentManagement/InterestedList/Detail/component/formValidation', () => {
  const setState = jest.fn();

  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
    useRouter.mockReturnValue({ query: { id: 'id' } });
  });

  const props = {
    classes: {},
    data: {},
    formValidation: '',
    initLabelProfile: 'fullName',
    initLoadingListCompany: false,
    initLoadingListSales: false,
    initToggleProfile: true,
    initTypeProfil: 'name',
    loading: true,
    salesAssigned: jest.fn(),
    selectedCompanyName: '',
    selectedCompanyNum: '',
    setDisableBtnSubmitEmail: jest.fn(),
    setEmailAssigned: jest.fn(),
    setSelectedCompanyName: jest.fn(),
    setSelectedCompanyNum: jest.fn(),
    setSelectedPreAccount: jest.fn(),
    getListAM: jest.fn(),
    getListCompany: jest.fn(),
  };

  test('render loading true', () => {
    const tree = shallow(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render Company list loading true', () => {
    const customProps = {
      ...props,
      initLoadingListCompany: true,
      loading: false,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render Company list not null', () => {
    const customProps = {
      ...props,
      loading: false,
      initOptionsCompany: [
        {
          custAccntName: 'test',
          custAccntNum: '123',
          preAccount: false,
        },
      ],
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  // test('render Company list not null onClick selected company', () => {
  //   const customProps = {
  //     ...props,
  //     loading: false,
  //     initOptionsCompany: [
  //       {
  //         custAccntName: 'test',
  //         custAccntNum: '123',
  //         preAccount: false
  //       },
  //     ],
  //   };
  //   const tree = shallow(<Component {...customProps} />);
  //   tree.find('#cardOptionsCompany').props().onClick();
  // });

  test('render Company list null', () => {
    const customProps = {
      ...props,
      initOptionsCompany: null,
      loading: false,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  // test('render Company list null onClick', () => {
  //   const customProps = {
  //     ...props,
  //     initOptionsCompany: null,
  //     loading: false,
  //   };
  //   const tree = shallow(<Component {...customProps} />);
  //   tree.find('#cardCompanyName').props().onClick();
  // });

  test('render Form Input Sales Team by name', () => {
    const customProps = {
      ...props,
      formValidation: 'form-sales-team',
      initTypeProfil: 'name',
      initLabelProfile: 'fullName',
      initLoadingListSales: true,
      loading: false,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render Form sales team by nik', () => {
    const customProps = {
      ...props,
      formValidation: 'form-sales-team',
      initTypeProfil: 'nik',
      initToggleProfile: false,
      loading: false,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  // test('render Form sales toogle nik', () => {
  //   const customProps = {
  //     ...props,
  //     formValidation: 'form-sales-team',
  //     initTypeProfil: 'nik',
  //     initToggleProfile: false,
  //     loading: false,
  //   };
  //   const tree = shallow(<Component {...customProps} />);
  //   tree.find('#toogleByNik').props().onClick();
  // });

  // test('render Form sales toogle name', () => {
  //   const customProps = {
  //     ...props,
  //     formValidation: 'form-sales-team',
  //     initTypeProfil: 'name',
  //     initToggleProfile: false,
  //     loading: false,
  //   };
  //   const tree = shallow(<Component {...customProps} />);
  //   tree.find('#toogleByName').props().onClick();
  // });

  test('render Form email', () => {
    const customProps = {
      ...props,
      formValidation: 'form-email',
      loading: false,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
