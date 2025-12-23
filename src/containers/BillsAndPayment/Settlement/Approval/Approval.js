import Approval from '@components/Form/Approval';
import Numbering from '@components/Numbering';
import Typography from '@components/Typography';
import ApprovalMicrosite from '@fragments/ApprovalMicrosite';
import { Box } from '@material-ui/core';
import React, { useMemo } from 'react';
import useAction from './hooks/useAction';

const ApprovalSettlement = () => {
  const {
    data,
    loading,
    approvalForm,
    redirect,
    onApprovalAction,
    closeApprovalForm,
    onSubmitFormApproval,
  } = useAction();

  const approvalNote = useMemo(
    () => data?.reviewer?.filter(({ note }) => !!note),
    [data],
  );
  // const reviewerApproval = data?.reviewer?.at(-1)?.name;
  const reviewerApproval =
    data?.reviewer[data?.activeReviewer - 1]?.name || '-';
  const statusApproval =
    data?.reviewer[data?.activeReviewer - 1]?.status || '-';

  return (
    <>
      <ApprovalMicrosite
        action={[
          {
            children: 'reject',
            variant: 'ghost',
            onClick: onApprovalAction('rejected'),
          },
          {
            children: 'return',
            variant: 'ghost',
            onClick: onApprovalAction('returned'),
          },
          {
            children: 'approve',
            onClick: onApprovalAction('approved'),
          },
        ]}
        actionText="Will you approve the New Settlement Request with data above?"
        description="You get request information for New Settlement with the following data:"
        information={{
          data: data,
          schema: [
            { name: 'companyName', label: 'Company' },
            { name: 'settlementId', label: 'Settlement ID' },
            // { name: 'invoiceNumber', label: 'Invoice Number' },
            { name: 'createdDate', label: 'Created Date' },
            {
              label: 'Preview Document',
              name: 'attachment',
              type: 'multipleDocument',
            },
          ],
        }}
        loading={loading}
        otherRender={
          !!approvalNote?.length && (
            <Box mt={2}>
              <Typography>Note From Telkom</Typography>
              {approvalNote?.map(({ email, name, note, position }, i) => (
                <Box key={email} mb={2} mt={1}>
                  <Numbering
                    alignItems="flex-start"
                    data={
                      <>
                        <Box
                          alignItems="center"
                          display="flex"
                          marginTop="-2px"
                        >
                          <Box width={60}>
                            <Typography>Name</Typography>
                          </Box>
                          <Typography>{name}</Typography>
                        </Box>
                        <Box alignItems="center" display="flex" mt={1}>
                          <Box width={60}>
                            <Typography>Title</Typography>
                          </Box>
                          <Typography>{position}</Typography>
                        </Box>
                        <Box alignItems="center" display="flex" mt={1}>
                          <Box width={60}>
                            <Typography>Email</Typography>
                          </Box>
                          <Typography>{email}</Typography>
                        </Box>
                        <Box alignItems="center" display="flex" mt={1}>
                          <Box width={60}>
                            <Typography>Notes</Typography>
                          </Box>
                          <Typography>{note}</Typography>
                        </Box>
                      </>
                    }
                    number={i + 1}
                    size="small"
                  />
                </Box>
              ))}
            </Box>
          )
        }
        states={
          statusApproval !== 'waiting approval' && !loading
            ? {
                action: { children: 'view request', onClick: redirect },
                message: `${data?.settlementId} has been ${statusApproval}. View that request now.`,
                type: statusApproval,
              }
            : null
        }
        subTitle={`Reviewer: ${reviewerApproval}`}
        title="Settlement Approval Request"
      />
      <Approval
        caption={approvalForm.caption}
        onClose={closeApprovalForm}
        onSubmit={onSubmitFormApproval(approvalForm.type)}
        open={approvalForm.open}
        title={approvalForm.title}
      />
    </>
  );
};

export default ApprovalSettlement;
