import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { isHaveAccess } from '@utils/common';
import useQueryParams from '@utils/hooks/useQueryParams';
import { route } from '@configs/index';
import { getDetailProduct } from '@containers/ServiceDelivery/ServiceList/_repositories/repositories';

const useAction = (props) => {
  const { feature } = props;

  const { queryParams } = useQueryParams();
  const { id: custAccntNum, params: serviceId, projectId } = queryParams;

  const { setFailedAlert } = usePopupAlert();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchMTTR, setSearchMTTR] = useState(null);

  const fetchDetail = async (custAccntNum, serviceId) => {
    setLoading(true);
    try {
      setLoading(true);
      const { data } = await getDetailProduct(serviceId, custAccntNum);
      const normalizeData = {
        ...data,
        bandwidth: '' + data?.bandwidth,
      };
      setData(normalizeData);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (custAccntNum && serviceId) {
      if (isHaveAccess(feature, 'read_detail_service_list')) {
        fetchDetail(custAccntNum, serviceId);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
        setLoading(false);
      }
    }
  }, [custAccntNum, serviceId]);

  const breadcrumb = [
    { label: 'Service List', url: route.serviceList('list') },
    {
      label: custAccntNum,
      url: route.serviceList('detailCustomer', custAccntNum),
    },

    ...(projectId
      ? [
          {
            label: projectId,
            url: route.serviceList('detailProject', custAccntNum, projectId),
          },
        ]
      : []),
    { label: serviceId },
  ];

  return {
    breadcrumb,
    custAccntNum,
    serviceId,
    data,
    loading,
    searchMTTR,
    setSearchMTTR,
  };
};

export default useAction;
