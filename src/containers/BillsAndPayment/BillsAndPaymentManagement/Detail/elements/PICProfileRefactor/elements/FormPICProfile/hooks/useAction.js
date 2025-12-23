import {
  postPicProfile,
  getListCustomer,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';
import { capitalize } from '@utils/text';
import { cleanObject } from '@utils/common';

const useAction = ({ type, formPic, updatePicProfile, onClose }) => {
  const { variant, open, id = 'popup-form-pic' } = formPic;

  const {
    query: { id: bpNumber },
  } = useRouter();

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();

  const typeLabel = {
    cdm: 'CDM',
    customer: 'customer',
  }[type];

  const _labels = useMemo(() => {
    return {
      add: {
        title: `Add PIC profile ${typeLabel}`,
        description: `Filling PIC ${typeLabel} profile data`,
        confirmation: `Are you sure want to add this PIC profile ${typeLabel}?`,
        success: `PIC profile ${typeLabel} successfully added`,
        button: 'add',
      },
      edit: {
        title: `Edit PIC profile ${typeLabel}`,
        description: `Editing PIC profile data`,
        confirmation: `Are you sure want to edit this PIC profile ${typeLabel}?`,
        success: `PIC profile ${typeLabel} successfully edited`,
        button: 'save',
      },
    };
  }, [variant]);

  const labels = _labels[variant] || {};

  const { control, handleSubmit, reset, formState } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  useEffect(() => {
    reset();
  }, [open]);

  const fetchOptionCustomer = async (search, prevOptions, { page }) => {
    const params = cleanObject({
      search,
      page,
      size: 10,
      role: type == 'cdm' ? 'cdm' : '',
      // userType: type == 'cdm' ? 'internal_staff,internal_non_staff' : 'customer'
    });
    try {
      const result = await getListCustomer(params);
      const normalizeRes = result.data.map(
        ({ userId, fullName, phoneNumber, email }) => ({
          label: capitalize(fullName),
          value: userId,
          data: {
            userId,
            email,
            name: fullName,
            phoneNumber: '+62' + phoneNumber,
          },
          subLabel: `+62${phoneNumber} • ${email}`,
        }),
      );

      return {
        additional: {
          page: page + 1,
        },
        hasMore: result.meta.page < result.meta.totalPages,
        options: [...normalizeRes],
      };
    } catch (error) {
      return {
        additional: {
          page: page,
        },
        hasMore: false,
        options: prevOptions,
      };
    }
  };

  const customerAsyncProps = {
    loadOptions: fetchOptionCustomer,
    additional: { page: 1 },
  };

  const fetchSubmitPic = (val) => async () => {
    setLoadingAlert();
    closeConfirmation();

    const payload = {
      ...val?.customer?.data,
      type,
      bpNumber,
    };

    const key = {
      cdm: 'cdmPic',
      customer: 'pic',
    }[type];

    try {
      const result = await postPicProfile(payload);
      updatePicProfile(type, result.data[key]);
      onClose();
      setSuccessAlert({ message: labels.success });
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const onSubmit = (val) => {
    setConfirmation({
      message: labels.confirmation,
      action: [
        {
          children: 'NO',
          variant: 'ghost',
          onClick: closeConfirmation,
          id: id + '-confirmation-no',
        },
        {
          children: 'YES',
          onClick: fetchSubmitPic(val),
          id: id + '-confirmation-yes',
        },
      ],
    });
  };

  return {
    variant,
    control,
    onSubmit,
    labels,
    handleSubmit,
    type,
    customerAsyncProps,
    fetchSubmitPic,
    formState,
  };
};

export default useAction;
