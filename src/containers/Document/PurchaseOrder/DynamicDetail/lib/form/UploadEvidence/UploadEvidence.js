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
        <Grid container spacing={1} style={{ padding: '0px 16px' }}>
          <Grid align="center" item xs={12}>
            {content?.title && (
              <Typography
                variant="h5"
                weight="medium"
                inline
                style={{ marginBottom: '4px' }}
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
          <Grid item xs={12}>
            <FileUpload
              accept={['.pdf', '.jpg', '.jpeg', '.png']}
              control={control}
              label="Evidence"
              maxSize={5242880}
              name="media"
              placeholder="Example: evidence.pdf"
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
          <Grid
            container
            item
            justifyContent="center"
            spacing={2}
            style={{ marginTop: '8px' }}
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

Component.defaultProps = {
  content: null,
};

Component.propTypes = {
  content: PropTypes.object,
};
