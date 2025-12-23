import {
  getDetailSettlementList,
  updateStatusSettlementList,
} from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const useAction = ({ feature }) => {
  const router = useRouter();

  const settlementId = router.query.id;

  const [_data, setData] = useState(null);
  const data = useMemo(() => {
    if (!_data) {
      return null;
    }

    const tempAttachment = [..._data.attachment].reverse();

    const momDocument = tempAttachment?.find(({ type }) => type === 'mom');

    const signedMomDocument = tempAttachment?.find(
      ({ type }) => type === 'mom_signed',
    );

    const ndeDocument = tempAttachment?.find(({ type }) => type === 'nde');

    const invoiceDocument = tempAttachment?.find(
      ({ type }) => type === 'invoice',
    );

    return {
      ..._data,
      momDocument: momDocument
        ? {
            title: momDocument.fileName,
            url: momDocument.fileUrl,
          }
        : null,
      signedMomDocument: signedMomDocument
        ? {
            title: signedMomDocument.fileName,
            url: signedMomDocument.fileUrl,
          }
        : null,
      ndeDocument: ndeDocument
        ? {
            title: ndeDocument.fileName,
            url: ndeDocument.fileUrl,
          }
        : null,
      invoiceDocument: invoiceDocument
        ? {
            title: invoiceDocument.fileName,
            url: invoiceDocument.fileUrl,
          }
        : null,
    };
  }, [_data]);

  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const result = await getDetailSettlementList(settlementId);
      setData(result.data);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (settlementId) {
      fetchDetail();
    }
  }, [settlementId]);

  const [popUp, _setPopUp] = useState('');

  const onClosePopUp = () => _setPopUp('');
  const setPopUp = (val) => () => _setPopUp(val);

  const { setDocumentViewer: _setDocumentViewer } = useDocumentViewer();
  const setDocumentViewer = (val) => () => _setDocumentViewer(val);
  const [recepientCC, setRecepientCC] = useState([]);

  const { closeConfirmation, setConfirmation } = usePopupConfirmation();
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const fetchComplete = async () => {
    setLoadingAlert();
    closeConfirmation();

    const payload = {
      status: 'completed',
    };

    try {
      const result = await updateStatusSettlementList(settlementId, payload);
      if (result.data) {
        setData(result.data);
        setSuccessAlert({
          message:
            'Your settlement process is completed, please check your TREMS dashboard for the next process',
        });
      }
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const onCompleted = () => {
    setConfirmation({
      message: 'Are you sure want to complete this settlement?',
      action: [
        {
          children: 'no',
          onClick: closeConfirmation,
          variant: 'ghost',
        },
        {
          children: 'yes',
          onClick: fetchComplete,
        },
      ],
    });
  };

  return {
    data,
    popUp,
    feature,
    loading,
    recepientCC,
    setDocumentViewer,
    setRecepientCC,
    fetchComplete,
    onClosePopUp,
    onCompleted,
    setPopUp,
    setData,
  };
};

export default useAction;
