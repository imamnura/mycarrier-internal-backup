import React, { Fragment, createRef, useState } from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import Calendar from '../../../../assets/Svg/Calendar';
import Filter from '../../../../assets/Svg/ArrowDownFilter';
import { Popover } from '@material-ui/core';
import StaticPicker from './elements/StaticRangePicker';

const dateRef = createRef();

const Component = (props) => {
  const { customWidth, label, input, classes, fullDate } = props;

  const [popover, setPopover] = useState(false);

  const { value = [null, null] } = input || {};

  const startTime =
    (value[0] && value[0].format('DD MMMM YYYY')) || 'Start Date';
  const endTime = (value[1] && value[1].format('DD MMMM YYYY')) || 'End Date';

  return (
    <Fragment>
      <div style={{ width: customWidth || '100%', minWidth: 74 }}>
        {label && (
          <Text color="grey" variant="caption">
            {label.toUpperCase()}
          </Text>
        )}
        <div
          className={classes.root}
          onClick={() => setPopover(true)}
          ref={dateRef}
        >
          <Calendar />
          <Text className={classes.value} variant="body2">
            {startTime} - {endTime}
          </Text>
          <Filter />
        </div>
      </div>
      <Popover
        anchorEl={dateRef.current}
        anchorOrigin={{
          vertical: 'bottom',
        }}
        classes={{
          paper: classes.popover,
        }}
        onClose={() => setPopover(false)}
        open={popover}
      >
        <StaticPicker
          {...input}
          fullDate={fullDate}
          onClose={() => setPopover(false)}
        />
      </Popover>
    </Fragment>
  );
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  customWidth: PropTypes.bool,
  fullDate: PropTypes.bool,
  input: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.object,
};

Component.defaultProps = {
  customWidth: false,
  fullDate: false,
  input: {},
  label: '',
  options: [],
};

export default Component;
