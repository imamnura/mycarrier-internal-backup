import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SymptompList from '../SymptompList';
import { cleanup } from '@testing-library/react-hooks/server';

const props = {
  data: [],
};

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/elements/SymptompList', () => {
  afterEach(() => {
    cleanup();
  });

  test('render null', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SymptompList {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render', () => {
    const customProps = {
      ...props,
      data: [
        {
          name: 'tests',
        },
      ],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SymptompList {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
