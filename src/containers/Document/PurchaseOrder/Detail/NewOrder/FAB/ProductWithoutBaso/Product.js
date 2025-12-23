import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { dateFormatConverter } from '@utils/converter';
import { isHaveAccess, titleCapitalize } from '@utils/common';
import { route } from '@configs';
import {
  additionalInformation,
  getFabProductStepper,
  fabProductStep,
  getFabProductWorklog,
} from './utils';
import { statusLabel, statusVariant } from '../../../utils';
import UpdateStatusForm from '@components/Form/UpdateStatus';
import UploadBasoForm from '../../../lib/form/UploadBaso';
import ProgressUpload from '../../../lib/ProgressUpload';
import DiscountForm from '../../../lib/form/Discount';

const FabProduct = (props) => {
  const {
    action,
    orderNumber,
    productName,
    data,
    loading,
    fetchUpdateStatus,
    modalUpdateStatus,
    setModalUpdateStatus,
    modalUploadBaso,
    setModalUploadBaso,
    modalDiscount,
    setModalDiscount,
    progress,
    setProgress,
  } = useAction(props);

  const { feature } = props;

  const breadcrumb = [
    { label: 'Purchase Order', url: route.purchaseOrder('list') },
    { label: orderNumber },
  ];

  const additionalSchema = additionalInformation(productName);

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
              {
                name: 'purchasedDate',
                label: 'PURCHASE DATE',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
              },
              { name: 'bakesNumber', label: 'BAKES NUMBER' },
              { name: 'custAccntName', label: 'CUSTOMER' },
              { name: 'categoryName', label: 'Product Category' },
              { name: 'orderType', label: 'Order Type' },
              ...(additionalSchema ?? []),
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
          hidden: !isHaveAccess(feature, 'read_attachment'),
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data,
            schema: [
              { name: 'documentPO', label: 'Purchase Order' },
              { name: 'bakesFile', label: 'BAKES' },
              {
                name: 'activationDoc',
                label: 'Order Confirmation',
              },
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
            ...getFabProductStepper(data?.status),
            steps: fabProductStep,
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getFabProductWorklog(data?.worklog, productName),
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
      <DiscountForm
        content={modalDiscount}
        fetchUpdateStatus={fetchUpdateStatus}
        productName={titleCapitalize(productName)}
        setContent={setModalDiscount}
        setProgress={setProgress}
      />
      <ProgressUpload progress={progress} />
    </>
  );
};

FabProduct.defaultProps = {
  feature: [],
};

FabProduct.propTypes = {
  feature: PropTypes.array,
};

export default FabProduct;
