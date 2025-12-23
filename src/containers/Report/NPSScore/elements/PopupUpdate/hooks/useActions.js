import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { updateNps } from '../../../_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = ({
  show,
  onClose,
  tableData,
  journey,
  onSuccessUpdate,
  isEdit,
  tab,
}) => {
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(tableData);
  const dectractor = ['0', 0, 1, 2, 3, 4, 5, 6];

  const fetchUpdateNps = async () => {
    const payload = data.map((dataItem) => {
      return {
        rateId: dataItem.rateId,
        status: dataItem.valid ? 'valid' : 'invalid',
        rootCause: dataItem.rootCause,
        followUp: dataItem.followUp,
        dueDate: dataItem.dueDateInput ? dataItem.dueDateInput : '',
        statusValidate: dectractor.includes(dataItem.npsRate)
          ? // ? dataItem.statusInput.value
            {
              'on progress': 'onprogress',
              'not yet': 'notyet',
            }[dataItem?.statusInput.value] || dataItem?.statusInput.value
          : 'completed',
      };
    });

    setLoadingAlert();
    closeConfirmation();
    try {
      const result = await updateNps({ data: payload });
      if (result) {
        setSuccessAlert({
          message: 'Validation has been submitted successfully',
          onClose: () => {
            onClose();
            onSuccessUpdate();
          },
        });
      }
    } catch (error) {
      setFailedAlert({
        message: `Failed to Update Nps`,
      });
    }
  };

  const onSubmitUpdateNps = () => {
    setConfirmation({
      message: `Are you sure want to submit this ${
        isEdit ? 'update' : 'validation'
      }?`,
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'yes',
          onClick: fetchUpdateNps,
        },
      ],
    });
  };

  const setAllData = (_data, value) => {
    setData(
      [..._data].map((object) => {
        return {
          ...object,
          ...value,
        };
      }),
    );
  };

  const setValueData = (key, value) => {
    setData(
      [...data].map((object) => {
        if (object.rateId === key) {
          return {
            ...object,
            ...value,
          };
        } else return object;
      }),
    );
  };
  const defaultValueStatus = (status) => {
    const pickVariant = {
      notyet: 'primary',
      onprogress: 'warning',
      completed: 'success',
    };
    return {
      label: '',
      value: status,
      customOption: {
        type: 'status',
        variant: pickVariant[status?.replace(' ', '')],
        children: status,
      },
    };
  };

  useEffect(() => {
    // document.body.style.overflow = show ? 'hidden' : 'auto';
    if (show)
      setData(
        tableData?.map((dataItem) => {
          const defaultStatus = dectractor.includes(dataItem?.npsRate)
            ? 'notyet'
            : 'completed';

          return {
            ...dataItem,
            invoiceNumber: dataItem.invoiceNumber?.replaceAll(',', ', '),
            valid: isEdit ? tab == 'valid' : false,
            rootCause: isEdit ? dataItem.rootCause ?? '' : '',
            followUp: isEdit ? dataItem.followUp ?? '' : '',
            // dueDateInput: isEdit ? dataItem.dueDate ?? null : null,
            dueDateInput: dataItem.dueDate ?? null,
            statusValidate: isEdit
              ? dataItem.statusValidate ?? defaultStatus
              : defaultStatus,
            statusInput: isEdit
              ? defaultValueStatus(dataItem.statusValidate || defaultStatus)
              : defaultValueStatus(defaultStatus),
          };
        }),
      );
  }, [show, tableData, tab]);

  const onCancel = () => {
    setData([]);
    onClose();
  };

  let maxDueDate = new Date();
  maxDueDate.setMonth(maxDueDate.getMonth() + 1);
  maxDueDate.setDate(2);

  return {
    data,
    journey,
    show,
    isEdit,
    tab,
    dectractor,
    maxDueDate,
    setValueData,
    setAllData,
    onSubmitUpdateNps,
    onCancel,
    defaultValueStatus,
  };
};

export default useActions;
