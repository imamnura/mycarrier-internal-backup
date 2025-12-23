import { useState, useEffect } from 'react';
import moment from 'moment';
import { getMRTGgraph } from '../../../../../../_repositories/repositories';
import { normalizeLine } from '../utils';

const useActions = (props) => {
  const { id, detailProduct } = props.data;
  const { burstable } = detailProduct;

  const [filterDateRange, setFilterDateRange] = useState([
    new Date(),
    new Date(),
  ]);
  const [dataMRTGgraph, setDataMRTGgraph] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchMRTGgraph = async (sid, burstable) => {
    const payload = {
      burstable: burstable,
      startDate: moment(filterDateRange[0]).format('YYYY-MM-DD'),
      endDate: moment(filterDateRange[1]).format('YYYY-MM-DD'),
    };

    try {
      setLoading(true);
      const { data } = await getMRTGgraph(sid, payload);
      setDataMRTGgraph(normalizeLine(data));
    } catch (e) {
      setDataMRTGgraph([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    if (id && detailProduct.hasOwnProperty('burstable')) {
      fetchMRTGgraph(id, burstable);
    } else {
      setLoading(false);
    }
  }, [id, filterDateRange]);

  return {
    dataMRTGgraph,
    isLoading,
    filterDateRange,
    setFilterDateRange,
  };
};

export default useActions;
