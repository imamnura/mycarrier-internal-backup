import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');
jest.mock('next/router');

const actions = {
  data: { segment: 'BMS', invoiceGroup: 'SARTL' },
  feature: [],
  onDownload: jest.fn(),
};

describe('src/containers/BillsAndPayment/DataUnsettle/Detail', () => {
  beforeEach(() => {
    useAction.mockReturnValue(actions);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...actions} />);
    expect(tree).toMatchSnapshot();
  });
});
