import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Divider,
  Hidden,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import Text from '../../elements/Text';
import Tabs from '../../elements/Tabs';
import FilterDropdown from '../../elements/Dropdown';
import DateRangePickers from '../../elements/DateRangePickers';
import Button from '../../elements/Button';
import Breadcrumb from '../../elements/Breadcrumb';
import SearchBox from '../../../../components/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../../../../constants';

export default function Component(props) {
  const {
    filter,
    tab,
    actionButton,
    title,
    classes,
    breadcrumb,
    isCenterTab,
    isCustomSize,
    withFilterAndSearch,
    withSearch,
  } = props;

  const theme = useTheme();
  const mobileClient = useMediaQuery(theme.breakpoints.down('xs'));

  const dispatch = useDispatch();
  const { search = '' } = useSelector((s) => s.search) || {};

  const setSearch = (value) =>
    dispatch({
      type: ACTIONS.SEARCH_QUERY,
      data: value,
    });

  const renderFilter = (
    <Grid container justify="flex-end" spacing={1}>
      <Hidden mdUp>
        <Grid item />
      </Hidden>
      {filter.map((item, i) => {
        if (item.type === 'dropdown') {
          return (
            <Grid key={i} data-testid="dropdownTest" item {...item.grid}>
              <FilterDropdown
                {...item}
                customWidth={mobileClient ? 0 : item.customWidth}
              />
            </Grid>
          );
        } else if (item.type === 'rangeDate') {
          return (
            <Grid key={i} item {...item.grid}>
              <DateRangePickers {...item} />
            </Grid>
          );
        } else {
          return <div key={i} />;
        }
      })}
    </Grid>
  );

  const renderTab = tab && (
    <Tabs
      isPositionCenter={isCenterTab}
      onChange={tab.onChange}
      tabData={tab.options}
      value={tab.value}
    />
  );

  const renderFilterAndSearch = (
    <div className={classes.filterContainer}>
      {withSearch ? (
        <SearchBox
          onChange={setSearch}
          placeholder="Search..."
          value={search}
        />
      ) : (
        <div />
      )}
      <div>{renderFilter}</div>
    </div>
  );

  const buttonMobileGrid = actionButton.length > 2 ? 12 : 5;

  return (
    <Grid container spacing={2}>
      <Grid item md={isCustomSize.left} xs={buttonMobileGrid}>
        {breadcrumb?.length > 0 ? (
          <Breadcrumb data={breadcrumb} />
        ) : (
          <Text variant="h4">{title}</Text>
        )}
      </Grid>
      <Grid align="right" item md={isCustomSize.right} xs={buttonMobileGrid}>
        <Grid container justify="flex-end" spacing={3}>
          {actionButton.map((item, i) => (
            <>
              <Grid item>
                <Button {...item} />
              </Grid>
              {actionButton.length - 1 > i && !item.noDivider && (
                <Grid item style={{ paddingTop: 16, paddingBottom: 16 }}>
                  <Divider orientation="vertical" />
                </Grid>
              )}
            </>
          ))}
        </Grid>
      </Grid>
      {isCenterTab && <div className={classes.bottomDivider} />}
      <Grid item xs={12}>
        {renderTab}
        {withFilterAndSearch && renderFilterAndSearch}
        {!isCenterTab && <div className={classes.bottomDivider} />}
      </Grid>
    </Grid>
  );
}

Component.defaultProps = {
  breadcrumb: [],
  isCenterTab: false,
  isCustomSize: {
    left: 4,
    right: 8,
  },
  tab: null,
  withFilterAndSearch: true,
  withSearch: true,
};

Component.propTypes = {
  actionButton: PropTypes.array.isRequired,
  breadcrumb: PropTypes.array,
  classes: PropTypes.object.isRequired,
  filter: PropTypes.array.isRequired,
  isCenterTab: PropTypes.bool,
  isCustomSize: PropTypes.object,
  tab: PropTypes.object,
  title: PropTypes.string.isRequired,
  withFilterAndSearch: PropTypes.bool,
  withSearch: PropTypes.bool,
};
