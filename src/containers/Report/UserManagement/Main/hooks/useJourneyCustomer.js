import { cleanObject } from '@utils/common';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getChartJourneyCustomer } from '../../_repositories/repositories';

const useJourneyCustomer = ({ period, dateRange, refreshCount }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchChart = async () => {
    setLoading(true);

    const _params = {
      startDate: dateRange[0] ? moment(dateRange[0]).format('YYYY-MM-DD') : '',
      endDate: dateRange[1] ? moment(dateRange[1]).format('YYYY-MM-DD') : '',
      period,
    };

    const params = cleanObject(_params);

    try {
      const result = await getChartJourneyCustomer(params);
      setLoading(false);
      setData(result.data);
    } catch (error) {
      setLoading(false);
      setData(null);
    }
  };

  useEffect(() => {
    fetchChart();
  }, [period, dateRange, refreshCount]);

  return {
    data,
    loading,
  };
};

export default useJourneyCustomer;
