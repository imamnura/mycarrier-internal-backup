import React from 'react';
import PropTypes from 'prop-types';
import { IMAGES } from '../../__old/configs';

export default function Component(props) {
  const { classes, children, action, completed } = props;

  if (completed) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.header} style={{ position: 'fixed', top: 0 }}>
          <img src={IMAGES.LOGO} alt="logo" />
        </div>
        {completed}
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <img src={IMAGES.LOGO} alt="logo" />
      </div>
      <div className={classes.mainWrapper}>
        <div className={classes.mainPaper}>
          {children}
          <div style={{ height: 160 }} />
        </div>
      </div>
      {action && (
        <div className={classes.floatingBar}>
          <div className={classes.actionWrapper}>
            <center>{action}</center>
          </div>
        </div>
      )}
    </div>
  );
}

Component.defaultProps = {
  action: null,
  children: null,
  completed: null,
};

Component.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  completed: PropTypes.node,
};
