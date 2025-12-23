import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAgreementDetail } from '../../../../_repositories/repositories';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: dashboardId, params: agreementNumber } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const result = await getAgreementDetail(agreementNumber);
      const data = result.data || {};
      setData(data);
    } catch (error) {
      setData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (agreementNumber) {
      fetchDetail();
    }
  }, [dashboardId, agreementNumber]);

  return {
    dashboardId,
    agreementNumber,
    data,
    feature,
    loading,
  };
};

export default useAction;
