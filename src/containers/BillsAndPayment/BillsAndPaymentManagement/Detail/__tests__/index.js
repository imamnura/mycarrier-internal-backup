import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useAction from '../hooks/useAction';
import { parsingStatus, RefreshNote } from '../utils';

jest.mock('../hooks/useAction');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Detail', () => {
  test('render', () => {
    useAction.mockReturnValueOnce({
      bpNumber: null,
      data: null,
      feature: [],
      loading: false,
      openHistoryLog: true,
      sendInvoiceEmail: 'billingReminder',
      setOpenHistoryLog: jest.fn().mockReturnValue(jest.fn()),
      setSendInvoiceEmail: jest.fn().mockReturnValue(jest.fn()),
      setUpdatePeriod: jest.fn().mockReturnValue(jest.fn()),
      setOpenCreateReconciliation: jest.fn().mockReturnValue(jest.fn()),
      updatePeriod: jest.fn(),
      updatePicProfile: jest.fn(),
      updateSendLog: jest.fn(),
      setRemindingOption: jest.fn(),
      onSubmitRemindingOption: jest.fn(),
      remindingOption: {
        open: false,
        value: '',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('RefreshNote', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RefreshNote />);
    expect(tree).toMatchSnapshot();
  });

  test('RefreshNote/others', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RefreshNote newStatus="xxx" />);
    expect(tree).toMatchSnapshot();
  });

  test('parse status', () => {
    expect(parsingStatus('tes')).toBe(undefined);
    expect(parsingStatus('99')).toMatchObject({
      children: '99',
      variant: 'primary',
    });
  });
});
