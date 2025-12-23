import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getOrderHeader } from '../../../../_repositories/repositories';
import { dateFormat } from '@utils/parser';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: dashboardId, params: orderId } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const result = await getOrderHeader(orderId);
      const data = result.data || {};
      const normalize = {
        ...data,
        poDate: dateFormat({ date: data.poDate, type: 'date-time-full' }),
        // status: maskOrderHeaderStatus(data.status)
      };
      setData(normalize);
      setLoading(false);
    } catch (error) {
      setData({});
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchDetail();
    }
  }, [dashboardId, orderId]);

  return {
    dashboardId,
    orderId,
    data,
    feature,
    loading,
  };
};

export default useAction;
