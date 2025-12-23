import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProgressUpload from '../ProgressUpload';

describe('src/containers/Document/PurchaseOrder/Detail/lib/ProgressUpload', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProgressUpload />);
    expect(tree).toMatchSnapshot();
  });
});
