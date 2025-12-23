import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import {
  Select,
  TextField,
  TextFieldMasked,
  FileUpload,
} from '@components/FormField';
import useActions from './hooks/useActions';
import { TextArea } from '@components/FormFieldLegion';

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
        <Grid container style={{ padding: '12px' }}>
          {content?.title && (
            <Grid align="flex-start" item xs={12}>
              <Typography color="general-dark" variant="h5" weight="medium">
                {content?.title}
              </Typography>
            </Grid>
          )}
          {content?.textInfo && (
            <Grid align="center" item xs={12}>
              <Typography color="general-mid" variant="caption" weight="normal">
                {content?.textInfo}
              </Typography>
            </Grid>
          )}
          <Grid item style={{ paddingTop: '16px' }} xs={12}>
            <Grid container spacing={1}>
              {content?.schema?.map(
                ({ grid = 12, type, inputType, ...fieldProps }, index) => {
                  if (type === 'dropdown') {
                    return (
                      <Grid item key={index} xs={grid}>
                        <Select control={control} {...fieldProps} />
                      </Grid>
                    );
                  }

                  if (type === 'textFieldMasked') {
                    return (
                      <Grid item key={index} xs={grid}>
                        <TextFieldMasked control={control} {...fieldProps} />
                      </Grid>
                    );
                  }

                  if (type === 'file') {
                    return (
                      <Grid item xs={12} key={index}>
                        <FileUpload control={control} {...fieldProps} />
                      </Grid>
                    );
                  }

                  if (type === 'textArea') {
                    return (
                      <Grid item key={index} xs={grid}>
                        <TextArea block control={control} {...fieldProps} />
                      </Grid>
                    );
                  }

                  return (
                    <Grid item key={index} xs={grid}>
                      <TextField
                        control={control}
                        type={inputType}
                        {...fieldProps}
                      />
                    </Grid>
                  );
                },
              )}
            </Grid>
          </Grid>
          {content?.caption && (
            <Grid item xs={12}>
              <Typography color="general-mid" variant="caption" weight="normal">
                {content?.caption}
              </Typography>
            </Grid>
          )}
          <Grid
            container
            item
            justifyContent="flex-end"
            pt={2}
            spacing={2}
            style={{ paddingTop: '20px' }}
          >
            <Grid item>
              <Button
                onClick={onClose}
                variant="ghost"
                id="update-status-cancel"
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!isValid || !isDirty}
                type="submit"
                id="update-status-seubmit"
              >
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
