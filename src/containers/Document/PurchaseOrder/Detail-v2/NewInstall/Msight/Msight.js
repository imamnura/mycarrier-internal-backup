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
import { getMsightStepper, msightStep, keyDataSchema } from './utils';
import { isHaveAccess } from '@utils/common';
import KeyData from './lib/KeyData/KeyData';

const Msight = (props) => {
  const {
    action,
    data,
    feature,
    fetchDetail,
    fetchUpdateStatus,
    fetchMsightBakes,
    loading,
    modalBakes,
    setModalBakes,
    modalUpdateStatus,
    orderNumber,
    progress,
    setProgress,
    setModalUpdateStatus,
  } = useActions(props);

  const { apiKey, companyAddress, isFullMsight, secretKey, status, worklog } =
    data;
  const msightType = isFullMsight ? 'full' : 'general';
  //Msight is categorized as a full product when customer ALREADY upload the BAKES. (Doesn't need AM Approval)

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        !!apiKey && {
          type: 'custom',
          title: 'Key Data',
          render: <KeyData data={data} schema={keyDataSchema(!!secretKey)} />,
        },
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
              { name: 'businessField', label: 'Product Category' },
              { name: 'productName', label: 'Product' },
              { name: 'orderType', label: 'Order Type' },
              { name: 'msightService', label: 'MSight Service' },
            ],
          },
        },
        {
          type: 'information',
          title: 'Company Information',
          properties: {
            data: { ...data, ...companyAddress },
            schema: [
              { name: 'companyName', label: 'Company Name' },
              { name: 'legalCompanyName', label: 'Legal Company Name' },
              { name: 'businessField', label: 'Business Field', grid: 12 },
              { name: 'city', label: 'City', type: 'MsightCompanyInfo' },
              {
                name: 'province',
                label: 'Province',
                type: 'MsightCompanyInfo',
              },
              {
                name: 'address',
                label: 'Company Address',
                grid: 12,
                type: 'MsightCompanyInfo',
              },
              {
                name: 'postalCode',
                label: 'Postal Code',
                type: 'MsightCompanyInfo',
              },
              { name: 'websiteAddress', label: 'Website Address' },
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
            ...getMsightStepper(status, isFullMsight),
            steps: msightStep[msightType],
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
        fetchUpdateStatus={fetchMsightBakes}
        getDetail={fetchDetail}
        setContent={setModalBakes}
        setProgress={setProgress}
      />
      <ProgressUpload progress={progress} />
    </>
  );
};

export default Msight;
