import React from 'react';
import PropTypes from 'prop-types';
import { Divider, IconButton, Tab, Tabs as MuiTabs } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';
import Swap from '@assets/Svg/Swap';

const Tabs = (props) => {
  const {
    options,
    value,
    onChange: _onChange,
    onSwap,
    variant: _variant,
    isCustom,
  } = props;

  const withSwap = !!onSwap && options.length === 2;

  const classes = useStyles({ withSwap });

  const onChange = (e, v) => _onChange(v);

  const variant = {
    fullWidth: 'fullWidth',
    centered: 'standard',
    default: 'scrollable',
  }[_variant];

  return (
    <div className={classes.root}>
      <MuiTabs
        centered={_variant === 'centered'}
        classes={{
          indicator: classes.indicator,
          flexContainer: clsx({ [classes.flexContainerWithSwap]: withSwap }),
          root: classes.root,
        }}
        id="tabs"
        onChange={onChange}
        scrollButtons="auto"
        value={value}
        variant={variant}
      >
        {options.map((tabItem, i) => (
          <Tab
            classes={{
              root: clsx({
                [classes.tab]: true,
                [classes.tabSpacing]: i > 0,
              }),
              selected: isCustom
                ? classes.tabSelectedCustom
                : classes.tabSelected,
            }}
            disableRipple
            key={tabItem.value}
            label={tabItem.label}
            value={tabItem.value}
            id={tabItem.id}
          />
        ))}
      </MuiTabs>
      {withSwap && (
        <IconButton className={classes.swap} onClick={onSwap}>
          <Swap />
        </IconButton>
      )}
      {!isCustom && <Divider className={classes.divider} />}
    </div>
  );
};

Tabs.defaultProps = {
  onSwap: undefined,
  options: [],
  value: false,
  variant: 'default',
  isCustom: false,
};

Tabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSwap: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  variant: PropTypes.oneOf(['centered', 'fullWidth', 'default']),
  isCustom: PropTypes.bool,
};

export default Tabs;
