import React from 'react';
import Component from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/forms/UpdateStatus', () => {
  const props = {
    clearConfirmation: jest.fn(),
    handleSubmit: jest.fn(),
    maxLength: 10,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    setConfirmation: jest.fn(),
  };

  test('render', () => {
    const customProps = {
      isLoading: true,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('counter no value', () => {
    const tree = shallow(<Component {...props} />);
    tree
      .find('#updatestatus')
      .props()
      .onChange({ target: { name: '' } });
  });
  //   test('counter value ticketId', () => {
  //     const tree = shallow(<Component {...props} />);
  //     tree.find('#ticketnumber').props().onChange({ target: { name: 'ticketId' }});
  //   });
  //   test('confirmation', () => {
  //     const tree = shallow(<Component {...props} />);
  //     tree.find('#confirmation').props().onClick();
  //   });
});
