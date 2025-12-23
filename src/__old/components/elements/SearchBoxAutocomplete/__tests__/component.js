import React from 'react';
import SearchBoxAutocomplete from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/elements/SearchBoxAutocomplete', () => {
  const props = {
    classes: {},
    label: 'label',
    getValue: jest.fn(),
  };

  test('handle change', () => {
    const event = { target: { value: 'value' } };
    const tree = shallow(<SearchBoxAutocomplete {...props} />);
    tree.props().onChange(event);
    expect(props.getValue).toHaveBeenCalled();
  });
});
