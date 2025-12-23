import React from 'react';
import PropTypes from 'prop-types';
import { Grid, LinearProgress } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Typography from '@components/Typography';
import { withStyles } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    marginTop: 5,
    height: 7,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.color.primary.light,
  },
  bar: {
    borderRadius: 5,
    backgroundColor: theme.color.primary.main,
  },
}))(LinearProgress);

export default function Component(props) {
  const { modalProgressUpload, progress } = props;

  return (
    <Dialog disableClose={true} maxWidth="xs" open={modalProgressUpload}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Uploading file: {progress}%</Typography>
        </Grid>
        <Grid item xs={12}>
          <BorderLinearProgress value={progress} variant="determinate" />
        </Grid>
      </Grid>
    </Dialog>
  );
}

Component.defaultProps = {
  modalProgressUpload: null,
  progress: 0,
};

Component.propTypes = {
  modalProgressUpload: PropTypes.object,
  progress: PropTypes.number,
};
