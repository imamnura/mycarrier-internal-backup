import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Users from '../Users';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  data: {},
  feature: ['update_generate_settlement_cdm'],
  handlePeriod: jest.fn(),
  loading: false,
  onDownload: jest.fn(),
  onGenerateSettlement: jest.fn(),
  period: '',
  userId: 'id',
};

describe('src/containers/BillsAndPayment/Settlement/Detail/Users', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Users />);
    expect(tree).toMatchSnapshot();
  });

  test('render/period tooltip', () => {
    useAction.mockReturnValue({
      ...actions,
      data: {
        totalUsage: '-',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Users />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty tooltip', () => {
    useAction.mockReturnValue({
      ...actions,
      feature: [],
      data: {
        totalUsage: '-',
      },
      period: '-',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Users />);
    expect(tree).toMatchSnapshot();
  });
});
