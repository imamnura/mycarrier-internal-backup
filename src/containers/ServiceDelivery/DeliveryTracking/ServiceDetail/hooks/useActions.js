import { useEffect, useMemo, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDetailService } from '@containers/ServiceDelivery/DeliveryTracking/_repositories/repositories';
import {
  cleanObject,
  getFileInformation,
  isHaveAccess,
  isPreviewable,
  titleCapitalize,
} from '@utils/common';
import useQueryParams from '@utils/hooks/useQueryParams';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { route } from '@configs/index';
import { findLastIndex } from 'lodash';

const useAction = (props) => {
  const { feature } = props;

  const { queryParams } = useQueryParams();
  const { custAccntNum, orderId, serviceId } = queryParams;

  const { setFailedAlert } = usePopupAlert();

  const { setDocumentViewer } = useDocumentViewer();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchMTTR, setSearchMTTR] = useState(null);

  const fetchDetail = async (custAccntNum, orderId, serviceId) => {
    const _params = {
      custAccntNum,
      orderId,
    };

    const params = cleanObject(_params);

    setLoading(true);
    try {
      const { data: res } = await getDetailService(serviceId, {
        params,
      });
      const normalizeData = {
        ...res,
        bandwidth: '' + res?.bandwidth,
      };
      setData(normalizeData);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (custAccntNum && orderId && serviceId) {
      if (isHaveAccess(feature, 'read_service_detail_delivery_tracking')) {
        fetchDetail(custAccntNum, orderId, serviceId);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
        setLoading(false);
      }
    }
  }, [custAccntNum, orderId, serviceId]);

  const onPreviewWorklog =
    ({ fileName, fileUrl }) =>
    () => {
      const { name, extension } = getFileInformation(fileUrl);

      if (isPreviewable(extension)) {
        setDocumentViewer({
          title: fileName || name,
          url: fileUrl,
        });
      } else {
        window.open(fileUrl);
      }
    };

  const stepperProps = useMemo(() => {
    let errors = undefined;
    let warnings = undefined;
    let errorsLabel = undefined;

    const steps =
      data?.orderStep?.map((item) => {
        return {
          ...item,
          label: titleCapitalize(item?.title),
          active: ['return', 'reject', 'success', 'idle'].includes(
            item?.variant,
          ),
        };
      }) || [];

    const active = findLastIndex(steps, ({ active }) => active);

    if (
      ['canceled', 'failed']?.includes(data?.orderLineStatus?.toLowerCase()) ||
      ['canceled', 'failed']?.includes(data?.deliveryStep?.toLowerCase())
    ) {
      errors = 'rejected';
      errorsLabel = steps[active]?.label;
    }

    return {
      steps,
      active,
      errors,
      errorsLabel,
      warnings,
    };
  }, [data]);

  const breadcrumb = [
    { label: 'Delivery Tracking', url: route.deliveryTracking('list') },
    {
      label: custAccntNum,
      url: route.deliveryTracking('detail', custAccntNum),
    },
    {
      label: orderId,
      url: route.deliveryTracking('detailOrder', custAccntNum, orderId),
    },
    { label: serviceId },
  ];

  return {
    stepperProps,
    breadcrumb,
    custAccntNum,
    orderId,
    serviceId,
    data,
    loading,
    searchMTTR,
    setSearchMTTR,
    onPreviewWorklog,
  };
};

export default useAction;
