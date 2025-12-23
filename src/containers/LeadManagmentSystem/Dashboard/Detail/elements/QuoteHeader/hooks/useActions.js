import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getQuoteHeader } from '../../../../_repositories/repositories';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: dashboardId, params: scQuoteId } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const result = await getQuoteHeader(scQuoteId);
      const data = result.data || {};
      setData(data);
      setLoading(false);
    } catch (error) {
      setData({});
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scQuoteId) {
      fetchDetail();
    }
  }, [dashboardId, scQuoteId]);

  return {
    dashboardId,
    scQuoteId,
    data,
    feature,
    loading,
  };
};

export default useAction;
