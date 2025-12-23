import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { currencyConverter, dateFormatConverter } from '@utils/converter';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { getTrialStepper } from './utils';
import { getPurchaseOrderWorklog, statusLabel, statusVariant } from '../utils';
import UpdateStatusForm from '@components/Form/UpdateStatus';

const Trial = (props) => {
  const {
    action,
    orderNumber,
    data,
    loading,
    fetchDetail,
    modalUpdateStatus,
    setModalUpdateStatus,
    fetchUpdateStatus,
  } = useAction(props);

  const { feature } = props;

  const breadcrumb = [
    { label: 'Purchase Order', url: route.purchaseOrder('list') },
    { label: orderNumber },
  ];

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
              { name: 'orderNumber', label: 'ORDER ID' },
              { name: 'bakesNumber', label: 'BAKES NUMBER' },
              {
                name: 'createdAt',
                label: 'PURCHASE DATE',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
                grid: 12,
              },
              { name: 'custAccntName', label: 'CUSTOMER' },
              { name: 'productName', label: 'PRODUCT' },
              { name: 'orderType', label: 'ORDER TYPE' },
              {
                name: 'trialDuration',
                label: 'TRIAL DURATION',
                converter: (values) =>
                  `${values} Month${values === 1 ? '' : 's'}`,
              },
              {
                name: 'accountBalance',
                label: 'ACCOUNT BALANCE',
                converter: currencyConverter,
              },
              { name: 'neucloudUsername', label: 'USERNAME' },
              {
                name: 'couponCode',
                label: 'COUPON CODE',
                hidden: !['completed', 'approved'].includes(data?.status),
              },
              {
                name: 'couponCodeExpired',
                label: 'COUPON EXPIRATION DATE',
                hidden: !['completed', 'approved'].includes(data?.status),
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
              },
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
            ...getTrialStepper(data?.status),
            steps: [
              'Submitted',
              'AM Approval',
              'Delivery Approval',
              'Approved',
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
        schema={detailSchema}
        status={{
          children: statusLabel[data?.status],
          variant: statusVariant[statusLabel[data?.status]],
        }}
      />
      <UpdateStatusForm
        content={modalUpdateStatus}
        fetchDetail={fetchDetail}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalUpdateStatus}
      />
    </>
  );
};

Trial.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default Trial;
