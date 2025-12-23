import React from 'react';
import { Tabs, Tab, useTheme, useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';

const Component = (props) => {
  const {
    classes,
    value,
    tabData,
    rightItem,
    onChange,
    isPositionCenter,
    ...rest
  } = props;

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const keepOnTop = rest.keepOnTop && mdUp;
  const mobileClient = mdDown && !keepOnTop;

  return (
    <div>
      <div
        className={isPositionCenter ? classes.centerItem : classes.defaultItem}
      >
        <Tabs
          {...rest}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator,
          }}
          disableRipple
          onChange={(e, v) => onChange(v)}
          value={value}
        >
          {tabData.map((tab, index) => (
            <Tab
              classes={{
                root: classes.tabRoot,
                wrapper: classes.tabWrapper,
                selected: classes.tabSelected,
              }}
              disableTouchRipple
              key={'tabs' + index}
              label={tab}
            />
          ))}
        </Tabs>
        {!mobileClient && !rest.keepOnBottom && !isPositionCenter && (
          <div className={classes.rightItem}>{rightItem}</div>
        )}
      </div>
      <div className={classes.bottomDivider} />
      {(mobileClient || rest.keepOnBottom) && rightItem && (
        <div className={classes.rightItem}>{rightItem}</div>
      )}
    </div>
  );
};
Component.propTypes = {
  balance: PropTypes.bool,
  classes: PropTypes.object,
  isPositionCenter: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  rightItem: PropTypes.node,
  tabData: PropTypes.array,
  value: PropTypes.number.isRequired,
};

Component.defaultProps = {
  balance: false,
  classes: {},
  isPositionCenter: false,
  rightItem: null,
  tabData: [],
};

export default Component;
