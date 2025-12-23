import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { dateFormatConverter } from '@utils/converter';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { getSubscribeStepper, getNeucloudStepper } from './utils';
import { getPurchaseOrderWorklog, statusLabel, statusVariant } from '../utils';
import UpdateStatusForm from '@components/Form/UpdateStatus';
import UploadBasoForm from '../lib/form/UploadBaso';
import EmptyBakes from '../lib/form/EmptyBakes/EmptyBakes';
import ProgressUpload from '../lib/ProgressUpload';

const Subscribe = (props) => {
  const {
    action,
    orderNumber,
    data,
    loading,
    fetchDetail,
    modalUpdateStatus,
    setModalUpdateStatus,
    modalUploadBaso,
    setModalUploadBaso,
    fetchUpdateStatus,
    modalBakes,
    setModalBakes,
    progress,
    setProgress,
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
              {
                name: 'npwp',
                label: 'NPWP',
                hidden: !data?.productName == 'Neucloud Elastica',
              },
              {
                name: 'address',
                label: 'Address',
                hidden: !data?.productName == 'Neucloud Elastica',
              },
              { name: 'orderType', label: 'ORDER TYPE' },
              { name: 'neucloudUsername', label: 'USERNAME' },
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
        data?.productName === 'NeuCloud Elastica'
          ? {
              type: 'stepper',
              title: 'Purchase Order Approval Step',
              properties: {
                ...getNeucloudStepper(data?.status),
                steps: [
                  'Submitted',
                  'AM Approval',
                  'Delivery Approval',
                  'Provisioning',
                  'BASO Signed',
                  'Approved',
                ],
              },
            }
          : {
              type: 'stepper',
              title: 'Purchase Order Approval Step',
              properties: {
                ...getSubscribeStepper(data?.status),
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
        fetchDetail={fetchDetail}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalUpdateStatus}
      />
      <UploadBasoForm
        content={modalUploadBaso}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalUploadBaso}
        setProgress={setProgress}
      />
      <EmptyBakes
        content={modalBakes}
        getDetail={fetchDetail}
        setContent={setModalBakes}
        setProgress={setProgress}
      />
      <ProgressUpload progress={progress} />
    </>
  );
};

Subscribe.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default Subscribe;
