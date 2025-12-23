import { useState, useEffect } from 'react';
import moment from 'moment';
import { normalizeLineMRTG } from '../../../utils';
import { cleanObject } from '@utils/common';
import { getMRTGgraph } from '@containers/ServiceDelivery/ServiceList/_repositories/repositories';

const useActions = (props) => {
  const { data } = props;

  const [filterDateRange, setFilterDateRange] = useState([
    new Date(),
    new Date(),
  ]);
  const [dataMRTGgraph, setDataMRTGgraph] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [modalGraphMRTG, setModalGraphMRTG] = useState(false);

  const fetchMRTGgraph = async (serviceId, burstable) => {
    const _params = {
      burstable: burstable,
      startDate: moment(filterDateRange[0]).format('YYYY-MM-DD'),
      endDate: moment(filterDateRange[1]).format('YYYY-MM-DD'),
    };

    const params = cleanObject(_params);

    try {
      setLoading(true);
      const { data } = await getMRTGgraph(serviceId, params);
      setDataMRTGgraph(normalizeLineMRTG(data));
    } catch (e) {
      setDataMRTGgraph([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      data?.custAccntNum &&
      data?.sid &&
      typeof data?.isBurstable === 'boolean'
    ) {
      fetchMRTGgraph(data?.sid, data?.isBurstable);
    } else {
      setLoading(false);
    }
  }, [data, filterDateRange]);

  return {
    dataMRTGgraph,
    isLoading,
    filterDateRange,
    setFilterDateRange,
    modalGraphMRTG,
    setModalGraphMRTG,
  };
};

export default useActions;
