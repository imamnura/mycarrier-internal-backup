import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SearchBox from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/elements/SearchBox', () => {
  const props = {
    classes: {},
    onChange: jest.fn(),
    placeholder: 'placeholder',
    valua: 'value',
    border: true,
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SearchBox {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('handle change', () => {
    const event = { target: { value: 'value' } };
    const tree = shallow(<SearchBox {...props} />);
    tree.props().onChange(event);
    expect(props.onChange).toHaveBeenCalledWith('value');
  });
});
