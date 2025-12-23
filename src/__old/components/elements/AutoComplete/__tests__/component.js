import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AutoComplete from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/elements/AutoComplete', () => {
  const props = {
    classes: {},
    input: {
      onChange: jest.fn(),
      value: 'value',
    },
    meta: {},
    options: ['option1', 'option2'],
    label: 'label',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AutoComplete {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('handle change', () => {
    const customProps = {
      ...props,
      isLoading: true,
    };
    const tree = shallow(<AutoComplete {...customProps} />);
    tree.props().onChange();
    tree.props().onInputChange();
    tree.props().PaperComponent();
    tree.props().renderInput({ InputProps: {} });
    expect(props.input.onChange).toHaveBeenCalled();
  });
});
