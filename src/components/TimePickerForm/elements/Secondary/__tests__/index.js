import React from 'react';
import useAction from '../hooks/useAction';
import ShallowRenderer from 'react-test-renderer/shallow';
import TimePickerFormSecondary from '../Secondary';

jest.mock('../hooks/useAction');

describe('src/components/DateRangePicker/elements/Secondary', () => {
  test('render', () => {
    useAction.mockReturnValueOnce({
      activeHour: 4,
      activeMinute: 4,
      activeSecond: 4,
      hourSeparator: true,
      isMaxDateInvalid: jest.fn(),
      isMinDateInvalid: jest.fn(),
      minuteSeparator: true,
      onPickTime: jest.fn(),
      open: true,
      refField: { current: null },
      refHour: { current: null },
      refMinute: { current: null },
      refSecond: { current: null },
      secondSeparator: true,
      separatorHandler: jest.fn(),
      setOpen: jest.fn(),
      value: null,
    });

    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <TimePickerFormSecondary onChange={jest.fn()} value={null} />,
    );
    tree.props.children[0].props.rightAdornment({});
    expect(tree).toMatchSnapshot();
  });
});
