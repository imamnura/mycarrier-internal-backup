import React, { useState, useEffect } from 'react';
import Typography from '@components/Typography';
import { Box, InputBase } from '@material-ui/core';
import useStyles from './styles';
import PropTypes from 'prop-types';
import ButtonMinimal from '@components/ButtonMinimal';
import Order from '@assets/icon-v2/Order';
import TimeRangePicker from '../TimeRangePicker';
import { dummyText, dummyTextEng } from '../../../../../constant';

const RundownItem = (props) => {
  const {
    classes: _classes,
    onSubmit: _onSubmit,
    onDelete,
    provided,
    data,
    tab,
    setValue,
    endTimeRundown,
    minTime,
    baseDate,
  } = props;
  const classesStyle = useStyles();
  const classes = { ..._classes, ...classesStyle };

  const [_title, _setTitle] = useState();

  const title = typeof _title === 'string' ? _title : data.title;

  const { startTime, endTime } = data;

  const setTitle = (e) => {
    _setTitle(e.target.value);
  };

  useEffect(() => {
    let timer = setTimeout(() => onSubmitTitle(), 1000);
    return () => clearTimeout(timer);
  }, [title]);

  const onSubmitTitle = () => {
    _onSubmit({
      ...data,
      title,
    });
  };

  const onSubmitTime = ({ startTime, endTime }) => {
    _onSubmit({
      ...data,
      startTime,
      endTime,
    });
  };

  return (
    <div className={classes.parent}>
      <span {...provided.dragHandleProps}>
        <Order />
      </span>
      <div className={classes.node}>
        <div />
      </div>
      <Box flexGrow={1} ml={2}>
        <Box sx={{ display: 'flex' }}>
          <TimeRangePicker
            baseDate={baseDate}
            endTimeRundown={endTimeRundown}
            minTime={minTime}
            onChange={onSubmitTime}
            setValue={setValue}
            tab={tab}
            value={{
              endTime,
              startTime,
            }}
          />
          <Box sx={{ marginLeft: '5px' }}>
            <Typography children="WIB" color="general-mid" variant="caption" />
          </Box>
        </Box>
        <div className={classes.marginTop4}>
          <InputBase
            classes={{
              input: classes.root,
            }}
            fullWidth
            onBlur={onSubmitTitle}
            onChange={setTitle}
            placeholder={
              tab === 'id' ? dummyText.titleRundown : dummyTextEng.titleRundown
            }
            value={title}
          />
          {title === '' && (
            <div className={classes.helper}>
              <Typography
                children="Title is a required field"
                variant="caption"
              />
            </div>
          )}
        </div>
      </Box>
      {tab === 'id' && (
        <Box pr={2}>
          <ButtonMinimal
            label="delete rundown"
            onClick={onDelete}
            variant="delete"
          />
        </Box>
      )}
    </div>
  );
};

RundownItem.propTypes = {
  baseDate: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  endTimeRundown: PropTypes.string.isRequired,
  minTime: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  provided: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
};

export default RundownItem;
