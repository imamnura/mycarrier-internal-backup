import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { configure } from 'enzyme';
import Component from '../Content';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/pages/Microsite/lib/Content', () => {
  let temp = {
    name1: {
      fileName: 'fileName',
      fileUrl: 'fileUrl',
    },
    date: new Date(Date.UTC(2010, 10, 10)).toJSON(),
  };

  const props = {
    classes: {},
    header: {
      title: 'title',
      subtitle: 'subtitle',
    },
    label: 'label',
    schema: [
      { name: 'name', label: 'label' },
      { name: 'date', label: 'label', date: true },
      { name: 'name1', label: 'label', color: 'blue', previewDocs: true },
      { name: 'name1', label: 'label', link: true },
    ],
    data: temp,
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
});
