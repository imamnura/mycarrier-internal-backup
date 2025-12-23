import React from 'react';
import useActions from '../hooks/useActions';
import ShallowRenderer from 'react-test-renderer/shallow';
import DateRangePickerSecondary from '../Secondary';
import { Dialog, Popover } from '@material-ui/core';
import useResponsive from '@utils/hooks/useResponsive';

jest.mock('../hooks/useActions');
jest.mock('@utils/hooks/useResponsive');

describe('src/components/DateRangePicker/elements/Secondary', () => {
  test('render', () => {
    useActions.mockReturnValueOnce({
      disableSubmit: true,
      endDate: null,
      label: 'Start - End',
      onClosePopup: jest.fn(),
      onReset: jest.fn(),
      onSubmit: jest.fn(),
      open: false,
      PopUp: Popover,
      setEndDate: jest.fn(),
      setOpen: jest.fn(),
      setStartDate: jest.fn(),
      startDate: null,
    });

    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <DateRangePickerSecondary onChange={jest.fn()} value={[null, null]} />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('render/mobile', () => {
    useResponsive.mockReturnValueOnce(true);
    useActions.mockReturnValueOnce({
      disableSubmit: true,
      endDate: null,
      label: 'Start - End',
      onClosePopup: jest.fn(),
      onReset: jest.fn(),
      onSubmit: jest.fn(),
      open: false,
      PopUp: Dialog,
      setEndDate: jest.fn(),
      setOpen: jest.fn(),
      setStartDate: jest.fn(),
      startDate: null,
    });

    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <DateRangePickerSecondary onChange={jest.fn()} value={[null, null]} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
