import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { route } from '@configs/index';
import Detail from '@fragments/Detail';
import Action from './elements/Action';
import Table from '@components/Table';
import {
  licenseSchema,
  publicIpSchema,
  serviceSchema,
  storageSchema,
  volumeSchema,
} from './utils';
import { Box } from '@material-ui/core';
import useStyles from './styles';
import useAction from './hooks/useAction';
import { isHaveAccess } from '@utils/common';
import VirtualMachine from './elements/VirtualMachine';

const DetailSettlement = (props) => {
  const {
    feature,
    userId,
    data,
    loading,
    onGenerateSettlement,
    onDownload,
    period,
    handlePeriod,
  } = useAction(props);
  const classes = useStyles();

  const breadcrumb = [
    { label: 'Settlement', url: route.settlement('list'), back: true },
    { label: userId },
  ];

  const tooltip = useMemo(() => {
    if (!data?.totalUsage) {
      return 'Settlement can’t be generated because the VM usage was zero (0)';
    }

    if (!period) {
      return 'Settlement can’t be generated because the period not selected';
    }

    return '';
  }, [data?.totalUsage, period]);

  const action = () => {
    let actions = [];
    if (isHaveAccess(feature, 'update_generate_settlement_cdm') && !loading) {
      actions.push({
        children: 'Generate Settlement',
        disabled: !data?.totalUsage || !period,
        onClick: onGenerateSettlement,
        tooltip: tooltip,
      });
    }
    return actions;
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'User Information',
          properties: {
            data: data?.userInformation || {},
            schema: [
              { name: 'userId', label: 'User Id', grid: 12 },
              { name: 'companyName', label: 'Company Name' },
              { name: 'billingEmail', label: 'Billing Email' },
              { name: 'fullName', label: 'Full Name' },
              { name: 'billingEmail', label: 'email' },
              { name: 'phoneNumber', label: 'Mobile Phone' },
              { name: 'createdDate', label: 'Created Date' },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Company Information',
          properties: {
            data: data?.companyInformation || {},
            schema: [
              { name: 'companyName', label: 'Company Name', grid: 12 },
              { name: 'address', label: 'Address', grid: 12 },
              { name: 'city', label: 'City' },
              { name: 'state', label: 'State' },
              { name: 'country', label: 'Country' },
              { name: 'postalCode', label: 'Postal Code' },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'custom',
          render: (
            <Action
              data={data}
              handlePeriod={handlePeriod}
              onDownload={onDownload}
              period={period}
            />
          ),
        },
        {
          type: 'custom',
          title: 'Virtual Machines',
          render: (
            <Box mt={3}>
              <VirtualMachine classes={classes} data={data?.virtualMachines} />
            </Box>
          ),
        },
        {
          type: 'custom',
          title: 'Additional Volume',
          render: (
            <Box mt={3}>
              <Table
                data={data?.additionalVolume}
                loadingRoot={loading}
                meta={{
                  page: data?.additionalVolume?.length,
                  size: 1,
                  totalData: data?.additionalVolume?.length,
                  totalPages: 1,
                }}
                numbering={false}
                schema={volumeSchema}
              />
            </Box>
          ),
        },
        {
          type: 'custom',
          title: 'Additional Public IP',
          render: (
            <Box mt={3}>
              <Table
                data={data?.additionalPublicIp}
                loadingRoot={loading}
                meta={{
                  page: data?.additionalPublicIp?.length,
                  size: 1,
                  totalData: data?.additionalPublicIp?.length,
                  totalPages: 1,
                }}
                numbering={false}
                schema={publicIpSchema}
              />
            </Box>
          ),
        },
        {
          type: 'custom',
          title: 'License',
          render: (
            <Box mt={3}>
              <Table
                data={data?.license}
                loadingRoot={loading}
                meta={{
                  page: data?.license?.length,
                  size: 1,
                  totalData: data?.license?.length,
                  totalPages: 1,
                }}
                numbering={false}
                schema={licenseSchema}
              />
            </Box>
          ),
        },
        {
          type: 'custom',
          title: 'Service',
          render: (
            <Box mt={3}>
              <Table
                data={data?.service}
                loadingRoot={loading}
                meta={{
                  page: data?.service?.length,
                  size: 1,
                  totalData: data?.service?.length,
                  totalPages: 1,
                }}
                numbering={false}
                schema={serviceSchema}
              />
            </Box>
          ),
        },
        {
          type: 'custom',
          title: 'Object Storage',
          render: (
            <Box mt={3}>
              <Table
                data={data?.objectStorage}
                loadingRoot={loading}
                meta={{
                  page: data?.objectStorage?.length,
                  size: 1,
                  totalData: data?.objectStorage?.length,
                  totalPages: 1,
                }}
                numbering={false}
                schema={storageSchema}
              />
            </Box>
          ),
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
      />
    </>
  );
};

DetailSettlement.defaultProps = {
  feature: [],
};

DetailSettlement.propTypes = {
  feature: PropTypes.array,
};

export default DetailSettlement;
