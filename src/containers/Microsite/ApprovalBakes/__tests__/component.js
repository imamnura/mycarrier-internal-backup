import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { configure, shallow } from 'enzyme';
import Component from '../component';
import CallbackAlert from '../../../../__old/components/elements/CallbackAlert';
import ConfirmationDialog from '../../../../__old/components/elements/ConfirmationDialog';
import SendOTP from '../../../../__old/components/fragments/SendOTP';
import Microsite from '../../../../layouts/Microsite';
import { useRouter } from 'next/router';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

jest.mock('next/router');

describe('src/pages/Microsite/ApprovalBakes', () => {
  const props = {
    actions: {
      getApprovalBakes: jest.fn(),
      updateStatus: jest.fn(),
    },
    classes: {},
    feature: [''],
    match: {
      params: {
        id: 'id',
      },
    },
    isLoading: false,
  };

  const setState = jest.fn();

  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
    useRouter.mockReturnValue({ query: { id: '' } });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('function test', () => {
    const event = {
      preventDefault() {},
      target: { value: 'the-value' },
    };
    const tree = shallow(<Component {...props} />);
    // console.log(tree.find('#renderotp').find(SendOTP).props().onSubmit());
    tree.find(ConfirmationDialog).props().onClose();
    tree.find(CallbackAlert).props().onClose();
    tree.find(Microsite).props().action;
    tree.find(Microsite).props().children;
    tree.find(Microsite).props().completed;
    tree.find('#renderform').props().onClose();
    tree.find('#renderform').find('#note').props().input.onChange(event);
    tree.find('#renderform').find('#cancel').props().onClick();
    tree.find('#renderform').find('#submit').props().onClick();
    tree.find('#renderotp').props().onClose();
    tree.find('#renderotp').find(SendOTP).props().onSubmit();
    tree.find('#renderotp').find(SendOTP).props().onClose();
  });
});
