import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TextFieldMasked, { Masked } from '../TextFieldMasked';

describe('src/components/TextFieldMasked', () => {
  const props = {
    maskType: 'currency',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TextFieldMasked {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('masked', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Masked inputRef={jest.fn()} mask={jest.fn()} />,
    );
    tree.ref({ inputElement: {} });
    tree.ref();
    expect(tree).toMatchSnapshot();
  });
});
