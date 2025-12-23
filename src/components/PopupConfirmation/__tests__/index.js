import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PopupConfirmation from '../PopupConfirmation';

jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/components/PopupConfirmation', () => {
  test('render', () => {
    usePopupConfirmation.mockReturnValue({
      confirmationData: {
        action: [],
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopupConfirmation />);
    expect(tree).toMatchSnapshot();
  });

  test('render/opened', () => {
    usePopupConfirmation.mockReturnValue({
      confirmationData: {
        message: 'm',
        action: [{}, {}],
        variant: 'success',
        description: 'd',
        note: 'n',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopupConfirmation />);
    expect(tree).toMatchSnapshot();
  });
});
