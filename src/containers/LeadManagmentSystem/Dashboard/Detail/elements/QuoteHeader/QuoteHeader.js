import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import { route } from '@configs';
import LineItems from '../LineItems';

const QuoteHeader = (props) => {
  const { dashboardId, data, feature, loading } = useActions(props);

  const breadcrumb = [
    { label: 'Dashboard', url: route.dashboadLeadManagementSystem('list') },
    {
      label: dashboardId,
      url: route.dashboadLeadManagementSystem('detail', dashboardId),
    },
    { label: data?.quoteId || '-' },
  ];

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'information',
          title: 'Quote Detail',
          properties: {
            data: data || {},
            schema: [
              {
                label: 'QUOTE #',
                name: 'quoteNumber',
                grid: 3,
              },
              {
                label: 'SC QUOTE ID',
                name: 'scQuoteId',
                grid: 3,
              },
              {
                label: 'QUOTE NAME',
                name: 'quoteName',
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
                label: 'STATUS',
                name: 'status',
                grid: 3,
              },
              {
                label: 'FIRST NAME',
                name: 'firstName',
                grid: 3,
              },
              {
                label: 'LAST NAME',
                name: 'lastName',
                grid: 3,
              },
              {
                label: 'CREATED BY',
                name: 'createdBy',
                grid: 3,
              },
              {
                label: 'CUSTOMER ACCOUNT',
                name: 'customerAccount',
                grid: 3,
              },
            ],
          },
        },
        {
          type: 'custom',
          render: (
            <LineItems feature={feature} id={data?.quoteId} status="Quote" />
          ),
        },
        {
          type: 'numbering',
          title: 'Sales Team',
          hidden: !data?.salesTeam?.length,
          properties: {
            data: data?.salesTeam,
            schema: [
              { name: 'email', label: 'EMAIL', grid: 3 },
              { name: 'phoneNumber', label: 'PHONE NUMBER', grid: 3 },
            ],
          },
        },
        {
          type: 'information',
          title: 'Master Agreement Document',
          hidden: !data?.masterAgreement,
          properties: {
            data: data || {},
            schema: [
              {
                label: 'MASTER AGREEMENT',
                name: 'masterAgreement',
                grid: 12,
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'attachment',
          title: 'Child Agreement Document',
          hidden: !data?.childAgreementDoc,
          properties: {
            data: data,
            schema: [
              {
                name: 'childAgreementDoc',
                grid: 12,
              },
            ],
          },
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema}
        status={{
          children: data?.status,
          variant: 'warning',
        }}
      />
    </>
  );
};

QuoteHeader.defaultProps = {
  feature: [],
};

QuoteHeader.propTypes = {
  feature: PropTypes.array,
};

export default QuoteHeader;
