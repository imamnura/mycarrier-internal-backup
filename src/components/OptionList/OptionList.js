import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import clsx from 'clsx';

const OptionList = (props) => {
  const { options, onChange, value, redBorder } = props;
  const classes = useStyles();

  const setSelected = (value) => () => onChange(value);

  return (
    <>
      {options.map(({ Icon, label, description, value: _value }) => (
        <div
          className={clsx({
            [classes.root]: true,
            [classes.selectedRedBorder]: _value === value && redBorder,
            [classes.rootSelected]: _value === value,
          })}
          key={label}
          onClick={setSelected(_value)}
        >
          {Icon && (
            <div
              className={clsx({
                [classes.iconContainer]: true,
                [classes.iconContainerSelected]: _value === value,
              })}
            >
              <Icon
                className={clsx({
                  [classes.icon]: true,
                  [classes.iconSelected]: _value === value,
                })}
              />
            </div>
          )}
          <Box flexGrow={1}>
            <Typography variant="subtitle1" weight="bold">
              {label}
            </Typography>
            {description && (
              <Box mt={1}>
                <Typography color="general-mid" variant="caption">
                  {description}
                </Typography>
              </Box>
            )}
          </Box>
        </div>
      ))}
    </>
  );
};

OptionList.defaultProps = {
  options: [],
  redBorder: false,
  value: '',
};

OptionList.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  redBorder: PropTypes.bool,
  value: PropTypes.string,
};

export default OptionList;
