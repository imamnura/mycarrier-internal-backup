import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EmailTextAndAttachment from '../EmailTextAndAttachment';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  data: {},
  bpNumber: 'test',
  count: 1,
  reminderId: 'test',
  loading: false,
  onSubmit: jest.fn(),
  submitLoading: false,
  onStepperClick: jest.fn(),
  value: {},
  setValue: jest.fn(),
  // attachment: { data: { fileName: 'test', fileUrl: 'test' } },
  attachment: [{ fileName: 'test', fileUrl: 'test' }],
  setAttachment: jest.fn(),
  onDeleteAttachment: jest.fn(),
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create/elements/EmailTextAndAttachment/index', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EmailTextAndAttachment />);
    expect(tree).toMatchSnapshot();
  });

  test('render attachment false', () => {
    useAction.mockReturnValue({ ...actions, attachment: [] });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EmailTextAndAttachment />);
    expect(tree).toMatchSnapshot();
  });
});
