import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { configure, shallow } from 'enzyme';
import Component from '../component';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/pages/Microsite/ApprovalBakes/element/PreviewDocMicrosite', () => {
  const props = {
    classes: {},
    file: {
      fileName: 'fileName',
      fileUrl: 'filUrl',
    },
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
    // console.log(tree.find('#document').props().onLoadSuccess);
    tree.find('#document').props().onLoadSuccess(1);
  });
});
