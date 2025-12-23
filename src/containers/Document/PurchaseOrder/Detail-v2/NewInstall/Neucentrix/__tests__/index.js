import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Neucentrix';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionsReturn = {
  action: jest.fn(),
  data: {
    orderItem: [
      {
        otc: 10000,
      },
    ],
    accountManager: [
      {
        name: 'Ayu Prihatini Novianingrum',
        nik: '954785',
      },
    ],
  },
  productName: 'gameqoo',
};

const props = {
  feature: ['read_attachment'],
};

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall/Neucentrix', () => {
  test('render properly', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly with other status label', () => {
    useActions.mockReturnValue({
      ...useActionsReturn,
      data: {
        ...useActionsReturn.data,
        label: 'draft',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
