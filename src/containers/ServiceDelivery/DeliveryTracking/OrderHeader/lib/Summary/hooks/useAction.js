import { useEffect, useState } from 'react';
import useQueryParams from '@utils/hooks/useQueryParams';
import { getOrderSummary } from '../../../../_repositories/repositories';

const useAction = ({ filterStatus, setFilterStatus }) => {
  const initial = {
    totalOrder: 0,
    totalInProgress: 0,
    totalFailed: 0,
    totalCompleted: 0,
    totalCanceled: 0,
    totalSubmitted: 0,
  };

  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);
  const { queryParams } = useQueryParams();
  const { custAccntNum } = queryParams;

  const fetchOptionStatus = async (custAccntNum) => {
    try {
      const { data } = await getOrderSummary({ custAccntNum });
      setData(data);
    } catch (error) {
      setData(initial);
    } finally {
      setLoading(false);
    }
  };

  const onClickCard = (v) => () => {
    if (filterStatus.value === v) {
      setFilterStatus({ label: 'All Status', value: '' });
    } else setFilterStatus({ label: v, value: v });
  };

  useEffect(() => {
    fetchOptionStatus(custAccntNum);
  }, []);

  return {
    data,
    loading,
    onClickCard,
  };
};

export default useAction;
