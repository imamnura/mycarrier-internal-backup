import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import HistorySendLog from '../HistorySendLog';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  onClose: jest.fn(),
  open: true,
  data: [{}, {}],
};

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/HistorySendLog', () => {
  test('render', () => {
    useAction.mockReturnValueOnce(props);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HistorySendLog {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty', () => {
    useAction.mockReturnValueOnce({ ...props, data: [] });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HistorySendLog {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
