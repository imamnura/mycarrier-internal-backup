import React from 'react';
import PropTypes from 'prop-types';
import { dateFormatConverter } from '@utils/converter';
import Detail from '@fragments/Detail';
import { route } from '@configs';
import { getClaimStatus, getClaimStepper, getClaimWorklog } from './utils';
import { isHaveAccess } from '@utils/common';
import useAction from './hooks/useAction';
import Approval from '@components/Form/Approval';
import FormComplete from './elements/FormComplete';

const DetailClaim = (props) => {
  const {
    approvalForm,
    closeApprovalForm,
    closeCompleteForm,
    completeForm,
    data,
    feature,
    loading,
    onSubmitFormApproval,
    onSubmitFormComplete,
    setApprovalForm,
    setCompleteForm,
  } = useAction(props);

  const breadcrumb = [
    { label: 'Bills & Payment Management', url: route.billsAndPayment('list') },
    {
      label: data?.bpNumber || '-',
      url: route.billsAndPayment('detail', data?.bpNumber) + '?type=claim',
    },
    { label: data?.claimId || '-' },
  ];

  const status = getClaimStatus(data?.subStatus);

  const action = () => {
    let actions = [];

    if (
      data?.subStatus === 'submitted' &&
      isHaveAccess(feature, 'update_claim_cdm')
    ) {
      actions.push({
        children: 'reject',
        // hideDivider: true,
        variant: 'ghost',
        onClick: setApprovalForm({
          type: 'cdm_rejected',
          title: 'Please give note of reject',
          caption:
            'Once you approved this, it will be process and data will be sent to customer automatically.',
          confirmation: 'Are you sure want to reject this claim?',
          successMessage: 'Claim successfully rejected',
          open: true,
        }),
      });
      actions.push({
        children: 'return',
        // hideDivider: true,
        ml: 24,
        variant: 'ghost',
        onClick: setApprovalForm({
          type: 'cdm_returned',
          title: 'Please give note of return',
          caption:
            'Once you returned this, it will be process and data will be sent to customer automatically.',
          confirmation: 'Are you sure want to return this claim?',
          successMessage: 'Claim successfully returned',
          open: true,
        }),
      });
      actions.push({
        children: 'approve',
        // hideDivider: true,
        ml: 24,
        onClick: setApprovalForm({
          type: 'cdm_checked',
          title: 'Please give note of approve',
          caption:
            'Once you approved this, it will be process and data will be sent to customer automatically.',
          confirmation: 'Are you sure want to approve this claim?',
          successMessage: 'Claim successfully approved',
          open: true,
        }),
      });
    } else if (
      data?.subStatus === 'cdm_checked' &&
      isHaveAccess(feature, 'update_claim_am')
    ) {
      actions.push({
        children: 'reject',
        // hideDivider: true,
        variant: 'ghost',
        onClick: setApprovalForm({
          type: 'am_rejected',
          title: 'Please give note of reject',
          caption:
            'Once you approved this, it will be process and data will be sent to customer automatically.',
          confirmation: 'Are you sure want to reject this claim?',
          successMessage: 'Claim successfully rejected',
          open: true,
        }),
      });
      actions.push({
        children: 'return',
        // hideDivider: true,
        ml: 24,
        variant: 'ghost',
        onClick: setApprovalForm({
          type: 'am_returned',
          title: 'Please give note of return',
          caption:
            'Once you returned this, it will be process and data will be sent to customer automatically.',
          confirmation: 'Are you sure want to return this claim?',
          successMessage: 'Claim successfully returned',
          open: true,
        }),
      });
      actions.push({
        children: 'approve',
        // hideDivider: true,
        ml: 24,
        onClick: setApprovalForm({
          type: 'am_checked',
          title: 'Please give note of approve',
          caption:
            'Once you approved this, it will be process and data will be sent to customer automatically.',
          confirmation: 'Are you sure want to approve this claim?',
          successMessage: 'Claim successfully approved',
          open: true,
        }),
      });
    } else if (
      data?.subStatus === 'approved' &&
      isHaveAccess(feature, 'update_claim_completed')
    ) {
      actions.push({
        children: 'complete',
        onClick: setCompleteForm({ open: true }),
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
          title: 'Claim Detail',
          properties: {
            data: data || {},
            schema: [
              {
                label: 'CLAIM ID',
                name: 'claimId',
              },
              {
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
                label: 'CLAIM DATE',
                name: 'claimDate',
              },
              {
                label: 'CLAIM CATEGORY',
                name: 'claimCategory',
                grid: 12,
              },
              {
                label: 'INVOICE NUMBER',
                name: 'invoiceNumberFormatted',
              },
              {
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
                label: 'INVOICE DATE',
                name: 'invoiceDate',
              },
              {
                label: 'SID',
                name: 'sid',
                grid: 12,
              },
              {
                label: 'CLAIM DESCRIPTION',
                name: 'customerNote',
                grid: 12,
              },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data || {},
            schema: [
              {
                name: 'documents',
              },
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
          title: 'Claim Approval Step',
          properties: {
            ...getClaimStepper(data?.subStatus),
            steps: [
              'Submitted',
              'Checking by CDM',
              'Checking by AM',
              'Approved',
              'Completed',
            ],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getClaimWorklog(data?.worklog),
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
        status={status}
      />
      <Approval
        caption={approvalForm.caption}
        onClose={closeApprovalForm}
        onSubmit={onSubmitFormApproval}
        open={approvalForm.open}
        title={approvalForm.title}
      />
      <FormComplete
        onClose={closeCompleteForm}
        onSubmit={onSubmitFormComplete}
        open={completeForm.open}
      />
    </>
  );
};

DetailClaim.defaultProps = {
  feature: [],
};

DetailClaim.propTypes = {
  feature: PropTypes.array,
};

export default DetailClaim;
