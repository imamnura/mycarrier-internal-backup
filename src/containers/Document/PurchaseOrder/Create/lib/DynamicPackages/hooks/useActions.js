import { getDropdownOption } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { cleanObject } from '@utils/common';
import { useEffect, useState } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { array, object } from 'yup';

const useAction = (props) => {
  const { useForm, fieldProps, productId } = props;

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fieldsPackages = useFieldArray({
    control: useForm?.control,
    name: fieldProps?.formKey,
    rules: {
      validate: async (value) => {
        if (fieldProps?.required) {
          const hasCheckedPackages = value?.some(
            (packageItem) => packageItem?.checked === true,
          );
          return hasCheckedPackages || 'No Packages Selected';
        } else {
          return array()
            .of(object().required())
            .nullable()
            .optional()
            .min(0)
            .label('Packages')
            .validate(value)
            .then(() => true)
            .catch((err) => err?.message);
        }
      },
    },
  });

  const watchPackages =
    useWatch({
      control: useForm?.control,
      name: fieldProps?.formKey,
    }) || [];

  const getOptions = async () => {
    let idCheckedMap = new Map(
      watchPackages.map((item) => [item.id, item.checked]),
    );
    setLoading(true);
    try {
      const result = await getDropdownOption({
        url: fieldProps?.api,
        params: cleanObject({
          productId: productId,
        }),
      });

      const normalizeData = result?.data
        ?.filter((packageItem) => !!packageItem?.id)
        ?.map((packageItem) => {
          return {
            ...packageItem,
            checked: idCheckedMap.get(packageItem.id) || false,
            minQty: 1,
          };
        });

      setOptions(normalizeData);
    } catch (error) {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let grandTotal = 0;

    watchPackages?.forEach((packageItem, index) => {
      const subTotal =
        (packageItem?.price || 0) *
        (packageItem?.quantity || 0) *
        ((100 - (packageItem?.discount || 0)) / 100);

      if (packageItem?.checked === true) {
        grandTotal = grandTotal + subTotal;
        useForm?.setValue(`${fieldProps?.formKey}.${index}.subTotal`, subTotal);
      } else {
        useForm?.setValue(`${fieldProps?.formKey}.${index}.subTotal`, 0);
      }
    });

    useForm?.setValue('grandTotal', grandTotal);
  }, [JSON.stringify(watchPackages)]);

  useEffect(() => {
    if (!!fieldProps?.formKey && !!fieldProps?.api && productId) {
      getOptions();
    } else {
      setOptions([]);
      setLoading(false);
    }

    return () => {
      setOptions([]);
      setLoading(false);
    };
  }, [props?.api, productId]);

  useEffect(() => {
    useForm?.setValue(fieldProps?.formKey, options);

    return () => {
      useForm?.setValue(fieldProps?.formKey, []);
    };
  }, [options]);

  const onChange = (index) => () => {
    if (watchPackages[index]?.checked) {
      useForm?.clearErrors(`${fieldProps?.formKey}.${index}`);
    } else {
      useForm?.trigger(`${fieldProps?.formKey}.${index}`);
    }
    fieldsPackages?.update(index, {
      ...watchPackages[index],
      checked: !watchPackages[index]?.checked,
    });
  };

  return { loading, fieldsPackages, watchPackages, onChange };
};

export default useAction;
