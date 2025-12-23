/* eslint-disable import/no-unresolved */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../action';
import styles from './styles';

// slider
import SwipeableViews from 'react-swipeable-views';

const Carousel = ({ children, position }) => {
  return (
    <div>
      <SwipeableViews index={position}>{children}</SwipeableViews>
    </div>
  );
};

Carousel.defaultProps = {
  // classes: {}
  position: 0,
};

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  getActiveSlide: PropTypes.func.isRequired,
  position: PropTypes.number,
};

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(actions, dispatch) };
}

const Styled = withStyles(styles)(Carousel);

export default connect(null, mapDispatchToProps)(Styled);
