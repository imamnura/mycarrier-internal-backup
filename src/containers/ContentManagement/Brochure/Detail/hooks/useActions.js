import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getDetailBrochure } from '@containers/ContentManagement/Brochure/_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { normalizeDetail } from '../constant';

const useActions = (props) => {
  const { feature } = props;
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { setFailedAlert } = usePopupAlert();
  const [detail, setDetail] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      if (isHaveAccess(feature, 'read_detail_user_downloaded_brochure')) {
        fetchDetail(id);
      } else {
        setFailedAlert({
          message: `You don't have permission to view this page.`,
        });
      }
    }
  }, [id]);

  const fetchDetail = async (id) => {
    setLoading(true);
    try {
      const { data } = await getDetailBrochure(id);
      setDetail(normalizeDetail(data));
    } catch (e) {
      setDetail({});
    } finally {
      setLoading(false);
    }
  };

  return {
    detail,
    isLoading,
  };
};

export default useActions;
