import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailGeneralProduct,
  getUrgency,
  getComplaint,
} from '../../_repositories/repositories';
import { priviledge } from '../utils';
import { getFileInformation, isPreviewable } from '@utils/common';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { capitalize } from '@utils/text';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: referenceId } = router.query;
  const { setFailedAlert } = usePopupAlert();
  const { setDocumentViewer } = useDocumentViewer();

  const { canDetail, canDetailHistory } = priviledge(feature);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalReturn, setModalReturn] = useState(null);
  const [modalLiveTracking, setModalLiveTracking] = useState(false);
  const [listUrgency, setUrgency] = useState([]);
  const [listComplaint, setComplaint] = useState([]);
  const [visibilityUpdateActivity, setVisibilityUpdateActivity] = useState({
    visible: true,
    disable: false,
  });
  const [popUp, _setPopUp] = useState({
    type: 'updateActivity',
    open: false,
  });

  const setPopUp =
    ({ type, open }) =>
    () =>
      _setPopUp({ type, open });

  const isPopUpOpen = (type) => {
    if (popUp.type === type) {
      return popUp.open;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (referenceId) {
      if (canDetail || canDetailHistory) {
        fetchComplaint();
        fetchUrgency();
        fetchDetail(referenceId);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
    setVisibilityUpdateActivity({ visible: true, disable: false });
  }, [referenceId]);

  useEffect(() => {
    if (data) {
      setData({
        ...data,
        urgency: listUrgency.find((v) => v.value === data.urgency)?.label,
        complaint: listComplaint.find((v) => v.value === data.complaint)?.label,
      });
    }
  }, [listUrgency, listComplaint]);

  const fetchDetail = async (id) => {
    setLoading(true);
    try {
      const { data } = await getDetailGeneralProduct(id);
      setData({
        ...data,
        worklog: data.historyWorklog,
      });
    } catch (e) {
      setData({});
    } finally {
      setLoading(false);
    }
  };

  const fetchComplaint = async () => {
    try {
      const result = await getComplaint();
      const resOptions = result.data.map(({ complaintName, complaintId }) => ({
        label: capitalize(complaintName),
        value: complaintId,
      }));
      setComplaint(resOptions);
    } catch (error) {
      setComplaint([]);
    }
  };

  const fetchUrgency = async () => {
    try {
      const result = await getUrgency();
      const resOptions = result.data.map(({ urgencyName, urgencyId }) => ({
        label: capitalize(urgencyName),
        value: urgencyId,
      }));
      setUrgency(resOptions);
    } catch (error) {
      setUrgency([]);
    }
  };

  const onClickValidation = (id) => () =>
    router.push(route.generalProduct('validation', id));

  const onClickModalReturn = () => () => {
    setModalReturn({
      title: 'Please give the reason of reject',
      textInfo: 'Once you give the reason, it will be read by customer',
      submitText: 'OKAY',
      updateTo: 'AM RETURNED',
      success: 'General Product ticket successfully rejected',
      confirmation: 'Are you sure want to reject this general product ticket?',
    });
  };

  const openModalLiveTracking = () => () => {
    setModalLiveTracking(true);
  };

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

  return {
    referenceId,
    fetchDetail,
    data,
    loading,
    modalReturn,
    setModalReturn,
    modalLiveTracking,
    setModalLiveTracking,
    onClickValidation,
    onClickModalReturn,
    openModalLiveTracking,
    popUp,
    setPopUp,
    isPopUpOpen,
    visibilityUpdateActivity,
    setVisibilityUpdateActivity,
    onPreviewWorklog,
  };
};

export default useAction;
