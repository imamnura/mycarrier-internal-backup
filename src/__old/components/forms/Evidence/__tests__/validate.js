import React from 'react';
import Validate from '../validate';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/forms/Evidence/validate', () => {
  test('validate', () => {
    const value = jest.fn();
    expect(Validate(value, { maxLength: 10 })).not.toBeNull();
  });
  test('validate snapshot', () => {
    const tree = shallow(<Validate />);
    expect(tree).toMatchSnapshot();
    expect(tree).not.toBeNull();
  });
});
