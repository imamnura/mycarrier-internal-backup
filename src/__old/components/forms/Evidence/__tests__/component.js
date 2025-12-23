import React from 'react';

import Evidence from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/forms/Evidence', () => {
  const props = {
    change: jest.fn(),
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  test('uploadfile', () => {
    const customProps = {
      ...props,
      invalid: true,
    };
    const tree = shallow(<Evidence {...customProps} />);
    tree.find('#uploadfile').props().onChange();
  });
});
