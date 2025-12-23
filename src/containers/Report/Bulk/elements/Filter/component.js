import React from 'react';
import { Grid, useTheme, useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
import FilterDropdown from '@__old/components/elements/Dropdown';

const Component = (props) => {
  const {
    values: { chartType, reportTime, reportCustomer, reportType },
    options: {
      optionsReportType,
      optionsReportCustomer,
      optionsReportTime,
      optionsChartType,
    },
    onChange: {
      handleChangeChartType,
      handleChangeReportTime,
      handleChangeReportCustomer,
      handleChangeReportType,
    },
    activeTab,
  } = props;

  const theme = useTheme();
  const mobileClient = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid
      container
      justify={mobileClient ? 'flex-start' : 'flex-end'}
      spacing={1}
    >
      <Grid item sm="auto" xs={6}>
        {activeTab === 0 && (
          <FilterDropdown
            customWidth={mobileClient ? '' : 125}
            onChange={handleChangeReportType}
            options={optionsReportType}
            value={reportType}
          />
        )}
      </Grid>
      <Grid item sm="auto" xs={6}>
        <FilterDropdown
          customWidth={mobileClient ? '' : 135}
          onChange={handleChangeReportCustomer}
          options={optionsReportCustomer}
          value={reportCustomer}
        />
      </Grid>
      <Grid item sm="auto" xs={6}>
        <FilterDropdown
          customWidth={mobileClient ? '' : 100}
          onChange={handleChangeReportTime}
          options={optionsReportTime}
          value={reportTime}
        />
      </Grid>
      <Grid item sm="auto" xs={6}>
        <FilterDropdown
          onChange={handleChangeChartType}
          options={optionsChartType}
          value={chartType}
        />
      </Grid>
    </Grid>
  );
};

Component.propTypes = {
  activeTab: PropTypes.number.isRequired,
  onChange: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Component;
