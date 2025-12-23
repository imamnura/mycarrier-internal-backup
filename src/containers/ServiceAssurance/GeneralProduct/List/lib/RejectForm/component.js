import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { TextField } from '@components/FormField';
import UploadFile from '@__old/components/elements/UploadFile';
import useStyles from './styles';

export default function Component(props) {
  const {
    allowed,
    file,
    setFile,
    onSubmit,
    onClose,
    control,
    handleSubmit,
    formState,
    handleUploadFile,
  } = props;

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} style={{ padding: '24px 24px' }}>
        <Grid align="center" item xs={12}>
          <Typography
            children="Please give the reason of reject"
            variant="h4"
            weight="medium"
          />
        </Grid>
        <Grid align="center" item xs={12}>
          <Typography
            children="Once you give the reason, it will be read by customer"
            color="grey-main"
            variant="subtitle2"
            weight="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <UploadFile
            accept={allowed}
            fileName={file ? file.name : ''}
            handleDelete={setFile(null)}
            id="uploadfile"
            label="evidence"
            maxSize={1050000}
            onChange={handleUploadFile}
            withDelete={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            label="Reason"
            maxLength={160}
            minRows={4}
            multiline
            name="reason"
            required
          />
        </Grid>
        <Grid align="center" className={classes.boxButton}>
          <Button children={'CANCEL'} onClick={onClose} variant="ghost" />
          &nbsp;&nbsp;
          <Button
            children={'SUBMIT'}
            disabled={!formState.isValid || !formState.isDirty}
            type="submit"
          />
        </Grid>
      </Grid>
    </form>
  );
}

Component.defaultProps = {
  allowed: ['.pdf'],
  control: {},
  file: {},
  formState: {},
  handleSubmit: () => {},
  handleUploadFile: () => {},
  onClose: () => {},
  onSubmit: () => {},
  setFile: () => {},
};

Component.propTypes = {
  allowed: PropTypes.array,
  control: PropTypes.object,
  file: PropTypes.object,
  formState: PropTypes.object,
  handleSubmit: PropTypes.func,
  handleUploadFile: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  setFile: PropTypes.func,
};
