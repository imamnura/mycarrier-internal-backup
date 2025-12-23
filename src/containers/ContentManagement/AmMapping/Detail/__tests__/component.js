import React, { useEffect, useState } from 'react';
import Component from '../component';
import { useRouter } from 'next/router';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('next/router');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/pages/AmMappingDetail/component', () => {
  let props = {
    action: {
      getAMMappingProfile: jest.fn(),
      getListCustomer: jest.fn(),
      deleteListCustomer: jest.fn(),
    },
    amProfile: {
      data: [
        {
          userId: '',
          updatedAt: '',
        },
      ],
      detail: {
        ccHandled: {
          custAccntNum: '',
        },
      },
    },
    classes: {
      deleteButton: '',
      header: '',
      submitContainer: '',
      wrapper: '',
      subtitle: '',
    },
    feature: ['delete_amMapping', 'update_amMapping', 'update_customer'],
    listCustomer: {
      data: [
        {
          custAccntNum: '',
        },
      ],
      meta: {},
    },
  };
  const setState = jest.fn();
  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
    useRouter.mockReturnValue({ query: { id: 'id' } });
  });

  test('render 1', () => {
    const customProps = {
      ...props,
      search: '',
      isLoading: true,
      isLoadingLazy: true,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render 2', () => {
    const customProps = {
      ...props,
      search: 'tes',
      isLoading: false,
      isLoadingLazy: false,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
