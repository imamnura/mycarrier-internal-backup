import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import Text from '../Text';
import { colorPick } from './constant';
import { Done } from '@material-ui/icons';
import { noop } from '../../../utils/common';

const Component = (props) => {
  const { classes, active, setActive, items, lastChangeForm } = props;

  const theme = useTheme();
  const isLargeClient = useMediaQuery(theme.breakpoints.up('lg'));

  // eslint-disable-next-line react/prop-types
  const content = ({ label, index, isActive, isComplete }) => (
    <>
      <div
        className={clsx(classes.number, {
          [classes.numberActive]: isActive,
          [classes.numberComplete]: isComplete,
        })}
      >
        {isComplete ? (
          <Done style={{ width: 24, height: 20 }} viewBox="0 0 24 18" />
        ) : (
          <Text color={isActive ? 'white' : 'default'} variant={'h5'}>
            {index + 1}
          </Text>
        )}
      </div>
      <Text
        className={classes.label}
        color={colorPick({ index, active })}
        variant={'h5'}
        weight="medium"
      >
        {label}
      </Text>
    </>
  );

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto', paddingBottom: 8 }}>
      <div style={{ width: isLargeClient ? '100%' : 'max-content' }}>
        <Grid container>
          {items.map(({ label }, index) => {
            const isActive = index === active;
            const isComplete = index < active;
            const isDisabled = lastChangeForm + 1 < index;
            return (
              <Grid
                className={
                  index < items.length - 1
                    ? clsx(classes.triangle, {
                        [classes.triangleActive]: index === active,
                        [classes.triangleComplete]: index < active,
                      })
                    : ''
                }
                item
                key={label}
                xs={true}
              >
                <div
                  className={clsx({
                    [classes.itemRootComplete]: index < active - 1,
                    [classes.itemRootActive]: index === active - 1,
                    [classes.itemRootFirst]: index === 0,
                    [classes.itemRootLast]: index === items.length - 1,
                    [classes.itemRoot]: index > active - 1,
                    [classes.noBorder]: active > items.length - 2,
                  })}
                >
                  <div
                    className={clsx(classes.item, {
                      [classes.itemActive]: isActive,
                      [classes.itemCompleted]: isComplete,
                      [classes.itemLast]: index === items.length - 1,
                      [classes.itemFirst]: index === 0,
                      [classes.itemClickable]: setActive,
                      [classes.itemDisabled]: setActive ? isDisabled : false,
                    })}
                    onClick={
                      !setActive || isDisabled
                        ? noop
                        : () => setActive(active, index)
                    }
                  >
                    {content({ label, index, isComplete, isActive })}
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

Component.defaultProps = {
  active: 0,
  classes: {},
  items: [],
  lastChangeForm: 0,
  setActive: null,
};

Component.propTypes = {
  active: PropTypes.number,
  classes: PropTypes.object,
  items: PropTypes.array,
  lastChangeForm: PropTypes.number,
  setActive: PropTypes.func,
};

export default Component;
