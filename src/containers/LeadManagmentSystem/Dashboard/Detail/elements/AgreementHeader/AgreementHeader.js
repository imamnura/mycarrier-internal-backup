import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import { route } from '@configs';

const AgreementHeader = (props) => {
  const { dashboardId, data, loading } = useActions(props);

  const breadcrumb = [
    { label: 'Dashboard', url: route.dashboadLeadManagementSystem('list') },
    {
      label: dashboardId,
      url: route.dashboadLeadManagementSystem('detail', dashboardId),
    },
    { label: data?.agreementNumber || '-' },
  ];

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'information',
          title: 'Agreement Detail',
          properties: {
            data: data || {},
            schema: [
              {
                label: 'CUSTOMER NAME',
                name: 'customerAccount',
                grid: 3,
              },
              {
                label: 'CA NUMBER',
                name: 'caNumber',
                grid: 3,
              },
              {
                label: 'CREATED DATE',
                name: 'created',
                type: 'date-time',
                grid: 3,
              },
              {
                label: 'START DATE',
                name: 'startDate',
                type: 'date-time',
                grid: 3,
              },
              {
                label: 'END DATE',
                name: 'endDate',
                type: 'date-time',
                grid: 3,
              },
              {
                label: 'STATUS',
                name: 'status',
                grid: 3,
              },
              {
                label: 'TYPE',
                name: 'type',
                grid: 3,
              },
            ],
          },
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
          hidden: !data?.masterAgreementName,
          properties: {
            data: data || {},
            schema: [
              {
                label: 'MASTER AGREEMENT',
                name: 'masterAgreementName',
                grid: 12,
              },
              {
                label: 'CHILD AGREEMENT NUMBER',
                name: 'agreementNumber',
                grid: 12,
              },
              {
                label: 'CHILD AGREEMENT NAME',
                name: 'agreementName',
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
          hidden: !data?.attachments,
          properties: {
            data: data,
            schema: [
              {
                name: 'attachments',
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

AgreementHeader.defaultProps = {
  feature: [],
};

AgreementHeader.propTypes = {
  feature: PropTypes.array,
};

export default AgreementHeader;
