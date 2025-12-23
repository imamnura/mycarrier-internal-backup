import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDetailBaso } from '../../_repositories/repositories';
import { dateFormatConverter } from '@utils/converter';
import { getBasoStepper, getBasoWorklog } from '../../utils';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: orderNumber } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [modalReturn, setModalReturn] = useState(null);
  const [modalProgressUpload, setModalProgressUpload] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const result = await getDetailBaso(orderNumber);
      const normalizeData = {
        ...result.data,
        activationDoc: {
          fileName: result?.data?.activationDoc?.fileName,
          fileUrl: result?.data?.activationDoc?.fileUrlMinio,
        },
        baComplete: {
          fileName: result?.data?.baComplete?.fileName,
          fileUrl: result?.data?.baComplete?.fileUrlMinio,
        },
      };
      setData(normalizeData);
      setLoading(false);
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderNumber) {
      fetchDetail();
    }
  }, [orderNumber]);

  const statusData = () => {
    const temp = data?.worklog;

    if (data?.status === 'BA COMPLETE') {
      if (temp[temp.length - 1].status === 'RATE US') {
        temp.pop();
      }

      const signedIndex = temp.length - 2;

      if (temp[signedIndex].status === 'SIGNED') {
        temp[signedIndex] = {
          ...temp[signedIndex],
          note: 'Document has been signed by Customer',
        };
      }
    }

    return temp;
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Order Information',
          properties: {
            data: data || {},
            schema: [
              { name: 'orderNumber', label: 'Order Number' },
              { name: 'custAccntName', label: 'Customer' },
              {
                name: 'receivedDate',
                label: 'Recieving Date',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
              },
              { name: 'productName', label: 'Product' },
              { name: 'account_manager.fullName', label: 'Account Manager' },
              { name: 'account_manager.segment', label: 'Segment' },
              { name: 'orderType', label: 'Order Type' },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data || {},
            schema: [
              {
                name:
                  data?.status === 'BA COMPLETE'
                    ? 'baComplete'
                    : 'activationDoc',
                label: 'Baso',
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'stepper',
          title: 'BASO Approval Step',
          properties: {
            ...getBasoStepper(data?.status),
            steps: ['Submitted', 'Customer Sign', 'BASO Completed'],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getBasoWorklog(statusData()),
          },
        },
      ],
    },
  ];

  const action = () => {
    let actions = [];

    if (data?.status === 'RETURNED') {
      actions.push({
        children: 'REJECT',
        onClick: () =>
          setModalUpdateStatus({
            title: 'Please give note of reject',
            caption:
              'Once you rejected this, it will be process and data will be sent to customer automatically.',
            updateTo: 'REJECTED',
            success: 'Document succesfully rejected',
            confirmation: 'Are you sure want to reject this document?',
          }),
        variant: 'ghost',
      });
      actions.push({
        children: 'RETURN',
        onClick: () =>
          setModalReturn({
            title: 'Please upload the document to be sent to provider',
            textInfo:
              'Once you send this data, it will be processed by provider.',
            submitText: 'SEND',
            updateTo: 'AM RETURNED',
            success: 'Document succesfully returned to the customer',
            confirmation: 'Are you sure want to return this document?',
          }),
      });
    }

    return actions;
  };

  return {
    statusData,
    action,
    fetchDetail,
    orderNumber,
    data,
    feature,
    loading,
    detailSchema,
    modalUpdateStatus,
    setModalUpdateStatus,
    modalReturn,
    setModalReturn,
    modalProgressUpload,
    setModalProgressUpload,
    progress,
    setProgress,
  };
};

export default useAction;
