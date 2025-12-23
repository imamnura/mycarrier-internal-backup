import { getAttributeProductSCOne } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { array, object, string } from 'yup';
import { normalizeAttributeValue } from '../../../utils';

const useActions = (props) => {
  const {
    modalProductGrandchildConfig,
    setModalProductGrandchildConfig,
    selectedProductChild,
    fieldsProductGrandchild,
    loading,
    options,
  } = props;

  const { setFailedAlert } = usePopupAlert();

  const [quantityOptions, setQuantityOptions] = useState([]);

  const [
    loadingAttributesProductGrandchild,
    setLoadingAttributesProductGrandchild,
  ] = useState(false);

  const formProductGrandchildConfig = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      attributes: [],
    },
  });

  const fieldsAttributes = useFieldArray({
    control: formProductGrandchildConfig?.control,
    name: 'attributes',
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

  const onClose = () => () => setModalProductGrandchildConfig(null);

  useEffect(() => {
    if (
      modalProductGrandchildConfig?.open &&
      modalProductGrandchildConfig?.index > -1
    ) {
      formProductGrandchildConfig.reset({
        child: options?.productGrandchild?.find(
          (option) =>
            option?.value ===
            modalProductGrandchildConfig?.defaultValues?.productId,
        ),
        qty: modalProductGrandchildConfig?.defaultValues?.qty,
        attributes:
          modalProductGrandchildConfig?.defaultValues?.attributes || [],
        price: modalProductGrandchildConfig?.defaultValues?.price || 0,
      });
    }
    return () => {
      formProductGrandchildConfig.reset({ attributes: [] });
      setQuantityOptions([]);
    };
  }, [modalProductGrandchildConfig?.open]);

  const onChangeProductGrandChild = async (selectedOption) => {
    setLoadingAttributesProductGrandchild(true);

    const params = cleanObject({
      productId: selectedOption?.data?.productId,
      productName: selectedOption?.data?.productName,
    });

    try {
      const { data } = await getAttributeProductSCOne({
        params: params,
      });
      formProductGrandchildConfig?.resetField('attributes', {
        defaultValue: data,
      });
      setQuantityOptions(
        selectedOption?.data?.qty?.map((option) => ({
          label: option,
          value: option,
        })),
      );
      formProductGrandchildConfig?.resetField('qty', { defaultValue: null });
    } catch (error) {
      formProductGrandchildConfig?.resetField('child');
      setFailedAlert({
        message: error?.message ?? 'Failed to add Child Product',
      });
    } finally {
      setLoadingAttributesProductGrandchild(false);
    }
  };
  
  const onSubmit = (values) => {
    const normalizeForm = cleanObject({
      productId: values?.child?.data?.productId,
      productName: values?.child?.data?.productName,
      paymentType: values?.child?.data?.paymentType,
      priceId: selectedProductChild?.priceId,
      attributes: values?.attributes?.map((attr) => ({
        ...attr,
        attributeValue: normalizeAttributeValue(
          attr?.attributeType,
          attr?.attributeValue,
        ),
      })),
      qty: values?.qty,
      price: values?.price || 0,

      //add new field for need payload to check constraint in backend
      relationId: values?.child?.data?.relationId,
      productCode: values?.child?.data?.productCode,
      classId: values?.child?.data?.classId,
    });

    if (modalProductGrandchildConfig?.index > -1)
      fieldsProductGrandchild?.update(
        modalProductGrandchildConfig?.index,
        normalizeForm,
      );
    else fieldsProductGrandchild?.append(normalizeForm);

    setModalProductGrandchildConfig({
      ...modalProductGrandchildConfig,
      open: false,
    });
  };

  return {
    onClose,
    formProductGrandchildConfig,
    options: {
      ...options,
      quantity: quantityOptions,
    },
    loading: {
      ...loading,
      attributes: loadingAttributesProductGrandchild,
    },
    fieldsAttributes,
    onSubmit,
    onChangeProductGrandChild,
  };
};

export default useActions;
