import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { dateFormat } from '@utils/parser';
import {
  getDetailVisitNcx,
  updateStepVisitNcx,
} from '../../_repositories/repositories';
import { privilege } from '../utils';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: visitId } = router.query;

  const {
    canApproveAm,
    canApproveMarketing,
    canApproveOcc,
    canRejectAm,
    canRejectOcc,
    canRejectMarketing,
  } = privilege(feature);

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const hasNotForwarded = !data?.isForwarded || data?.forwardedTo?.length < 1;

  const normalizeData = (res) => {
    const { visitStartDate, visitEndDate, document: _document, room } = res;
    const docsName = [
      'spk',
      'ba',
      'nda',
      'additionalfile',
      'photo',
      'ktp',
      'swab',
      'vaccine',
    ];
    let document = {};

    docsName.forEach(
      (name) =>
        (document = {
          [name]: _document.filter(
            (i) => i?.type?.replace(' ', '').toLowerCase() === name,
          ),
          ...document,
        }),
    );

    const roomName =
      Array.isArray(room) && room?.length > 0
        ? room?.map((item, i) => {
            return room?.length > 1 && room?.length != i + 1
              ? `${item.roomName}, `
              : item.roomName;
          }) || '-'
        : room;

    return {
      ...res,
      ...document,
      visitDate: `${dateFormat({
        date: visitStartDate,
        type: 'date-month-year-time',
      })} - 
        ${dateFormat({ date: visitEndDate, type: 'date-month-year-time' })}`,
      roomName,
    };
  };

  const {
    isUrgentCase = false,
    status,
    isAssigned,
    isForwarded,
    historyActivity = [],
  } = data;

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const result = await getDetailVisitNcx(visitId);
      setData(normalizeData(result?.data));
      setLoading(false);
    } catch (error) {
      setData({});
      setLoading(false);
    }
  };

  const fetchUpdateStatus = async ({ id, updateTo, success }) => {
    const data = {
      status: updateTo,
    };

    closeConfirmation();
    setLoadingAlert();

    try {
      await updateStepVisitNcx(id, data);
      setSuccessAlert({
        message: success,
        onClose: () => fetchDetail(),
      });
    } catch (e) {
      setFailedAlert({
        message: e.message ?? 'Failed to Update Data',
      });
    }
  };

  useEffect(() => {
    if (visitId) {
      fetchDetail();
    }
  }, [visitId]);

  const onReject = ({ rejectBy }) => ({
    children: 'Reject',
    onClick: () =>
      setModalUpdateStatus({
        caption:
          'Once you rejected this, it will be process and data will be sent to customer automatically.',
        confirmation: 'Are you sure want to reject this visit request?',
        rejectBy,
        success: 'Visit request succesfully rejected',
        title: 'Please give note of reject',
        updateTo: 'rejected',
      }),
    variant: 'ghost',
  });

  const onForward = {
    children: 'Forward to Sigma-Witel-Arnet',
    onClick: () =>
      setConfirmation({
        message:
          'Are you sure want to confirm this visit request and forward to Sigma, Witel, and Arnet?',
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          {
            children: 'Yes',
            onClick: () => {
              fetchUpdateStatus({
                id: visitId,
                updateTo: 'forwarded',
                success:
                  'Visit request successfully confirmed and forwarded to Sigma, Witel, and Arnet',
              });
              closeConfirmation();
            },
          },
        ],
      }),
  };

  const onApprove = {
    children: 'Assign To AM',
    onClick: () =>
      setConfirmation({
        message: 'Are you sure want to assign this visit request to AM?',
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          {
            children: 'Yes',
            onClick: () => {
              fetchUpdateStatus({
                id: visitId,
                updateTo: 'assign to am',
                success: 'Visit request successfully assigned',
              });
              closeConfirmation();
            },
          },
        ],
      }),
  };

  const action = () => {
    let actions = [];

    if (status === 'checking') {
      if (isAssigned && !isForwarded) {
        if (isUrgentCase) {
          if (canRejectOcc) actions.push(onReject({ rejectBy: 'occ' }));
          if (canApproveOcc) actions.push(onForward);
        } else {
          if (canRejectAm)
            actions.push(onReject({ rejectBy: 'account_manager' }));
          if (canApproveAm) actions.push(onForward);
        }
      } else if (!isAssigned) {
        if (canRejectMarketing)
          actions.push(onReject({ rejectBy: 'marketing' }));
        if (canApproveMarketing) actions.push(onApprove);
      }
    }

    return actions;
  };

  const tableData = historyActivity?.map((data) => {
    const { date, activity } = data;

    const pickActivity = {
      CHECKIN: 'Check In',
      CHECKOUT: 'Check Out',
      VISITING: 'Visiting',
    }[activity];

    return {
      ...data,
      date: dateFormat({ date: date, type: 'date-time' }),
      activity: pickActivity,
    };
  });

  return {
    action,
    hasNotForwarded,
    fetchDetail,
    fetchUpdateStatus,
    visitId,
    data,
    feature,
    loading,
    modalUpdateStatus,
    setModalUpdateStatus,
    tableData,
  };
};

export default useAction;
