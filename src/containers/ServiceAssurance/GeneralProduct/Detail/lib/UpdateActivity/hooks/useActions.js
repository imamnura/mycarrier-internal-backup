import {
  getListActivity,
  getListStatus,
  updateActivity,
} from '@containers/ServiceAssurance/GeneralProduct/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';
import { getValueChild, getEvidenceFromWorklog } from '../utils';

const useActions = (props) => {
  const {
    detail,
    open,
    onClose,
    fetchDetail,
    referenceId,
    setVisibilityUpdateActivity,
  } = props;

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [optionStatus, setOptionStatus] = useState([]);
  const [optionActivity, setOptionActivity] = useState([]);
  const [selectedActivity, _setSelectedActivity] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
    clearErrors,
    trigger,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: validation(selectedActivity),
    mode: 'onChange',
  });
  const status = watch('status');
  const disabled = !isValid || selectedActivity.length < 1;

  const setSelectedActivity = (val) => () => {
    if (
      selectedActivity.filter(({ evidence }) => evidence === val.evidence)
        .length > 0
    ) {
      _setSelectedActivity((s) =>
        s.filter(({ evidence }) => evidence !== val.evidence),
      );
      clearErrors(val.evidence);
    } else {
      _setSelectedActivity([...selectedActivity, { ...val, check: true }]);
    }
  };

  const fetchOptionStatus = async () => {
    setLoadingStatus(true);
    try {
      const result = await getListStatus(referenceId);
      const normalizeRes = result.data?.map((d) => ({
        label: d?.label,
        value: d?.value,
      }));
      setOptionStatus(normalizeRes);
      setLoadingStatus(false);
    } catch (error) {
      // setFailedAlert({ message: error.message });
      setOptionStatus([]);
      setLoadingStatus(false);
    }
  };

  const fetchOptionActivity = async (checkDisable = false) => {
    try {
      const _status = checkDisable ? 'all-status' : status;
      const result = await getListActivity(referenceId, _status);
      if (checkDisable) {
        if (
          result.data
            ?.map((d) => d?.child)
            ?.flat()
            ?.filter((d) => !d?.check)?.length < 1
        ) {
          setVisibilityUpdateActivity({ disable: true, visible: true });
        }
      } else {
        const normalizeData = result?.data?.map((v) => {
          return {
            ...v,
            evidence: `evidence${v.value}`,
          };
        });

        normalizeData.map((d, i) => {
          const existingEvidence = getEvidenceFromWorklog(
            detail?.historyWorklog,
            status,
            d,
          );
          if (existingEvidence) {
            setValue(d.evidence, existingEvidence);
          }

          setValue(`activity${i}`, d.check);
        });

        setOptionActivity([
          ...normalizeData,
          {
            check: false,
            evidence: 'customEvidence',
            label: '',
          },
        ]);
      }
    } catch (error) {
      // setFailedAlert({ message: error.message });
      if (error?.message == 'Product is not eligible')
        setVisibilityUpdateActivity({ disable: true, visible: false });
      setOptionActivity([]);
    }
  };

  useEffect(() => {
    if (open) {
      setOptionActivity([]);
      setOptionStatus([]);
      fetchOptionStatus();
    }
    if (referenceId) {
      fetchOptionActivity(true);
    }
  }, [open, referenceId]);

  useEffect(() => {
    setOptionActivity([]);
    _setSelectedActivity([]);
    if (open && status) {
      fetchOptionActivity(false);
    }
    if (!open) {
      reset();
    }
  }, [referenceId, status, open]);

  useEffect(() => {
    if (status) {
      trigger();
    }
  }, [selectedActivity]);

  const fetchSubmit = (data) => async () => {
    const payload = {
      referenceId,
      status: data.status,
      child: selectedActivity.map((v) => ({
        ...v,
        evidence: {
          fileName: data[v.evidence]?.data[0]?.fileName,
          fileUrl: data[v.evidence]?.data[0]?.fileUrl,
        },
        label: v.label === '' ? getValues('customActivity') : v.label,
        value: v.value ? v.value : getValueChild(status, optionActivity),
      })),
    };

    closeConfirmation();
    setLoadingAlert();

    try {
      await updateActivity(payload);
      setSuccessAlert({
        message: 'Activity succesfully updated',
        onClose: onClose,
      });
      fetchDetail(referenceId);
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const onSubmit = (val) => {
    setConfirmation({
      message: 'Are you sure want to update this activity?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchSubmit(val) },
      ],
    });
  };

  return {
    open,
    onClose,
    control,
    optionStatus,
    optionActivity,
    setSelectedActivity,
    loadingStatus,
    handleSubmit,
    onSubmit,
    disabled,
    fetchSubmit,
  };
};

export default useActions;
