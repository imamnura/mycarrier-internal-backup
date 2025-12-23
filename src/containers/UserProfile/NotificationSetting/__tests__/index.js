import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';
import useResponsive from '@utils/hooks/useResponsive';

jest.mock('../hooks/useActions');
jest.mock('@utils/hooks/useResponsive');

describe('src/containers/UserProfile/NotificationSetting/index', () => {
  const props = {
    feature: [],
  };

  const useActionReturn = {
    control: {},
    groupedData: {
      purchaseOrder: [
        {
          title: 'Create Purchase Order',
          email: true,
          whatsapp: true,
        },
      ],
    },
    list: [],
    loading: {
      tableRoot: false,
      tableRow: false,
    },
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/sm/mobile', () => {
    useResponsive.mockImplementation(() => true);
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
