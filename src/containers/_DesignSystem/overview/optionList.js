import ProductList from '@assets/icon-v2/ProductList';
import OptionList from '@components/OptionList';

const OptionListOverview = {
  component: OptionList,
  variant: [
    {
      grid: 6,
      name: 'Default',
      props: {
        options: [
          { Icon: ProductList, label: 'Products', value: '1' },
          { Icon: ProductList, label: 'Products 2', value: '2' },
          { Icon: ProductList, label: 'Products 3', value: '3' },
        ],
        value: '1',
        // eslint-disable-next-line no-console
      },
    },
  ],
};

export default OptionListOverview;
