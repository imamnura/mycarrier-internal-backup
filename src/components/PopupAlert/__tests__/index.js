import React from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import ShallowRenderer from 'react-test-renderer/shallow';
import PopupAlert from '../PopupAlert';

jest.mock('@utils/hooks/usePopupAlert');

describe('src/components/PopupAlert', () => {
  test('render', () => {
    usePopupAlert.mockReturnValue({
      alertData: {
        message: 'test',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopupAlert />);
    expect(tree).toMatchSnapshot();
  });

  test('render/loading', () => {
    usePopupAlert.mockReturnValue({
      alertData: {
        message: 'test',
        variant: 'loading',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopupAlert />);
    expect(tree).toMatchSnapshot();
  });
});
