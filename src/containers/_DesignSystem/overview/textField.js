import Lba from '@assets/icon-v2/Lba';
import TextField from '@components/TextField';

const textFieldOverview = {
  component: TextField,
  variant: [
    {
      grid: 3,
      name: 'Default',
      props: {
        label: 'Label',
      },
    },
    {
      grid: 3,
      name: 'Counter (need onChange & value) + Helper',
      props: {
        maxLength: 10,
        helperText: 'helper',
        label: 'Label',
      },
    },
    {
      grid: 3,
      name: 'Password + Placeholder',
      props: {
        type: 'password',
        label: 'Label',
        placeholder: 'Placeholder',
      },
    },
    {
      grid: 3,
      name: 'Adornment + Error',
      props: {
        error: true,
        helperText: 'error message',
        leftAdornment: '+62',
        rightAdornment: Lba,
        label: 'Label',
      },
    },
  ],
};

export default textFieldOverview;
