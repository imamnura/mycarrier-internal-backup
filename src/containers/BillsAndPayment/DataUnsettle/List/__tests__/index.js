import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useAction';
import { useRouter } from 'next/router';

jest.mock('../hooks/useAction');
jest.mock('next/router');

const actions = {
  feature: ['read_detail_data_unsettle'],
  list: [
    {
      segment: 'BMS',
      invoiceGroup: 'SARTL',
      periode1: 123,
      periode2: 123,
      periode3: 123,
      periode4: 123,
      total: 123,
    },
  ],
  loadingTable: false,
  onClickRowTable: jest.fn(),
};

describe('src/containers/BillsAndPayment/DataUnsettle/List', () => {
  beforeEach(() => {
    useActions.mockImplementation(() => actions);
    useRouter.mockReturnValue({ push: jest.fn() });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
