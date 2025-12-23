import { useState, useEffect } from 'react';
import { getListMTTR } from '../../../../../../_repositories/repositories';

const useActions = (props) => {
  const { id, modalMTTR, setModalMTTR } = props;

  const [dataMTTR, setDataMTTR] = useState({
    data: [],
    meta: {},
  });
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const fetchMTTR = async (sid) => {
    const payload = {
      page: page,
      size: 5,
    };

    try {
      setLoading(true);
      const { data = [], metaData } = await getListMTTR(sid, payload);
      const normalizeData = {
        data: data,
        meta: {
          metaData,
        },
      };
      setDataMTTR(normalizeData);
    } catch (e) {
      setDataMTTR({
        data: [],
        meta: {},
      });
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setModalMTTR(false);
    setPage(1);
  };

  useEffect(() => {
    if (id && modalMTTR) {
      fetchMTTR(id);
    }
  }, [id, modalMTTR, page]);

  return {
    dataMTTR,
    isLoading,
    page,
    setPage,
    onClose,
  };
};

export default useActions;
