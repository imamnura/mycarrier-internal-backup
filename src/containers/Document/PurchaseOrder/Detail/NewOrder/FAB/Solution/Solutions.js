import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { dateFormatConverter } from '@utils/converter';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { Grid } from '@material-ui/core';
import {
  getPurchaseOrderWorklog,
  getSolutionsStepper,
  schemaTable,
} from './utils';
import { statusLabel, statusVariant } from '../../../utils';
import { rupiahFormat } from '@utils/parser';
import List from '@fragments/List';
import Typography from '@components/Typography';
import ProgressUpload from '../../../lib/ProgressUpload';
import ReadMore from '@__old/components/elements/ReadMore';
import UpdateStatusForm from '@components/Form/UpdateStatus';
import UploadBasoForm from '../../../lib/form/UploadBaso';

const Solutions = (props) => {
  const {
    action,
    orderNumber,
    data,
    loading,
    fetchUpdateStatus,
    modalUpdateStatus,
    setModalUpdateStatus,
    modalUploadBaso,
    setModalUploadBaso,
    progress,
    setProgress,
  } = useAction(props);

  const { feature } = props;

  const breadcrumb = [
    { label: 'Purchase Order', url: route.purchaseOrder('list') },
    { label: orderNumber },
  ];

  const normalizeTableData = data?.packages?.map((item) => {
    return {
      ...item,
      description:
        item.description?.length > 70 ? (
          <ReadMore
            readMoreCharacterLimit={70}
            showLessButton={true}
            text={item.description}
          />
        ) : (
          item.description
        ),
      discount: item?.discount && `${item?.discount}%`,
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
            data: data || {},
            schema: [
              { name: 'orderNumber', label: 'Order Id' },
              {
                name: 'purchasedDate',
                label: 'Purchase Date',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
              },
              { name: 'bakesNumber', label: 'Bakes Number' },
              { name: 'custAccntName', label: 'Customer' },
              { name: 'categoryName', label: 'Product Category' },
              { name: 'orderType', label: 'Order Type' },
              { name: 'productName', label: 'Product' },
              { name: 'npwpNumber', label: 'NPWP' },
              {
                name: 'bakesStartDate',
                label: 'BAKES Start Date',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
                hidden: !data?.bakesStartDate,
              },
              {
                name: 'bakesEndDate',
                label: 'BAKES End Date',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
                hidden: !data?.bakesEndDate,
              },
              {
                name: 'bakesDuration',
                label: 'BAKES Duration',
                hidden: !data?.bakesDuration,
              },
              { name: 'address', label: 'Company Address', grid: 12 },
            ],
          },
        },
        {
          hidden: _.isEmpty(data?.accountManager),
          type: 'information',
          title: 'AM Information',
          properties: {
            data: data,
            schema: [
              { name: 'accountManager.name', label: 'Name' },
              { name: 'accountManager.nik', label: 'NIK' },
              { name: 'accountManager.segmen', label: 'Segment' },
              { name: 'accountManager.phone', label: 'Contact Number' },
              { name: 'accountManager.email', label: 'email' },
            ],
          },
        },
        {
          hidden: !data?.packages?.length,
          type: 'custom',
          title: 'Order Item',
          render: (
            <>
              <List {...listProps} />
              <Grid
                align="right"
                container
                item
                justifyContent="flex-end"
                md="auto"
                xs={12}
              >
                <Grid>
                  <Grid align="right" item style={{ marginTop: '1rem' }}>
                    <Typography
                      children="Grand Total"
                      style={{ paddingRight: '1.5rem' }}
                      variant="h5"
                      weight="light"
                    />
                    <Typography
                      children={rupiahFormat(data?.grandTotal)}
                      style={{ paddingRight: '3.5rem' }}
                      variant="h5"
                      weight="medium"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          ),
        },
        {
          hidden: !isHaveAccess(feature, 'read_attachment'),
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data || {},
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
            ...getSolutionsStepper(data?.status),
            steps: [
              'Submitted',
              'AM Approval',
              'Segment Approval',
              'Delivery Approval',
              'Provisioning',
              'BASO Signed',
              'Completed',
            ],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getPurchaseOrderWorklog(data?.worklog, data?.productName),
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
      <UpdateStatusForm
        content={modalUpdateStatus}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalUpdateStatus}
      />
      <UploadBasoForm
        content={modalUploadBaso}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalUploadBaso}
        setProgress={setProgress}
      />
      <ProgressUpload progress={progress} />
    </>
  );
};

Solutions.defaultProps = {
  feature: [],
};

Solutions.propTypes = {
  feature: PropTypes.array,
};

export default Solutions;
