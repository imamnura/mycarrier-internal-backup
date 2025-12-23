import React from 'react';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import BaseForm from '@components/Form/UpdateStatus';
import EmptyBakes from '../../lib/form/EmptyBakes';
import ProgressUpload from '../../lib/ProgressUpload';
import {
  breadcrumb,
  getPurchaseOrderWorklog,
  statusLabel,
  statusVariant,
} from '../../utils';
import { dateFormatConverter } from '@utils/converter';
import { getGeneralNewInstallStepper } from './utils';
import { isHaveAccess } from '@utils/common';

const General = (props) => {
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

  const { status, worklog } = data;

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
                name: 'createdAt',
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
            ...getGeneralNewInstallStepper(status),
            steps: ['Submitted', 'AM Approval', 'Approved'],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getPurchaseOrderWorklog(worklog),
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
        notFound={!orderNumber}
        schema={detailSchema}
        status={{
          children: statusLabel[status],
          variant: statusVariant[statusLabel[status]],
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
        getDetail={fetchDetail}
        setContent={setModalBakes}
        setProgress={setProgress}
      />
      <ProgressUpload progress={progress} />
    </>
  );
};

export default General;
