import { route } from '@configs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDetailOfferingLetter } from '../../_repositories/repositories';

const useAction = () => {
  const router = useRouter();
  const {
    query: { id: offeringLetterId },
  } = router;

  const [tab, setTab] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const result = await getDetailOfferingLetter(offeringLetterId);

      if (result.data.status !== 'draft') {
        router.replace(
          route.offeringLetter('detail', result.data.offeringLetterId),
        );
      } else {
        const step = result.data.formStep === 4 ? 4 : result.data.formStep + 1;
        setTab(step);
        setData(result.data);
        setLoading(false);
      }
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (offeringLetterId) {
      fetchDetail();
    } else {
      setLoading(false);
    }
  }, [offeringLetterId]);

  return {
    data,
    loading,
    tab,
    setTab,
    setData,
  };
};

export default useAction;
