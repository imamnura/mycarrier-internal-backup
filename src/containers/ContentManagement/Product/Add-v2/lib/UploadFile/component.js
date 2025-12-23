import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from '@__old/utils/common';
import clsx from 'clsx';
import { formatBytes } from '@utils/text';
import CallbackAlert from '@__old/components/elements/CallbackAlert';
import { ButtonBase } from '@material-ui/core';
import Typography from '@components/Typography';
import { validatePixel, validateRatio } from './utils';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

const Component = (props) => {
  const {
    classes,
    disabled,
    onChange,
    accept,
    fileName,
    maxSize,
    isValidateByPixel,
    isValidateByRatio,
    ratio,
    ratioPixel,
    ...rest
  } = props;

  const [alert, setAlert] = useState('');

  const handleChange = ({ target: { files } }) => {
    const { size } = files[0];

    if (size > maxSize) {
      setAlert(`File Maksimal Berukuran ${formatBytes(maxSize)}`);
    } else if (isValidateByRatio) {
      let img = new Image();
      img.src = window?.URL?.createObjectURL(files[0]);
      img.onload = () => {
        validateRatio(
          img.width,
          img.height,
          files[0],
          setAlert,
          ratio,
          onChange,
        );
      };
    } else if (isValidateByPixel) {
      let img = new Image();
      img.src = window?.URL?.createObjectURL(files[0]);
      img.onload = () => {
        validatePixel(
          img.width,
          img.height,
          files[0],
          setAlert,
          ratioPixel,
          onChange,
        );
      };
    } else {
      onChange(files[0]);
    }
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <ButtonBase
          className={clsx(classes.boxLabel, {
            [classes.boxLabelFocus]: fileName,
          })}
          component="label"
          disabled={disabled}
        >
          <div>
            <DescriptionOutlinedIcon className={classes.icon} />
            <div>
              <Typography color="primary-main" variant="h4" weight="medium">
                Upload File here..
              </Typography>
            </div>
            <div>
              <Typography color="general-main" variant="caption">
                Upload {accept.join(', ')} document, max {formatBytes(maxSize)}
              </Typography>
            </div>
            <input
              accept={accept.join(', ')}
              disabled={disabled}
              hidden
              id="inputFile"
              onChange={handleChange}
              type="file"
              {...rest}
            />
          </div>
        </ButtonBase>
      </div>
      <CallbackAlert content={alert} onClose={() => setAlert('')} />
    </Fragment>
  );
};

Component.propTypes = {
  accept: PropTypes.array,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  fileName: PropTypes.string,
  handleDelete: PropTypes.func,
  input: PropTypes.object,
  isValidateByPixel: PropTypes.bool,
  isValidateByRatio: PropTypes.bool,
  maxSize: PropTypes.number,
  onChange: PropTypes.func,
  ratio: PropTypes.array,
  ratioPixel: PropTypes.array,
  withDelete: PropTypes.bool,
};

Component.defaultProps = {
  accept: [],
  disabled: false,
  fileName: '',
  handleDelete: noop,
  input: {},
  isValidateByPixel: false,
  isValidateByRatio: false,
  maxSize: 512000 * 10,
  onChange: noop,
  ratio: [1, 1],
  ratioPixel: [1366, 800],
  withDelete: false,
};

export default Component;
