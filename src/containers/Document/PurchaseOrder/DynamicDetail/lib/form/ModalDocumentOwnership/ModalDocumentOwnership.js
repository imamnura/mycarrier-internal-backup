import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { FileUpload } from '@components/FormField';
import FileUploadAdditional from '@components/FileUpload/FileUpload';
import useActions from './hooks/useActions';
import { TextField } from '@components/FormFieldLegion';
import { postUploadFile } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { Box } from '@legion-ui/core';
import { IconButton } from '@material-ui/core';
import Trash from '@assets/icon-v2/Trash';

export default function ModalDocumentOwnership(props) {
  const { content } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleUpdateStatus,
    handleSubmit,
    onClose,
    onAddFileAdditional,
    additionalFile,
    onDeleteAdditionalFile,
  } = useActions(props);

  return (
    <Dialog maxWidth="sm" onClose={onClose} open={content?.open}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container>
          <Grid item xs={12}>
            {content?.title && (
              <Typography
                variant="h5"
                weight="medium"
                inline
                style={{ marginBottom: '12px' }}
              >
                {content?.title}
              </Typography>
            )}
            {content?.textInfo && (
              <Typography variant="caption" weight="normal">
                {content?.textInfo}
              </Typography>
            )}
          </Grid>
          <TextField
            block
            control={control}
            label="BAKES Number"
            placeholder="Input BAKES Number"
            name="bakesNumber"
            maxLength={27}
            required
          />
          <Grid item xs={12} style={{ marginTop: '12px' }}>
            <FileUpload
              accept={['.pdf']}
              control={control}
              helperText="Upload .pdf document here, max 5 MB "
              label="BAKES"
              maxSize={5242880}
              name="bakes"
              placeholder="Example: bakes.pdf"
              fetcher={postUploadFile}
              required
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '12px' }}>
            <FileUpload
              accept={['.pdf']}
              control={control}
              helperText="Upload .pdf document here, max 5 MB "
              label="Purchase Order Document"
              fetcher={postUploadFile}
              maxSize={5242880}
              name="purchase"
              placeholder="Example: purchase.pdf"
              required
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '12px' }}>
            <FileUploadAdditional
              accept={['.pdf']}
              fetcher={postUploadFile}
              helperText="*File in .pdf only. Up to 5 files with max. 5 MB/file."
              label="Additional File"
              maxSize={5242880}
              onChange={onAddFileAdditional}
              placeholder="Example: additional.pdf"
              disabled={additionalFile.length >= 5}
            />
          </Grid>
          <Box mt="14px" style={{ width: '100%' }}>
            {additionalFile.length > 0 &&
              additionalFile.map((data, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      border: '1px dashed #FAF0F0',
                      height: '40px',
                      display: 'flex',
                      padding: '0px 16px',
                      background: '#FAF0F0',
                      boxSizing: 'border-box',
                      marginTop: '8px',
                      alignItems: 'center',
                      borderRadius: '4px',
                      marginBottom: '4px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        color: '#3B525C',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontFamily: 'Titillium Web',
                        fontWeight: 'normal',
                        lineHeight: '14px',
                        letterSpacing: '0.0025em',
                      }}
                    >
                      {data.fileName}
                    </span>
                    <IconButton
                      style={{
                        padding: 6,
                        color: '#3B525C',
                        marginRight: -6,
                      }}
                      disabled={false}
                      onClick={onDeleteAdditionalFile(data.fileName)}
                      size="medium"
                      id={i + '-delete'}
                    >
                      <Trash />
                    </IconButton>
                  </div>
                );
              })}
          </Box>
          <Grid
            container
            item
            spacing={2}
            style={{ marginTop: '12px', justifyContent: 'right' }}
          >
            <Grid item>
              <Button onClick={onClose} variant="ghost">
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={!isValid || !isDirty} type="submit">
                {content?.submitText || 'SUBMIT'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

ModalDocumentOwnership.defaultProps = {
  content: null,
};

ModalDocumentOwnership.propTypes = {
  content: PropTypes.object,
};
