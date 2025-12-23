import React from 'react';
import MaskedCPName from '../component';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('src/components/form/CPNameForm/elements/MaskedCPName', () => {
  const props = {
    inputRef: jest.fn(),
    mask: [],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MaskedCPName {...props} />);
    tree.ref();
    expect(tree).toMatchSnapshot();
    expect(props.inputRef).toHaveBeenCalled();
  });
});
