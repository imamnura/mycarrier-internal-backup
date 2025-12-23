import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';
import Cancel from '@assets/icon-v2/Cancel';
import useStyles from './styles';

const SearchDrawer = (props) => {
  const classes = useStyles();

  const { children, onClose, open } = props;

  return (
    <Drawer
      anchor="top"
      BackdropProps={{ invisible: true }}
      classes={{ paper: classes.root }}
      onClose={onClose}
      open={open}
    >
      {children}
      <div className={classes.closeIcon} onClick={onClose}>
        <Cancel />
      </div>
    </Drawer>
  );
};

SearchDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SearchDrawer;
