import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDetailCustomer } from '../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { dateFormat } from '@utils/parser';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useAction = (props) => {
  const { feature } = props;
  const router = useRouter();
  const { id } = router.query;

  const { setFailedAlert } = usePopupAlert();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalBakes, setModalBakes] = useState(null);
  const [progress, setProgress] = useState(0);

  const fetchDetail = async (id) => {
    setLoading(true);
    try {
      const { data } = await getDetailCustomer(id);
      setData({
        ...data,
        lastUpdate: dateFormat({
          date: data?.lastUpdate,
          type: 'full-string-date',
          empty: '-',
        }),
      });
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      if (isHaveAccess(feature, 'read_detail')) {
        fetchDetail(id);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
  }, [id]);

  return {
    data,
    feature,
    fetchDetail,
    loading,
    modalBakes,
    setModalBakes,
    id,
    progress,
    setProgress,
  };
};

export default useAction;
