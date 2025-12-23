import Approval from '@components/Form/Approval';
import { route } from '@configs';
import Detail from '@fragments/Detail';
import { Box } from '@material-ui/core';
import { isHaveAccess } from '@utils/common';
import { dateFormatConverter } from '@utils/converter';
import PropTypes from 'prop-types';
import MessagePreview from '../_elements/MessagePreview';
import ListOfDetail from './elements/ListOfDetail';
import StatusInformation from './elements/StatusInformation';
import useAction from './hooks/useAction';
import { getBroadcastInformationStatus } from './utils';

const DetailBroadcastInformation = (props) => {
  const {
    approvalForm,
    closeApprovalForm,
    data,
    feature,
    loading,
    loadingUpdateReturn,
    onSubmitFormApproval,
    setApprovalForm,
    updateFromReturned,
    updateWithoutApproval,
  } = useAction(props);

  const status = getBroadcastInformationStatus(data?.broadcastInfo?.status);

  const breadcrumb = [
    { label: 'Broadcast Information', url: route.broadcastInformation('list') },
    { label: data?.broadcastInfo?.broadcastName || 'Detail' },
  ];

  const action = () => {
    let actions = [];

    if (data?.broadcastInfo?.status === 'need_approval') {
      if (
        isHaveAccess(
          feature,
          'update_broadcast_information_without_status_need_approval_cdm',
        )
      ) {
        actions.push({
          children: 'Edit Broadcast',
          loading: loadingUpdateReturn,
          onClick: updateWithoutApproval,
          variant: 'ghost',
        });
      }
      if (isHaveAccess(feature, 'update_broadcast_information_reject_cdm')) {
        actions.push({
          children: 'Reject',
          onClick: setApprovalForm({
            type: 'rejected',
            title: 'Please give note of reject',
            caption:
              'Once you rejected this, it will be process and data will be sent to CDM automatically.',
            successMessage: 'Broadcast message successfully rejected',
            confirmation: 'Are you sure want to reject this broadcast message?',
            open: true,
          }),
          variant: 'ghost',
        });
      }
      if (isHaveAccess(feature, 'update_broadcast_information_return_cdm')) {
        actions.push({
          children: 'Return',
          // hideDivider: true,
          ml: 16,
          onClick: setApprovalForm({
            type: 'returned',
            title: 'Please give note of return',
            caption:
              'Once you returned this, it will be process and data will be sent to CDM automatically.',
            successMessage: 'Broadcast message successfully returned',
            confirmation: 'Are you sure want to return this broadcast message?',
            open: true,
          }),
          variant: 'ghost',
        });
      }
      if (isHaveAccess(feature, 'update_broadcast_information_approve_cdm')) {
        actions.push({
          children: 'Approve',
          // hideDivider: true,
          ml: 16,
          onClick: setApprovalForm({
            type: 'approve',
            title: 'Please give note of approve',
            caption:
              'Once you approveed this, it will be process and data will be sent to CDM automatically.',
            successMessage: 'Broadcast message successfully approved',
            confirmation:
              'Are you sure want to approve this broadcast message?',
            open: true,
          }),
        });
      }
    }

    if (data?.broadcastInfo?.status === 'returned') {
      actions.push({
        children: 'Edit Broadcast',
        loading: loadingUpdateReturn,
        onClick: updateFromReturned,
      });
    }

    return actions;
  };

  const detailSchema = [
    {
      gridProps: { xs: 12 },
      content: [
        {
          type: 'custom',
          title: '',
          render: <StatusInformation data={data} />,
        },
      ],
    },
    {
      gridProps: { xs: 12, md: true },
      content: [
        {
          type: 'information',
          title: 'Broadcast Information',
          properties: {
            data,
            schema: [
              {
                label: 'BROADCAST NAME',
                name: 'broadcastInfo.broadcastName',
                grid: 12,
              },
              {
                label: 'CONTACT GROUP',
                name: 'broadcastInfo.contactGroup',
                grid: 12,
              },
              {
                label: 'MESSAGE',
                name: 'broadcastInfo.message',
                grid: 12,
                converter: (message) => {
                  if (typeof message === 'string') {
                    return message;
                  }

                  return (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      {message?.map((m, i) => (
                        <p key={i}>{m}</p>
                      ))}
                    </div>
                  );
                },
              },
              {
                label: 'CREATED DATE',
                name: 'broadcastInfo.createdDate',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
              {
                label: 'LAST UPDATE',
                name: 'broadcastInfo.lastUpdate',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
              {
                label: 'SCHEDULE TIME',
                name: 'broadcastInfo.scheduleTime',
                converter: dateFormatConverter({
                  type: 'date-month-year-time',
                  empty: '-',
                }),
                grid: 12,
              },
              {
                label: {
                  finish: 'NOTE OF APPROVE',
                  rejected: 'REASON OF REJECT',
                  returned: 'REASON OF RETURN',
                }[data?.broadcastInfo?.status],
                name: 'broadcastInfo.note',
                hidden: !['finish', 'rejected', 'returned'].includes(
                  data?.broadcastInfo?.status,
                ),
              },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          hidden: !data?.attachment,
          properties: {
            data: data || {},
            schema: [{ name: 'attachment', label: '' }],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 'auto' },
      content: [
        {
          type: 'custom',
          title: 'Message Preview',
          render: (
            <Box
              sx={{
                maxWidth: '100%',
                width: 360,
                marginTop: 16,
              }}
            >
              <MessagePreview
                media={data?.attachment}
                message={data?.broadcastInfo?.message}
                time={data?.broadcastInfo?.scheduleTime}
              />
            </Box>
          ),
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 12 },
      hidden: ['need_approval', 'returned', 'rejected'].includes(
        data?.broadcastInfo?.status,
      ),
      content: [
        {
          type: 'custom',
          title: 'List of Detail',
          render: <ListOfDetail />,
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
        notFound={!data?.broadcastInfo?.broadcastId}
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
    </>
  );
};

DetailBroadcastInformation.defaultProps = {
  feature: [],
};

DetailBroadcastInformation.propTypes = {
  feature: PropTypes.array,
};

export default DetailBroadcastInformation;
