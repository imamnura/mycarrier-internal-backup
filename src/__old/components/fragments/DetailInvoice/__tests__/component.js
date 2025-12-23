import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DetailInvoice from '../component';

describe('src/components/fragments/DetailInvoice', () => {
  const props = {
    breadcrumb: [],
    schema: {},
  };

  test('render success', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailInvoice {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
