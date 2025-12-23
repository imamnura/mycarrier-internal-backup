import {
  getDetailUsers,
  generateSettlement,
  downloadPdf,
} from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { isHaveAccess } from '@utils/common';
import moment from 'moment';
import { cleanObject } from '@utils/common';
import { route } from '@configs';

const useAction = (props) => {
  const router = useRouter();
  const { feature } = props;

  const userId = router.query.id;
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(null);

  const fetchDetail = async ({
    alertLoading = false,
    period: _period,
  } = {}) => {
    if (alertLoading) {
      setLoadingAlert();
    } else {
      setLoading(true);
    }

    const periode = _period || period;

    const params = {
      periode: periode ? moment(periode).format('MMYYYY') : '',
      userId,
    };

    try {
      const result = await getDetailUsers(params);
      setData(result.data);
      setLoading(false);
      if (alertLoading) {
        setSuccessAlert({ message: '' });
      }
    } catch (error) {
      setData(null);
      setLoading(false);
      if (alertLoading) {
        setFailedAlert({ message: error.message });
      }
    }
  };

  const handlePeriod = (date) => {
    setPeriod(date ? moment(date).format('YYYY-MM') : null);
    fetchDetail({ alertLoading: true, period: date });
  };

  useEffect(() => {
    if (userId) {
      if (
        isHaveAccess(feature, 'read_detail_user_settlement_am') ||
        isHaveAccess(feature, 'read_detail_user_settlement_cdm')
      ) {
        fetchDetail();
      } else {
        setFailedAlert({
          message: "You don't have permission to read users detail",
        });
        setLoading(false);
        setData(null);
      }
    }
  }, [userId]);

  const redirect = (settlementId) => () =>
    router.push(route.settlement('detailSettlementList', settlementId));

  const fetchGenerateSettlement = async () => {
    setLoadingAlert(true);
    const data = {
      userId,
      periode: period ? moment(period).format('MMYYYY') : '',
    };

    try {
      const result = await generateSettlement(data);
      closeConfirmation();
      setSuccessAlert({
        message: 'Settlement successfully generated and sended to AM',
        onClose: redirect(result.data?.settlementId),
      });
    } catch (error) {
      closeConfirmation();
      setFailedAlert({
        message: error.message || 'Failed generate settlement',
      });
    }
  };

  const onGenerateSettlement = () => {
    setConfirmation({
      message:
        'Are you sure want to generate settlement from this data and send to AM?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchGenerateSettlement },
      ],
    });
  };

  const fetchDownload = async () => {
    setLoadingAlert(true);
    const payload = {
      userId,
      periode: period
        ? moment(period).format('MMYYYY')
        : moment().format('MMYYYY'),
    };

    const params = cleanObject(payload);

    try {
      const result = await downloadPdf({ params });
      closeConfirmation();
      window.open(result.data?.fileUrl, '_blank');
      setSuccessAlert({
        message: 'Monthly usage successfully downloaded',
      });
    } catch (error) {
      closeConfirmation();
      setFailedAlert({ message: 'Monthly usage unsuccessfully downloaded' });
    }
  };

  const onDownload = () => {
    setConfirmation({
      message: 'Are you sure want to download monthly usage from this period?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchDownload },
      ],
    });
  };

  return {
    data,
    feature,
    handlePeriod,
    loading,
    onDownload,
    onGenerateSettlement,
    period,
    userId,
    fetchGenerateSettlement,
    fetchDownload,
    redirect,
  };
};

export default useAction;
