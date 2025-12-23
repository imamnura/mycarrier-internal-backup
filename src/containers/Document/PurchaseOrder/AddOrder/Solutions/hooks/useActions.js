import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDetail, updateStatus } from '../../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { cleanObject } from '@utils/common';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useForm, useWatch } from 'react-hook-form';
import { validation } from '../validation';
import { route } from '@configs/index';
import useQueryParams from '@utils/hooks/useQueryParams';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { queryParams } = useQueryParams();
  const { id: orderNumber, isSubmitted } = queryParams;

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [optionsBakesNumber, setOptionsBakesNumber] = useState([]);
  const [loadingOptionBakes, setLoadingOptionBakes] = useState(true);
  const [loadingListProducts, setLoadingListProducts] = useState(true);
  const [listProducts, setListProducts] = useState([]);

  const routeDetail = {
    pathname: route.purchaseOrder('detail', orderNumber),
  };

  const validateData = {
    step: step - 1,
    bakesNumber: optionsBakesNumber.map((i) => i?.bakesNumber),
    isHaveBakes: data?.isHaveBakes,
  };

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
    reset,
    setValue,
    clearErrors,
    resetField,
    trigger,
    getValues,
    watch,
  } = useForm({
    resolver: validation(validateData),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      packages: [
        { id: '', subTotal: 0, quantity: 1, discount: 0, paymentType: '' },
      ],
    },
  });

  const formValues = useWatch({
    control,
  });

  const fetchUpdateStatus = async (formData, content) => {
    const { success, status, label = '', pageDraftNumber = 0 } = content;

    const step1 = {
      ...(!data?.isHaveBakes
        ? {
            ...(Number(formData?.radioBakes) === 2 && formData?.media
              ? {
                  bakesNumber: formData?.bakesNumber,
                  bakesFile: (formData?.media?.data || formData?.media) && [
                    formData?.media?.data || formData?.media,
                  ],
                  radioBakes: formData?.radioBakes,
                }
              : {
                  bakesNumber: formData?.bakesNumberAuto,
                  bakesFile: optionsBakesNumber?.find(
                    (bakes) => bakes?.bakesNumber === formData?.bakesNumberAuto,
                  )?.bakesFile && [
                    optionsBakesNumber?.find(
                      (bakes) =>
                        bakes?.bakesNumber === formData?.bakesNumberAuto,
                    )?.bakesFile,
                  ],
                  radioBakes: formData?.radioBakes,
                }),
          }
        : {}),
      bakesStartDate: formData?.bakesStartDate,
      bakesEndDate: formData?.bakesEndDate,
      bakesDuration: formData?.bakesDuration,
      noteProgress: formData?.noteProgress,
    };

    const step2 = {
      grandTotal: formData?.grandTotal,
      packages: formData?.packages.map((item) => {
        const _package = item;
        _package.itemId = _package.id;
        if (_package.attributes?.length) {
          const subItemSplit = item.subItem.split(',');

          _package.packageName = `${_package.packageName} ${subItemSplit[1]}`;
          _package.subItem = subItemSplit[1];
          _package.subItemId = subItemSplit[0];
        }

        delete _package.currentAttributes;
        delete _package.attributes;

        return {
          ..._package,
        };
      }),
    };

    const payload = cleanObject({
      ...step1,
      ...step2,
      label,
      status,
      pageDraftNumber,
      productId: data?.productId,
      productFlow: data?.productFlow,
    });

    // if (payload?.productId === '23aed06b-848a-418d-b3da-55ce022878c6') {
    //   console.log('Special product detected:', payload);
    // }

    try {
      setLoadingAlert();
      // console.log('payload', payload);
      await updateStatus(orderNumber, payload);
      setSuccessAlert({
        message: success,
        onClose: onCloseSuccess,
      });
    } catch (e) {
      setFailedAlert({
        message: 'Failed to Update Data',
      });
    }
  };

  const fetchDetail = async (id) => {
    const validatePath =
      router.asPath.split('?')[0] ===
      route.purchaseOrder('orderItem', orderNumber, 'solutions');

    if (validatePath) {
      try {
        const { data: res } = await getDetail(id);
        const normalizeData = {
          ...res,
          ...res.orderInformation,
          ...res.documentAttachment,
          ...res.orderItem,
        };
        setData(normalizeData);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const onCloseSuccess = () => router.push(routeDetail);

  useEffect(() => {
    trigger('bakesNumberAuto');
  }, [optionsBakesNumber]);

  useEffect(() => {
    if (orderNumber) {
      if (isHaveAccess(feature, 'read_detail')) {
        fetchDetail(orderNumber);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
    return () => {
      setOptionsBakesNumber([]);
      setLoadingOptionBakes(false);
      setListProducts([]);
      setLoadingListProducts(false);
    };
  }, [orderNumber]);

  useEffect(() => {
    if (data) {
      if (data?.drafted?.pageDraftNumber > 0) {
        setStep(data?.drafted?.pageDraftNumber);
        reset({
          ...(data?.isHaveBakes
            ? {
                bakesNumber: data?.bakesNumber,
                media: data?.bakesFile[0],
              }
            : {
                ...(Number(data?.drafted?.radioBakes) === 2
                  ? {
                      bakesNumber: data?.drafted?.bakesNumber,
                      media:
                        data?.drafted?.bakesFile && data?.drafted?.bakesFile[0],
                      radioBakes: data?.drafted?.radioBakes + '',
                    }
                  : {
                      bakesNumberAuto: data?.drafted?.bakesNumber || '',
                      radioBakes: data?.drafted?.radioBakes + '',
                    }),
              }),
          bakesStartDate: data?.drafted?.bakesStartDate,
          bakesEndDate: data?.drafted?.bakesEndDate,
          bakesDuration: data?.drafted?.bakesDuration,
          noteProgress: data?.drafted?.noteProgress,
          grandTotal: data?.drafted?.grandTotal || 0,
          ...(data?.drafted?.packages?.length > 0
            ? {
                packages: data?.drafted?.packages,
              }
            : {
                packages: [
                  {
                    id: '',
                    subTotal: 0,
                    quantity: 1,
                    discount: 0,
                    paymentType: '',
                  },
                ],
              }),
        });
      } else {
        setStep(1);
        reset({
          ...(data?.isHaveBakes
            ? {
                bakesNumber: data?.bakesNumber,
                media: data?.bakesFile[0],
              }
            : {
                ...(Number(data?.radioBakes) === 2
                  ? {
                      bakesNumber: data?.bakesNumber,
                      media: data?.bakesFile && data?.bakesFile[0],
                      radioBakes: data?.radioBakes + '',
                    }
                  : {
                      bakesNumberAuto: data?.bakesNumber || '',
                      radioBakes: data?.radioBakes + '',
                    }),
              }),
          bakesStartDate: data?.bakesStartDate,
          bakesEndDate: data?.bakesEndDate,
          bakesDuration: data?.bakesDuration,
          noteProgress: data?.noteProgress,
          grandTotal: data?.grandTotal || 0,
          ...(data?.list?.length > 0
            ? {
                packages: data?.list,
              }
            : {
                packages: [
                  {
                    id: '',
                    subTotal: 0,
                    quantity: 1,
                    discount: 0,
                    paymentType: '',
                  },
                ],
              }),
        });
      }
    }
  }, [data]);

  const onSubmit = (v, content) => () => {
    fetchUpdateStatus(v, content);
    closeConfirmation();
  };

  const onClickSubmit = (values) => {
    const content = {
      success: 'Order item successfully submitted',
      status: 'am approval',
      label: 'completed',
      pageDraftNumber: 0,
    };

    const confirmation = {
      message: 'Are you sure want to submit order item?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: onSubmit(values, content) },
      ],
    };
    setConfirmation(confirmation);
  };

  const onClickDraft = () => {
    const content = {
      success: 'Order item successfully saved as draft',
      status: 'am approval',
      label: 'draft',
      pageDraftNumber: step,
    };

    fetchUpdateStatus(formValues, content);
  };

  const onClickPrevious = () => () => setStep(step - 1);
  const onClickNext = () => () => setStep(step + 1);

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

  const action = () => {
    let actions = [];

    actions.push(
      {
        variant: 'ghost',
        children: 'save as draft',
        disabled: !isDirty,
        onClick: onClickDraft,
      },
      {
        variant: 'ghost',
        children: 'cancel',
        onClick: onClickCancel(routeDetail),
      },
    );

    switch (step) {
      case 1: {
        actions.push({
          disabled: !isValid,
          children: 'next step',
          hideDivider: true,
          ml: 24,
          onClick: onClickNext(),
        });
        break;
      }
      case 2: {
        actions.push(
          {
            children: 'previous step',
            hideDivider: true,
            ml: 24,
            onClick: onClickPrevious(),
          },
          {
            children: 'submit',
            disabled: !isValid,
            hideDivider: true,
            ml: 24,
            type: 'submit',
            onClick: handleSubmit(onClickSubmit),
          },
        );
        break;
      }
    }

    return actions;
  };

  const breadcrumb = [
    {
      label: 'Purchase Order',
      onClick: onClickCancel(route.purchaseOrder('list')),
    },
    { label: orderNumber, onClick: onClickCancel(routeDetail) },
    { label: isSubmitted === 'true' ? 'Edit Order' : 'Add Order' },
  ];

  return {
    formProperty: {
      control,
      reset,
      resetField,
      setValue,
      clearErrors,
      getValues,
      watch,
    },
    handleSubmit,
    action,
    fetchDetail,
    orderNumber,
    data,
    loading,
    fetchUpdateStatus,
    breadcrumb,
    step,
    bakesProperty: {
      optionsBakesNumber,
      setOptionsBakesNumber,
      loadingOptionBakes,
      setLoadingOptionBakes,
    },
    orderItemProperty: {
      listProducts,
      setListProducts,
      loadingListProducts,
      setLoadingListProducts,
      loadingData: loading,
    },
  };
};

export default useAction;
