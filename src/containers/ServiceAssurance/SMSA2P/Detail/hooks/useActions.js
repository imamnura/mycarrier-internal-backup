import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { getFileInformation, isHaveAccess, isPreviewable } from '@utils/common';
import { route } from '@configs';
import {
  getDetail,
  updateDetailStatus,
} from '../../_repositories/repositories';

const useActions = (props) => {
  const { feature } = props;
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { setDocumentViewer } = useDocumentViewer();
  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalReject, setModalReject] = useState(null);
  const [modalApproveIssue, setModalApproveIssue] = useState(null);
  const [modalEvidence, setModalEvidence] = useState(null);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const { data } = await getDetail(id);
      setData({ ...data });
    } catch (e) {
      setData({});
    } finally {
      setLoading(false);
    }
  };

  const updateCloseTicket = async () => {
    setLoadingAlert();
    closeConfirmation();

    const payload = {
      status: 'customer review',
      note: `Gangguan sudah kami tangani, terima kasih atas laporannya.
        Silahkan cek attachment dibawah sebagai dokumentasi perbaikan`,
    };

    try {
      await updateDetailStatus(id, payload);

      setSuccessAlert({
        message: 'Data has been sent to the provider',
        onClose: () => router.reload(),
      });
    } catch (e) {
      setFailedAlert({
        message: 'Failed to Update Data',
      });
    }
  };

  useEffect(() => {
    if (id) {
      if (
        isHaveAccess(feature, 'read_detail_ticket_smsa2p') ||
        isHaveAccess(feature, 'read_detail_history_ticket_smsa2p')
      ) {
        fetchDetail();
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
          onClose: () => router.push(route.smsa2p('list')),
        });
      }
    }
  }, [id]);

  const onPreviewWorklog =
    ({ fileName, fileUrl }) =>
    () => {
      const { name, extension } = getFileInformation(fileUrl);

      if (isPreviewable(extension)) {
        setDocumentViewer({
          title: fileName || name,
          url: fileUrl,
        });
      } else {
        window.open(fileUrl);
      }
    };

  const onClickReject = () => {
    setModalReject({
      title: 'Please give the reason of reject',
      caption:
        'Once you reject, it will be processed and data will be sent to the customer automatically',
      withUpload: false,
      success: 'Ticket successfully rejected',
      confirmation: 'Are you sure want to reject this ticket?',
    });
  };

  const onClickValidation = () => {
    setModalApproveIssue({
      title: 'Please filled the data <br/>to be sent to operator',
      submitText: 'SUBMIT',
      success: 'Data has been sent to the provider',
    });
  };

  const onClickEvidence = () => {
    setModalEvidence({
      title: 'Are you sure this trouble has been solved?',
      textInfo: 'Please complete data to be sent to customer',
      submitText: 'SUBMIT',
      withUpload: true,
      success: 'Data has been sent to the provider',
    });
  };

  const onClickCloseTicket = () => {
    const confirmation = {
      message: `Are you sure want to close this  ${data?.category} issue request?`,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: updateCloseTicket },
      ],
    };

    setConfirmation(confirmation);
  };

  return {
    id,
    fetchDetail,
    data,
    loading,
    actions: {
      reject: onClickReject,
      approve: onClickValidation,
      tecnicalHandling: onClickEvidence,
      close: onClickCloseTicket,
    },
    onPreviewWorklog,
    modalApproveIssue,
    setModalApproveIssue,
    modalReject,
    setModalReject,
    modalEvidence,
    setModalEvidence,
  };
};

export default useActions;
