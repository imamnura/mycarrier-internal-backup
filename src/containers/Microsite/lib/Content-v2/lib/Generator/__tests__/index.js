import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Generator from '../Generator';

describe('src/containers/Microsite/lib/Content-v2/lib/Generator/index', () => {
  test('render information', () => {
    const props = {
      schema: [
        { type: 'information', title: 'information', properties: 'test' },
      ],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Generator {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type numbering', () => {
    const props = {
      schema: [{ type: 'numbering', title: 'numbering', properties: 'test' }],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Generator {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type others', () => {
    const props = {
      schema: [{ type: 'other', title: 'other', properties: 'test' }],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Generator {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
