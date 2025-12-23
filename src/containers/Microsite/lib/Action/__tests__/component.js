import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../component';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/pages/Microsite/lib/Action', () => {
  const props = {
    actions: [
      { label: 'label', onClick: jest.fn() },
      { label: 'label', onClick: jest.fn() },
    ],
    classes: {},
    label: 'label',
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

  // test('function test', () => {
  //   const event = {
  //     preventDefault() {},
  //     target: { value: 'the-value' }
  //   };
  //   const tree = shallow(<Component {...props}/>);
  //   console.log(tree.find(Dialog).find('#cancel').props());
  //   tree.find(ConfirmationDialog).props().onClose();
  //   tree.find(CallbackAlert).props().onClose();
  // });
});
