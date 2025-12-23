import Button from '@components/Button';
import Typography from '@components/Typography';
import { Box, InputBase } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import TimeRangePicker from '../TimeRangePicker';
import { dummyText } from '../../../../../constant';

const AddRundown = (props) => {
  const {
    classes: _classes,
    onSubmit: _onSubmit,
    baseDate,
    tab,
    setValue,
    minTime,
    type,
    initialTitle, //for testing
    initialError, //for testing
  } = props;
  const classesStyle = useStyles();
  const classes = { ..._classes, ...classesStyle };

  const [title, _setTitle] = useState(initialTitle);
  const [error, setError] = useState(initialError);

  const setTitle = (e) => {
    _setTitle(e.target.value);
  };

  const [time, setTime] = useState({
    startTime: undefined,
    endTime: undefined,
  });

  const resetForm = () => {
    _setTitle('');
    setTime({
      startTime: undefined,
      endTime: undefined,
    });
    setError(false);
  };

  const onSubmit = async () => {
    await _onSubmit({ title, ...time }, setError, resetForm);
  };

  return (
    tab === 'id' && (
      <div className={classes.container}>
        <div className={classes.parent}>
          <Box ml={3}>
            <div className={classes.node}>
              <div />
            </div>
          </Box>
          <Box ml={2} width={400}>
            <TimeRangePicker
              baseDate={baseDate}
              minTime={minTime}
              onChange={setTime}
              setValue={setValue}
              tab={tab}
              type={type}
              value={time}
            />
            <div className={classes.marginTop4}>
              <InputBase
                classes={{
                  input: classes.root,
                }}
                fullWidth
                onChange={setTitle}
                placeholder={dummyText.titleRundown}
                value={title}
              />
              {error && (
                <div className={classes.helper}>
                  <Typography
                    children="Time or Event Name already exist"
                    variant="caption"
                  />
                </div>
              )}
            </div>
          </Box>
          <Box ml={2}>
            <Button disabled={!title || !time.startTime} onClick={onSubmit}>
              add rundown
            </Button>
          </Box>
        </div>
      </div>
    )
  );
};

AddRundown.defaultProps = {
  initialError: false,
  initialTitle: '',
};

AddRundown.propTypes = {
  baseDate: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  initialError: PropTypes.bool,
  initialTitle: PropTypes.string,
  minTime: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default AddRundown;
