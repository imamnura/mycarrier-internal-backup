import { Grid, Hidden } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';

const Auth = (props) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid className={classes.centered} item lg={6} xs={12}>
        <div className={classes.mainWrapper}>{props.children}</div>
      </Grid>
      <Hidden mdDown>
        <Grid item lg={6}>
          <div className={classes.banner} />
        </Grid>
      </Hidden>
    </Grid>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;
