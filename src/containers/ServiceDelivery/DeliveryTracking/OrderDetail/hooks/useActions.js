import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDetailOrder } from '@containers/ServiceDelivery/DeliveryTracking/_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import useQueryParams from '@utils/hooks/useQueryParams';
import { route } from '@configs/index';

const useAction = (props) => {
  const { feature } = props;

  const { queryParams } = useQueryParams();
  const { custAccntNum, orderId } = queryParams;

  const { setFailedAlert } = usePopupAlert();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async (custAccntNum, orderId) => {
    const _params = {
      custAccntNum,
    };

    const params = cleanObject(_params);

    setLoading(true);
    try {
      const { data: res } = await getDetailOrder(orderId, {
        params,
      });
      setData(res);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (custAccntNum && orderId) {
      if (isHaveAccess(feature, 'read_order_detail_delivery_tracking')) {
        fetchDetail(custAccntNum, orderId);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
        setLoading(false);
      }
    }
  }, [custAccntNum, orderId]);

  const breadcrumb = [
    { label: 'Delivery Tracking', url: route.deliveryTracking('list') },
    {
      label: custAccntNum,
      url: route.deliveryTracking('detail', custAccntNum),
    },
    { label: orderId },
  ];

  return {
    breadcrumb,
    custAccntNum,
    orderId,
    data,
    loading,
  };
};

export default useAction;
