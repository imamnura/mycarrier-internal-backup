import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDetailUserManagement } from '../../_repositories/repositories';
import useQueryParams from '@utils/hooks/useQueryParams';

const useAction = () => {
  const router = useRouter();
  const { setQueryParams } = useQueryParams();
  const {
    query: { id: userId },
  } = router;

  const [tab, setTab] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const result = await getDetailUserManagement(userId);
      setData(result.data);
      setLoading(false);
      await setQueryParams({ userType: result?.data?.metaData?.userType });
      await setTab(2);
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDetail();
    } else {
      setLoading(false);
    }
  }, [userId]);

  return {
    data,
    loading,
    tab,
    setTab,
    setData,
  };
};

export default useAction;
