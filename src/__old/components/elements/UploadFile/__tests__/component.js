import React, { useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import UploadFile from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import { validateRatio, validatePixel } from '../utils';
import { JSDOM } from 'jsdom';

const dom = new JSDOM();
global.window ??= Object.create(dom.window);
global.Image ??= Object.create(window.Image);

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('src/components/elements/UploadFile', () => {
  const props = {
    classes: {},
    accept: ['.png'],
    isValidateByRatio: false,
    label: 'document here',
    onChange: jest.fn(),
    ratio: [1, 1],
  };

  const setState = jest.fn();
  const setAlert = jest.fn();

  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
  });

  test('render', () => {
    const customProps = {
      ...props,
      fileName: 'filename',
      isLabelInputTop: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UploadFile {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('isValidateByRatio', () => {
    const customProps = {
      ...props,
      isValidateByRatio: true,
    };
    const event = { target: { files: 'file' } };
    window.URL.createObjectURL = jest.fn();
    const tree = shallow(<UploadFile {...customProps} />);
    tree.find('input').props().onChange(event);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    validateRatio(100, 200, 'file.png', setAlert, props.ratio, props.onChange);
    validateRatio(200, 200, 'file.png', setAlert, props.ratio, props.onChange);
  });

  test('isValidateByPixel', () => {
    const customProps = {
      ...props,
      isValidateByPixel: true,
    };
    const event = { target: { files: 'file' } };
    window.URL.createObjectURL = jest.fn();
    const tree = shallow(<UploadFile {...customProps} />);
    tree.find('input').props().onChange(event);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    validatePixel(200, 200, 'file.png', setAlert, props.ratio, props.onChange);
    validatePixel(1, 1, 'file.png', setAlert, props.ratio, props.onChange);
  });

  test('exceed the maximum size', () => {
    const customProps = {
      ...props,
      maxSize: 0,
    };
    const event = { target: { files: [{ size: 1 }] } };
    const tree = shallow(<UploadFile {...customProps} />);
    tree.find('input').props().onChange(event);
    expect(setState).toHaveBeenCalled();
  });

  test('onClose', () => {
    const tree = shallow(<UploadFile {...props} />);
    tree.childAt(2).props().onClose();
    expect(setState).toHaveBeenCalled();
  });

  test('handleChange', () => {
    const customProps = {
      ...props,
    };
    const event = { target: { files: ['file.png'] } };
    const tree = shallow(<UploadFile {...customProps} />);
    tree.find('input').props().onChange(event);
    expect(props.onChange).toHaveBeenCalled();
  });
});
