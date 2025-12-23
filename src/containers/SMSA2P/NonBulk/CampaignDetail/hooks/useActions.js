import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDetailCampaign } from '../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { dateFormat, rupiahFormat } from '@utils/parser';

const useAction = (props) => {
  const { feature } = props;

  const { setFailedAlert } = usePopupAlert();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id: orderNumber, params: campaignChild } = router.query;

  const fetchDetail = async (orderNumber, campaignChild) => {
    const params = {
      orderNumber,
      campaignChild,
    };

    const validatePath =
      router.asPath === route.nonBulk('campaign', orderNumber, campaignChild);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailCampaign({ params, withCancel: true });
        const normalize = {
          ...data,
          age: `${data?.minimumAge} - ${data?.maximumAge}`,
          ARPU: `${rupiahFormat(data?.minimumARPU)}
             - 
            ${rupiahFormat(data?.maximumARPU)}`,
          campaignDate: `${dateFormat({
            date: data?.campaignStartDate,
            type: 'date-time',
          })}
             - 
            ${dateFormat({ date: data?.campaignEndDate, type: 'date-time' })}`,
        };
        setData(normalize);
      } catch (error) {
        if (
          ['You are not allowed to access this menu!'].includes(error.message)
        ) {
          setFailedAlert({
            message: error.message,
          });
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (orderNumber && campaignChild) {
      if (isHaveAccess(feature, 'read_detail_non_bulk')) {
        fetchDetail(orderNumber, campaignChild);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
  }, [orderNumber, campaignChild]);

  return {
    orderNumber,
    campaignChild,
    data,
    loading,
    fetchDetail,
  };
};

export default useAction;
