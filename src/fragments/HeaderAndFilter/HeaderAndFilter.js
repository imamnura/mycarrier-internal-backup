import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import DateRangePicker from '@components/DateRangePicker';
import Tabs from '@components/Tabs';
import clsx from 'clsx';
import useResponsive from '@utils/hooks/useResponsive';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import SearchBox from '@components/SearchBox/SearchBox';
import Status from '@components/Status';
import DatePicker from '@components/DatePicker';
import Tooltip from '@components/Tooltip';
import useHeaderAndFilterStyles from './HeaderAndFilter.styles';
import TabsMain from '@components/TabsMain';

const HeaderAndFilter = (props) => {
  const {
    breadcrumb,
    filter,
    action,
    tabs,
    tabsL2,
    search,
    status,
    otherStatus,
    // loading,
    header,
  } = props;

  const smClient = useResponsive('xs');
  const classes = useHeaderAndFilterStyles({ smClient });

  return (
    <>
      {(breadcrumb.length > 0 || !!action.length) && (
        <div className={classes.mainHeader}>
          <div className={classes.leftSection}>
            <div>
              {breadcrumb.length > 1 && <Breadcrumb data={breadcrumb} />}
              <div
                style={{
                  display: 'flex',
                  gap: smClient ? 4 : 16,
                  alignItems: smClient ? 'start' : 'center',
                  flexDirection: smClient ? 'column' : 'row',
                }}
              >
                <span className={classes.pageTitle}>
                  {breadcrumb[breadcrumb.length - 1]?.label}
                </span>
                <div className={classes.status}>
                  {!!status?.children && <Status {...status} />}
                  {!!otherStatus?.children && <Status {...otherStatus} />}
                </div>
              </div>
            </div>
            {header?.child && <div>{header.child}</div>}
          </div>
          {Array.isArray(action) && !!action.length ? (
            <div className={classes.actionButton}>
              {action.map(
                (
                  {
                    hideDivider = false,
                    tooltip,
                    custom: CustomRender,
                    hidden = false,
                    ...btnProps
                  },
                  i,
                ) => {
                  let actionButton = (
                    <Button {...btnProps} key={`act-btn-${i}`} />
                  );

                  if (tooltip) {
                    actionButton = (
                      <Tooltip title={tooltip}>
                        <div>
                          <Button {...btnProps} key={`act-btn-${i}`} />
                        </div>
                      </Tooltip>
                    );
                  }

                  if (CustomRender) {
                    actionButton = CustomRender;
                  }

                  if (hidden) {
                    return null;
                  }

                  return (
                    <Fragment key={i}>
                      {!!i && !hideDivider && (
                        <div className={classes.actionDivider} />
                      )}
                      {actionButton}
                    </Fragment>
                  );
                },
              )}
            </div>
          ) : (
            <>{action}</>
          )}
        </div>
      )}
      {(!!tabs.options?.length ||
        !!tabsL2.options?.length ||
        search ||
        !!filter?.length) && (
        <div
          className={clsx(classes.root, {
            [classes.rootTabCustom]: tabs?.isCustom,
          })}
        >
          <Box mb={tabs?.isCustom ? 0 : 1}>
            {tabs?.isCustom ? <Tabs {...tabs} /> : <TabsMain {...tabs} />}
            {!!tabsL2.options?.length > 0 && <Tabs {...tabsL2} />}
          </Box>
          <Grid
            alignItems="center"
            container
            justifyContent={search ? 'space-between' : 'flex-end'}
          >
            {search && (
              <Grid component={Box} item md="auto" py={1} xs={12}>
                <SearchBox {...search} />
              </Grid>
            )}
            {!!filter.length && (
              <Grid item xs={12}>
                <Grid
                  className={clsx({ [classes.filterPadding]: smClient })}
                  container
                  justifyContent="flex-end"
                  spacing={1}
                >
                  {filter.reverse().map((filterItem, i) => {
                    const { type, ...filterProps } = filterItem;
                    if (type === 'dropdown') {
                      let customProps = {};

                      if (i === filter.length - 1 && !smClient) {
                        customProps = {
                          ...customProps,
                          menuStick: 'right',
                        };
                      }

                      if (smClient) {
                        customProps = {
                          ...customProps,
                          staticWidth: '100%',
                        };
                      }

                      return (
                        <Grid item key={`filterItem-${i}`} sm="auto" xs={6}>
                          <Dropdown {...filterProps} {...customProps} />
                        </Grid>
                      );
                    }

                    if (type === 'dateRange') {
                      return (
                        <Grid item key={`filterItem-${i}`} sm="auto" xs={12}>
                          <DateRangePicker {...filterProps} />
                        </Grid>
                      );
                    }

                    if (type === 'date') {
                      return (
                        <Grid item key={`filterItem-${i}`} sm="auto" xs={12}>
                          <DatePicker {...filterProps} />
                        </Grid>
                      );
                    }

                    return null;
                  })}
                </Grid>
              </Grid>
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

HeaderAndFilter.defaultProps = {
  action: null,
  breadcrumb: [],
  filter: [],
  loading: false,
  otherStatus: null,
  search: null,
  status: null,
  tabs: {
    onChange: () => {},
    options: [],
    value: '',
  },
  tabsL2: {
    onChange: () => {},
    options: [],
    value: '',
  },
  withTopDivider: true,
};

HeaderAndFilter.propTypes = {
  action: PropTypes.array,
  breadcrumb: PropTypes.array,
  filter: PropTypes.array,
  loading: PropTypes.bool,
  otherStatus: PropTypes.object,
  search: PropTypes.object,
  status: PropTypes.object,
  tabs: PropTypes.object,
  tabsL2: PropTypes.object,
  withTopDivider: PropTypes.bool,
};

export default HeaderAndFilter;
