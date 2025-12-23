import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Button from '@components/Button';
import Typography from '@components/Typography';

export default function Component(props) {
  const { label, actions } = props;
  return (
    <Grid alignItems="center" container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">{label}</Typography>
      </Grid>
      {actions.map(({ label, onClick }, index) => (
        <Grid item key={label}>
          <Button
            onClick={onClick}
            variant={index === actions.length - 1 ? 'filled' : 'ghost'}
          >
            {label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

Component.defaultProps = {
  actions: [],
  label: '',
};

Component.propTypes = {
  actions: PropTypes.array,
  label: PropTypes.string,
};
