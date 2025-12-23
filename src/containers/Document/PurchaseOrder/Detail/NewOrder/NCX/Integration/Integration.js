import React from 'react';
import PropTypes from 'prop-types';
import Numbering from '@components/Numbering';
import { Grid } from '@material-ui/core';
import Detail from '@fragments/Detail';
import List from '@fragments/List';
import UpdateStatusForm from '@components/Form/UpdateStatus';
import Typography from '@components/Typography';
import { dateFormatConverter } from '@utils/converter';
import {
  getNeucentrixStepper,
  getPurchaseOrderWorklog,
  schemaTable,
} from './utils';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { rupiahFormat } from '@utils/parser';
import { statusLabel, statusVariant } from '../../../utils';
import useAction from './hooks/useActions';

const Neucentrix = (props) => {
  const {
    action,
    orderNumber,
    data,
    loading,
    fetchUpdateStatus,
    modalUpdateStatus,
    setModalUpdateStatus,
  } = useAction(props);
  const { feature } = props;

  const breadcrumb = [
    { label: 'Purchase Order', url: route.purchaseOrder('list') },
    { label: orderNumber },
  ];

  const normalizeTableData = data?.orderItem?.map((item) => {
    return {
      ...item,
      otc: rupiahFormat(item?.otc),
      mrc: rupiahFormat(item?.mrc),
    };
  });

  const listProps = {
    noMargin: true, 
    noPadding: true,
    table: {
      data: normalizeTableData,
      customBody: {
        verticalAlign: 'text-top',
      },
      customItem: {
        alignItems: 'top',
        padding: '20px 12px',
      },
      loading: loading,
      meta: {
        page: 0,
      },
      schema: schemaTable,
    },
    withTopDivider: false,
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Order Information',
          properties: {
            data: data,
            schema: [
              {
                name: 'ncxNumber',
                grid: 12,
                hidden: data?.status !== 'completed',
                label: 'NCX ORDER NUMBER',
                converter: (v) => (
                  <Typography
                    children={v || '-'}
                    variant="h4"
                    weight="medium"
                  />
                ),
              },
              { name: 'orderId', label: 'ORDER ID' },
              {
                name: 'purchasedDate',
                label: 'PURCHASE DATE',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
              },
              { name: 'purchaseOrderNumber', label: 'PO NUMBER (ON DOCUMENT)' },
              { name: 'bakesNumber', label: 'BAKES NUMBER' },
              {
                name: 'purchaseOrderDate',
                label: 'PO DATE (ON DOCUMENT)',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
              },
              { name: 'ttdBakesDays', label: 'TTD BAKES DAYS' },
              {
                name: 'agreementMasterNumber.agreeNumber',
                label: 'MASTER AGREEMENT NUMBER',
              },
              { name: 'bakesDuration', label: 'BAKES DURATION' },
              {
                name: 'bakesStartDate',
                label: 'BAKES START DATE',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
              },
              {
                name: 'bakesEndDate',
                label: 'BAKES END DATE',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
              },
              {
                name: 'expectedDeliveryDate',
                label: 'EXPECTED DELIVERY DATE',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
              },
              { name: 'orderType', label: 'ORDER TYPE' },
              { name: 'categoryName', label: 'Product Category' },
              { name: 'productName', label: 'Product' },
              { name: 'purchaseOrderSignerName', label: 'PO SIGNER NAME' },
            ],
          },
        },
        {
          type: 'information',
          title: 'Customer Information',
          properties: {
            data: data,
            schema: [
              { name: 'custAccntNum', label: 'CA NUMBER' },
              { name: 'custAccntName', label: 'COMPANY' },
              { name: 'billingAccount', label: 'BILLING ACCOUNT' },
              { name: 'serviceAccount', label: 'SERVICE ACCOUNT' },
              { name: 'name', label: 'FULL NAME' },
              { name: 'jobTitle', label: 'JOB TITLE' },
              { name: 'email', label: 'EMAIL' },
              { name: 'phone', label: 'MOBILE PHONE' },
              { name: 'businessType', label: 'BUSINESS TYPE' },
            ],
          },
        },
        {
          hidden: !data?.orderItem?.length,
          type: 'custom',
          title: 'Order Item',
          render: <List {...listProps} />,
        },
        {
          hidden: !data?.orderItem?.length,
          type: 'information',
          title: 'Total Price',
          properties: {
            data: data,
            schema: [
              {
                name: 'otc',
                label: 'ONE TIME CHARGE',
                converter: (v) => (
                  <Typography
                    children={rupiahFormat(v) || '-'}
                    variant="h4"
                    weight="medium"
                  />
                ),
              },
              {
                name: 'mrc',
                label: 'MONTHLY RECURRING PRICE',
                converter: (v) => (
                  <Typography
                    children={rupiahFormat(v) || '-'}
                    variant="h4"
                    weight="medium"
                  />
                ),
              },
            ],
          },
        },
        {
          hidden: !data?.accountManager?.length,
          type: 'custom',
          title: 'Account Manager',
          render: (
            <>
              {data?.accountManager?.map((d, i) => (
                <Grid
                  container
                  justifyContent="space-between"
                  key={i}
                  spacing={2}
                  style={{ marginBottom: 32 }}
                >
                  <Grid item xs>
                    <Numbering
                      alignItems="flex-start"
                      data={d}
                      number={i + 1}
                      schema={[
                        { name: 'name', label: 'NAME' },
                        { name: 'nik', label: 'NIK' },
                        { name: 'segment', label: 'SEGMENT' },
                        { name: 'role', label: 'ROLE' },
                        { name: 'position', label: 'POSITION' },
                        { name: 'phone', label: 'CONTACT NUMBER' },
                      ]}
                    />
                  </Grid>
                </Grid>
              ))}
            </>
          ),
        },
        {
          hidden: !data?.segmentManager,
          type: 'information',
          title: 'Manager Segment',
          properties: {
            data: data,
            schema: [
              { name: 'segmentManager.name', label: 'NAME' },
              { name: 'segmentManager.nik', label: 'NIK' },
              { name: 'segmentManager.title', label: 'TITLE' },
              { name: 'segmentManager.phone', label: 'CONTACT NUMBER' },
            ],
          },
        },
        {
          hidden: !isHaveAccess(feature, 'read_attachment'),
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data,
            schema: [
              { name: 'documentPO', label: 'Purchase Order' },
              { name: 'bakesFile', label: 'BAKES' },
              { name: 'activationDoc', label: 'BASO' },
              { name: 'siup', label: 'SIUP' },
              { name: 'companyDeed', label: 'Company Deed' },
              { name: 'npwp', label: 'NPWP' },
              { name: 'onboardingFile', label: 'Onboarding File' },
              { name: 'dataConsentFile', label: 'Data Consent File' },
              { name: 'additionalFile', label: 'Additional File' },
              { name: 'agreementDocument', label: 'Agreement' },
            ],
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
          title: 'Purchase Order Approval Step',
          properties: {
            ...getNeucentrixStepper(data?.status),
            steps: [
              'Submitted',
              'AM Approval',
              'Segment Approval',
              'Delay Order',
              'Completed',
            ],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getPurchaseOrderWorklog(data?.worklog),
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
        otherStatus={
          ['draft'].includes(data?.label)
            ? {
                children: statusLabel[data?.label],
                variant: statusVariant[statusLabel[data?.label]],
              }
            : {}
        }
        schema={detailSchema}
        status={{
          children: statusLabel[data?.status],
          variant: statusVariant[statusLabel[data?.status]],
        }}
      />
      <UpdateStatusForm
        content={modalUpdateStatus}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalUpdateStatus}
      />
    </>
  );
};

Neucentrix.defaultProps = {
  feature: [],
};

Neucentrix.propTypes = {
  feature: PropTypes.array,
};

export default Neucentrix;
