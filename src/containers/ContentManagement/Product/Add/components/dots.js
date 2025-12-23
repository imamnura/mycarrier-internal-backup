import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const Dots = ({
  changeSlide,
  classes,
  active,
  getUpdateSlide,
  defaultSlide,
  data,
  position,
  activeTab,
}) => {
  const handleAddSlide = () => {
    if (data.length < 10) {
      getUpdateSlide([...data, defaultSlide]);
      changeSlide(0);
    }
  };

  const handleRemoveSlide = () => {
    if (data.length > 1) {
      const filtered = data.filter((el) => el._uid !== data[active]._uid);
      getUpdateSlide(filtered);
      if (active === 0) {
        changeSlide(0);
      } else {
        changeSlide(active - 1);
      }
    }
  };

  const handleDot = (index) => changeSlide(index);

  return (
    <div
      className={
        position === 'middle'
          ? classes.dotsContainerMiddle
          : classes.dotsContainer
      }
    >
      {activeTab === 0 && (
        <div className={classes.deleteButton} onClick={handleRemoveSlide}>
          <CancelIcon />
          <div> DELETE SLIDE </div>
        </div>
      )}

      {data.map((item, i) => {
        if (i === active) {
          return <div className={classes.dotsActive} key={i} />;
        } else {
          return (
            <div
              className={classes.dots}
              onClick={() => handleDot(i)}
              key={i}
            />
          );
        }
      })}

      {activeTab === 0 && (
        <div className={classes.addButton} onClick={handleAddSlide}>
          <AddCircleIcon />
          <div> ADD SLIDE </div>
        </div>
      )}
    </div>
  );
};

Dots.defaultProps = {
  active: 0,
  activeTab: 0,
  classes: {},
  defaultSlide: {},
  position: '',
};

Dots.propTypes = {
  active: PropTypes.number,
  activeTab: PropTypes.number,
  changeSlide: PropTypes.func.isRequired,
  classes: PropTypes.object,
  data: PropTypes.object.isRequired,
  defaultSlide: PropTypes.object,
  getUpdateSlide: PropTypes.func.isRequired,
  position: PropTypes.string,
};

const Styled = withStyles(styles)(Dots);

export default Styled;
