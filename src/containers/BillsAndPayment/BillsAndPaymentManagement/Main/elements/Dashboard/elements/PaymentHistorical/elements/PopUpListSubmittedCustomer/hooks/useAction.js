import {
  getListBillsAndPaymentManagement,
  postAttachmentPaymentHistory,
  postSendPaymentHistory,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { dateFormat } from '@utils/parser';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

const useAction = (props) => {
  const { data: _data, onClose, type, date, file } = props;

  const [data, setData] = useState(_data);

  useEffect(() => {
    setData(_data);
  }, [_data]);

  const { enqueueSnackbar } = useSnackbar();

  const onDeleteData = (index) => async () => {
    await setData((prevData) => {
      const res = prevData.filter((_, i) => i !== index);
      if (res.length === 0) {
        onClose();
      }
      return res;
    });
    await enqueueSnackbar('Customer list deleted successfully.');
  };

  const fetchOptionCompanyName = async (search, prevOptions, { page }) => {
    try {
      const result = await getListBillsAndPaymentManagement({
        params: {
          search,
          page,
          size: 10,
        },
        withCancel: true,
      });
      const normalizeRes = result.data.map(({ bpNumber, companyName }) => ({
        label: companyName,
        value: bpNumber,
        subLabel: bpNumber,
        data: {
          companyName,
          bpNumber,
        },
      }));

      return {
        additional: {
          page: page + 1,
        },
        hasMore: result.meta.page < result.meta.totalPage,
        options: [...prevOptions, ...normalizeRes],
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

  const companyNameAsyncProps = {
    loadOptions: fetchOptionCompanyName,
    additional: { page: 1 },
  };

  const [newData, setNewData] = useState(null);

  const onAddNewData = () => {
    setNewData({
      form: null,
      value: null,
    });
  };

  const onCancelNewData = () => {
    setNewData(null);
  };

  const companyName = newData?.form;
  const setCompanyName = (value) => {
    setNewData({
      form: value,
      value: value.data,
    });
  };

  const onSubmitNewData = async () => {
    await setData((prevData) => [
      ...prevData,
      {
        companyName: newData.value.companyName,
        bpNumber: newData.value.bpNumber,
        type: type,
      },
    ]);
    await onCancelNewData();
    await enqueueSnackbar('Customer added successfully.');
  };

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const fetchSendData = async () => {
    setLoadingAlert();
    closeConfirmation();

    try {
      const uploadPayload = new FormData();
      uploadPayload.append('type', 'payment-history');
      uploadPayload.append('id', dateFormat({ date, type: 'date-dash' }));
      uploadPayload.append('file', file);

      const fileResult = await postAttachmentPaymentHistory(uploadPayload);

      await postSendPaymentHistory({
        date: dateFormat({ date, type: 'date-dash' }),
        type,
        data,
        file: fileResult.data,
      });
      setSuccessAlert({
        message: 'Customer Payment successfully sended',
        onClose: onClose,
      });
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const onSend = () => {
    setConfirmation({
      message: 'Are you sure want to send this payment notification?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchSendData },
      ],
    });
  };

  return {
    data,
    newData,
    companyName,
    companyNameAsyncProps,
    fetchOptionCompanyName,
    onCancelNewData,
    onSubmitNewData,
    setCompanyName,
    fetchSendData,
    onAddNewData,
    onDeleteData,
    onSend,
  };
};

export default useAction;
