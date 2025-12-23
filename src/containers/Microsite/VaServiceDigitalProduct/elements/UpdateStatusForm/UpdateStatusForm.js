import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Status from '@components/Status';
import { TextField, Select } from '@components/FormField';
import FileUpload from '@components/FileUpload';
import useActions from './hooks/useActions';
import { updateStatusSchema } from '../../utilsStatus';
import Attachment from '../Attachment';
import { uploadFileEvidence } from '../../_repositories/repositories';

export default function UpdateStatusForm(props) {
  const { modalUpdateStatus } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleUpdateStatus,
    handleSubmit,
    onClose,
    optionStatus,
    loadingStatus,
    evidenceList,
    handleAddFile,
    handleDeleteFile,
  } = useActions(props);

  const normalizeStatusOptions = () => {
    const newList = [];

    optionStatus.forEach((v) => {
      const getVariant = updateStatusSchema(v.label);
      newList.push({
        label: (
          <div style={{ width: 'fit-content' }}>
            <Status
              children={getVariant.children}
              variant={getVariant.variant}
            />
          </div>
        ),
        value: v.value,
      });
    });

    return newList;
  };

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalUpdateStatus}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          {modalUpdateStatus?.title && (
            <Grid item xs={12}>
              <Typography variant="h5" weight="medium">
                {modalUpdateStatus?.title}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Select
              control={control}
              isLoading={loadingStatus}
              label="Status"
              // maxWidth={260}
              name="status"
              options={normalizeStatusOptions()}
              placeholder="Choose Status"
              required
              styles={{ control: { width: 'auto', maxWidth: 'none' } }}
              menuWidth={'100%'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Description"
              // maxLength={modalUpdateStatus?.maxLengthReason || 160}
              minRows={3}
              multiline
              name="note"
              placeholder={
                modalUpdateStatus?.placeholder || 'Please describe the note..'
              }
              required
            />
          </Grid>
          {modalUpdateStatus?.withUpload ? (
            <Grid
              item
              xs={12}
              style={{ marginBottom: evidenceList.length > 0 ? '4px' : '0' }}
            >
              <Typography children="Evidence (Optional)" variant="caption" />
              <FileUpload
                control={control}
                accept={['.pdf', '.jpg', '.jpeg', '.png']}
                fetcher={uploadFileEvidence}
                helperText="Upload .jpg, .png or .pdf document, max 5 MB "
                onChange={(v) => handleAddFile(v)}
                maxSize={5250000}
                name="evidence"
                placeholder="Example: evidence.jpg"
                disabled={evidenceList.length >= 5}
              />
            </Grid>
          ) : (
            ''
          )}
          {evidenceList.length > 0 &&
            evidenceList.map((v, index) => (
              <Attachment
                fileName={v.fileName}
                id={index}
                handleDelete={handleDeleteFile}
                key={`evidence-${v.id}`}
              />
            ))}
          <Grid container item justifyContent="center" pt={2} spacing={2}>
            <Grid item>
              <Button onClick={onClose} variant="ghost">
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={!isValid || !isDirty} type="submit">
                {modalUpdateStatus?.submitText || 'SUBMIT'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

UpdateStatusForm.defaultProps = {
  modalUpdateStatus: null,
  optionStatus: [],
  referenceId: '',
};

UpdateStatusForm.propTypes = {
  fetchDetail: PropTypes.func.isRequired,
  modalUpdateStatus: PropTypes.object,
  optionStatus: PropTypes.array,
  referenceId: PropTypes.string,
  setModalUpdateStatus: PropTypes.func.isRequired,
};
