import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Step2 from '../Step2';

const props = {
  control: {},
  watch: jest.fn(),
};

describe('src/containers/Document/PurchaseOrder/Detail-v2/lib/form/Discount/lib/Step2', () => {
  test('render properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Step2 {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
