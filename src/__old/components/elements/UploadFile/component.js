import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from '../../../utils/common';
import Text from '../Text';
import clsx from 'clsx';
import { textLimit, formatBytes } from '../../../../utils/text';
import CallbackAlert from '../CallbackAlert';
import { ButtonBase } from '@material-ui/core';
import Success from '../../../../assets/Svg/Success';
import Delete from '../../../../assets/Svg/Delete';
import { validatePixel, validateRatio } from './utils';
import Typography from '@components/Typography';

const Component = (props) => {
  const {
    classes,
    disabled,
    onChange,
    accept,
    fileName,
    label,
    labelInput,
    maxSize,
    isLabelInputTop,
    isValidateByPixel,
    isValidateByRatio,
    ratio,
    ratioPixel,
    withDelete,
    handleDelete,
    labelCustom,
    error,
    required,
    ...rest
  } = props;

  const [alert, setAlert] = useState('');

  const checkedIcon = fileName && <Success className={classes.iconSuccess} />;
  const deleteIcon = fileName && (
    <Delete className={classes.iconSuccess} onClick={handleDelete} />
  );

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

  // const validateRatio = (w, h, files) => {
  //   if ((w / h) !== (ratio[0]/ratio[1])) {
  //     setAlert(`image not valid, please upload image with ratio ${ratio[0]} : ${ratio[1]}`);
  //   } else {
  //     onChange(files);
  //   }
  // };

  // const validatePixel = (w, h, files) => {
  //   if (( w !== ratioPixel[0]) && ( h !== ratioPixel[1])) {
  //     setAlert(`image not valid,
  //       please upload image with size ${ratioPixel[0]} : ${ratioPixel[1]} pixel`);
  //   } else {
  //     onChange(files);
  //   }
  // };

  const requiredMark = (
    <>
      <Typography color="primary-main" variant="subtitle2">
        *{' '}
      </Typography>
      <Typography color="grey" variant="caption">
        {labelInput}
      </Typography>
    </>
  );

  return (
    <Fragment>
      {isLabelInputTop &&
        (required ? (
          requiredMark
        ) : (
          <Text color="grey" variant="caption">
            {labelInput}
          </Text>
        ))}
      <div className={classes.root}>
        <ButtonBase
          className={clsx(classes.boxLabel, {
            [classes.boxLabelFocus]: fileName,
            [classes.boxLabelError]: error,
          })}
          component="label"
          disabled={disabled}
        >
          <Text
            className={clsx(classes.fileName, {
              [classes.placeholder]: !fileName,
            })}
          >
            {fileName
              ? textLimit(fileName, 30)
              : labelCustom ||
                `Upload ${accept.join('/')} ${label}, max ${formatBytes(
                  maxSize,
                )}`}
            <input
              accept={accept.join(', ')}
              disabled={disabled}
              hidden
              id="inputFile"
              onChange={handleChange}
              type="file"
              {...rest}
            />
          </Text>
          {withDelete ? deleteIcon : checkedIcon}
        </ButtonBase>
      </div>
      {!isLabelInputTop &&
        (required ? (
          requiredMark
        ) : (
          <Text color="grey" variant="caption">
            {labelInput}
          </Text>
        ))}
      <CallbackAlert content={alert} onClose={() => setAlert('')} />
    </Fragment>
  );
};

Component.propTypes = {
  accept: PropTypes.array,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fileName: PropTypes.string,
  handleDelete: PropTypes.func,
  input: PropTypes.object,
  isLabelInputTop: PropTypes.bool,
  isValidateByPixel: PropTypes.bool,
  isValidateByRatio: PropTypes.bool,
  label: PropTypes.string,
  labelCustom: PropTypes.string,
  labelInput: PropTypes.string,
  maxSize: PropTypes.number,
  onChange: PropTypes.func,
  ratio: PropTypes.array,
  ratioPixel: PropTypes.array,
  required: PropTypes.bool,
  withDelete: PropTypes.bool,
};

Component.defaultProps = {
  accept: [],
  disabled: false,
  error: false,
  fileName: '',
  handleDelete: noop,
  input: {},
  isLabelInputTop: false,
  isValidateByPixel: false,
  isValidateByRatio: false,
  label: '',
  labelCustom: '',
  labelInput: '',
  maxSize: 512000 * 2,
  onChange: noop,
  ratio: [1, 1],
  ratioPixel: [1366, 800],
  required: false,
  withDelete: false,
};

export default Component;
