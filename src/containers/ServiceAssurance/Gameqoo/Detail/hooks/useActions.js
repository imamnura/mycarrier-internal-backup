import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFileInformation, isPreviewable } from '@utils/common';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDetail } from '../../_repositories/repositories';
import { priviledge } from '../utils';

const useAction = (props) => {
  const { feature } = props;

  const { setFailedAlert } = usePopupAlert();
  const { setDocumentViewer } = useDocumentViewer();

  const router = useRouter();
  const { id: referenceId } = router.query;

  const { canDetail, canDetailHistory } = priviledge(feature);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalReturn, setModalReturn] = useState(null);
  const [modalApproveIssue, setModalApproveIssue] = useState(null);
  const [modalChooseCategory, setModalChooseCategory] = useState(null);

  useEffect(() => {
    if (referenceId) {
      if (canDetail || canDetailHistory) {
        fetchDetail(referenceId)();
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
  }, [referenceId]);

  const fetchDetail = (id) => async () => {
    setLoading(true);
    try {
      const { data } = await getDetail(id);
      setData({
        ...data,
        worklog: data.historyWorklog,
        firstCall: '2',
      });
    } catch (e) {
      setData({});
    } finally {
      setLoading(false);
    }
  };

  const onClickModalReturn = () => () => {
    setModalReturn({
      title: 'Please give a reason of reject',
      textInfo: 'Once you give a reason, it will be readed by customer',
      submitText: 'OKAY',
      updateTo: 'Rejected',
      success: 'GameQoo ticket successfully rejected',
      confirmation: 'Are you sure want to reject this gameqoo ticket?',
    });
  };

  const onClickValidation = () => () => {
    setModalApproveIssue({
      title: 'Choose issue below',
      submitText: 'GO AHEAD',
    });
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
    feature,
    loading,
    modalReturn,
    setModalReturn,
    modalApproveIssue,
    setModalApproveIssue,
    modalChooseCategory,
    setModalChooseCategory,
    onClickModalReturn,
    onClickValidation,
    onPreviewWorklog,
  };
};

export default useAction;
