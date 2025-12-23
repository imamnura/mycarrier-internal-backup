import { isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDetailIsolate } from '../../_repositories/repositories';

const useAction = (props) => {
  const router = useRouter();
  const {
    query: { id: isolateId },
  } = router;

  const { feature } = props;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setFailedAlert } = usePopupAlert();

  const fetchDetail = async () => {
    if (!isHaveAccess(feature, 'read_detail_isolate_cdm')) {
      setFailedAlert({
        message: "You don't have permission to view detail.",
      });
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await getDetailIsolate(isolateId);
      setData(result.data);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isolateId) {
      fetchDetail();
    }
  }, [isolateId]);

  return {
    data,
    feature,
    loading,
    isolateId,
  };
};

export default useAction;
