import React from 'react';
import Component from '../component';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('Component SenderID Pages', () => {
  let props = {
    actions: {
      getListActivateCustomer: jest.fn(),
      getDataChart: jest.fn(),
      resetGraphData: jest.fn(),
    },
    graphSender: {
      data: [
        {
          _id: {
            date: '',
            week: '',
            month: '',
            yearly: '',
          },
        },
      ],
      params: '',
    },
    listActivateCustomer: [
      {
        custAccntName: '',
        custAccntNum: '',
      },
    ],
  };

  test('render', () => {
    const customProps = {
      feature: [],
      ...props,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  // test-takeout('render total sender', () => {
  //   const customProps = {
  //     feature: ['read_total_sender'],
  //     ...props,
  //   };
  //   const tree = shallow(<Component {...customProps} />);
  //   tree.find('#button').props().optionsCustomer;
  // });
  test('render time delivery', () => {
    const customProps = {
      feature: ['read_time_delivery'],
      ...props,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  // test-takeout('render change tab', () => {
  //   const customProps = {
  //     feature: ['read_total_sender'],
  //     ...props,
  //   };
  //   const tree = shallow(<Component {...customProps} />);
  //   tree.find('#tab').props().onChange(1);
  // });
});
