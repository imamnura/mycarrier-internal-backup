import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SettlementList from '../SettlementList';
import useAction from '../hooks/useAction';
import { getSettlementStatus, getSettlementStepper } from '../utils';

jest.mock('../hooks/useAction');

const actions = {
  data: {
    worklog: [
      { status: 'z', note: 'x' },
      { status: 'z', description: 'x' },
    ],
  },
  feature: [],
  loading: false,
  onClosePopUp: jest.fn,
  popUp: {},
  setData: jest.fn(),
  setDocumentViewer: jest.fn(),
  setPopUp: jest.fn(),
};

describe('src/containers/BillsAndPayment/Settlement/Detail/SettlementList', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty data', () => {
    useAction.mockReturnValue({ ...actions, data: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status complete', () => {
    useAction.mockReturnValue({
      ...actions,
      data: {
        status: 'completed',
        worklog: [],
        signedMomDocument: {},
        ndeDocument: {},
        invoiceDocument: {},
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status complete - no data', () => {
    useAction.mockReturnValue({
      ...actions,
      data: {
        status: 'completed',
        worklog: [],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status am_approved', () => {
    useAction.mockReturnValue({
      ...actions,
      feature: ['update_status_complete_settlement_cdm'],
      data: {
        status: 'am_approved',
        worklog: [],
        signedMomDocument: {},
        ndeDocument: {},
        invoiceDocument: {},
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status am_approved - no data', () => {
    useAction.mockReturnValue({
      ...actions,
      data: {
        status: 'am_approved',
        worklog: [],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status customer_approved', () => {
    useAction.mockReturnValue({
      ...actions,
      feature: ['update_send_document_nde_am_settlement'],
      data: {
        status: 'customer_approved',
        worklog: [],
        signedMomDocument: {},
        ndeDocument: {},
        invoiceDocument: {},
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status customer_approved - no data', () => {
    useAction.mockReturnValue({
      ...actions,
      data: {
        status: 'customer_approved',
        worklog: [],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status am_send_mom', () => {
    useAction.mockReturnValue({
      ...actions,
      data: {
        status: 'am_send_mom',
        worklog: [],
        momDocument: {},
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status am_send_mom - no data', () => {
    useAction.mockReturnValue({
      ...actions,
      data: {
        status: 'am_send_mom',
        worklog: [],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status cdm_generate_settlement', () => {
    useAction.mockReturnValue({
      ...actions,
      feature: ['create_send_mom_document_am'],
      data: {
        status: 'cdm_generate_settlement',
        worklog: [],
        signedMomDocument: {},
        ndeDocument: {},
        invoiceDocument: {},
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status cdm_generate_settlement  - no data', () => {
    useAction.mockReturnValue({
      ...actions,
      feature: [],
      data: {
        status: 'cdm_generate_settlement',
        worklog: [],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status customer_returned', () => {
    useAction.mockReturnValue({
      ...actions,
      feature: ['update_mom_document_settlement'],
      data: {
        status: 'customer_returned',
        worklog: [],
        momDocument: {},
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('render/status customer_returned  - no data', () => {
    useAction.mockReturnValue({
      ...actions,
      feature: [],
      data: {
        status: 'customer_returned',
        worklog: [],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SettlementList />);
    expect(tree).toMatchSnapshot();
  });

  test('getSettlementStatus', () => {
    expect(getSettlementStatus('xx')).toMatchObject({
      variant: '',
      children: '',
    });
  });

  test('getSettlementStepper', () => {
    expect(
      getSettlementStepper({ status: 'reviewer_approval', reviewer: [{}] }),
    ).toMatchObject({
      active: 3,
      errors: undefined,
      errorsLabel: undefined,
      steps: [
        'AM Sended MOM',
        'Customer Approval',
        'AM Send NDE',
        'Reviewer Approval',
        'Settlement Completed',
        'Completed',
      ],
    });
    expect(
      getSettlementStepper({ status: 'reviewer_approved', reviewer: [] }),
    ).toMatchObject({
      active: 3,
      errors: undefined,
      errorsLabel: undefined,
      steps: [
        'AM Sended MOM',
        'Customer Approval',
        'AM Send NDE',
        'Settlement Completed',
        'Completed',
      ],
    });
    expect(
      getSettlementStepper({ status: 'customer_returned', reviewer: [] }),
    ).toMatchObject({
      active: 1,
      errors: 'returned',
      errorsLabel: 'Customer Returned',
      steps: [
        'AM Sended MOM',
        'Customer Approval',
        'AM Send NDE',
        'Settlement Completed',
        'Completed',
      ],
    });
    expect(
      getSettlementStepper({ status: 'nde_rejected', reviewer: [] }),
    ).toMatchObject({
      active: 3,
      errors: 'rejected',
      errorsLabel: 'NDE Rejected',
      steps: [
        'AM Sended MOM',
        'Customer Approval',
        'AM Send NDE',
        'Settlement Completed',
        'Completed',
      ],
    });
    expect(
      getSettlementStepper({ status: 'nde_returned', reviewer: [] }),
    ).toMatchObject({
      active: 3,
      errors: 'returned',
      errorsLabel: 'NDE Returned',
      steps: [
        'AM Sended MOM',
        'Customer Approval',
        'AM Send NDE',
        'Settlement Completed',
        'Completed',
      ],
    });
  });
});
