import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DocumentStage from '../DocumentStage';

const props = {
  data: [
    {
      status: 'status',
      isCompleted: true,
    },
  ],
};

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/DetailInvoice/elements/DocumentStage', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DocumentStage {...props} />);
    expect(tree).toMatchSnapshot();
  });

  // test('render/emptyData', () => {
  //   const shallow = new ShallowRenderer();
  //   const tree = shallow.render(<DocumentStage />);
  //   expect(tree).toMatchSnapshot();
  // });
});
