import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDetail, updateStatus } from '../../../_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import * as yup from 'yup';
import { titleCapitalize } from '@utils/common';
import { optionsDuration } from '../../utils';
import { currencyToNumber } from '@utils/parser';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: orderNumber } = router.query;

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);

  const onClickModalUpdateStatus = (value) => () => setModalUpdateStatus(value);

  const onCloseSuccess = () => () => fetchDetail(orderNumber);

  const fetchUpdateStatus = async (value) => {
    const payload = {
      ...value,
      accountBalance: currencyToNumber(value?.accountBalance),
      productId: data?.productId,
      status: modalUpdateStatus?.status,
    };

    try {
      setLoadingAlert();
      await updateStatus(orderNumber, cleanObject(payload));
      setSuccessAlert({
        message: modalUpdateStatus?.success,
        onClose: onCloseSuccess(),
      });
    } catch (e) {
      setFailedAlert({
        message: 'Failed to Update Data',
      });
    }
  };

  const fetchDetail = async (id) => {
    setLoading(true);
    try {
      const { data: res } = await getDetail(id);
      const normalizeData = {
        ...res,
        orderType: titleCapitalize(res?.orderType),
        dataConsentFile: res?.dataConsentClient?.concat(
          res?.dataConsentReseller,
        ),
      };
      setData(normalizeData);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

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
  }, [orderNumber]);

  const actionContent = {
    return: {
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to return this document?',
      success: 'Document successfully returned',
      title: 'Please give note of return',
      schema: [
        {
          name: 'noteProgress',
          placeholder: 'Please describe the reason..',
          label: 'Note',
          maxLength: 160,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        noteProgress: yup.string().required().label('Note'),
      },
    },
    approve: {
      caption:
        'Once you approved this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to approve this document?',
      success: 'Document successfully approved',
      title: 'Please give note of approve',
      schema: [
        {
          name: 'noteProgress',
          placeholder: 'Please describe the note..',
          label: 'Note',
          maxLength: 160,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        noteProgress: yup.string().required().label('Note'),
      },
    },
    trialDuration: {
      textInfo: 'Before doing approval, make sure the fields below are correct',
      caption:
        'Once you approved this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to approve this document?',
      success: 'Document successfully approved',
      title: 'Approve Purchase Order',
      schema: [
        {
          type: 'dropdown',
          label: 'Trial Duration',
          maxWidth: '100%',
          name: 'trialDuration',
          options: optionsDuration,
          placeholder: 'Choose Trial Duration',
          required: true,
        },
        {
          type: 'textFieldMasked',
          name: 'accountBalance',
          label: 'Account Balance',
          maxLength: 16,
          required: true,
          maskType: 'currency',
          rules: {
            required: 'Account Balance is a required field',
          },
        },
        {
          name: 'noteProgress',
          placeholder: 'Please describe the note..',
          label: 'Note',
          maxLength: 160,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        trialDuration: yup.string().required().label('Trial Duration'),
        accountBalance: yup.string().required().label('Account Balance'),
        noteProgress: yup.string().required().label('Note'),
      },
      autofill: {
        trialDuration: data?.trialDuration,
        accountBalance: data?.accountBalance,
      },
    },
  };

  const action = () => {
    let actions = [];

    if (['am approval'].includes(data?.status)) {
      if (isHaveAccess(feature, 'update_approvalRequest_am')) {
        actions.push({
          // hideDivider: true,
          children: 'Return',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.return,
            status: 'am returned',
            open: true,
          }),
        });
        actions.push({
          // hideDivider: true,
          ml: 24,
          children: 'Approve',
          onClick: onClickModalUpdateStatus({
            ...actionContent.trialDuration,
            status: 'delivery approval',
            open: true,
          }),
        });
      }
    }
    if (['delivery approval'].includes(data?.status)) {
      if (
        isHaveAccess(feature, 'update_approvalRequest_dd') ||
        isHaveAccess(feature, 'update_approvalRequest_wds')
      ) {
        actions.push({
          // hideDivider: true,
          children: 'Dispatch Order',
          onClick: onClickModalUpdateStatus({
            ...actionContent.approve,
            status: 'completed',
            open: true,
          }),
        });
      }
    }

    return actions;
  };

  return {
    action,
    fetchDetail,
    orderNumber,
    data,
    loading,
    modalUpdateStatus,
    setModalUpdateStatus,
    fetchUpdateStatus,
    onClickModalUpdateStatus,
    onCloseSuccess,
  };
};

export default useAction;
