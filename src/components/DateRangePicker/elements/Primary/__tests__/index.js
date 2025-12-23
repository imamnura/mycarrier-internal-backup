import React from 'react';
import useActions from '../hooks/useActions';
import ShallowRenderer from 'react-test-renderer/shallow';
import DateRangePickerPrimary, { KeyboardInput } from '../Primary';
import { Dialog, Popover } from '@material-ui/core';
import useResponsive from '@utils/hooks/useResponsive';

jest.mock('../hooks/useActions');
jest.mock('@utils/hooks/useResponsive');

describe('src/components/DateRangePicker/elements/Primary', () => {
  test('render', () => {
    useActions.mockReturnValueOnce({
      dateRangeEqual: jest.fn().mockReturnValueOnce(false),
      label: 'Start - End',
      onClosePopup: jest.fn(),
      onSubmit: jest.fn(),
      open: false,
      PopUp: Popover,
      resetSelectedDate: jest.fn(),
      selectedDate: [null, null],
      setOpen: jest.fn(),
      setSelectedDate: jest.fn,
      setSuggestionSelectedDate: jest.fn(),
    });

    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <DateRangePickerPrimary onChange={jest.fn()} value={[null, null]} />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('render other props', () => {
    useActions.mockReturnValueOnce({
      dateRangeEqual: jest.fn().mockReturnValueOnce(false),
      label: 'Start - End',
      onClosePopup: jest.fn(),
      onSubmit: jest.fn(),
      open: false,
      PopUp: Popover,
      resetSelectedDate: jest.fn(),
      selectedDate: [null, null],
      setOpen: jest.fn(),
      setSelectedDate: jest.fn,
      setSuggestionSelectedDate: jest.fn(),
    });

    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <DateRangePickerPrimary
        onChange={jest.fn()}
        value={[null, null]}
        required={true}
        labelText="label"
        withIcon={true}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('render/Mobile', () => {
    useResponsive.mockReturnValueOnce(true);
    useActions.mockReturnValueOnce({
      dateRangeEqual: jest.fn().mockReturnValueOnce(false),
      label: 'Start - End',
      onClosePopup: jest.fn(),
      onSubmit: jest.fn(),
      open: false,
      PopUp: Dialog,
      resetSelectedDate: jest.fn(),
      selectedDate: [null, null],
      setOpen: jest.fn(),
      setSelectedDate: jest.fn,
      setSuggestionSelectedDate: jest.fn(),
    });

    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <DateRangePickerPrimary onChange={jest.fn()} value={[null, null]} />,
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
