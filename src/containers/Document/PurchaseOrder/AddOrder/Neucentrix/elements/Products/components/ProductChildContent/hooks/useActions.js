import { getListProductGrandchildSCOne } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { cleanObject } from '@utils/common';
import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { array, object, string } from 'yup';

const useActions = (props) => {
  const { selectedProductChild } = props;

  const [modalProductGrandchildConfig, setModalProductGrandchildConfig] =
    useState();

  const [productGrandchildOptions, setProductGrandchildOptions] = useState([]);
  const [loadingOptionsProductGrandchild, setLoadingOptionsProductGrandchild] =
    useState(true);

  const formProductConfig = useFormContext();

  const fieldsProductGrandchild = useFieldArray({
    control: formProductConfig?.control,
    name: `child.${selectedProductChild?.index}.child`,
    rules: {
      validate: async (value) =>
        array()
          .of(
            object().shape({
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

  const fieldsAttributes = useFieldArray({
    control: formProductConfig?.control,
    name: `child.${selectedProductChild?.index}.attributes`,
    rules: {
      validate: async (value) =>
        array()
          .of(
            object().shape({
              attributeName: string().required().label('Attribute Name'),
            }),
          )
          .min(0)
          .validate(value)
          .then(() => true)
          .catch((err) => err?.message),
    },
  });

  const fetchOptionsProductGrandchild = async () => {
    setLoadingOptionsProductGrandchild(true);
    const params = cleanObject({
      productId: selectedProductChild?.productId,
      priceId: selectedProductChild?.priceId,
    });
    try {
      const { data } = await getListProductGrandchildSCOne({
        params: params,
      });
      const resOptions = data.map((data) => ({
        label: data?.productName,
        value: data?.productId,
        data: data,
      }));
      
      setProductGrandchildOptions(resOptions);
    } catch (error) {
      setProductGrandchildOptions([]);
    } finally {
      setLoadingOptionsProductGrandchild(false);
    }
  };

  useEffect(() => {
    if (selectedProductChild?.productId) {
      fetchOptionsProductGrandchild();
    }
    return () => {
      setProductGrandchildOptions([]);
      setLoadingOptionsProductGrandchild(true);
    };
  }, [selectedProductChild]);

  return {
    formProductConfig,
    fieldsProductGrandchild,
    modalProductGrandchildConfig,
    setModalProductGrandchildConfig,
    loading: {
      productGrandchild: loadingOptionsProductGrandchild,
    },
    options: {
      productGrandchild: productGrandchildOptions?.filter(
        (option) =>
          !formProductConfig
            ?.watch('child')
            ?.find(
              (child) => child.productId === selectedProductChild?.productId,
            )
            ?.child?.some((product) => option?.value === product?.productId) ||
          option?.value ===
            modalProductGrandchildConfig?.defaultValues?.productId,
      ),
    },
    fieldsAttributes,
  };
};

export default useActions;
