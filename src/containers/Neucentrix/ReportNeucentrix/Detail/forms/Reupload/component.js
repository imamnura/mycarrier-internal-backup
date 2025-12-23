import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Button from '@components/Button';
import Dialog from '@__old/components/elements/Dialog';
import Typography from '@components/Typography';
// import UploadFile from '@__old/components/elements/UploadFile';
import { TextField } from '@components/FormField';
import useActions from './hooks/useActions';
import FileUpload from '@components/FileUpload';

export default function Component(props) {
  const { modalReupload, onClose } = props;

  const { control, handleReupload, handleSubmit, formState, file, setFile } =
    useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalReupload}>
      <form onSubmit={handleSubmit(handleReupload)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          <Grid align="center" item xs={12}>
            <Typography variant="h4" weight="bold">
              Please reupload the document to be submitted
            </Typography>
          </Grid>
          <Grid align="center" item xs={12}>
            <Typography variant="body1">
              Once you send this data, it will be submitted
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* <UploadFile
              accept={['.pdf']}
              fileName={file ? file.name : ''}
              handleDelete={() => {
                setFile(null);
              }}
              labelCustom="Example: monthly-report-bukalapak2.pdf"
              labelInput="Upload .pdf document here, max 10 MB "
              maxSize={10485760}
              onChange={(v) => {
                setFile(v);
              }}
              withDelete={true}
            /> */}
            <FileUpload
              accept={['.pdf']}
              // fileName={file ? file.name : ''}
              value={file}
              onDelete={() => {
                setFile(null);
              }}
              labelCustom="Example: monthly-report-bukalapak2.pdf"
              labelInput="Upload .pdf document here, max 10 MB "
              maxSize={10485760}
              onChange={(v) => {
                setFile(v);
              }}
              withDelete={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Note"
              minRows={3}
              multiline
              name="note"
              required
            />
          </Grid>
          <Grid align="center" item xs={12}>
            <Button onClick={onClose} mr="16px" variant="ghost">
              CANCEL
            </Button>
            &nbsp;
            <Button disabled={!formState.isValid || !file} type="submit">
              SEND
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  data: {},
  onClose: () => {},
  modalReupload: false,
};

Component.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
  modalReupload: PropTypes.bool,
};
