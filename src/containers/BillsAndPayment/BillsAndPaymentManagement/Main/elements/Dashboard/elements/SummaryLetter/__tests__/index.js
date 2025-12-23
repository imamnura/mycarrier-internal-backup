import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useAction from '../hooks/useAction';
import SummaryLetter from '../SummaryLetter';
import useStyles from '../styles';
import { LOCATOR } from '../../../test-locator';

jest.mock('../hooks/useAction');
jest.mock('../styles');

const locatorReminding = LOCATOR.sections.summaryReminderLetter;
const locatorThanks = LOCATOR.sections.summaryThanksLetter;

const actions = {
  reminderLetter: {
    loading: false,
    totalAll: 100,
    chart: 'test',
    chartUnSorted: [
      { label: 'test', value: 'test', color: 'test' },
      { label: 'test', value: 'test', color: 'test' },
    ],
  },
  reminderPeriod: 'test',
  setReminderPeriod: jest.fn(),
  setThanksPeriod: jest.fn(),
  thanksLetter: {
    loading: false,
    totalAll: 100,
    chart: 'test',
    chartUnSorted: [
      { label: 'test', value: 'test', color: 'test' },
      { label: 'test', value: 'test', color: 'test' },
    ],
  },
  thanksPeriod: 'test',
  onOpenReminder: jest.fn(),
  onOpenThanks: jest.fn(),
  locatorReminding,
  locatorThanks,
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/Main/elements/Dashboard/elements/SummaryLetter/index', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('11 August 2023 08:08:08 UTC'));
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SummaryLetter />);
    expect(tree).toMatchSnapshot();
  });

  test('render reminderLetter loading true', () => {
    useAction.mockReturnValue({
      ...actions,
      reminderLetter: { loading: true },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SummaryLetter />);
    expect(tree).toMatchSnapshot();
  });

  test('render thanksLetter loading true', () => {
    useAction.mockReturnValue({ ...actions, thanksLetter: { loading: true } });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SummaryLetter />);
    expect(tree).toMatchSnapshot();
  });
});
