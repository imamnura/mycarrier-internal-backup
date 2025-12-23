import Dropdown from '@components/Dropdown';

const dropdownOverview = {
  component: Dropdown,
  variant: [
    {
      name: 'Single Value + max-200 (default)',
      props: {
        placeholder: 'Choose Single',
        options: [
          { label: 'Option Pertama', value: 'satu' },
          { label: 'Option Kedua', value: 'dua' },
          { label: 'Option Ketiga Label Panjang', value: 'tiga' },
        ],
      },
    },
    {
      name: 'Multiple Value + max-none',
      props: {
        isMulti: true,
        placeholder: 'Choose Multiple',
        maxWidth: 'none',
        options: [
          { label: 'Option Pertama', value: 'satu' },
          { label: 'Option Kedua', value: 'dua' },
          { label: 'Option Ketiga Label Panjang', value: 'tiga' },
        ],
      },
    },
    {
      name: 'Multiple Value + Search',
      props: {
        isMulti: true,
        isSearchable: true,
        placeholder: 'Choose Multiple',
        maxWidth: 'none',
        options: [
          { label: 'Option Pertama', value: 'satu' },
          { label: 'Option Kedua', value: 'dua' },
          { label: 'Option Ketiga Label Panjang', value: 'tiga' },
        ],
      },
    },
  ],
};

export default dropdownOverview;
