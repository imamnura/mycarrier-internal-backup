import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { FileUpload } from '@components/FormField';
import useActions from './hooks/useActions';

export default function Component(props) {
  const { content } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleUpdateStatus,
    handleSubmit,
    onClose,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={content?.open}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          {content?.title && (
            <Grid align="center" item xs={12}>
              <Typography variant="h5" weight="medium">
                {content?.title}
              </Typography>
            </Grid>
          )}
          {content?.textInfo && (
            <Grid align="center" item xs={12}>
              <Typography variant="caption" weight="normal">
                {content?.textInfo}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <FileUpload
              accept={['.pdf']}
              control={control}
              helperText="Upload .pdf document here, max 5 MB "
              label="BASO"
              maxSize={5242880}
              name="media"
              placeholder="Example: baso.pdf"
              required
            />
          </Grid>
          {content?.caption && (
            <Grid item xs={12}>
              <Typography variant="caption" weight="normal">
                {content?.caption}
              </Typography>
            </Grid>
          )}
          <Grid container item justifyContent="center" pt={2} spacing={2}>
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

Component.defaultProps = {
  content: null,
};

Component.propTypes = {
  content: PropTypes.object,
};
