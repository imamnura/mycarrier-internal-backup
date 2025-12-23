import { useFieldArray, useForm } from 'react-hook-form';
import validation from '../validation';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useEffect, useMemo } from 'react';

const useAction = (props) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  useEffect(() => {
    if (props.open) {
      const { telkomApproval, customerApproval } = props.data || {};

      reset({
        telkomApproval: telkomApproval?.map(
          ({ name, position, email, phoneNumber }) => ({
            email,
            name,
            phoneNumber,
            position,
          }),
        ),
        customerApproval: customerApproval?.map(
          ({ name, position, email, phoneNumber }) => ({
            email,
            name,
            phoneNumber,
            position,
          }),
        ),
      });
    }
  }, [props.data, props.open]);

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const submitToFetch = (value) => () => {
    closeConfirmation();
    props.onSubmit(value);
  };

  const onSubmit = (value) => {
    setConfirmation({
      message: 'Are you sure want to submit this document?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: submitToFetch(value) },
      ],
    });
  };

  const fieldArrayTelkom = useFieldArray({
    control,
    shouldUnregister: true,
    name: 'telkomApproval',
  });

  const onAddTelkom = () => {
    fieldArrayTelkom.append({
      name: '',
      email: '',
      position: '',
      phoneNumber: '+62',
    });
  };

  const onDeleteTelkom = (index) => () => {
    fieldArrayTelkom.remove(index);
  };

  const fieldArrayCustomer = useFieldArray({
    control,
    shouldUnregister: true,
    name: 'customerApproval',
  });

  const onAddCustomer = () => {
    fieldArrayCustomer.append({
      name: '',
      email: '',
      position: '',
      phoneNumber: '+62',
    });
  };

  const onDeleteCustomer = (index) => () => {
    fieldArrayCustomer.remove(index);
  };

  const activeApproval = useMemo(() => {
    let res = {
      telkom: props?.data?.telkomApproval?.findIndex(
        ({ status }) => status === 'waiting approval',
      ),
      customer: props?.data?.customerApproval?.findIndex(
        ({ status }) => status === 'waiting approval',
      ),
    };

    if (props.data?.status === 'telkom approval') {
      res.customer = -1;
    } else if (props.data?.status === 'customer approval') {
      res.telkom = 5;
    }

    return res;
  }, [props?.data]);

  const isAllApproved = useMemo(
    () => ({
      telkom:
        props?.data?.telkomApproval[props?.data?.telkomApproval.length - 1]
          .status === 'approved',
      customer:
        props?.data?.customerApproval[props?.data?.customerApproval.length - 1]
          .status === 'approved',
    }),
    [props?.data],
  );

  return {
    control,
    onSubmit,
    handleSubmit,
    telkomApproval: {
      fields: fieldArrayTelkom.fields,
      onAdd: onAddTelkom,
      onDelete: onDeleteTelkom,
      active: activeApproval.telkom,
      allApproved: isAllApproved.telkom,
    },
    customerApproval: {
      fields: fieldArrayCustomer.fields,
      onAdd: onAddCustomer,
      onDelete: onDeleteCustomer,
      active: activeApproval.customer,
      allApproved: isAllApproved.customer,
    },
    submitToFetch,
  };
};

export default useAction;
