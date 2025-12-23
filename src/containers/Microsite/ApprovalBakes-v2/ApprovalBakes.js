import React, { Fragment } from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import NoData from '@assets/ilustration-v2/NoData';
import StateMessage from '@components/StateMessage';
import Microsite from '@layouts/Microsite';
import BasicForm from '@components/Form/UpdateStatus';
import Action from '@containers/Microsite/lib/Action';
import Content from '@containers/Microsite/lib/Content-v2';
import useActions from './hooks/useActions';
import OtpForm from '@components/Form/Otp';
import { dateFormatConverter } from '@utils/converter';
import { convertToRupiah } from '@utils/text';
import Typography from '@components/Typography';
import useStyles from './styles';
import MailApproved from '@assets/ilustration-v2/MailApproved';
import MailReturned from '@assets/ilustration-v2/MailReturned';
import MailRejected from '@assets/ilustration-v2/MailRejected';

const Neucentrix = () => {
  const {
    action,
    data,
    error,
    isLoading,
    onSubmit,
    modalUpdateStatus,
    setModalUpdateStatus,
    fetchDetail,
    closeOtp,
    otpForm,
    otpRepository,
    onSubmitOtp,
  } = useActions();

  const classes = useStyles({ size: 'small' });

  const schema = [
    {
      title: 'BAKES Detail Information',
      type: 'information',
      properties: {
        data: data,
        schema: [
          { name: 'companyName', label: 'Company' },
          { name: 'bakesId', label: 'BAKES ID' },
          { name: 'bakesNumber', label: 'BAKES Number' },
          {
            name: 'createdAt',
            label: 'Created Date',
            converter: dateFormatConverter({ type: 'date', empty: '-' }),
          },
          {
            name: 'bakesDocument',
            label: 'Preview Document',
            type: 'document',
          },
        ],
      },
    },
    // ...(data?.products?.length
    //   ? [
    //       {
    //         title: 'Account Manager',
    //         type: 'numbering',
    //         properties: {
    //           data: data?.products,
    //         },
    //       },
    //     ]
    //   : []),
    {
      title: 'Service Detail Information',
      type: 'information',
      properties: {
        data: data,
        schema: [
          {
            name: 'valueAgreement',
            label: 'Estimated Value Agreement',
            converter: (v) => convertToRupiah(v),
          },
          ...(data?.products?.length
            ? [
                {
                  type: 'custom',
                  render: (
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12}>
                        <Typography children="Service" variant="caption" />
                      </Grid>
                      {data?.products?.map((product, indexProduct) => (
                        <>
                          <Grid item xs={6}>
                            <div className={classes.root}>
                              <div className={classes.number}>
                                <Typography
                                  children={indexProduct + 1}
                                  color="white"
                                  inline
                                  variant="overline"
                                  weight="normal"
                                />
                              </div>
                              <Box pl={2}>
                                <Typography
                                  children={product?.productName || '-'}
                                  inline
                                  variant="caption"
                                />
                              </Box>
                            </div>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography children=":" variant="caption" />
                          </Grid>
                          <Grid item xs={5}>
                            <Typography variant="caption">
                              {convertToRupiah(product?.price) || '-'}
                            </Typography>
                          </Grid>
                        </>
                      ))}
                    </Grid>
                  ),
                },
              ]
            : []),
          { name: 'reqSbr', label: 'REQ SBR', type: 'document' },
          { name: 'sbr', label: 'SBR', type: 'document' },
          { name: 'otherDoc', label: 'OTHER DOC', type: 'document' },
          { name: 'notes', label: 'Notes' },
        ],
      },
    },
    ...(data?.telkomApproval?.length
      ? [
          {
            title: 'Note From Telkom',
            type: 'numbering',
            properties: {
              data: data?.telkomApproval,
              schema: [
                { label: 'Name', name: 'name' },
                { label: 'Title', name: 'occupation' },
                { label: 'Email', name: 'email' },
                { label: 'Notes', name: 'note' },
              ],
            },
          },
        ]
      : []),
  ];

  const errorIlustration = {
    rejected: MailRejected,
    returned: MailReturned,
    approved: MailApproved,
    error: NoData,
  };

  const renderAction = !!data && (
    <Action
      actions={action}
      label="Will you approve the New BAKES Request with data above?"
    />
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
          <CircularProgress style={{ color: '#DE1B1B' }} />
        </div>
      );
    }

    if (!data) {
      return (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '15vh' }}>
          <StateMessage
            {...error}
            ilustration={errorIlustration[error?.status]}
          />
        </div>
      );
    }

    return (
      <Content
        data={data}
        header={{
          title: 'BAKES Approval Request',
          subtitle: `Account Manager: ${data?.createdByName || '-'}`,
        }}
        label="You get request information for New BAKES with the following data:"
        schema={schema}
      />
    );
  };

  return (
    <Fragment>
      <Microsite action={renderAction} children={renderContent()} />
      <BasicForm
        content={modalUpdateStatus}
        fetchDetail={fetchDetail}
        fetchUpdateStatus={onSubmit}
        setContent={setModalUpdateStatus}
      />
      <OtpForm
        description="You will get Peruri Digital Sign OTP code, please input for approval"
        id={data?.bakesId}
        onClose={closeOtp}
        onSubmit={onSubmitOtp}
        open={otpForm}
        repository={otpRepository}
        title="Please input your OTP code"
      />
    </Fragment>
  );
};

export default Neucentrix;
