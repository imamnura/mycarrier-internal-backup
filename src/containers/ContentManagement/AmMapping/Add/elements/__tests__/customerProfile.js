import React from 'react';
import Component from '../customerProfile';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/containers/ContentManagement/AmMapping/Add/elements/customerProfile', () => {
  const props = {
    classes: {},
    customer: {},
    handleGetValueCustomer: jest.fn(),
    handleTypeSearchCustomer: jest.fn(),
    labelCustomer: '',
    loadingCustomerProfile: false,
    optionsCustomerProfile: [],
    typeCustomer: '',
  };

  test('render', () => {
    const tree = shallow(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render customer custAccntName not null', () => {
    const customProps = {
      ...props,
      customer: {
        custAccntName: 'test',
        nipnas: 'test',
        segment: 'test',
      },
      loadingCustomerProfile: true,
      typeCustomer: 'name',
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render customer custAccntName empty', () => {
    const customProps = {
      ...props,
      customer: {
        custAccntName: 'test',
        nipnas: '',
        segment: '',
      },
      loadingCustomerProfile: true,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render typeCustomer Account Number', () => {
    const customProps = {
      ...props,
      typeCustomer: 'Account Number',
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render btn search profile customer toogle', () => {
    const tree = shallow(<Component {...props} />);
    tree.find('#toogleSearchCustomerName').props().onClick();
    tree.find('#toogleSearchCustomerNumber').props().onClick();
  });
});
