import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ListOfDetail from '../ListOfDetail';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  feature: [],
  list: [
    {
      bpNumber: '123',
      custName: 'PT 123',
      currency: 'IDR',
      total: 123,
      glAccount: '123',
      invoiceGroup: 'SARTL',
      glDesc: 'Pend Manage Capacity Service',
      serviceAcc: ' ',
      docPeriod: '123',
      postPeriod: '123',
      usgPeriod: '123',
      iddb: '123',
      segment: 'BMS',
      nikAM: '123',
      nameAM: '123',
      mobileAM: '123',
      emailAM: '123',
      periode: 1,
    },
    {
      bpNumber: '123',
      custName: 'PT 123',
      currency: 'IDR',
      total: 123,
      glAccount: '123',
      invoiceGroup: 'SARTL',
      glDesc: 'Pend Manage Capacity Service',
      serviceAcc: ' ',
      docPeriod: '123',
      postPeriod: '123',
      usgPeriod: '123',
      iddb: '123',
      segment: 'BMS',
      nikAM: '123',
      nameAM: '123',
      mobileAM: '123',
      emailAM: '123',
      periode: null,
    },
  ],
  loadingTable: false,
};

describe('src/containers/BillsAndPayment/DataUnsettle/Detail/element/ListOfDetail', () => {
  beforeEach(() => {
    useAction.mockReturnValue(actions);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListOfDetail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
