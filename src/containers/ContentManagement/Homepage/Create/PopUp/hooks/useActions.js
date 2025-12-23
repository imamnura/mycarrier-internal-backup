import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailPopUp,
  updatePopUp,
} from '@containers/ContentManagement/Homepage/_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { cleanObject } from '@utils/common';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useForm } from 'react-hook-form';
import validation from '../validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { route } from '@configs/index';
import useQueryParams from '@utils/hooks/useQueryParams';
import { addRealDate, dateFormat } from '@utils/parser';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { queryParams } = useQueryParams();
  const { id } = queryParams;

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const routeDetail = (id) => route.popUp('detail', id);

  const routeList = {
    pathname: route.homepageManagement('list'),
    query: { type: 'popup' },
  };

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
    reset,
    setValue,
    clearErrors,
    resetField,
  } = useForm({
    resolver: yupResolver(validation),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      status: false,
    },
  });

  const fetchUpdateStatus = (formData) => async () => {
    closeConfirmation();
    setLoadingAlert();

    const successMessage = {
      true: 'Pop Up Successfully Edited',
      false: 'Pop Up Successfully Added',
    }[!!id];

    const payload = cleanObject({
      name: formData?.name,
      imageUrl: {
        mediaName:
          formData?.imageUrl?.data?.name || formData?.imageUrl?.fileName,
        mediaPath:
          formData?.imageUrl?.data?.path || formData?.imageUrl?.fileUrl,
      },
      buttonLabel: formData?.buttonLabel,
      link: formData?.link,
      period: formData?.period,
      ...(formData?.period === 'by period'
        ? {
            startPeriod: dateFormat({
              date: formData?.startPeriod,
              type: 'iso',
            }),
            endPeriod: dateFormat({
              date: formData?.endPeriod,
              type: 'iso',
            }),
          }
        : {}),
      status: formData?.status ? 'active' : 'inactive',
    });

    try {
      const { data } = await updatePopUp(id, payload);
      setSuccessAlert({
        message: successMessage,
        onClose: onCloseSuccess(data.id),
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
  };

  const fetchDetail = async (id) => {
    const validatePath = [
      route.popUp('edit', id),
      route.popUp('create'),
    ].includes(router.asPath);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailPopUp(id);
        setData(data);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const onCloseSuccess = (id) => () => router.push(routeDetail(id));

  useEffect(() => {
    if (id) {
      if (
        isHaveAccess(feature, 'create_popup_banner') ||
        isHaveAccess(feature, 'update_popup_banner')
      ) {
        fetchDetail(id);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    return () => {
      setData(null);
    };
  }, [id]);

  useEffect(() => {
    reset({
      startPeriod: new Date(),
      endPeriod: addRealDate('days', new Date(), 7),
      ...data,
      ...(data?.imageUrl?.mediaPath
        ? {
            imageUrl: {
              fileUrl: data?.imageUrl?.mediaPath,
              fileName: data?.imageUrl?.mediaName,
            },
          }
        : {}),
      status: data?.status === 'active' ? true : false,
    });

    return () => {
      reset({});
    };
  }, [data]);

  const onClickSubmit = (values) => {
    const confirmationContent = {
      true: {
        message: 'Are you sure want to add & activate this pop up?',
        description: 'Other pop up will automatically no longer be active',
      },
      false: {
        message: 'Are you sure want to add this pop up?',
      },
    }[values?.status];
    setConfirmation({
      ...confirmationContent,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: fetchUpdateStatus(values) },
      ],
    });
  };

  const _onClickCancel = (route) => () => {
    closeConfirmation();
    router.push(route);
  };

  const onClickCancel = (route) => () => {
    const confirmation = {
      message:
        'Do you want to cancel this draft? If yes you must fill the form start over.',
      action: [
        { children: 'NO', variant: 'ghost', onClick: closeConfirmation },
        { children: 'YES', onClick: _onClickCancel(route) },
      ],
    };

    if (isDirty) setConfirmation(confirmation);
    else router.push(route);
  };

  const action = [
    {
      variant: 'ghost',
      children: 'cancel',
      onClick: onClickCancel(id ? routeDetail(id) : routeList),
    },
    {
      children: 'submit',
      disabled: !isValid,
      hideDivider: true,
      ml: 24,
      type: 'submit',
      onClick: handleSubmit(onClickSubmit),
    },
  ];

  const breadcrumb = [
    {
      label: 'Homepage Management',
      onClick: onClickCancel(routeList),
    },
    ...(id
      ? [
          { label: id, onClick: onClickCancel(routeDetail(id)) },
          { label: 'Edit Pop Up' },
        ]
      : [{ label: 'Add Pop Up' }]),
  ];

  return {
    id,
    formProperty: {
      control,
      reset,
      resetField,
      setValue,
      clearErrors,
    },
    action,
    loading,
    breadcrumb,
    data,
  };
};

export default useAction;
