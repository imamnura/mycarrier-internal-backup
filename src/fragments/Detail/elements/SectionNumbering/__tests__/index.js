import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SectionNumbering from '../SectionNumbering';

describe('src/fragments/Detail/elements/SectionNumbering', () => {
  const props = {
    data: [{ name: 'name' }, { x: '' }],
    schema: [
      { name: 'name', label: 'satu' },
      { name: 'empty', label: 'empty' },
    ],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SectionNumbering {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/others', () => {
    const customProps = {
      ...props,
      schema: null,
      nameKey: 'name',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SectionNumbering {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
