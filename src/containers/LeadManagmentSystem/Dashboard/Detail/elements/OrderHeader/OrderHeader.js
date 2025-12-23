import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import { route } from '@configs';
import LineItems from '../LineItems';
import { schemaOrderHeader } from '@containers/LeadManagmentSystem/Dashboard/utils';

const OrderHeader = (props) => {
  const { dashboardId, orderId, data, feature, loading } = useActions(props);

  const breadcrumb = [
    { label: 'Dashboard', url: route.dashboadLeadManagementSystem('list') },
    {
      label: dashboardId,
      url: route.dashboadLeadManagementSystem('detail', dashboardId),
    },
    { label: orderId || '-' },
  ];

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'information',
          title: 'Order Detail',
          properties: {
            data: data || {},
            schema: [
              {
                label: 'SC ORDER ID',
                name: 'scOrderId',
                grid: 3,
              },
              {
                label: 'ORDER #',
                name: 'orderNumber',
                grid: 3,
              },
              {
                label: 'ORDER ID',
                name: 'orderId',
                grid: 3,
              },
              {
                label: 'REVISION',
                name: 'revision',
                grid: 3,
              },
              {
                label: 'TYPE',
                name: 'type',
                grid: 3,
              },
              {
                label: 'ACCOUNT',
                name: 'account',
                grid: 3,
              },
              {
                label: 'SITE',
                name: 'site',
                grid: 3,
              },
              {
                label: 'STATUS',
                name: 'status',
                grid: 3,
              },
              {
                label: 'INTEGRATION STATUS',
                name: 'integrationStatus',
                grid: 3,
              },
              {
                label: 'INTEGRATION PROCESS',
                name: 'integrationProcess',
                grid: 3,
              },
              {
                label: 'TOTAL',
                name: 'total',
                grid: 3,
              },
              {
                label: 'PO DATE',
                name: 'poDate',
                type: 'date-time',
                grid: 3,
              },
              {
                label: 'PO NUMBER',
                name: 'poNumber',
                grid: 3,
              },
              {
                label: 'PO SIGNER',
                name: 'poSigner',
                grid: 3,
              },
            ],
          },
        },
        {
          type: 'custom',
          render: (
            <LineItems
              feature={feature}
              id={data?.orderNumber}
              status="Order"
            />
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        // action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema}
        status={{
          children: data?.status,
          variant: schemaOrderHeader[data?.status] || 'primary',
        }}
      />
    </>
  );
};

OrderHeader.defaultProps = {
  feature: [],
};

OrderHeader.propTypes = {
  feature: PropTypes.array,
};

export default OrderHeader;
