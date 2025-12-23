import Approval from '@components/Form/Approval';
import Otp from '@components/Form/Otp';
import Numbering from '@components/Numbering';
import Typography from '@components/Typography';
import ApprovalMicrosite from '@fragments/ApprovalMicrosite';
import { Box } from '@material-ui/core';
import React, { useMemo } from 'react';
import useAction from './hooks/useAction';

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
    closeOtp,
    otpForm,
    otpRepository,
    onSubmitOtp,
  } = useAction();

  const approvalNote = useMemo(
    () => data?.agreement?.filter(({ note }) => !!note),
    [data],
  );

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
        actionText="Will you approve the New Offering Letter Request with data above?"
        description="You get request information for New Offering Letter Request with the following data:"
        information={{
          data: data,
          schema: [
            { label: 'Customer', name: 'companyName' },
            { label: 'Offering Letter ID', name: 'offeringLetterId' },
            { label: 'Created Date', name: 'updatedAt' },
            { label: 'Total Price', name: 'totalPrice' },
            { label: 'Preview Document', name: 'document', type: 'document' },
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
          stateType
            ? {
                action: { children: 'view request', onClick: redirect },
                message: `${data?.offeringLetterId} has been ${stateType}. View that request now.`,
                type: stateType,
              }
            : null
        }
        subTitle={`Account Manager: ${data?.detailCreatedBy?.name}`}
        title="Offering Letter Approval Request"
      />
      <Approval
        caption={approvalForm.caption}
        onClose={closeApprovalForm}
        onSubmit={onSubmitFormApproval(approvalForm.statusPayload)}
        open={approvalForm.open}
        title={approvalForm.title}
      />
      <Otp
        description="You will get Peruri Digital Sign OTP code, please input for approval"
        id={data?.offeringLetterId}
        onClose={closeOtp}
        onSubmit={onSubmitOtp}
        open={otpForm}
        repository={otpRepository}
        title="Please input your OTP code"
      />
    </>
  );
};

export default ApprovalOfferingLetter;
