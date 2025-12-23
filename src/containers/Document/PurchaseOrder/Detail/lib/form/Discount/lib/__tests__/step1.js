import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Step1 from '../Step1';

const props = {
  control: {},
  optionsBakesNumber: [
    {
      bakesNumber: '123',
    },
  ],
  watch: jest.fn(),
};

describe('src/containers/Document/PurchaseOrder/Detail-v2/lib/form/Discount/lib/Step1', () => {
  test('render properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Step1 {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
