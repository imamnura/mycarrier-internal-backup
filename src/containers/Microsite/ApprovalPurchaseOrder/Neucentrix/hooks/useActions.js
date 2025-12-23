import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { defaultConfirm } from '@constants/dialogDefaultValue';
import { useRouter } from 'next/router';
import {
  getDataMicrositePO,
  updateStatusPurchaseOrder,
} from '../../../_repositories/repositories';
import { dateFormatConverter } from '@utils/converter';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { errorTitle } from '../constants';
import { convertToRupiah } from '@utils/text';
import { titleCapitalize } from '@utils/common';

const useActions = () => {
  const router = useRouter();
  const { id, approverId } = router.query;
  const { setFailedAlert, setSuccessAlert } = usePopupAlert();

  const [isLoading, setLoading] = useState();
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [confirmation, setConfirmation] = useState(defaultConfirm);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(false);

  const clearConfirmation = () => setConfirmation(defaultConfirm);

  const fetchDetail = async (micrositeId) => {
    try {
      setLoading(true);
      const { data } = await getDataMicrositePO(micrositeId);
      setData({
        ...data,
        orderType: titleCapitalize(data?.orderType),
      });
    } catch (e) {
      setData(null);
      setError({
        description: e?.message,
        message: errorTitle[e?.code],
      });
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => fetchDetail(id);

  const fetchUpdateStatus = async (data) => {
    const payload = {
      ...data,
      approverId: approverId,
      status: modalUpdateStatus?.status,
    };

    try {
      await updateStatusPurchaseOrder(id, payload);
      setSuccessAlert({
        message: modalUpdateStatus?.success,
        onClose: onClose,
      });
    } catch (e) {
      setFailedAlert({
        message: e?.message,
      });
    }
  };

  const schema = [
    {
      title: 'Customer Information',
      type: 'information',
      properties: {
        data: data,
        schema: [
          { name: 'custAccntName', label: 'Company' },
          { name: 'custAccntNum', label: 'CA Number' },
        ],
      },
    },
    {
      title: 'Order Information',
      type: 'information',
      properties: {
        data: data,
        schema: [
          { name: 'orderNumber', label: 'Order ID' },
          {
            name: 'createdAt',
            label: 'Purchase Date',
            converter: dateFormatConverter({ type: 'date', empty: '-' }),
          },
          { name: 'purchaseOrderNumber', label: 'Purchase Order Number' },
          { name: 'bakesNumber', label: 'BAKES Number' },
          { name: 'orderType', label: 'Order Type' },
          { name: 'product', label: 'Product' },
          {
            name: 'otcPrice',
            label: 'OTC Price',
            converter: (v) => convertToRupiah(v),
          },
          {
            name: 'recurringPrice',
            label: 'MRC Price',
            converter: (v) => convertToRupiah(v),
          },
        ],
      },
    },
    !!data?.accountManager?.length && {
      title: 'Account Manager',
      type: 'numbering',
      properties: {
        data: data?.accountManager,
        schema: [
          { label: 'Name', name: 'name' },
          { label: 'NIK', name: 'nik' },
          { label: 'Segment', name: 'segment' },
          { label: 'Contact Number', name: 'phone' },
        ],
      },
    },
    {
      title: 'Document Attachment',
      type: 'information',
      properties: {
        data: data,
        schema: [
          { name: 'documentPO', label: 'Purchase Order', type: 'document' },
          { name: 'bakesFile', label: 'Bakes', type: 'document' },
          { name: 'agreementDocument', label: 'Agreement', type: 'document' },
        ],
      },
    },
  ];

  const formContent = {
    schema: [
      {
        name: 'note',
        placeholder: 'Please describe the note..',
        label: 'Note',
        maxLength: 1000,
        minRows: 3,
        multiline: true,
        required: true,
      },
    ],
    validation: {
      note: yup.string().required().label('Note'),
    },
  };

  const onClickReturn = () => {
    setModalUpdateStatus({
      ...formContent,
      open: true,
      title: 'Please give reason of return',
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to return this new PO request?',
      success: 'New PO request successfully returned',
      status: 'returned',
    });
  };

  const onClickApprove = () => {
    setModalUpdateStatus({
      ...formContent,
      open: true,
      title: 'Please give note of approve',
      caption:
        'Once you approved this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to approve this new PO request?',
      success: 'New PO request successfully approved',
      status: 'approved',
    });
  };

  const action = [
    { label: 'Return', onClick: onClickReturn },
    { label: 'Approve', onClick: onClickApprove },
  ];

  useEffect(() => {
    if (id) {
      fetchDetail(id);
    }
  }, [id]);

  return {
    action,
    clearConfirmation,
    confirmation,
    setConfirmation,
    data,
    error,
    fetchDetail,
    fetchUpdateStatus,
    isLoading,
    modalUpdateStatus,
    setModalUpdateStatus,
    onClickApprove,
    onClose,
    schema,
  };
};

export default useActions;
