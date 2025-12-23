import React from 'react';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import BaseForm from '@components/Form/UpdateStatus';
import EmptyBakes from '../lib/form/EmptyBakes';
import ProgressUpload from '../lib/ProgressUpload';
import {
  breadcrumb,
  getPurchaseOrderWorklog,
  statusLabel,
  statusVariant,
} from '../utils';
import { dateFormatConverter } from '@utils/converter';
import { getModifyDisconnectStepper } from './utils';
import { isHaveAccess } from '@utils/common';

const ModifyDisconnect = (props) => {
  const {
    action,
    data,
    feature,
    fetchDetail,
    fetchUpdateStatus,
    loading,
    modalBakes,
    setModalBakes,
    modalUpdateStatus,
    orderNumber,
    progress,
    setProgress,
    setModalUpdateStatus,
  } = useActions(props);

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
              { name: 'orderNumber', label: 'Order ID' },
              { name: 'bakesNumber', label: 'Bakes Number' },
              {
                name: 'purchasedDate',
                label: 'Purchase Date',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
                grid: 12,
              },
              { name: 'custAccntName', label: 'Customer' },
              { name: 'productName', label: 'Product' },
              { name: 'orderType', label: 'Order Type' },
            ],
          },
        },
        {
          type: 'information',
          title: 'Service List',
          properties: {
            data: data,
            schema: [
              { name: 'serviceId', label: 'Service ID' },
              { name: 'serviceLocation', label: 'Service Location' },
            ],
          },
        },
        isHaveAccess(feature, 'read_attachment') && {
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
            ...getModifyDisconnectStepper(data?.status),
            steps: [
              'Submitted',
              'AM Approval',
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
        breadcrumb={breadcrumb(orderNumber)}
        loading={loading}
        notFound={!data}
        schema={detailSchema}
        status={{
          children: statusLabel[data?.status],
          variant: statusVariant[statusLabel[data?.status]],
        }}
      />
      <BaseForm
        content={modalUpdateStatus}
        fetchDetail={fetchDetail}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalUpdateStatus}
      />
      <EmptyBakes
        content={modalBakes}
        fetchUpdateStatus={fetchUpdateStatus}
        getDetail={fetchDetail}
        setContent={setModalBakes}
        setProgress={setProgress}
      />
      <ProgressUpload progress={progress} />
    </>
  );
};

export default ModifyDisconnect;
