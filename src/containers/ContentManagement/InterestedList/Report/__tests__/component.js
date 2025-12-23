import React from 'react';
import Component from '../component';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/containers/ContentManagement/InterestedList/Report/component', () => {
  const props = {
    action: {
      getInterestedGraph: jest.fn(),
      getInterestedGraphProduct: jest.fn(),
      getSource: jest.fn(),
      getProduct: jest.fn(),
    },
    classes: {
      refreshIcon: '',
      rotate: '',
    },
    graphInterestedStatus: {
      data: [
        {
          _id: {
            date: '',
            week: '',
            month: '',
            year: '',
          },
          invalid: 0,
          valid: 0,
          waiting: 0,
        },
        {
          _id: {
            date: '',
            week: '',
            month: '',
            year: '',
          },
          invalid: 0,
          valid: 0,
          waiting: 0,
        },
      ],
      params: '',
    },
    graphInterestedProduct: {
      data: [
        {
          color: '',
          percentage: '',
          productId: '',
          productName: '',
          total: '',
        },
        {
          color: '',
          percentage: '',
          productId: '',
          productName: '',
          total: '',
        },
      ],
      params: '',
    },
    graphInterestedAM: {
      data: [
        {
          name: 'test',
          value: 1,
        },
        {
          name: 'testing',
          value: 2,
        },
      ],
      meta: {},
    },
    graphInterestedSegment: {
      data: [
        {
          name: 'test',
          value: 1,
        },
        {
          name: 'testing',
          value: 2,
        },
      ],
      meta: {},
    },
  };

  test('render', () => {
    const customProps = {
      feature: [],
      ...props,
    };

    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render read_graphic_interested', () => {
    const customProps = {
      feature: ['read_graphic_interested'],
      ...props,
    };

    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render change tab', () => {
    const customProps = {
      feature: ['read_graphic_interested'],
      ...props,
    };

    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
