import UpdateStatusForm from '@components/Form/UpdateStatus';
import Table from '@components/Table/Table';
import { route } from '@configs';
import Detail from '@fragments/Detail';
import { Box } from '@material-ui/core';
import { titleCapitalize } from '@utils/common';
import _ from 'lodash';
import PropTypes from 'prop-types';
import useAction from './hooks/useActions';
import DiscountForm from './lib/form/Discount';
import EmptyBakes from './lib/form/EmptyBakes';
import UploadBasoForm from './lib/form/UploadBaso';
import UploadEvidenceForm from './lib/form/UploadEvidence';
import ProgressUpload from './lib/ProgressUpload';
import {
  getPurchaseOrderSteper,
  getPurchaseOrderWorklog,
  normalizeObjectToSchema,
  statusLabel,
  statusVariant,
  headerAndFilterBillingInformation,
} from './utils';
import Card from './lib/Card';
import useActionBillingInformation from './hooks/BillingInformation/useAction';
import ModalPartner from './lib/form/AddPartner';
import BasoApproval from './lib/form/BasoApproval';
import ModalDocumentOwnership from '@containers/Document/PurchaseOrder/DynamicDetail/lib/form/ModalDocumentOwnership/ModalDocumentOwnership';

const PurchaseOrderDetail = (props) => {
  const {
    action,
    orderNumber,
    data = {},
    loading,
    modalUpdateStatus,
    fetchUpdateStatus,
    setModalUpdateStatus,
    modalUploadBaso,
    setModalUploadBaso,
    modalBasoApproval,
    setModalBasoApproval,
    setProgress,
    progress,
    modalDiscount,
    setModalDiscount,
    modalBakes,
    setModalBakes,
    modalUploadEvidence,
    setModalUploadEvidence,
    modalPartner,
    setModalPartner,
    fetchDetail,
    steps,
    activeSteps,
    onPreviewWorklog,
    onCloseSuccess,
    router,
    modalDocumentOwnership,
    setModalDocumentOwnership,
  } = useAction(props);

  const {
    list,
    listProps,
    tab,
    onClickDownload,
    dataSummary,
    loadingSummary,
    isShowTabBillingInformation,
  } = useActionBillingInformation();

  const breadcrumb = [
    { label: 'Purchase Order', url: route.purchaseOrder('list') },
    { label: orderNumber },
  ];

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      hidden: tab === 'order-information',
      content: [
        {
          type: 'custom',
          render: <Card loading={loadingSummary} data={dataSummary} />,
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 12 },
      hidden: tab === 'order-information',
      content: [
        {
          type: 'custom',
          render: (
            <Box pt="8px">
              {headerAndFilterBillingInformation(
                listProps,
                list,
                onClickDownload,
              )}
              <Table {...listProps.table} />
            </Box>
          ),
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      hidden: tab === 'billing-information',
      content: normalizeObjectToSchema(data, router),
    },
    {
      gridProps: { xs: 12, md: 6 },
      hidden: tab === 'billing-information',
      stickRight: true,
      content: [
        {
          type: 'stepper',
          title: 'Purchase Order Approval Step',
          properties: getPurchaseOrderSteper(data, steps, activeSteps),
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getPurchaseOrderWorklog(data?.worklog, onPreviewWorklog),
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
        notFound={!data || _.isEmpty(data)}
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
        tabs={isShowTabBillingInformation(data) && listProps.tabs}
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
        setModalBasoApproval={setModalBasoApproval}
        setProgress={setProgress}
        isEligibleForBasoDigitalSign={data?.isEligibleForBasoDigitalSign}
      />
      <BasoApproval
        content={modalBasoApproval}
        setContent={setModalBasoApproval}
        orderNumber={data?.orderInformation?.orderId}
        onCloseSuccess={onCloseSuccess}
      />
      <DiscountForm
        content={modalDiscount}
        fetchUpdateStatus={fetchUpdateStatus}
        productName={titleCapitalize(data?.orderInformation?.product)}
        setContent={setModalDiscount}
        setProgress={setProgress}
      />
      <EmptyBakes
        content={modalBakes}
        fetchUpdateStatus={fetchUpdateStatus}
        getDetail={fetchDetail}
        setContent={setModalBakes}
        setProgress={setProgress}
      />
      <UploadEvidenceForm
        content={modalUploadEvidence}
        fetchUpdateStatus={fetchUpdateStatus}
        getDetail={fetchDetail}
        setContent={setModalUploadEvidence}
        setProgress={setProgress}
      />
      <ProgressUpload progress={progress} />
      <ModalPartner
        data={data?.partnerInformation}
        open={modalPartner?.open}
        fetchUpdateStatus={fetchUpdateStatus}
        setModalPartner={setModalPartner}
        modalPartner={modalPartner}
      />
      <ModalDocumentOwnership
        content={modalDocumentOwnership}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalDocumentOwnership}
        setProgress={setProgress}
      />
    </>
  );
};

PurchaseOrderDetail.defaultProps = {
  feature: [],
};

PurchaseOrderDetail.propTypes = {
  feature: PropTypes.array,
};

export default PurchaseOrderDetail;
