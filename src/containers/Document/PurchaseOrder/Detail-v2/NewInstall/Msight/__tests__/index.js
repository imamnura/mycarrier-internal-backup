import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Msight';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionsReturn = {
  action: jest.fn(),
  data: {},
  feature: ['read_attachment'],
};

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall/Msight', () => {
  test('render properly', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly as a full product & has apiKey', () => {
    useActions.mockReturnValue({
      ...useActionsReturn,
      data: {
        isFullMsight: true,
        apiKey: '5hgy6',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
});
