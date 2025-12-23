import validate, { TicketNumberMessage } from '../validate';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/forms/TicketNumber/validate', () => {
  test('validate', () => {
    expect(validate('tes', { maxLength: 10 })).not.toBeNull();
  });
  test('validate error', () => {
    expect(validate('', { maxLength: 10 })).not.toBeNull();
  });
  test('validate error link', () => {
    expect(validate.schema).not.toBeNull();
  });

  it('render error any.required', () => {
    const props = {
      errors: [
        {
          type: 'any.required',
        },
      ],
      maxLength: 10,
    };
    const wrapper = shallow(<TicketNumberMessage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render error string.max', () => {
    const props = {
      errors: [
        {
          type: 'string.max',
        },
      ],
      maxLength: 10,
    };
    const wrapper = shallow(<TicketNumberMessage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render error default', () => {
    const props = {
      errors: [
        {
          type: '',
        },
      ],
      maxLength: 10,
    };
    const wrapper = shallow(<TicketNumberMessage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
