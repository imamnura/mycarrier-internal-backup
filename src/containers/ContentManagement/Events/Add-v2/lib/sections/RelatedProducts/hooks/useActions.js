import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validation } from '../yupResolver';

const useActions = (props) => {
  const {
    useForm: { _control },
    options,
  } = props;

  const { formState, control, getValues, resetField, setError } = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: _control,
    name: 'relatedProduct',
  });

  const handleAddProduct = () => {
    const selected = options.filter(
      ({ value }) => value === getValues('selectedProduct'),
    );
    const normalizeSelected = {
      name: selected[0].label,
      catId: selected[0].value,
    };
    const itExist = fields.some(
      ({ catId }) => catId === normalizeSelected.catId,
    );

    if (itExist) {
      setError('selectedProduct', {
        type: 'custom',
        message: 'Product already exists',
      });
    } else {
      append(normalizeSelected);
      resetField('selectedProduct');
    }
  };

  return {
    formState,
    control,
    fields,
    remove,
    options,
    handleAddProduct,
  };
};

export default useActions;
