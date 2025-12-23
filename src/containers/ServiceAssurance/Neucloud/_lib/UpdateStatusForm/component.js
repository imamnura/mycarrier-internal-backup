import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '../../../../../components/Typography';
import Button from '../../../../../components/Button';
import { TextField } from '../../../../../components/FormField';
import useStyles from './styles';

export default function Component(props) {
  const {
    onSubmit,
    title,
    caption,
    onClose,
    useform: { control, handleSubmit, formState },
  } = props;

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Typography
            children={`Please give note of ${title}`}
            variant="body1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            label="Note"
            maxLength={160}
            minRows={4}
            multiline
            name="note"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            children={`Once you ${caption},
            it will be process and data will be sent to customer automatically`}
            variant="caption"
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
  caption: 'updated the status',
  onClose: () => {},
  onSubmit: () => {},
  title: 'update status',
  useform: {
    control: {},
    formState: {},
    handleSubmit: () => {},
  },
};

Component.propTypes = {
  caption: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  useform: {
    control: PropTypes.object,
    handleSubmit: PropTypes.func,
    formState: PropTypes.object,
  },
};
