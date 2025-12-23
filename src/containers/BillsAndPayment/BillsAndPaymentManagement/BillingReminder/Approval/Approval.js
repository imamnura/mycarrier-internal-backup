import Approval from '@components/Form/Approval';
import Typography from '@components/Typography';
import ApprovalMicrosite from '@fragments/ApprovalMicrosite';
import { Box } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import EditDocument from './elements/EditDocument';
import Attachment from '@components/Attachment/Attachment';
import clsx from 'clsx';
import useStyles from './styles';
import { dateFormat } from '@utils/parser';
import { onDownloadFile } from '@utils/common';
import ReturnForm from '@components/Form/Return';

const ApprovalOfferingLetter = () => {
  const {
    approvalForm,
    closeApprovalForm,
    data,
    loading,
    onApprovalAction,
    onSubmitFormApproval,
    redirect,
    stateType,
    editTemplate,
    setEditTemplate,
    onSubmitDocumentApproval,
    fileTemplate,
    onSaveEdit,
    optionsApprover,
  } = useAction();

  const classes = useStyles();

  const firstItemWaiting = data?.reviewer.find(
    (el) => el.status === 'waiting approval',
  );

  const actions =
    data?.reviewer.length > 1 &&
    data?.reviewer[0]?.status !== 'waiting approval'
      ? [
          {
            children: 'reject',
            onClick: onApprovalAction('rejected'),
            variant: 'ghost',
          },
          {
            children: 'return',
            onClick: onApprovalAction('return'),
            variant: 'ghost',
          },
          {
            children: 'approve',
            onClick: onApprovalAction('approved'),
          },
        ]
      : [
          {
            children: 'reject',
            onClick: onApprovalAction('rejected'),
            variant: 'ghost',
          },
          {
            children: 'approve',
            onClick: onApprovalAction('approved'),
          },
        ];

  return (
    <>
      <ApprovalMicrosite
        action={actions}
        actionText="Will you approve the New Billing Reminder Approval with data above?"
        description="You get request information for New Billing Reminder with the following data:"
        information={{
          title: 'Customer Information',
          data: data,
          schema: [
            { label: 'Customer', name: 'customerInformation.custAccntName' },
            { label: 'BP Number', name: 'customerInformation.bpNumber' },
            { label: 'Address', name: 'customerInformation.address' },
          ],
        }}
        loading={loading}
        otherRender={
          <>
            <Box mt={2}>
              <Typography variant="subtitle1">Document</Typography>
              <Box sx={{ mt: 2 }}>
                <Attachment
                  fileName={data?.billReminderPdf.fileName}
                  fileUrl={data?.billReminderPdf.fileUrl}
                  previewAction={[
                    { children: 'download', onClick: onDownloadFile },
                    {
                      children: 'edit document',
                      onClick: setEditTemplate(true),
                      withDivider: true,
                      variant: 'ghost',
                    },
                    {
                      children: 'approve',
                      onClick: () =>
                        onSubmitDocumentApproval(data?.fileTemplate),
                      withDivider: false,
                      ml: 12,
                    },
                  ]}
                />
              </Box>
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle1">Approver</Typography>
              <Box mt={2}>
                {!!data?.reviewer.length &&
                  data?.reviewer.map(
                    ({ name, email, status, createdAt }, j) => (
                      <>
                        <div className={classes.worklogItem} key={j}>
                          <div
                            className={clsx({
                              [classes.node]: true,
                              [classes.activeNode]: status === 'approve',
                              [classes.rejectNode]: status === 'reject',
                              [classes.waitingNode]:
                                status === 'waiting approval' &&
                                email === firstItemWaiting?.email,
                            })}
                          />
                          <div
                            className={clsx({
                              [classes.content]: true,
                              [classes.activeContent]: status === 'approve',
                              [classes.lastChild]:
                                j === data?.reviewer.length - 1,
                            })}
                          >
                            <Typography
                              children={name}
                              color="general-general"
                              inline
                              style={{ lineHeight: 1, marginBottom: '4px' }}
                              variant="subtitle-2"
                              weight="medium"
                            />
                            <Typography
                              children={email}
                              color="general-mid"
                              inline
                              variant="caption"
                            />
                            {(status &&
                              status !== 'waiting approval' &&
                              createdAt && (
                                <Typography
                                  children={`${status} on ${dateFormat({
                                    date: createdAt,
                                    type: 'date-time-full',
                                  })}`}
                                  color="general-mid"
                                  variant="caption"
                                  weight="bold"
                                />
                              )) ||
                              (status && (
                                <Typography
                                  children={`${status}`}
                                  color="general-mid"
                                  variant="caption"
                                  weight="bold"
                                />
                              ))}
                          </div>
                        </div>
                      </>
                    ),
                  )}
              </Box>
            </Box>
          </>
        }
        states={
          stateType
            ? {
                action: { children: 'view request', onClick: redirect },
                message: `${data?.reminderId} has been ${stateType}. View that request now.`,
                type: stateType,
              }
            : null
        }
        subTitle={`OSM: ${data?.approver?.name || '-'}`}
        title="Billing Reminder Approval"
      />
      {approvalForm.type === 'return' ? (
        <ReturnForm
          onClose={closeApprovalForm}
          onSubmit={onSubmitFormApproval(approvalForm.statusPayload)}
          open={approvalForm.open}
          title={approvalForm.title}
          description={approvalForm.description}
          labelForm={approvalForm?.labelForm}
          approver={optionsApprover || []}
        />
      ) : (
        <Approval
          caption={approvalForm.caption}
          onClose={closeApprovalForm}
          onSubmit={onSubmitFormApproval(approvalForm.statusPayload)}
          open={approvalForm.open}
          title={approvalForm.title}
        />
      )}
      <EditDocument
        onClose={setEditTemplate(false)}
        onSubmit={onSaveEdit}
        open={editTemplate}
        template={fileTemplate}
      />
    </>
  );
};

export default ApprovalOfferingLetter;
