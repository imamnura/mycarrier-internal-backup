import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';

const Component = (props) => {
  const { classes, data, child, name, vertical, hide } = props;

  return (
    <div className={classes.itemWrapper}>
      {data.map((item, index) => {
        return (
          hide(index) && (
            <div
              className={classes.itemContainer}
              key={name + index}
              style={{ alignItems: vertical }}
            >
              <div className={classes.numberCircle}>
                <Text className={classes.number} color="white" variant="h5">
                  {index + 1}
                </Text>
              </div>
              {child({ ...item, index })}
            </div>
          )
        );
      })}
    </div>
  );
};

Component.propTypes = {
  child: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  hide: PropTypes.func,
  name: PropTypes.string,
  vertical: PropTypes.string,
};

Component.defaultProps = {
  data: [],
  hide: () => true,
  name: '',
  vertical: 'flex-start',
};

export default Component;
