import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { fetchBanner } from '@containers/ContentManagement/BillsAndPaymentBanner/_repositories/repositories';
import { route } from '@configs';
import { cleanObject, isHaveAccess } from '@utils/common';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = ({ feature }) => {
  const router = useRouter();
  const id = router.query.id;
  const isEdit = !!id;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(validation),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValue: {
      title: '',
      bannerDesc: '',
      imageBanner: {},
    },
  });

  const fetchSubmitBanner = (val) => async () => {
    setConfirmation();
    setLoadingAlert();

    const params = {
      title: val?.title,
      bannerDesc: val?.bannerDesc,
      imageBanner: {
        fileId: val?.imageBanner?.fileId || val?.imageBanner?.data.fileId,
        fileName: val?.imageBanner?.fileName || val?.imageBanner?.data.fileName,
        filePath: val?.imageBanner?.filePath || val?.imageBanner?.data.filePath,
        fileUrl: val?.imageBanner?.fileUrl || val?.imageBanner?.data.fileUrl,
        fileNameOrigin:
          val?.imageBanner?.fileNameOrigin ||
          val?.imageBanner?.data.fileNameOrigin,
        fileSize: val?.imageBanner?.fileSize || val?.imageBanner?.data.fileSize,
        fileExt: val?.imageBanner?.fileExt || val?.imageBanner?.data.fileExt,
      },
      bannerId: val?.bannerId,
    };

    const payload = cleanObject(params);

    try {
      const { success } = await fetchBanner(
        isEdit ? 'Edit' : 'Add',
        payload,
        isEdit ? id : null,
      );

      success &&
        setSuccessAlert({
          message: `Banner was successfully ${isEdit ? 'edited' : 'added'}`,
          onClose: () => router.push(route.billsAndPaymentBanner('list')),
        });
    } catch (error) {
      setFailedAlert({
        message:
          typeof error?.message === 'string'
            ? error.message
            : `Failed to ${isEdit ? 'Edit' : 'Add'} Banner`,
      });
    }
  };

  const onAddBanner = (val) => {
    if (
      isEdit
        ? isHaveAccess(feature, 'update_bills_&_payment_banner')
        : isHaveAccess(feature, 'create_bills_&_payment_banner')
    ) {
      setConfirmation({
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchSubmitBanner(val) },
        ],
        message: `Are you sure want to ${isEdit ? 'edit' : 'add'} this banner?`,
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to ${
          isEdit ? `edit` : `add`
        } this banner.`,
      });
    }
  };

  const fetchDetail = async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchBanner('Detail', null, id);
      setDetail(data);
    } catch (error) {
      setDetail({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }

    return () => {
      setDetail({});
    };
  }, [id]);

  useEffect(() => {
    reset({ ...detail });

    return () => {
      reset({});
    };
  }, [detail]);

  const handleCancel = () => router.push(route.billsAndPaymentBanner('list'));

  const { isValid, isDirty } = formState;

  const validateForm = id ? !isValid : !isValid || !isDirty;

  return {
    id,
    control,
    handleSubmit,
    onAddBanner,
    isLoading,
    handleCancel,
    validateForm,
    detail,
  };
};

export default useActions;
