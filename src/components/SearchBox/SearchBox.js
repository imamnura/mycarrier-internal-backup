import { Textfield } from '@legion-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Search from '../../assets/icon-v2/Search';
import useResponsive from '../../utils/hooks/useResponsive';
import useStyles from './styles';
import Tooltip from '@components/Tooltip';

/**
 * @description for search box props information
 *
 * @typedef {import('@material-ui/core').InputBaseProps} InputBaseProps -n
 *
 * @param {InputBaseProps} props -n
 * @returns {React.FC} -n
 */

const SearchBox = (_props) => {
  const { size, id, ...props } = _props;
  const xsClient = useResponsive('xs');
  const classes = useStyles({ xsClient, size, ...props });

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const onChange = ({ target: { value } }) => {
    if (props?.onChange) {
      props.onChange(value);
    }
  };

  const handleClose = () => props.withTooltip && setTooltipOpen(false);
  const handleOpen = () => props.withTooltip && setTooltipOpen(true);

  return (
    <Tooltip
      arrow
      onOpen={handleOpen}
      open={tooltipOpen}
      title={props.placeholder}
    >
      <Textfield
        block
        type="search"
        iconLeft={<Search className={classes.icon} />}
        placeholder={props.placeholder}
        onChange={onChange}
        value={props.value}
        onFocus={handleOpen}
        onBlur={handleClose}
        id={id}
      />
    </Tooltip>
  );
};

SearchBox.defaultProps = {
  onChange: undefined,
  size: 'default',
};

SearchBox.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['default', 'large']),
};

export default SearchBox;
