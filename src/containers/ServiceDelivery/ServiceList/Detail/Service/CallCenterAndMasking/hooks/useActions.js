import { useState, useEffect, useMemo } from 'react';
import { isHaveAccess, titleCapitalize } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { dateFormatConverter } from '@utils/converter';
import { getDetailProduct } from '../../../../_repositories/repositories';
import { useRouter } from 'next/router';
import { getServiceWorklog } from '../../utils';
import { findLastIndex } from 'lodash';

const useActions = (props) => {
  const { feature } = props;
  const router = useRouter();
  const { setFailedAlert } = usePopupAlert();
  const { id: custAccntNum, params: serviceId } = router.query;

  const [detailProduct, setDetailProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchDetail = async (sid, custNum) => {
    try {
      setLoading(true);
      const { data } = await getDetailProduct(sid, custNum);
      setDetailProduct(data);
    } catch (e) {
      setDetailProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const stepperProps = useMemo(() => {
    let errors = undefined;
    let warnings = undefined;
    let errorsLabel = undefined;

    const steps =
      detailProduct?.overallProgress?.map((item) => {
        return {
          ...item,
          label: titleCapitalize(item?.title),
          active: ['return', 'reject', 'success', 'idle'].includes(
            item?.variant,
          ),
        };
      }) || [];

    const active = findLastIndex(steps, ({ active }) => active);

    if (['return', 'reject'].includes(steps[active]?.variant)) {
      errors = {
        return: 'returned',
        reject: 'rejected',
      }[steps[active]?.variant];
      errorsLabel = steps[active]?.label;
    }

    return {
      steps,
      active,
      errors,
      errorsLabel,
      warnings,
    };
  }, [detailProduct]);

  const detailSchema = (params) => {
    const information = [
      { name: 'sid', label: 'SERVICE ID' },
      { name: 'productName', label: 'PRODUCT & SERVICE' },
      {
        name: 'activatedDate',
        label: 'ACTIVATED DATE',
        converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
      },
      ...(['Isolated', 'Request to Open', 'REQUEST'].includes(
        detailProduct?.status,
      )
        ? [
            {
              name: 'isolateDate',
              label: 'DATE ISOLATE',
              converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
            },
          ]
        : [
            {
              name: 'lastUpdate',
              label: 'LAST UPDATE',
              converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
            },
          ]),
    ];

    const additionalInformation = {
      'call-center': [
        { name: 'inNumber', label: 'IN NUMBER', grid: 12 },
        { name: 'translationNumber', label: 'TRANSLATION NUMBER', grid: 12 },
      ],
      masking: [
        { name: 'aNumberExisting', label: 'A NUMBER EXISTING' },
        { name: 'aNumberMasking', label: 'A NUMBER MASKING' },
      ],
      itkp: [
        { name: 'aNumberExisting', label: 'A NUMBER EXISTING' },
        { name: 'aNumberMasking', label: 'A NUMBER MASKING' },
      ],
      'calling-card': [
        { name: 'orderNumber', label: 'ORDER NUMBER', grid: 12 },
      ],
    };

    return [
      {
        gridProps: { xs: 12, md: 6 },
        content: [
          {
            type: 'information',
            title: 'Service Detail',
            properties: {
              schema: [...information, ...additionalInformation[params]],
              data: detailProduct,
            },
          },
          {
            type: 'information',
            title: 'Activation Detail',
            properties: {
              schema: [
                { name: 'custAccntName', label: 'COMPANY' },
                { name: 'siteId', label: 'SITE ID' },
                {
                  name: 'serviceLocation',
                  label: 'SERVICE LOCATION',
                  grid: 12,
                },
              ],
              data: detailProduct,
            },
          },
        ],
      },
      {
        gridProps: { xs: 12, md: 6 },
        stickRight: true,
        content: [
          {
            type: 'stepper',
            title: 'Order Step',
            properties: {
              ...stepperProps,
            },
          },
          {
            type: 'worklog',
            title: 'History Work Log',
            properties: {
              data: getServiceWorklog(detailProduct?.worklog),
            },
          },
        ],
        hidden: !['On Delivery'].includes(detailProduct?.status),
      },
    ];
  };

  useEffect(() => {
    if (serviceId && isHaveAccess(feature, 'read_detail_service_list')) {
      fetchDetail(serviceId, custAccntNum);
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail service.",
      });
    }
  }, [serviceId]);

  return {
    detailProduct,
    isLoading,
    detailSchema,
    query: router.query,
  };
};

export default useActions;
