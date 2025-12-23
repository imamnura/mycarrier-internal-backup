import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import KeyData from '../KeyData';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionsReturn = {
  copyToClipboard: jest.fn(),
  hidden: {},
  setHidden: jest.fn(),
};

const props = {
  data: {
    apiKey: '5ghyu7',
  },
  schema: [{ name: 'apiKey', label: 'Api Key' }],
};

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall/Msight/lib/KeyData', () => {
  test('render properly', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<KeyData {...props} />);
    expect(tree).toMatchSnapshot();
    tree[0].props.children[1].props.children[0].props.onClick();
  });

  test('render properly with hidden value', () => {
    useActions.mockReturnValue({
      ...useActionsReturn,
      hidden: { 0: true },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<KeyData {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
