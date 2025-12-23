import {
  updateStatus,
  checkConstraints,
  getListProductChildSCOne,
  getListProductGrandchildSCOne,
  getOptionsListRoot,
} from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useQueryParams from '@utils/hooks/useQueryParams';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { normalizeDynamicAttributes } from '../../../utils';
import { getAttributeProductSCOne } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { array, object, string } from 'yup';
import { IS_METRONODE } from '@constants/env';

const normalizeProductOptions = (products) => {
  return products.map(product => ({
    label: product.productName,
    value: product.productId,
    data: { ...product }
  }));
};

const useActions = (props) => {
  const { modalProductConfig, data, handleSuccess, setModalProductConfig } =
    props;

  const { queryParams } = useQueryParams();
  const { id: orderNumber } = queryParams;
  const { setFailedAlert, onCloseAlert } = usePopupAlert();
  const [activeStep, setActiveStep] = useState(0);


  const [productRootOptions, setProductRootOptions] = useState([]);
  const [productChildOptions, setProductChildOptions] = useState([]);
  const [loadingOptionsProductChild, setLoadingOptionsProductChild] =
    useState(true);
  const [loadingAttributesProduct, setLoadingAttributesProduct] = useState(false);

  const [productGrandchildOptions, setProductGrandchildOptions] = useState([]);

  const [loadingSubmitProductConfig, setLoadingSubmitProductConfig] =
    useState(false);

  const formProductConfig = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      otc: 0,
      mrc: 0,
    },
  });

  const selectedProductRoot = formProductConfig.watch('productName')?.data

  const fetchOptionsProductChild = async (selected) => {
    setLoadingOptionsProductChild(true);

    const params = cleanObject({
      productId: selected.productId,
    });

    try {
      const { data } = await getListProductChildSCOne({
        params: params,
      });
      const resOptions = data.map((data) => ({
        label: data?.productName,
        value: data?.productId,
        data: data,
      }));

      setProductChildOptions(resOptions);
      return data;
    } catch (error) {
      setProductChildOptions([]);
    } finally {
      setLoadingOptionsProductChild(false);
    }
  };


  const fetchOptionsProductGrandchild = async () => {
    const selectedProductChild = formProductConfig.watch('child')[0]?.productId;
    const params = cleanObject({
      productId: selectedProductChild,
      priceId: formProductConfig.watch('priceId'),
    });

    try {
      const { data } = await getListProductGrandchildSCOne({
        params: params,
      });
      setProductGrandchildOptions({
        ...data,
        productId: formProductConfig.watch('productName')?.data?.productId
      });
    } catch (error) {
      setProductGrandchildOptions([]);
    }
  };

  useEffect(() => {
    fetchProductOptionsRoot();
  }, [modalProductConfig?.open])

  useEffect(() => {
    if (modalProductConfig?.mode === 'edit') {
      const selectedData = modalProductConfig?.data;
      const { productName } = selectedData;
      const selectedProduct = productRootOptions.filter((product) => product.label === productName);
      formProductConfig.setValue('productName', selectedProduct[0]);
      const findIndex = data?.rootProducts?.findIndex(
        (product) => product.productId === selectedData.productId,
      );

      if (selectedData?.child) {
       fetchChildOnEditMode(findIndex);
      } else {
        fetchAttributeOnEditMode(findIndex);
      }
    }
  }, [modalProductConfig?.mode, productRootOptions])
  
  const fetchChildOnEditMode = async (index) => {
    await fetchOptionsProductChild(data?.rootProducts[index]);
    formProductConfig.setValue('child', data?.rootProducts[index].child);
  }

  const fetchAttributeOnEditMode = async (findIndex) => {
    await fetchProductAttributes(data?.rootProducts[findIndex]);
    formProductConfig.setValue(`attributes`, data?.rootProducts[findIndex]?.attributes );
  }

  const fetchProductAttributes = async (selected) => {
    setLoadingAttributesProduct(true);
    try {
      const { data } = await getAttributeProductSCOne({
        params: {
          productId: selected?.productId,
          productName: selected?.productName,
        },
      });

      formProductConfig?.resetField('attributes', {
        defaultValue: data,
      });
    } catch (error) {
      setFailedAlert({
        message: error?.message ?? 'Failed to get product attributes',
        onClose: () => onCloseAlert()
      });
    } finally {
      setLoadingAttributesProduct(false);
    }
  }

  useEffect(() => {
    let totalMRC = 0;
    let totalOTC = 0;

    formProductConfig.watch('child')?.forEach((child) => {
      child?.child?.forEach((child2) => {
        if (child2?.paymentType) {
          const price = parseInt(child2?.price) || 0;
          const paymentType = child2.paymentType;

          if (paymentType === 'One-Time') {
            totalOTC = totalOTC + price;
            // totalOTC = totalOTC + price * (child2.qty || 1);
          } else if (paymentType === 'Recurring') {
            totalMRC = totalMRC + price;
            // totalMRC = totalMRC + price * (child2.qty || 1);
          }
        }
      });
    });

    formProductConfig?.setValue('otc', totalOTC);
    formProductConfig?.setValue('mrc', totalMRC);
  }, [JSON.stringify(formProductConfig.watch('child'))]);

  const fetchSubmitProductConfig = async (values) => {
    setLoadingSubmitProductConfig(true);

    // const removePropertiesFromGrandChild = {
    //   ...values,
    //   child: values.child.map((child) => ({
    //     ...child,
    //     child: child.child,
    //   })),
    // };

    const payload = cleanObject({
      productId: data?.productId,
      productFlow: data?.productFlow,
      status: 'am approval',
      label: 'draft',
      pageDraftNumber: 3,
      mode: modalProductConfig?.mode === 'edit' ? 'edit' : '',
      product: [
        {
          otc: values?.otc,
          mrc: values?.mrc,
          productName: values?.productName?.data?.productName,
          productId: values?.productName?.data?.productId,
          qty: 1,
          child: normalizeDynamicAttributes(
            values?.child,
          ),
        },
      ],
    });

    try {
      await updateStatus(orderNumber, payload);
      await handleSuccess()();
      await setModalProductConfig({ open: false });
    } catch (error) {
      setFailedAlert({
        message: error?.message ?? 'Failed to add Product Config',
      });
    } finally {
      setLoadingSubmitProductConfig(false);
    }
  };

  const onSubmitProductAttributes = async (values) => {
    const payload = cleanObject({
      productId: data?.productId,
      productFlow: data?.productFlow,
      status: 'am approval',
      label: 'draft',
      pageDraftNumber: 3,
      mode: modalProductConfig?.mode === 'edit' ? 'edit' : '',
      product: [
        {
          otc: values?.otc || 0,
          mrc: values?.mrc || 0,
          qty: 1,
          paymentType: '',
          attributes: normalizeDynamicAttributes(values?.attributes),
          productId: values?.productName?.data?.productId,
          productName: values?.productName?.data?.productName,
        },
      ],
    });

    try {
      await updateStatus(orderNumber, payload);
      await handleSuccess()();
      await setModalProductConfig({ open: false });
    } catch (error) {
      setFailedAlert({
        message: error?.message ?? 'Failed to add Product Config',
      });
    } finally {
      setLoadingSubmitProductConfig(false);
    }
  }

  const onSubmit = (values) => fetchSubmitProductConfig(values);

  const updateGrandChildFields = (data, dataGrandChild) => {
    data.child.forEach((child) => {
      child.child.forEach((grandChild) => {
        const matchingProduct = dataGrandChild.find(
          (item) => item.productId === grandChild.productId,
        );
        if (matchingProduct) {
          // Check and add missing fields
          if (!grandChild.productCode) {
            grandChild.productCode = matchingProduct.productCode;
          }
          if (!grandChild.relationId) {
            grandChild.relationId = matchingProduct.relationId;
          }
          if (!grandChild.classId) {
            grandChild.classId = matchingProduct.classId;
          }
        }
      });
    });
  };

  const fetchCheckConstraints = async (isAttributeAttached) => {
    
    if (selectedProductRoot?.productId === IS_METRONODE) {
      setActiveStep(activeStep + 1);
      return;
    }

    const copiedChild = JSON.parse(
      JSON.stringify(formProductConfig.watch('child')),
    );

    const payload = {
      productId: selectedProductRoot?.productId,
      productName: selectedProductRoot?.productName,
      productCode: selectedProductRoot?.productCode,
      priceId: selectedProductRoot?.priceId,
    };

    if (isAttributeAttached) {
      payload.attributes = formProductConfig.watch('attributes') || [];
    } else {
      payload.child = [...copiedChild];
    }

    //remap payload fields
    payload.child.forEach((child) => {
      //Find the corresponding option in productChildOptions
      const option = productChildOptions.find(
        (option) => option.value === child.productId,
      );

      // add fields in child object
      if (option) {
        const { productCode, relationId, classId } = option.data;
        child.productCode = productCode;
        child.relationId = relationId;
        child.classId = classId;
      }

      // Reduce attributes in the child object
      child.attributes = child.attributes.map((attr) => ({
        attributeName: attr.attributeName,
        attributeValue: attr.attributeValue || attr.defaultValue || '',
      }));

      // Reduce attributes in grand child objects
      child.child.forEach((grandChild) => {
        grandChild.attributes = grandChild.attributes.map((attr) => ({
          attributeName: attr.attributeName,
          attributeValue: attr.attributeValue || attr.defaultValue || '',
        }));
      });

      //remap grand child fields
      for (let i = 0; i < child.child.length; i++) {
        delete child.child[i].qty;
        delete child.child[i].price;
        delete child.child[i].paymentType;
      }
    });

    updateGrandChildFields(payload, productGrandchildOptions);

    try {
      const { success } = await checkConstraints(payload);
      success && setActiveStep(activeStep + 1);
      onCloseAlert();
    } catch (error) {
      setFailedAlert({
        message: error?.message ?? 'Failed to add Product Config',
        onClose: () => onCloseAlert(),
      });
    }
  };



  const fetchProductOptionsRoot = async () => {
    try {
      const { data: resData } = await getOptionsListRoot({
        productId: data.productId,
      });

      const normalizeData = normalizeProductOptions(resData);

      // Default to using the full normalized list
      let optionsToSet = normalizeData;

      // Only filter if NOT in edit mode AND data.rootProducts is a valid array
      if (modalProductConfig.mode !== 'edit' && Array.isArray(data?.rootProducts)) {
        optionsToSet = normalizeData.filter((product) => {
          // Keep the product if it's NOT found in data.rootProducts
          return !data.rootProducts.some(
            (productRoot) => productRoot.productId === product.value,
          );
        });
      }
      setProductRootOptions(optionsToSet);
    } catch (error) {
      setProductRootOptions([]);
    }
  }

  const fieldsAttributes = useFieldArray({
    control: formProductConfig?.control,
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

  return {
    formProductConfig,
    options: {
      productChild: productChildOptions?.filter(
        (option) =>
          !formProductConfig
            ?.watch('child')
            ?.some((product) => option.value === product.productId),
      ),
    },
    loading: {
      productChild: loadingOptionsProductChild,
      submitProductConfig: loadingSubmitProductConfig,
      attributesProduct: loadingAttributesProduct,
    },
    activeStep,
    setActiveStep,
    onSubmit,
    onSubmitProductAttributes,
    fetchCheckConstraints,
    productRootOptions,
    setProductRootOptions,
    selectedProductRoot,
    fieldsAttributes,
    fetchProductAttributes,
    fetchOptionsProductChild,
    fetchOptionsProductGrandchild,
  };
};

export default useActions;
