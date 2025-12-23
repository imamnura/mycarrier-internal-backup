import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import General from '../General';

describe('src/containers/Document/OfferingLetter/Create/elements/ServiceSpecification/elements/FormAuto/elements/General/index', () => {
  const props = {
    control: {},
    builder: {
      select: [{ name: 'test' }, { name: 'test2' }],
      textField: [{ name: 'GLOBAL', rules: {} }],
      radio: [{ name: 'test' }, { name: 'test2' }],
    },
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<General {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
