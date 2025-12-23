import baseUrl from '@configs/service';
import { getUserData, isHaveAccess, onDownloadFile } from '@utils/common';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useToast from '@utils/hooks/useToast';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  deleteInvoiceAttachment,
  generateInvoice,
  getDetailInvoice,
  getInvoicePaymentHistory,
  postUploadInvoiceAttachment,
  reBundlingDocument,
  refreshDocument,
} from '../../_repositories/repositories';
import { mappingTitleDocument } from '../utils';

const useAction = ({ feature }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [switchValue, setSwitchValue] = useState(true);
  const isAuthorized =
    isHaveAccess(feature, 'read_detail_invoice') ||
    isHaveAccess(feature, 'read_detail_payment');

  const { setSuccessToast, setErrorToast } = useToast();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert, setLoadingAlert, setSuccessAlert, onCloseAlert } =
    usePopupAlert();
  const { setDocumentViewer, closeDocumentViewer } = useDocumentViewer();

  const router = useRouter();

  const { id: bpNumber, params: invoiceNumber } = router.query;

  const fetchDetail = async ({
    withLoading = true,
    onSuccess,
    onError,
  } = {}) => {
    setLoading(withLoading);

    try {
      const result = await getDetailInvoice({ bpNumber, invoiceNumber });
      const invoiceCustomer = [
        ...(result?.data?.invoiceReceipt ?? []),
        ...(result?.data?.invoicePphDocument ?? []),
      ];

      const normalizeData = {
        ...result.data,
        invoiceCustomer: invoiceCustomer,
      };
      setData(normalizeData);
      setSwitchValue(result.data?.isExternal);
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setData(null);
      setLoading(false);
      if (onError) {
        onError(error);
      }
    }
  };

  const [paymentHistory, setPaymentHistory] = useState([]);

  const fetchPaymentHistory = async () => {
    try {
      const result = await getInvoicePaymentHistory(invoiceNumber);
      setPaymentHistory(result.data);
    } catch (error) {
      setPaymentHistory([]);
    }
  };

  useEffect(() => {
    if (!!bpNumber && !!invoiceNumber) {
      if (isAuthorized) {
        fetchDetail();
        fetchPaymentHistory();
      } else {
        setLoading(false);
        setFailedAlert({
          message: `You Don't Have Permission to View This Page`,
        });
      }
    }
  }, [bpNumber, invoiceNumber]);

  const fetcherUploadAttachment = (data) => (file) => {
    setLoadingAlert();
    return postUploadInvoiceAttachment({ ...data, file });
  };

  const onUploadAttachment = () => {
    fetchDetail({
      withLoading: false,
      onSuccess: () => {
        setSuccessAlert({ message: 'Document successfully uploaded' });
      },
      onError: (error) => {
        setFailedAlert({ message: error.message });
      },
    });
  };

  const fetchDeleteAttachment = (type) => async () => {
    closeConfirmation();
    setLoadingAlert();
    try {
      await deleteInvoiceAttachment({ bpNumber, invoiceNumber, type });
      await fetchDetail({ withLoading: false });
      await setSuccessAlert({ message: 'Document successfully deleted' });
      await closeDocumentViewer();
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const onDeleteAttachment = (type) => () => () => {
    setConfirmation({
      message: 'Are you sure want to delete this document?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: fetchDeleteAttachment(type) },
      ],
    });
  };

  const onRegenerateInvoice = async () => {
    setLoadingAlert();

    try {
      const result = await generateInvoice(invoiceNumber);
      setData({
        ...data,
        invoiceFile: {
          fileUrl: result.data.fileUrl,
          fileName: result.data.fileName,
        },
      });
      setDocumentViewer({
        url: result.data.fileUrl,
        title: result.data.fileName,
        action: [
          { children: 'download', onClick: onDownloadFile },
          {
            children: 'regenerate',
            ml: 8,
            onClick: onRegenerateInvoice,
            withDivider: true,
          },
        ],
      });
      await setSuccessAlert({ message: 'Document successfully regenerate' });
    } catch (error) {
      await setFailedAlert({ message: 'Document failed regenerate' });
    }
  };

  const fetchRefreshDocument = (type) => async () => {
    setLoadingAlert();
    try {
      const params = {
        bpNumber,
        invoiceNumber,
        type,
      };
      await refreshDocument(params);
      await fetchDetail({ withLoading: false });
      await onCloseAlert();
      await closeConfirmation();
      setSuccessToast(
        `${mappingTitleDocument[type] || ''} refreshed successfully.`,
      );
    } catch (error) {
      onCloseAlert();
      closeConfirmation();
      setErrorToast(`${mappingTitleDocument[type] || ''} failed to refresh.`);
    }
  };

  const fetchRebundlingDocument = async (_switchValue) => {
    setLoadingAlert();
    try {
      const params = {
        bpNumber,
        invoiceNumber,
        isExternal: _switchValue,
      };
      await reBundlingDocument(params);
      await fetchDetail({ withLoading: false });
      await setSuccessAlert({ message: 'Switch success' });
    } catch (error) {
      setFailedAlert({ message: error?.message });
    }
  };

  const onSwitch = () => {
    // setSwitchValue(!switchValue);
    fetchRebundlingDocument(!switchValue);
  };

  const onRefreshDocument = (type) => () => () => {
    setConfirmation({
      message: 'Are you sure want to refresh this document?',
      note: 'Related documents like Invoice and Tax Invoice will also be refreshed to the latest version.',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: fetchRefreshDocument(type) },
      ],
    });
  };

  const ibssBundle = data?.invoiceIbssAttachment?.bundleDocument;

  const user = getUserData();

  useEffect(() => {
    let eventSource;
    let timeoutId;

    const createEventSource = () => {
      if (invoiceNumber && !ibssBundle) {
        eventSource = new EventSource(
          `${baseUrl}/mycarrier-quotation/invoice/v1/webhook/document?invoiceNumber=${invoiceNumber}&userId=${user.sub}`,
        );

        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data?.data?.type === 'bundle') {
            fetchDetail({
              withLoading: false,
              onSuccess: () => {
                setSuccessToast('Bundling document successfully generated.');
              },
              onError: (error) => {
                setFailedAlert({ message: error.message });
              },
            });
          }
        };

        eventSource.onerror = (error) => {
          console.error('SSE connection error:', error);
          eventSource.close();
        };

        timeoutId = setTimeout(() => {
          eventSource.close();
          createEventSource();
        }, 25000); // Close and reconnect every 25 seconds
      }
    };

    createEventSource();

    return () => {
      eventSource?.close();
      clearTimeout(timeoutId);
    };
  }, [invoiceNumber, ibssBundle]);

  return {
    data,
    loading,
    switchValue,
    paymentHistory,
    fetcherUploadAttachment,
    fetchDeleteAttachment,
    fetchRefreshDocument,
    onRegenerateInvoice,
    onDeleteAttachment,
    onUploadAttachment,
    onRefreshDocument,
    onSwitch,
  };
};

export default useAction;
