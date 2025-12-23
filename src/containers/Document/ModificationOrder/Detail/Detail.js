import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import Detail from '@fragments/Detail';
import { convertToRupiah } from '@utils/text';
import { route } from '@configs';
import useAction from './hooks/useActions';
import {
  statusLabel,
  statusVariant,
  getModificationOrderStepper,
  getModificationOrderWorklog,
  boxMessage,
} from '../utils';
import EstimateValue from './lib/EstimateValue';
import UpdateStatus from './lib/forms/UpdateStatusForm';
import LinkBakes from './lib/forms/LinkBakes';

const DetailModificationOrder = (props) => {
  const {
    fetchDetail,
    orderNumber,
    data,
    loading,
    action,
    modalUpdateStatus,
    setModalUpdateStatus,
    modalLinkBakes,
    setModalLinkBakes,
  } = useAction(props);

  const breadcrumb = [
    { label: 'Modification Order', url: route.modificationOrder('list') },
    { label: orderNumber || '-' },
  ];

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Order Information',
          properties: {
            data: data || {},
            schema: [
              { name: 'productDetail.customerName', label: 'Customer Name' },
              { name: 'productDetail.serviceId', label: 'Service ID' },
              {
                name: 'productDetail.serviceLocation',
                label: 'Service Location',
              },
            ],
          },
        },
        {
          type: 'information',
          title: 'Upgrade Detail',
          properties: {
            data: data || {},
            schema: [
              { name: 'upgradeDetail.bakesNumber', label: 'BAKES Number' },
              { name: 'upgradeDetail.orderNumber', label: 'Order ID' },
              {
                name: 'upgradeDetail.productName',
                label: 'Product Name',
                grid: 12,
              },
              { name: 'existingProductCapacity', label: 'Existing Bandwith' },
              { name: 'modificationCapacity', label: 'Modification Bandwith' },
              { name: 'upgradeDetail.duration', label: 'Duration', grid: 12 },
              ...(!data?.upgradeDetail?.isPermanent
                ? [
                    {
                      name: 'upgradeDetail.price',
                      label: 'Price',
                      grid: 12,
                      converter: (value) => (
                        <Typography
                          children={convertToRupiah(value)}
                          color="primary-main"
                          inline
                          variant="h5"
                          weight="medium"
                        />
                      ),
                    },
                  ]
                : []),
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data?.allDocument || {},
            schema: [
              {
                name: 'documentBakes',
                label: 'BAKES',
              },
              {
                name: 'documentBaso',
                label: 'BASO',
              },
              {
                name: 'documentPO',
                label: 'PO',
              },
              {
                name: 'additionalFile',
                label: 'Additional File',
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        ...(boxMessage[data?.status]?.title
          ? [
              {
                type: 'custom',
                title: boxMessage[data?.status]?.title,
                render: (
                  <EstimateValue
                    loading={loading}
                    value={data?.note}
                    variant={boxMessage[data?.status]?.variant}
                  />
                ),
              },
            ]
          : []),
        {
          type: 'stepper',
          title: 'Modification Order Approval Step',
          properties: {
            ...getModificationOrderStepper(data?.status),
            steps: [
              'Upgrade Request',
              'Review Bakes',
              'Service Upgrading',
              'BASO Sign',
              'Upgrade Complete',
              'Downgrade Complete',
            ],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getModificationOrderWorklog(data?.worklog),
          },
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema}
        status={{
          children: statusLabel[data?.status],
          variant: statusVariant[statusLabel[data?.status]],
        }}
      />
      <UpdateStatus
        fetchDetail={fetchDetail}
        id={orderNumber}
        modalUpdateStatus={modalUpdateStatus}
        setModalUpdateStatus={setModalUpdateStatus}
      />
      <LinkBakes
        fetchDetail={fetchDetail}
        id={orderNumber}
        modalLinkBakes={modalLinkBakes}
        setModalLinkBakes={setModalLinkBakes}
      />
    </>
  );
};

DetailModificationOrder.defaultProps = {
  feature: [],
};

DetailModificationOrder.propTypes = {
  feature: PropTypes.array,
};

export default DetailModificationOrder;
