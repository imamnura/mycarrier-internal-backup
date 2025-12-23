import { currencyToNumber } from '@utils/parser';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';

const useAction = (props) => {
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  useEffect(() => {
    reset(props.defaultValues);
  }, [props.defaultValues]);

  // const onSubmit = handleSubmit((value) => {
  const onSubmit = (value) => {
    let payload = {
      autoQuote: value.autoQuote,
      netPrice: currencyToNumber(value.netPrice, 'string'),
      probability: value.probability + '%',
      productLine: value.product.productId,
      productName: value.product.productName,
      quantity: value.quantity.toString(),
      revenue: currencyToNumber(value.revenue, 'string'),
    };

    if (props.variant === 'edit') {
      (payload.autoQuote = value.autoQuote.toString()),
        (payload.scLineId = props.id.scLineId);
    }

    props.onSubmit(payload);
  };

  const product = watch('product');

  useEffect(() => {
    if (product) {
      setValue('productLine', product.productId);
    }
  }, [product]);

  return {
    control,
    onSubmit,
    handleSubmit,
  };
};

export default useAction;
