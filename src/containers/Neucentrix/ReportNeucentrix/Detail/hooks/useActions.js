import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDetailReportNeucentrix } from '../../_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { route } from '@configs';
import { isHaveAccess } from '@utils/common';

const useActions = (props) => {
  const { feature, id } = props;
  const router = useRouter();
  const { id: reportId } = router.query;

  const { setFailedAlert } = usePopupAlert();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalAddCompany, setModalAddCompany] = useState(false);
  const [modalReupload, setModalReupload] = useState(null);
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const onClickAddCompany = () => setModalAddCompany(!modalAddCompany);
  const onClickReupload = (i) => () => setModalReupload({ i });

  const onClose = () => {
    setModalAddCompany(false);
    setModalReupload(null);
  };

  const onCloseModalAddCompany = () => {
    onClose();
    closeConfirmation();
  };

  const fetchDetail = async () => {
    const validatePath = router.asPath === route.reportNcx('detail', reportId);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailReportNeucentrix(reportId);
        setData(data);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const action = () => {
    let actions = [];
    if (['Forwarded to WDM'].includes(data?.status)) {
      if (isHaveAccess(feature, 'create_company_name_ncx')) {
        actions.push({
          children: 'Add Company Name',
          onClick: onClickAddCompany,
        });
      }
    }

    return actions;
  };

  useEffect(() => {
    if (reportId) {
      if (isHaveAccess(feature, 'read_detail_report_ncx')) {
        fetchDetail();
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
  }, [reportId]);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  return {
    action,
    data,
    reportId,
    fetchDetail,
    loading,
    modalAddCompany,
    setModalAddCompany,
    modalReupload,
    setModalReupload,
    setConfirmation,
    closeConfirmation,
    onCloseModalAddCompany,
    onClickReupload,
  };
};

export default useActions;
