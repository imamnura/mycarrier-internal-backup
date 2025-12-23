import {
  getAutoForm,
  getOptionsServiceName,
  postPricingAutoForm,
} from '@containers/Document/OfferingLetter/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { normalizeAutoForm } from '../utils';

const useAction = (props) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const [formBuilder, setFormBuilder] = useState({
    type: '',
    form: [],
    serviceIndex: null,
    pricingIndex: null,
  });

  const { type, allData, defaultValues, formInfo } = props;

  const [loadingForm, setLoadingForm] = useState(false);

  const { setFailedAlert } = usePopupAlert();

  const fetchAutoPriceForm = async (service, type, others = {}) => {
    setLoadingForm(true);
    setFormBuilder({
      type: '',
      form: null,
      ...others,
    });

    try {
      const result = await getAutoForm(service);
      setFormBuilder({
        type: type,
        form: normalizeAutoForm(result.data.form),
        ...others,
      });
      setLoadingForm(false);
    } catch (error) {
      setLoadingForm(false);
      setFailedAlert({ message: error.message });
    }
  };

  useEffect(() => {
    // handler defaultvalue when edit dan add location
    if (['add', 'edit'].includes(type)) {
      const { price, detailFields, serviceName } = defaultValues;
      const { serviceIndex, pricingIndex } = formInfo;

      reset(defaultValues);
      if (price === 'manual') {
        setFormBuilder({
          type: 'manual',
          form: detailFields,
          serviceIndex,
          pricingIndex,
        });
      } else {
        fetchAutoPriceForm(serviceName.value, 'auto', {
          serviceIndex,
          pricingIndex,
        });
      }
    } else {
      reset({
        detailFields: [{}],
      });
    }
  }, [defaultValues, type]);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const getPricing = async (_values) => {
    setLoadingSubmit(true);
    const values = { ..._values };
    delete values.detailFields;

    const { slg, serviceName, price, ...payloadData } = values;

    try {
      const result = await postPricingAutoForm({
        productParam: serviceName.value,
        data: payloadData,
      });
      setLoadingSubmit(false);
      props.onSubmit({
        formInfo: {
          serviceIndex: formBuilder.serviceIndex,
          pricingIndex: formBuilder.pricingIndex,
        },
        type,
        values: {
          slg,
          pricing: {
            ...result.data,
            formValues: payloadData,
          },
          ...serviceName.data,
          epicProduct: price === 'auto',
        },
      });
      props.onClose();
    } catch (error) {
      setLoadingSubmit(true);
      setFailedAlert({ message: error.message });
    }
  };

  const onSubmit = handleSubmit((_values) => {
    if (_values?.price === 'manual') {
      const { total, slg, detailFields, serviceName, price } = _values;
      const values = {
        slg,
        pricing: {
          total:
            typeof total === 'string'
              ? parseInt(total.replace(/[^\d]/g, ''))
              : total,
          detailFields,
          formValues: {
            detailFields,
          },
        },
        ...serviceName.data,
        epicProduct: price === 'auto',
      };
      props.onSubmit({
        formInfo: {
          serviceIndex: formBuilder.serviceIndex,
          pricingIndex: formBuilder.pricingIndex,
        },
        type,
        values,
      });
      props.onClose();
    } else {
      getPricing(_values);
    }
  });

  const [optionService, setOptionService] = useState([]);

  const fetchOptionsServiceName = async () => {
    try {
      const result = await getOptionsServiceName();
      const option = result.data.map(
        ({ epicParameter, epicProduct, productId, productName }) => ({
          label: productName,
          value: epicProduct ? epicParameter : productName,
          data: {
            epicProduct,
            productId: productId.toString(),
            productName,
            productParam: epicParameter || 'nonEpic',
          },
        }),
      );
      // .filter(({ data: { epicProduct } }) => epicProduct);
      setOptionService(option);
    } catch (error) {
      setOptionService([]);
    }
  };

  useEffect(() => {
    fetchOptionsServiceName();
  }, []);

  const currentFormData = {
    serviceName: watch('serviceName'),
    price: watch('price'),
  };

  useEffect(() => {
    if (type === 'new') {
      const sameIndex = allData.findIndex(({ productName }) => {
        return productName === currentFormData.serviceName?.label;
      });

      if (sameIndex >= 0) {
        const sameProductData = allData[sameIndex];
        // Non Epic
        if (!sameProductData.epicProduct) {
          setValue('price', 'manual');

          const data = sameProductData.pricing[0].detailFields;

          if (data) {
            setFormBuilder({
              type: 'manual',
              form: data,
              serviceIndex: sameIndex,
            });

            setValue(
              'detailFields',
              data?.map(({ fieldName }) => ({ fieldName, fieldValue: '' })),
            );
          }
          setValue('slg', sameProductData.slg);
          setValue('total', undefined);
        } else {
          setValue('price', 'auto');
          setValue('slg', undefined);
          setValue('detailFields', [{}]);
          fetchAutoPriceForm(currentFormData.serviceName?.value, 'auto');
        }
      } else {
        if (currentFormData?.serviceName?.data?.epicProduct) {
          setValue('price', '');
          fetchAutoPriceForm(currentFormData.serviceName?.value, '');
        } else {
          setFormBuilder({
            type: '',
            form: [],
          });
          setValue('price', 'manual');
          setValue('detailFields', [{}]);
        }
      }
    }
  }, [currentFormData.serviceName]);

  return {
    control,
    currentFormData,
    errors,
    formBuilder,
    loadingForm,
    loadingSubmit,
    onSubmit,
    optionService,
    register,
    setValue,
  };
};

export default useAction;
