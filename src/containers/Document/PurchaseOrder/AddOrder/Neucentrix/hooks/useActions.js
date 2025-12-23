import { useRouter } from 'next/router';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDetail, updateStatus, checkConstraints } from '../../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { cleanObject } from '@utils/common';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useForm, useWatch } from 'react-hook-form';
import validation from '../validation';
import { route } from '@configs/index';
import { normalizeData } from '../utils';
import useQueryParams from '@utils/hooks/useQueryParams';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { queryParams } = useQueryParams();
  const { id: orderNumber, isSubmitted, isEditOrderItem } = queryParams;

  const { setFailedAlert, setLoadingAlert, onCloseAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [step, setStep] = useState(0);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [optionsServiceAccount, setOptionsServiceAccount] = useState([]);
  const [optionsBillingAccount, setOptionsBillingAccount] = useState([]);
  const [optionsBakesNumber, setOptionsBakesNumber] = useState([]);

  const [loadingBillingAccount, setLoadingBillingAccount] = useState(true);
  const [loadingServiceAccount, setLoadingServiceAccount] = useState(true);

  const validationProps = {
    step: step - 1,
    billing: optionsBillingAccount,
    service: optionsServiceAccount,
    bakes: optionsBakesNumber,
    isHaveBakes: data?.isHaveBakes,
    isExistingBakes: data?.isExistingBakes,
  };

  const {
    control,
    formState: { isValid, dirtyFields, errors },
    reset,
    setValue,
    clearErrors,
    resetField,
  } = useForm({
    resolver: validation(validationProps),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      phone: '+62',
      loading: {
        billingAccount: true,
        serviceAccount: true,
      },
    },
  });

  const isDirty = !_.isEmpty(dirtyFields);
  const loadingStep1 = loadingBillingAccount || loadingServiceAccount;
  const routeList = route.purchaseOrder('list');
  const routeDetail = {
    pathname: route.purchaseOrder('detail', orderNumber),
  };

  const onCloseSuccess = () => router.push(routeDetail);

  const formValues = useWatch({
    control,
  });

  const onChangeStep = (status) => {
    if (status === 'prev') {
      setStep(step - 1);
    } else if (status === 'next') {
      setStep(step + 1);
    } else router.push(routeDetail);
  };

  const fetchUpdateStatus = async (formValues, status) => {
    const isDraft = ['next', 'prev', 'draft'].includes(status);
    let pickLabel = 'draft';

    if (status === 'submit') {
      // if (data?.status === 'returned') {
      //   pickLabel = '';
      // } else {
      pickLabel = 'completed';
      // }
    }

    const payload = cleanObject({
      ...formValues,
      status: 'am approval',
      label: pickLabel,
      productId: data?.productId,
      productFlow: data?.productFlow,
    });

    setLoadingUpdate(true);
    try {
      !isDraft && setLoadingAlert();
      await updateStatus(orderNumber, payload);
      if (isDraft) {
        enqueueSnackbar('Document saved as draft.');
        onChangeStep(status);
      } else {
        setSuccessAlert({
          message: 'Order successfully submitted',
          onClose: onCloseSuccess,
        });
      }
      setIsSubmitSuccessful(true);
    } catch (e) {
      if (isDraft) {
        enqueueSnackbar('Failed to save as draft.', { variant: 'error' });
      } else setFailedAlert({ message: 'Failed to Update Data' });
      setIsSubmitSuccessful(false);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const fetchDetail = async (id) => {
    const validatePath =
      router.asPath.split('?')[0] ===
      route.purchaseOrder('orderItem', orderNumber, 'neucentrix');

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetail(id);
        const rootedData = {
          ...data?.orderInformation,
          ...data?.customerInformation,
          ...data?.documentAttachment,
          ...data,
        };
        if (data?.drafted) {
          setData({
            ...data?.drafted,
            custAccntName: data?.custAccntName,
            custAccntNum: data?.custAccntNum,
            isHaveBakes: data?.isHaveBakes,
            isExistingBakes: data?.isExistingBakes,
            purchaseOrderDocument: rootedData?.purchaseOrderDocument,
            bakesFile: data?.drafted?.bakesFile || rootedData?.bakesFile,
            status: data?.status,
            priceId: data?.priceId,
            productId: data?.productId,
            productName: data?.orderInformation?.product,
            productIdNCX: data?.productIdNCX,
            productNameNCX: data?.productNameNCX,
            productCodeNCX: data?.productCodeNCX,
          });
        } else
          setData({
            ...rootedData,
            name: rootedData?.fullName,
            phone: rootedData?.mobilePhone,
            accountManager: rootedData?.accountManager?.list,
            purchaseOrderNumber: rootedData?.poNumber,
            purchaseOrderSignerName: rootedData?.poSignerName,
            purchaseOrderDate: rootedData?.poDate,
            agreementMasterNumber: rootedData?.masterAgreementNumber,
            priceId: rootedData?.priceId,
            productId: data?.productId,
            productName: data?.orderInformation?.product,
            productIdNCX: data?.productIdNCX,
            productNameNCX: data?.productNameNCX,
            productCodeNCX: data?.productCodeNCX,
          });
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const _onClickSubmit = (payload, type) => () => {
    fetchUpdateStatus(payload, type);
    closeConfirmation();
  };

  const onClickUpdate = (type) => () => {
    /* eslint-disable no-unused-vars */
    const {
      agreementMasterNumber,
      custAccntName,
      bakesFile,
      bakesNumberAuto,
      bakesNumber,
      agreementDocument,
      accountManager,
      loading,
      otc,
      mrc,
      location,
      productName,
      orderItem, //orderitem attribute
      ...cleanedFormValues
    } = formValues;

    const modifiedAccountManager = accountManager?.map((obj) => {
      const { ['am_id']: deletedKey, ...rest } = obj;
      return rest;
    });
    /* eslint-enable no-unused-vars */

    const modifiedBakesFile = (bakesFile) => {
      //check value of bakes that might be changed
      if (!data?.isHaveBakes || step === 4) {
        if (formValues?.radioBakes === '1' || data?.isExistingBakes) {
          return [
            optionsBakesNumber?.find(
              (bakes) => bakes?.bakesNumber === bakesNumberAuto,
            )?.bakesFile,
          ];
        } else {
          if (!bakesFile) return null;
          else if (bakesFile?.data) return [bakesFile.data];
          return [bakesFile];
        }
      } else return data?.bakesFile || [];
    };

    const payload = {
      pageDraftNumber: step,
      bakesFile: modifiedBakesFile(bakesFile),
      bakesNumber: bakesNumberAuto ? bakesNumberAuto : bakesNumber,
      ...(!!agreementDocument && {
        agreementDocument: agreementDocument.data
          ? [agreementDocument.data]
          : [agreementDocument],
      }),
      accountManager: accountManager?.length ? modifiedAccountManager : [],
      agreementMasterNumber: agreementMasterNumber?.data,
      ...cleanedFormValues,
    };

    if (type === 'submit') {
      setConfirmation({
        message: `Are you sure want to submit this order?`,
        action: [
          { children: 'NO', variant: 'ghost', onClick: closeConfirmation },
          { children: 'YES', onClick: _onClickSubmit(payload, type) },
        ],
      });
    } else {
      if (isDirty) fetchUpdateStatus(payload, type);
      else onChangeStep(type);
    }
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

  const action = () => {
    let actions = [];
    
    actions.push(
      {
        variant: 'ghost',
        children: 'save as draft',
        disabled:
           !_.isEmpty(errors) || (step === 1 && loadingStep1),
        onClick: onClickUpdate('draft'),
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
          children: 'next step',
          disabled: !isValid || loadingStep1,
          onClick: onClickUpdate('next'),
          hideDivider: true,
          ml: 24,
        });
        break;
      }
      case 2:
      case 3: {
        actions.push(
          {
            children: 'previous step',
            disabled: !_.isEmpty(errors),
            onClick: onClickUpdate('prev'),
            hideDivider: true,
            ml: 24,
          },
          {
            children: loadingUpdate ? "loading" : 'next step' ,
            disabled: step === 2 ? !isValid : !data?.orderItem?.list?.length,
            hideDivider: true,
            ml: 24,
            onClick: async () => {
             
              const payload = {
                orderNumber,
              }
              if (step === 3) {
                setLoadingUpdate(true)
                try {
                  await checkConstraints(payload);
                } catch (error) {
                  setFailedAlert({
                    message: error?.message ?? 'Failed to check constraints.',
                    onClose: () => onCloseAlert(),
                  });
                  return;
                } finally {
                  setLoadingUpdate(false);
                }
              }
              onClickUpdate('next')();
            },
          },
        );
        break;
      }
      case 4: {
        actions.push(
          {
            children: 'previous step',
            disabled: !_.isEmpty(errors),
            onClick: onClickUpdate('prev'),
            hideDivider: true,
            ml: 24,
          },
          {
            children: 'submit',
            disabled: !isValid,
            onClick: onClickUpdate('submit'),
            hideDivider: true,
            ml: 24,
          },
        );
      }
    }

    return actions;
  };

  const breadcrumb = [
    { label: 'Purchase Order', onClick: onClickCancel(routeList) },
    { label: orderNumber, onClick: onClickCancel(routeDetail) },
    {
      label:
        isSubmitted === 'true'
          ? `Edit Order ${isEditOrderItem ? `Item` : ``}`
          : 'Add Order',
    },
  ];

  useEffect(() => {
    if (orderNumber) {
      if (isHaveAccess(feature, 'read_detail')) {
        fetchDetail(orderNumber);
      } else {
        setFailedAlert({
          message: `You don't have permission to view this page.`,
        });
      }
    }
  }, [orderNumber]);

  useEffect(() => {
    if (!loading) {
      if (data?.label === 'completed') {
        setStep(1);
      } else setStep(data?.pageDraftNumber || 1);
      if (data) {
        reset({
          ...normalizeData(data),
          loading: {
            serviceAccount: loadingServiceAccount,
            billingAccount: loadingBillingAccount,
          },
        });
      }
    }
  }, [loading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({}, { keepValues: true });
      setIsSubmitSuccessful(false);
    }
    return () => {
      setIsSubmitSuccessful(false);
    };
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    setValue('loading.billingAccount', loadingBillingAccount, {
      shouldDirty: false,
    });
  }, [loadingBillingAccount]);

  useEffect(() => {
    setValue('loading.serviceAccount', loadingServiceAccount, {
      shouldDirty: false,
    });
  }, [loadingServiceAccount]);

  return {
    action,
    orderNumber,
    data,
    loading: {
      data: loadingUpdate || loading,
    },
    clearErrors,
    control,
    breadcrumb,
    resetField,
    step,
    customerInfoState: {
      optionsServiceAccount,
      setOptionsServiceAccount,
      optionsBillingAccount,
      setOptionsBillingAccount,
      loadingBillingAccount,
      setLoadingBillingAccount,
      loadingServiceAccount,
      setLoadingServiceAccount,
    },
    documentState: {
      optionsBakesNumber,
      setOptionsBakesNumber,
    },
    setValue,
    formValues,
    fetchDetail,
  };
};

export default useAction;
