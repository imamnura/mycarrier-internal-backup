import _ from 'lodash';
import { useWatch } from 'react-hook-form';

const useAction = (props) => {
  const { useForm } = props;

  const productFlow = useWatch({
    control: useForm?.control,
    name: 'productFlow',
  });

  const form = useWatch({
    control: useForm?.control,
    name: 'form',
  });

  const checkboxSchema = () => {
    // Remove "Change Ownership" option if current URL is "/po-config/product"
    let options = [
      'New Order',
      'Trial',
      'Modify',
      'Disconnect',
      'Change Ownership',
    ];

    if (window.location.pathname === '/po-config/product') {
      options = options.filter((opt) => opt !== 'Change Ownership');
    }

    const availableOptions = Object.keys(productFlow?.data?.form || {}).map(
      (orderType) => _.startCase(orderType),
    );

    const disabled = options.filter(
      (orderType) => !availableOptions.includes(orderType),
    );

    return {
      options,
      disabled,
    };
  };

  return {
    productFlow,
    form,
    checkboxSchema,
  };
};

export default useAction;
