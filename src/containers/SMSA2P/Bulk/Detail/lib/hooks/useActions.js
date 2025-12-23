import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';

const useActions = (props) => {
  const {
    clearConfirmation,
    detail,
    id,
    updateStatus,
    setConfirmation,
    setModalInputParams,
    setModalUpdate,
  } = props;
  const [filterCPName, setFilterCPName] = useState({
    value: '',
    label: 'Select',
  });
  const [validCpname, setValidCpname] = useState(false);
  const {
    activationStatus,
    contentProviderName,
    provider,
    senderId,
    smscData = {},
  } = detail;
  const isUpdate = activationStatus === 'completed';
  const isTelkomsel = provider === 'Telkomsel';
  const { cp_name = '' } = smscData;
  const { control, handleSubmit, setValue, formState, watch } = useForm({
    resolver: isTelkomsel ? validation : undefined,
    mode: 'onChange',
    defaultValues: {
      senderId: senderId,
      sid: smscData?.sid,
      cpName: cp_name,
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

    const confirmation = {
      content: 'Are you sure want to input this parameter?',
      actions: [
        { label: 'No', action: () => clearConfirmation() },
        {
          label: 'Yes',
          action: () => {
            updateStatus(id, payload, isUpdate ? 'update' : 'input');
            clearConfirmation();
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
    const prefixCPName = cp_name?.substring(0, 14) || contentProviderName;

    if (filterCPName.value) setValidCpname(true);
    else setValidCpname(false);

    setValue('cpName', `${prefixCPName}${filterCPName.value}`);
  }, [filterCPName.value]);

  useEffect(() => {
    if (isTelkomsel) {
      isUpdate &&
        setFilterCPName({
          value: cp_name.substr(-3),
          label: cp_name.substr(-3),
        });
    } else setValidCpname(true);
  }, []);

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
