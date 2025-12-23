import { useEffect, useState } from 'react';
import validation from '../validation';
import { useForm } from 'react-hook-form';
import {
  getOptionForm,
  downloadReport,
} from '@containers/ServiceDelivery/IPPrefix/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { cleanObject } from '@utils/common';
import { dialog } from '@fragments/DownloadAuthorization/dialog-bridge';
import moment from 'moment';

const useActions = (props) => {
  const { open, setOpen } = props;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();

  const [loadingListCustomer, setLoadingListCustomer] = useState(true);
  const [listCustomer, setListCustomer] = useState([]);

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const fetchOptionCustomer = async () => {
    setLoadingListCustomer(true);

    try {
      const { data } = await getOptionForm('customers');
      setListCustomer(
        data.map((item) => ({
          label: item,
          value: item,
        })),
      );
    } catch (error) {
      setListCustomer([]);
    } finally {
      setLoadingListCustomer(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchOptionCustomer();
    }
    return () => {
      reset();
    };
  }, [open]);

  const fetchDownload = async (formData) => {
    const params = {
      date: formData?.date,
      customer: formData?.customer,
      startDate: formData?.dateRange[0]
        ? moment(formData?.dateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: formData?.dateRange[1]
        ? moment(formData?.dateRange[1]).format('YYYY-MM-DD')
        : '',
    };

    try {
      setLoadingAlert();
      const { data } = await downloadReport(cleanObject(params));
      window.location.href = data.fileUrl;
      setSuccessAlert({
        message: 'File successfully downloaded',
      });
    } catch (e) {

      if (e.code === 403) {
        dialog.show('Forbidden download');
        return;
      }

      setFailedAlert({
        message: 'Failed to Update Data',
      });
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDownload = (values) => {
    fetchDownload(values);
    setOpen(false);
  };

  return {
    control,
    formState,
    handleDownload,
    handleSubmit,
    onClose,
    loading: {
      customer: loadingListCustomer,
    },
    options: {
      customer: listCustomer,
    },
  };
};

export default useActions;
