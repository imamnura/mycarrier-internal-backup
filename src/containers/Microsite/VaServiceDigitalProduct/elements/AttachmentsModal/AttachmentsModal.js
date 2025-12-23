import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Typography from '@components/Typography';
import Attachment from '@components/Attachment';
import Button from '@components/Button';

export default function AttachmentsModal(props) {
  const { modalMultiAttachment, onClose } = props;

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalMultiAttachment}>
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Typography variant="h5" weight="medium">
            {modalMultiAttachment?.title}
          </Typography>
        </Grid>
        {modalMultiAttachment?.listAttachment?.map((v, i) => (
          <Grid
            align="center"
            item
            xs={12}
            key={`worklog-attachment-${v.fileName}-${i}`}
          >
            <Attachment fileName={v.fileName} fileUrl={v.fileUrl} />
          </Grid>
        ))}
        <Grid container item justifyContent="center" pt={2} spacing={2}>
          <Grid item>
            <Button onClick={onClose} variant="ghost">
              CANCEL
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

AttachmentsModal.defaultProps = {
  modalMultiAttachment: null,
};

AttachmentsModal.propTypes = {
  modalMultiAttachment: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
