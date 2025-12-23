import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { dateFormat } from '@utils/parser';
import { cleanObject } from '@utils/common';
import { updateDetailStatus } from '../../../../../_repositories/repositories';
import { GetValues } from '../utils';
import validation from '../validation';
import validationOnlyLogSMSC from '../validationOnlyLogSMSC';
import { filterSchema, mappingTroubleOccurs } from '../utils';

export const getValidation = (isFile, schema, provider) => {
  const isSMSC = Boolean(schema.find((e) => e.name === 'logSMSC'));

  if (isFile) {
    return validation;
  } else if (provider === 'Link Connectivity') {
    return;
  } else if (isSMSC) {
    return validationOnlyLogSMSC;
  }
};

const useActions = (props) => {
  const router = useRouter();

  const {
    ticketId,
    // fetchDetail,
    modalApproveIssue,
    setModalApproveIssue,
    data,
  } = props;

  const [trouble, setTrouble] = useState([]);
  const [smsCValidation, setSmsCValidation] = useState(true);

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  let checkTimestamp = new Date();
  if (data?.troubleOccurs) {
    checkTimestamp = data?.troubleOccurs[0]?.dateTime
      ? data?.troubleOccurs[0]?.dateTime
      : new Date();
  }

  const {
    control,
    handleSubmit,
    formState,
    // reset,
    watch,
    // setValue,
    getValues,
  } = useForm({
    resolver: getValidation(
      data?.troubleOccursFile,
      filterSchema(data?.operatorTypeName),
      data?.category,
    ),
    mode: 'onChange',
    defaultValues: {
      category: data?.category,
      senderID: data?.senderTypeName || '-',
      ipCustomer: data?.troubleOccursLink?.ipCustomer,
      logPingTrace: data?.troubleOccursLink?.logPingTrace,
      trouble:
        data?.troubleOccurs?.length > 0
          ? mappingTroubleOccurs(data?.troubleOccurs, data?.operatorTypeName)
          : [],
      troubleFile:
        data?.operatorTypeName === 'Telkomsel' ? data?.troubleOccursFile : '',
      date: data?.createdAt
        ? dateFormat({ date: data?.createdAt, type: 'date-time' })
        : '-',
      timestamp:
        data?.category === 'LBA' || data?.category === 'LBA Targeted'
          ? dateFormat({ date: checkTimestamp, type: 'date-time' })
          : '',
    },
  });
  const { fields: troubleFields } = useFieldArray({
    control,
    name: 'trouble',
  });

  const buttonDisable =
    !formState.isValid || formState.isSubmitting || smsCValidation;
  const watchTrouble = watch('trouble');

  useEffect(() => {
    const getTrouble = getValues('trouble');

    if (!data?.operatorTypeName) {
      setSmsCValidation(false);
    }

    if (
      data?.category === 'Link Connectivity' ||
      data?.category === 'LBA' ||
      data?.category === 'LBA Targeted' ||
      data?.category === 'Reguler' ||
      data?.category === 'Premium'
    ) {
      setSmsCValidation(false);
    }

    if (
      data?.operatorTypeName !== 'Telkomsel' &&
      data?.category !== 'Link Connectivity'
    ) {
      if (
        GetValues(getTrouble, 'logSMSC').length === data?.troubleOccurs?.length
      ) {
        setSmsCValidation(false);
      } else {
        setSmsCValidation(true);
      }
    }

    if (typeof data?.troubleOccursFile === 'object') {
      setSmsCValidation(false);
    }
  }, [JSON.stringify(watchTrouble)]);

  const updateApprove = async (value) => {
    closeConfirmation();
    setLoadingAlert();
    let payload = {
      status: 'ticket analyze',
      from: 'occ@telkom.co.id',
      to: 'telkomdigitalsolution2019@gmail.com',
      note: 'Tiket Sedang di Tangani',
      troubleOccurs: value.troubleFile,
    };

    if (
      data?.troubleOccurs?.length > 0 &&
      !data?.troubleOccursFile &&
      (data?.category === 'Premium' || data?.category === 'Reguler')
    ) {
      let cleanTrouble = [];

      value.trouble.map((v) => cleanTrouble.push(cleanObject(v)));

      payload['troubleOccurs'] = cleanTrouble;
    }

    if (Object.keys(value.trouble).length === 0) {
      delete payload.troubleOccurs;
    }

    try {
      await updateDetailStatus(ticketId, payload);
      setSuccessAlert({
        message: modalApproveIssue?.success,
        onClose: () => router.reload(),
      });
    } catch (e) {
      setFailedAlert({
        message: 'Failed to Update Data',
      });
    }
  };

  const handleSave = (values) => {
    const confirmation = {
      message: `Are you sure want to approve this  ${data?.category} issue request?`,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: () => updateApprove(values) },
      ],
    };

    setConfirmation(confirmation);
    setModalApproveIssue(false);
  };

  const onClose = () => {
    setModalApproveIssue(false);
    closeConfirmation();
  };

  return {
    onClose,
    control,
    handleSubmit,
    data,
    trouble,
    setTrouble,
    buttonDisable,
    filterSchema,
    handleSave,
    troubleFields,
    modalApproveIssue,
  };
};

export default useActions;
