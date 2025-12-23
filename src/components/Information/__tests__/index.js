import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Information from '../Information';

describe('src/components/Information', () => {
  const props = {
    label: 'Label',
    value: 'Value',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Information {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/array string', () => {
    const customProps = {
      ...props,
      value: ['1', '2'],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Information {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/others', () => {
    const customProps = {
      ...props,
      value: <span>test</span>,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Information {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/array others', () => {
    const customProps = {
      ...props,
      value: [<span key={1}>test</span>],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Information {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
