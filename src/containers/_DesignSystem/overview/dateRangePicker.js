/* eslint-disable no-alert */
import DateRangePicker from '@components/DateRangePicker';

const dateRangePickerOverview = {
  component: DateRangePicker,
  variant: [
    {
      name: 'Default',
      props: {
        onChange: (val) => window.alert(val),
        value: [null, null],
      },
    },
  ],
};

export default dateRangePickerOverview;
