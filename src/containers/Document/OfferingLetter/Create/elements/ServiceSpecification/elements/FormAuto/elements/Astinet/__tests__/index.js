import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Astinet from '../Astinet';
import { useWatch } from 'react-hook-form';

jest.mock('react-hook-form');

describe('src/containers/Document/OfferingLetter/Create/elements/ServiceSpecification/elements/FormAuto/elements/Astinet/index', () => {
  beforeEach(() => {
    useWatch.mockReturnValue({
      control: {},
      MIX: 'NO',
      GLOBAL: 10,
    });
  });

  test('render', () => {
    const props = {
      control: {},
      builder: {
        select: [{ name: 'test' }, { name: 'test2' }],
        textField: [{ name: 'GLOBAL', rules: {} }],
        radio: [{ name: 'test' }, { name: 'test2' }],
      },
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Astinet {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render textField not GLOBAL', () => {
    const props = {
      control: {},
      builder: {
        select: [{ name: 'test' }, { name: 'test2' }],
        textField: [{ name: 'test', rules: {} }],
        radio: [{ name: 'test' }, { name: 'test2' }],
      },
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Astinet {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render MIX yes', () => {
    useWatch.mockReturnValue({
      control: {},
      MIX: 'YESS',
      GLOBAL: 10,
    });
    const props = {
      control: {},
      builder: {
        select: [{ name: 'test' }, { name: 'test2' }],
        textField: [{ name: 'GLOBAL', rules: {} }],
        radio: [{ name: 'test' }, { name: 'test2' }],
      },
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Astinet {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
