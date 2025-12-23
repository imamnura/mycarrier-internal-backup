import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DetailClaim from '../DetailClaim';
import useAction from '../hooks/useAction';
import { getClaimStatus, getClaimStepper } from '../utils';

jest.mock('../hooks/useAction');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/DetailClaim', () => {
  const action = {
    approvalForm: {},
    closeApprovalForm: jest.fn(),
    closeCompleteForm: jest.fn(),
    completeForm: {},
    data: null,
    feature: [],
    loading: false,
    onSubmitFormApproval: jest.fn(),
    onSubmitFormComplete: jest.fn(),
    setApprovalForm: jest.fn().mockReturnValue(jest.fn()),
    setCompleteForm: jest.fn().mockReturnValue(jest.fn()),
  };

  test('render/submitted', () => {
    useAction.mockReturnValueOnce({
      ...action,
      data: {
        subStatus: 'submitted',
        worklog: [
          {
            subStatus: 'submitted',
            dateTime: new Date(Date.UTC(2010, 10, 10)),
            note: '--',
          },
        ],
      },
      feature: [
        'update_claim_cdm',
        'update_claim_am',
        'update_claim_completed',
      ],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailClaim />);
    expect(tree).toMatchSnapshot();
  });

  test('render/cdm_checked', () => {
    useAction.mockReturnValueOnce({
      ...action,
      data: {
        subStatus: 'cdm_checked',
      },
      feature: [
        'update_claim_cdm',
        'update_claim_am',
        'update_claim_completed',
      ],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailClaim />);
    expect(tree).toMatchSnapshot();
  });

  test('render/approved', () => {
    useAction.mockReturnValueOnce({
      ...action,
      data: {
        subStatus: 'approved',
      },
      feature: [
        'update_claim_cdm',
        'update_claim_am',
        'update_claim_completed',
      ],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailClaim />);
    expect(tree).toMatchSnapshot();
  });

  test('render/emptyData', () => {
    useAction.mockReturnValueOnce(action);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailClaim />);
    expect(tree).toMatchSnapshot();
  });

  test('getClaimStatus', () => {
    expect(getClaimStatus('undefined')).toBe('');
  });

  test('getClaimStepper', () => {
    expect(getClaimStepper('am_checked')).toMatchObject({
      active: 3,
      errors: undefined,
    });
    expect(getClaimStepper('completed')).toMatchObject({
      active: 4,
      errors: undefined,
    });
    expect(getClaimStepper('am_returned')).toMatchObject({
      active: 2,
      errors: 'returned',
    });
    expect(getClaimStepper('am_rejected')).toMatchObject({
      active: 2,
      errors: 'rejected',
    });
    expect(getClaimStepper('cdm_returned')).toMatchObject({
      active: 1,
      errors: 'returned',
    });
    expect(getClaimStepper('cdm_rejected')).toMatchObject({
      active: 1,
      errors: 'rejected',
    });
    expect(getClaimStepper('xxxxx')).toMatchObject({
      active: 0,
      errors: undefined,
    });
  });
});
