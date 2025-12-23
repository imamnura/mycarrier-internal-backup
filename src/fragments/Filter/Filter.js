import DatePicker from '@components/DatePicker';
import DateRangePicker from '@components/DateRangePicker';
import Dropdown from '@components/Dropdown';
import SearchBox from '@components/SearchBox';
import { Box, Grid } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import useFilterStyles from './Filter.styles';
import useResponsive from '@utils/hooks/useResponsive';

const Filter = ({ search, filter }) => {
  const classes = useFilterStyles({ search });
  const mobileClient = useResponsive('xs');

  return (
    <div className={classes.root}>
      {search && (
        <Box width="100%" maxWidth={mobileClient ? '100%' : '260px'}>
          <SearchBox {...search} />
        </Box>
      )}
      {!!filter?.length && (
        <Grid item lg="auto" md={filter.length > 2 ? 12 : 'auto'} xs={12}>
          <Grid
            className={clsx({ [classes.filterPadding]: mobileClient })}
            container
            justifyContent={
              filter.length > 2 && !mobileClient ? 'flex-start' : 'flex-end'
            }
            spacing={1}
          >
            {filter.reverse().map((filterItem, i) => {
              const { type, ...filterProps } = filterItem;
              if (type === 'dropdown') {
                let customProps = {};

                if (i === filter.length - 1 && !mobileClient) {
                  customProps = {
                    ...customProps,
                    menuStick: 'right',
                  };
                }

                if (mobileClient) {
                  customProps = {
                    ...customProps,
                    staticWidth: '100%',
                  };
                }

                return (
                  <Grid item key={`filterItem-${i}`} sm="auto" xs={12}>
                    <Dropdown
                      staticWidth={160}
                      {...filterProps}
                      {...customProps}
                    />
                  </Grid>
                );
              }

              if (type === 'dateRange') {
                return (
                  <Grid item key={`filterItem-${i}`} sm="auto" xs={12}>
                    <DateRangePicker
                      {...filterProps}
                      fullWidth={mobileClient}
                    />
                  </Grid>
                );
              }

              if (type === 'date') {
                return (
                  <Grid item key={`filterItem-${i}`} sm="auto" xs={12}>
                    <DatePicker {...filterProps} fullWidth={mobileClient} />
                  </Grid>
                );
              }

              return null;
            })}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Filter;
