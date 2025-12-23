import { getAttributeProductSCOne } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const useActions = (props) => {
  const {
    modalProductChildConfig,
    setModalProductChildConfig,
    fieldsProductChild,
    options,
    loading,
  } = props;

  const { setFailedAlert } = usePopupAlert();

  const [loadingSubmitProductChild, setLoadingSubmitProductChild] =
    useState(false);

  const formProductChildConfig = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onClose = () => () => setModalProductChildConfig(null);

  const fetchAttributeProductChild = async (values) => {
    setLoadingSubmitProductChild(true);

    const params = cleanObject({
      productId: values?.child?.data?.productId,
      productName: values?.child?.data?.productName,
    });

    try {
      const { data } = await getAttributeProductSCOne({
        params: params,
      });

      const normalizeForm = cleanObject({
        productId: values?.child?.data?.productId,
        productName: values?.child?.data?.productName,
        priceId: values?.child?.data?.priceId,
        classId: values?.child?.data?.classId,
        relationId: values?.child?.data?.relationId,
        attributes: data,
      });

      if (modalProductChildConfig?.index > -1)
        fieldsProductChild?.update(
          modalProductChildConfig?.index,
          normalizeForm,
        );
      else fieldsProductChild?.append(normalizeForm);
      setModalProductChildConfig({ ...modalProductChildConfig, open: false });
    } catch (e) {
      setFailedAlert({
        message: e?.message ?? 'Failed to add Child Product',
      });
    } finally {
      setLoadingSubmitProductChild(false);
    }
  };

  const onSubmit = (values) => {
    fetchAttributeProductChild(values);
  };

  useEffect(() => {
    return () => {
      formProductChildConfig?.reset({});
    };
  }, [modalProductChildConfig?.open]);

  return {
    onClose,
    formProductChildConfig,
    loading: {
      submit: loadingSubmitProductChild,
      ...loading,
    },
    options: {
      ...options,
    },
    onSubmit,
  };
};

export default useActions;
