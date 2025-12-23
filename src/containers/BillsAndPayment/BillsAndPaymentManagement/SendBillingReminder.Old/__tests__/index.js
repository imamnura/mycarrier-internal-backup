import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useAction from '../hooks/useAction';
import SendBillingReminder from '../SendBillingReminder';

jest.mock('../hooks/useAction');

const actions = {
  bpNumber: 'test',
  count: 100,
  loading: false,
  loadingDraft: false,
  onDiscard: jest.fn(),
  onDraft: jest.fn(),
  onSubmit: jest.fn(),
  setValue: jest.fn(),
  value: 'test',
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/SendBillingReminder.Old/index', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('11 August 2023 08:08:08 UTC'));
  });

  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SendBillingReminder />);
    expect(tree).toMatchSnapshot();
  });
});
