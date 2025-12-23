import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailProduct,
  getDropdownOption,
  getOptionCategory,
  updateProduct,
} from '@containers/ContentManagement/POConfig/_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { route } from '@configs';
import {
  mergeForms,
  normalizeAdditionalData,
  normalizeFormAdditionalData,
} from '../utils';
import { toLowerCase } from '@utils/text';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: productId } = router.query;

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const formPOConfig = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      isCustom: false,
      isPublish: false,
    },
  });

  const productFlow = formPOConfig?.watch('productFlow');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [productFlowOptions, setProductFlowOptions] = useState([]);
  const [loadingProductFlow, setLoadingProductFlow] = useState(true);

  const [productCategoryOptions, setProductCategoryOptions] = useState([]);
  const [loadingProductCategory, setLoadingProductCategory] = useState(true);

  const [rootProducts, setRootProducts] = useState([]);
  const [isNcxProductIntegration, setIsNcxProductIntegration] = useState(false);

  const fetchOptionsProductFlow = async () => {
    setLoadingProductFlow(true);
    try {
      const { data } = await getDropdownOption({
        params: { type: 'product-flow' },
      });
      const resOptions = data.map((data) => ({
        label: data?.name,
        value: data?.name,
        data: data,
      }));
      setProductFlowOptions(resOptions);
      setLoadingProductFlow(false);
    } catch (error) {
      setProductFlowOptions([]);
      setLoadingProductFlow(false);
    }
  };

  const fetchOptionsProductCategory = async () => {
    setLoadingProductCategory(true);
    try {
      const { data } = await getOptionCategory();
      const resOptions = data.map((data) => ({
        label: data?.categoryName,
        value: data?.categoryId,
        data: data,
      }));
      setProductCategoryOptions(resOptions);
      setLoadingProductCategory(false);
    } catch (error) {
      setProductCategoryOptions([]);
      setLoadingProductCategory(false);
    }
  };

  useEffect(() => {
    fetchOptionsProductFlow();
    fetchOptionsProductCategory();

    return () => {
      setProductFlowOptions([]);
      setLoadingProductFlow(false);
      setProductCategoryOptions([]);
      setLoadingProductCategory(false);
    };
  }, []);

  const fetchDetailProduct = async () => {
    setLoading(true);
    try {
      const { data } = await getDetailProduct(productId);
      setData(data);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const onCloseSuccess = () => () => router.push(route.poConfig('list'));

  const fetchUpdateProduct = async (formData) => {
    let additionalData = {};

    const mergedForms = mergeForms(formData?.productFlow?.data?.baseForm, {
      formtype: [
        'Text Field',
        'Text Area',
        'Dropdown',
        'Upload File',
        'PIC Partner',
      ],
    });

    mergedForms.forEach((fieldProps) => {
      return (additionalData = {
        ...additionalData,
        ...normalizeAdditionalData(formData, fieldProps),
      });
    });

    const remappingRootProducts = rootProducts.map((item) => {
      // eslint-disable-next-line no-unused-vars
      const { id, ...rest } = item;
      return rest;
    });

    const payload = {
      productName: formData?.productName,
      categoryName: formData?.categoryProduct?.data?.categoryName,
      categoryId: formData?.categoryProduct?.data?.categoryId,
      productFlow: formData?.productFlow?.value,
      isCustom: formData?.isCustom,
      isPublish: formData?.isPublish,
      form: formData?.form,
      ...additionalData,
      ...(isNcxProductIntegration && { rootProducts: remappingRootProducts }),
    };

    try {
      setLoadingAlert();
      await updateProduct(productId, cleanObject(payload));
      setSuccessAlert({
        message: 'Product has been submitted successfully',
        onClose: onCloseSuccess(),
      });
    } catch (e) {
      setFailedAlert({
        message: 'Failed to Config Product',
      });
    }
  };

  useEffect(() => {
    if (!isHaveAccess(feature, 'read_detail_service_list')) {
      if (
        productId &&
        productCategoryOptions.length > 0 &&
        productFlowOptions.length > 0
      )
        fetchDetailProduct();
      if (!productId) {
        setLoading(false);
      }
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
      setData(null);
    }
  }, [productId, productCategoryOptions, productFlowOptions]);

  const resetDefaultForm = () => {
    let additionalData = {};

    const selectedProductFlow = {
      ...productFlowOptions.find(
        (option) => option?.value === data?.productFlow,
      ),
      initial: true,
    };

    const mergedForms = mergeForms(selectedProductFlow?.data?.baseForm, {
      formtype: [
        'Text Field',
        'Text Area',
        'Dropdown',
        'Upload File',
        'PIC Partner',
      ],
    });

    mergedForms.forEach((fieldProps) => {
      return (additionalData = {
        ...additionalData,
        ...normalizeFormAdditionalData(data, fieldProps),
      });
    });

    return formPOConfig?.reset({
      ...data,
      categoryProduct: {
        value: data?.categoryId,
        label: data?.categoryName,
      },
      productFlow: selectedProductFlow,
      ...additionalData,
    });
  };

  useEffect(() => {
    if (productId) resetDefaultForm();
    return () => {
      formPOConfig?.reset({
        isCustom: false,
        isPublish: false,
      });
    };
  }, [data]);

  useEffect(() => {
    //validate clear error excep product ncx integration, cause form move to modal root product
    if (productFlow) {
      if (toLowerCase(productFlow.value) !== 'ncx product integration') {
        formPOConfig?.clearErrors('productIdExternal');
        formPOConfig?.clearErrors('productNameExternal');
        formPOConfig?.resetField('productIdExternal');
        formPOConfig?.resetField('productNameExternal');
        if (!productFlow.initial) {
          formPOConfig?.resetField('form', { defaultValue: {} });
        }
        setIsNcxProductIntegration(false);
      } else {
        setIsNcxProductIntegration(true);
      }
    }
  }, [productFlow]);

  const onSubmit = (v) => () => {
    fetchUpdateProduct(v);
    closeConfirmation();
  };

  const onClickSubmit = (values) => {
    const confirmation = {
      message: 'Are you sure want to submit this product?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: onSubmit(values) },
      ],
    };
    setConfirmation(confirmation);
  };

  const breadcrumb = [
    { label: 'PO Config', url: route.poConfig('list') },
    { label: productId || 'Add Product' },
  ];

  const handleRootProductChange = (v) => setRootProducts(v);

  const isBtnSubmitDisable = isNcxProductIntegration
    ? !formPOConfig.formState.isValid ||
      !formPOConfig.formState.isDirty ||
      !rootProducts.length > 0
    : !formPOConfig?.formState?.isValid || !formPOConfig?.formState?.isDirty;

  useEffect(() => {
    if (rootProducts.length > 0) {
      formPOConfig.resetField('form', {
        defaultValue: {
          ...formPOConfig.getValues('form'),
        },
      });
    }
  }, [rootProducts]);

  return {
    options: {
      productFlow: productFlowOptions,
      productCategory: productCategoryOptions,
    },
    loading: {
      data: loading,
      productFlow: loadingProductFlow,
      productCategory: loadingProductCategory,
    },
    fetchDetailProduct,
    productId,
    data,
    breadcrumb,
    onClickSubmit,
    onCloseSuccess,
    formPOConfig,
    handleRootProductChange,
    rootProducts,
    isBtnSubmitDisable,
  };
};

export default useAction;
