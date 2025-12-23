import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Dropdown from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import Select from 'react-select';

configure({ adapter: new Adapter() });

describe('src/components/elements/Dropdown', () => {
  const props = {
    classes: {},
    onChange: jest.fn(),
    options: [],
    value: {},
    label: 'label',
    // input: {
    //   onChange: jest.fn(),
    //   value: 'value'
    // }
  };

  test('render', () => {
    const customProps = {
      ...props,
      searchable: false,
      rest: {
        normalLabel: true,
      },
      meta: {
        invalid: false,
        touched: false,
        error: false,
      },
      input: {
        onChange: jest.fn(),
        value: 'value',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Dropdown {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render when error', () => {
    const customProps = {
      ...props,
      searchable: true,
      rest: {
        normalLabel: true,
      },
      meta: {
        invalid: true,
        touched: true,
        error: true,
      },
      input: {
        onChange: jest.fn(),
        value: 'value',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Dropdown {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('handle change', () => {
    const customProps = {
      ...props,
      searchable: false,
      rest: {
        normalLabel: true,
        isMulti: true,
      },
      meta: {
        invalid: false,
        touched: false,
        error: false,
      },
    };
    const tree = shallow(<Dropdown {...customProps} />);
    tree.find(Select).props().onChange();
    // tree.find(Select).props().onChange([{ value: 'value' }]);
  });
});
