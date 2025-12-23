import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { configure, shallow } from 'enzyme';
import Component from '../component';
import FileViewer from '../../../../../../layouts/FileViewer';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/pages/Microsite/ApprovalBakes/element/PreviewDocMicrosite', () => {
  let temp = [];
  temp['percentage'] = null;
  temp['percentage1'] = 90;
  temp['percentage2'] = 100;
  temp['percentage3'] = 110;
  const props = {
    classes: {},
    data: temp,
    schema: [
      { name: 'name', label: 'label', percentage: true },
      { name: 'percentage', label: 'label', percentage: true },
      { name: 'percentage1', label: 'label', percentage: true },
      { name: 'percentage2', label: 'label', percentage: true },
      { name: 'percentage3', label: 'label', percentage: true },
      { name: 'name', label: 'label', rupiah: true },
      { name: 'name', label: 'label', previewDocs: true },
    ],
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
    // console.log(props.data);
    tree.find(FileViewer).props().onClose();
    tree.find('#textpreview').props().onClick();
    // tree.find(RedList).props().hide(0);
    // tree.find(RedList).props().child(props.data);
  });
});
