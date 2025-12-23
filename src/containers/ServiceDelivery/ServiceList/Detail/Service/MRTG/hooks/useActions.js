import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import GraphMRTG from '../elements/GraphMRTG';
import Mttr from '../elements/MTTR';
import Topology from '../elements/Topology';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { dateFormatConverter } from '@utils/converter';
import { isHaveAccess, titleCapitalize } from '@utils/common';
import { getDetailProduct } from '../../../../_repositories/repositories';
import { getServiceWorklog, schemaMTTR } from '../../utils';
import findLastIndex from 'lodash/findLastIndex';

const useActions = (props) => {
  const { feature } = props;
  const router = useRouter();
  const { setFailedAlert } = usePopupAlert();
  const { id: custAccntNum, params: serviceId } = router.query;

  const [detailProduct, setDetailProduct] = useState(null);
  const [modalGraph, setModalGraph] = useState(null);
  const [modalMTTR, setModalMTTR] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const fetchDetail = async (sid, custNum) => {
    try {
      setLoading(true);
      const { data } = await getDetailProduct(sid, custNum);
      const normalizeData = {
        ...data,
        bandwidth: '' + data?.bandwidth,
      };
      setDetailProduct(normalizeData);
    } catch (e) {
      setDetailProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const normalizeTopology = (data) => {
    return {
      ...data,
      topologyLog: data?.topologyLog.map((item) => ({
        message: item?.value,
        info: item?.status && `Status: ${item?.status}`,
      })),
    };
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

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Service Detail',
          properties: {
            schema: [
              { name: 'sid', label: 'SERVICE ID' },
              { name: 'productName', label: 'PRODUCT & SERVICE' },
              {
                name: 'activatedDate',
                label: 'ORDER DATE',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
              ...(['Isolated', 'Request to Open', 'REQUEST'].includes(
                detailProduct?.status,
              )
                ? [
                    {
                      name: 'isolateDate',
                      label: 'DATE ISOLATE',
                      converter: dateFormatConverter({
                        type: 'date-time',
                        empty: '-',
                      }),
                    },
                  ]
                : [
                    {
                      name: 'lastUpdate',
                      label: 'LAST UPDATE',
                      converter: dateFormatConverter({
                        type: 'date-time',
                        empty: '-',
                      }),
                    },
                  ]),
              { name: 'bandwidth', label: 'BANDWIDTH', grid: 12 },
              { name: 'siteId', label: 'SITE ID', grid: 12 },
              { name: 'serviceLocation', label: 'SERVICE LOCATION', grid: 12 },
            ],
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
              { name: 'serviceLocation', label: 'SERVICE LOCATION', grid: 12 },
            ],
            data: detailProduct,
          },
        },
        {
          type: 'custom',
          title: 'MTTR',
          render: (
            <Mttr
              data={detailProduct?.mttr}
              modalMTTR={modalMTTR}
              schema={schemaMTTR}
              setModalMTTR={setModalMTTR}
            />
          ),
        },
        {
          type: 'custom',
          title: 'Topology',
          render: (
            <Topology
              data={normalizeTopology(detailProduct?.topology)}
              schema={[
                { name: 'onu', label: 'ONU RX POWER', grid: 4 },
                { name: 'olt', label: 'OLT RX POWER', grid: 4 },
                { name: 'utilization', label: 'UTILIZATION', grid: 4 },
              ]}
            />
          ),
        },
        {
          type: 'custom',
          title: 'MRTG',
          // hidden: !detailProduct?.hasOwnProperty('burstable'),
          render: (
            <GraphMRTG
              data={{ detailProduct, id: serviceId }}
              modalGraph={modalGraph}
              schema={[
                { name: 'averageIn', label: 'AVERAGE IN' },
                { name: 'averageOut', label: 'AVERAGE OUT' },
                { name: 'maxIn', label: 'MAX IN' },
                { name: 'maxOut', label: 'MAX OUT' },
              ]}
              setModalGraph={setModalGraph}
            />
          ),
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
    modalGraph,
    setModalGraph,
    modalMTTR,
    setModalMTTR,
    query: router.query,
  };
};

export default useActions;
