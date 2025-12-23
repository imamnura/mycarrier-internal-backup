import React from 'react';
import Component from '../component';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('Component SenderID Pages', () => {
  let props = {
    actions: {
      downloadReporting: jest.fn(),
    },
    optionsCustomer: [],
    feature: ['read_time_delivery', 'read_total_sender', 'read_downloadReport'],
    refresh: jest.fn(),
  };

  test('render', () => {
    const customProps = {
      ...props,
      isLoading: false,
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find('#refresh').props().onClick();
  });
  test('render loading', () => {
    const customProps = {
      ...props,
      isLoading: true,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render change form', () => {
    const customProps = {
      ...props,
      isLoading: false,
    };
    const value = {
      reportType: {
        value: '',
      },
      reportTime: {
        value: '',
      },
      custAccntNum: {
        value: '',
      },
      rangeTime: ['', ''],
      date: '',
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find('#changeform').props().onClick();
    tree.find('#submitdownload').props().onSubmit(value);
    tree.find('#alert').props().onClose();
  });
});
