import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { array, object, string } from 'yup';

const useActions = (props) => {
  const { loading, options } = props;

  const [selectedProductChild, setSelectedProductChild] = useState();
  const [modalProductChildConfig, setModalProductChildConfig] = useState();

  const formProductConfig = useFormContext();

  const fieldsProductChild = useFieldArray({
    control: formProductConfig?.control,
    name: 'child',
    rules: {
      validate: async (value) =>
        array()
          .of(
            object().shape({
              // priceId: string().required().label('Price Id'),
              productId: string().required().label('Product Id'),
              productName: string().required().label('Product Name'),
            }),
          )
          .min(1)
          .validate(value)
          .then(() => true)
          .catch((err) => err?.message),
    },
  });

  useEffect(() => {
    const isSelectedProductChildValid = fieldsProductChild?.fields?.some(
      (field) => field?.productId === selectedProductChild?.productId,
    );

    if (!isSelectedProductChildValid) {
      setSelectedProductChild(
        { ...fieldsProductChild?.fields[0], index: 0 } || undefined,
      );
    }
  }, [JSON.stringify(fieldsProductChild.fields)]);

  useEffect(() => {
    return () => {
      setSelectedProductChild(undefined);
      setModalProductChildConfig(undefined);
    };
  }, []);

  return {
    selectedProductChild,
    setSelectedProductChild,
    fieldsProductChild,
    modalProductChildConfig,
    setModalProductChildConfig,
    loading: {
      ...loading,
    },
    options: {
      ...options,
    },
  };
};

export default useActions;
