import React from 'react';
import Create from '@fragments/Create';
import useAction from './hooks/useAction';
import PropTypes from 'prop-types';
import StepperForm from '../StepperForm';
import { breadcrumb } from '../../utils';
import Wysiwyg from '@components/Wysiwyg/Wysiwyg';
import FileUpload from '@components/FileUpload/FileUpload';
import { Grid } from '@material-ui/core';
import { postUploadBillingReminder } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import Attachment from '@components/Attachment/Attachment';
import Button from '@components/Button/Button';
import { onDownloadFile } from '@utils/common';
import { Box, Text } from '@legion-ui/core';

const EmailTextAndAttachment = (props) => {
  const {
    data,
    bpNumber,
    count,
    reminderId,
    loading,
    onSubmit,
    submitLoading,
    onStepperClick,
    value,
    setValue,
    attachment,
    // setAttachment,
    onDeleteAttachment,
    onAddAttachment,
  } = useAction(props);

  return (
    <Create
      action={[
        {
          children: 'Save as Draft',
          onClick: onSubmit('draft'),
          variant: 'ghost',
          loading: submitLoading === 'draft',
        },
        {
          children: 'Discard',
          onClick: onSubmit('discard'),
          variant: 'ghost',
          loading: submitLoading === 'discard',
        },
        {
          children: 'Cancel',
          onClick: onSubmit('cancel'),
          variant: 'ghost',
          loading: submitLoading === 'cancel',
        },
        {
          children: 'Previous Step',
          onClick: onSubmit('previous'),
          loading: submitLoading === 'previous',
          hideDivider: true,
          ml: 8,
        },
        {
          children: 'Next Step',
          onClick: onSubmit('next'),
          loading: submitLoading === 'next',
          hideDivider: true,
          ml: 8,
          disabled: !value,
        },
      ]}
      breadcrumb={breadcrumb(bpNumber, count)}
      loading={loading}
      stepperTab={
        <StepperForm active={2} data={data} onStepperClick={onStepperClick} />
      }
    >
      <Box
        background="white"
        padding="24px 32px"
        radius="8px"
        shadow="0px 6px 9px 0px rgba(46, 67, 77, 0.08)"
        mt="24px"
      >
        <Text color="secondary500" as="h6" mb="16px">
          Text Editor
        </Text>
        <Wysiwyg onChange={setValue} value={value} variant="product" />
        <Text color="secondary300" as="h6" mb="16px" mt="16px" weight="600">
          Upload Attachment
        </Text>
        <Grid item md={6}>
          <FileUpload
            accept={['.pdf']}
            fetcher={postUploadBillingReminder(reminderId)}
            helperText="File in .pdf only, up to 5 files with max. 20MB/file"
            maxSize={20971520}
            onChange={onAddAttachment}
            placeholder="Example: attachment.pdf"
            disabled={attachment.length >= 5}
          />
          <Box mt="14px">
            {attachment.length > 0 &&
              attachment.map((data, i) => {
                return (
                  <Grid alignItems="center" container spacing={2} key={i}>
                    <Grid item xs>
                      <Attachment
                        fileName={data.fileName}
                        fileUrl={data.fileUrl}
                        previewAction={[
                          { children: 'download', onClick: onDownloadFile },
                          {
                            children: 'delete',
                            ml: 8,
                            onClick: onDeleteAttachment(data.filePath),
                            withDivider: true,
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs="auto">
                      <Button
                        children="delete"
                        onClick={onDeleteAttachment(data.filePath)}
                      />
                    </Grid>
                  </Grid>
                );
              })}
          </Box>
        </Grid>
      </Box>
    </Create>
  );
};

EmailTextAndAttachment.defaultProps = {
  data: null,
};

EmailTextAndAttachment.propTypes = {
  data: PropTypes.object,
  // paramsData: PropTypes.bool.isRequired,
  // setTab: PropTypes.func.isRequired
};

export default EmailTextAndAttachment;
