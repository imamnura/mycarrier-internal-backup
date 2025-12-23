import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../CompanyList';
import useAction from '../hooks/useAction';
import { useRouter } from 'next/router';
import { LOCATOR } from '../test-locator';

jest.mock('../hooks/useAction');
jest.mock('next/router');

const testLocator = LOCATOR;

const actions = {
  testLocator,
  feature: ['read_detail_company'],
  list: {
    data: [
      {
        companyId: '123',
        companyName: 'abc',
        companyAddress: 'abc',
        bpNumber: 123,
        invoiceClaimOnProgress: 5,
        lastFetchInvoice: 'test-1',
      },
      {
        companyId: '123',
        companyName: 'abc',
        companyAddress: 'abc',
        bpNumber: 123,
        invoiceClaimOnProgress: 0,
        lastFetchInvoice: null,
        profByAssessment: 'Low Risk',
      },
      {
        companyId: '123',
        companyName: 'abc',
        companyAddress: 'abc',
        bpNumber: 123,
        invoiceClaimOnProgress: 0,
        lastFetchInvoice: null,
        profByAssessment: 'Medium Risk',
      },
      {
        companyId: '123',
        companyName: 'abc',
        companyAddress: 'abc',
        bpNumber: 123,
        invoiceClaimOnProgress: 0,
        lastFetchInvoice: null,
        profByAssessment: 'High Risk',
      },
    ],
    meta: {},
    hasMore: false,
  },
  loading: {
    tableRoot: true,
    tableRow: false,
  },
  onBottomPage: jest.fn(),
  onClickRowTable: jest.fn(),
};

describe('src/pages/BillsAndPayment/Main/elements/CompanyList', () => {
  beforeEach(() => {
    useAction.mockImplementation(() => actions);
    useRouter.mockReturnValue({ push: jest.fn() });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
