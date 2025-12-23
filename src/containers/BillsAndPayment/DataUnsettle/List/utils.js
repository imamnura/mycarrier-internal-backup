import moment from 'moment';

export const filterMonthOptions = [
  { label: 'All Month', value: '' },
  ...moment.months().map((monthName, i) => {
    return { value: String(`0${i + 1}`.slice(-2)), label: monthName };
  }),
];

export const filterYearOptions = () => {
  let startYear = moment().year() + 1;

  const output = [];

  for (let i = 5; i > 0; i = i - 1) {
    startYear -= 1;
    output.push(`${startYear}`);
  }

  return [
    { label: 'All Year', value: '' },
    ...output.map((year) => ({ label: year, value: year })),
  ];
};
