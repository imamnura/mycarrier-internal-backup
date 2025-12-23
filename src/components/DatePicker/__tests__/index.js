import React from 'react';
import useActions from '../hooks/useActions';
import ShallowRenderer from 'react-test-renderer/shallow';
import DatePicker, { KeyboardInput } from '../DatePicker';
import { Dialog, Popover } from '@material-ui/core';
import useResponsive from '../../../utils/hooks/useResponsive';

jest.mock('../hooks/useActions');
jest.mock('../../../utils/hooks/useResponsive');

describe('src/components/DatePicker', () => {
  test('render', () => {
    useActions.mockReturnValueOnce({
      label: null,
      onClosePopup: jest.fn(),
      onSubmit: jest.fn(),
      open: false,
      PopUp: Popover,
      resetSelectedDate: jest.fn(),
      selectedDate: null,
      setOpen: jest.fn(),
      setSelectedDate: jest.fn,
    });

    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <DatePicker onChange={jest.fn()} value={null} />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('render/Mobile', () => {
    useResponsive.mockReturnValueOnce(true);
    useActions.mockReturnValueOnce({
      label: null,
      onClosePopup: jest.fn(),
      onSubmit: jest.fn(),
      open: false,
      PopUp: Dialog,
      resetSelectedDate: jest.fn(),
      selectedDate: null,
      setOpen: jest.fn(),
      setSelectedDate: jest.fn,
    });

    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <DatePicker onChange={jest.fn()} value={null} />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('render/KeyboardInput', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <KeyboardInput endProps={{}} startProps={{}} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
