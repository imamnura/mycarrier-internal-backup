import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = (props) => {
  const { detail, updateStatus, setModalInputParams, setModalUpdate } = props;
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [filterCPName, setFilterCPName] = useState({
    value: '',
    label: 'Select',
  });
  const [validCpname, setValidCpname] = useState(false);

  const isUpdate = detail?.activationStatus === 'completed';
  const isTelkomsel = detail?.provider === 'Telkomsel';
  const { control, handleSubmit, setValue, formState, watch, reset } = useForm({
    resolver: isTelkomsel ? validation : undefined,
    mode: 'onChange',
    defaultValues: {
      senderId: detail?.senderId,
      sid: detail?.smscData?.sid,
      cpName: detail?.smscData?.cp_name,
    },
  });
  const sid = watch('sid');

  const handleInputParameter = (values) => {
    const telkomselPayload = {
      cpName: values.cpName,
      sid: values.sid,
    };

    const payload = {
      activationStatus: isUpdate ? 'updated' : 'input parameter',
      noteProgress: values.note,
      ...(isTelkomsel && telkomselPayload),
    };

    const messageSuccess =
      detail?.activationStatus === 'checking order provider'
        ? 'Parameter succesfully inputted'
        : 'Bulk activation completed succesfully updated';
    const confirmation = {
      message:
        detail?.activationStatus === 'checking order provider'
          ? 'Are you sure want to input this parameter?'
          : 'Are you sure want to update this request?',
      action: [
        { children: 'No', onClick: () => closeConfirmation() },
        {
          children: 'Yes',
          onClick: () => {
            updateStatus(payload, messageSuccess);
            closeConfirmation();
          },
        },
      ],
    };

    setConfirmation(confirmation);
    setModalInputParams(false);
    setModalUpdate(false);
  };

  const CPNameOptions = [
    { value: 'ban', label: 'ban' },
    { value: 'tkm', label: 'tkm' },
    { value: 'gps', label: 'gps' },
    { value: 'oth', label: 'oth' },
  ];

  useEffect(() => {
    const suffixCPName = sid?.substring(4, 7);
    const existCpname = CPNameOptions.some((obj) => obj.value === suffixCPName);

    if (existCpname)
      setFilterCPName({ value: suffixCPName, label: suffixCPName });
    else setFilterCPName({ value: '', label: 'Select' });
  }, [sid]);

  useEffect(() => {
    const prefixCPName =
      detail?.smscData?.cp_name?.substring(0, 14) ||
      detail?.contentProviderName;

    if (filterCPName.value) setValidCpname(true);
    else setValidCpname(false);

    setValue('cpName', `${prefixCPName}${filterCPName.value}`);
  }, [filterCPName.value]);

  useEffect(() => {
    if (isTelkomsel) {
      isUpdate &&
        setFilterCPName({
          value: detail?.smscData?.cp_name.substr(-3),
          label: detail?.smscData?.cp_name.substr(-3),
        });
    } else setValidCpname(true);
  }, []);

  useEffect(() => {
    reset({
      senderId: detail?.senderId,
      cpName: detail?.smscData?.cp_name || detail?.contentProviderName,
      sid: detail?.smscData?.sid,
    });
  }, [detail]);

  return {
    control,
    filterCPName: {
      onChange: setFilterCPName,
      options: CPNameOptions,
      value: filterCPName,
    },
    formState,
    handleInputParameter,
    handleSubmit,
    isTelkomsel,
    validCpname,
  };
};

export default useActions;
