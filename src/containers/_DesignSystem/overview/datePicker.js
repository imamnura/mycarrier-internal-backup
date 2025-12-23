/* eslint-disable no-alert */
import DatePicker from '@components/DatePicker';

const datePickerOverview = {
  component: DatePicker,
  variant: [
    {
      name: 'Default',
      props: {
        onChange: (val) => window.alert(val),
        value: null,
      },
    },
    {
      name: 'Custom Label',
      props: {
        onChange: (val) => window.alert(val),
        value: null,
        label: 'Pilih',
      },
    },
  ],
};

export default datePickerOverview;
