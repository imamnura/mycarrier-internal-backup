import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { configure, shallow } from 'enzyme';
import Component from '../component';
import CallbackAlert from '../../../../__old/components/elements/CallbackAlert';
import ConfirmationDialog from '../../../../__old/components/elements/ConfirmationDialog';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/pages/Microsite/ApprovalLBA', () => {
  const props = {
    actions: {
      getApprovalLBA: jest.fn(),
      updateStatus: jest.fn(),
      changeData: jest.fn(),
    },
    classes: {},
    router: {
      query: {
        id: 'id',
      },
    },
    isLoading: false,
  };

  const setState = jest.fn();

  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('function test', () => {
    const tree = shallow(<Component {...props} />);
    // console.log(tree.find(CallbackAlert).props());
    tree.find(ConfirmationDialog).props().onClose();
    tree.find(ConfirmationDialog).props().actions[1].action();
    tree.find(CallbackAlert).props().onClose();
  });
});
