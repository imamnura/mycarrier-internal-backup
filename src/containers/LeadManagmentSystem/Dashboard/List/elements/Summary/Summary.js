import Maximize from '@assets/icon-v2/Maximize';
import ChartLegend from '@components/ChartLegend';
import DateRangePicker from '@components/DateRangePicker';
import PieChart from '@components/PieChart';
import Typography from '@components/Typography';
import { Box, Divider, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles, { pieTheme } from './styles';

const Summary = () => {
  const classes = useStyles();
  const {
    filterDateSubmit,
    setFilterDateSubmit,
    redirectToReport,
    data,
    loading,
    totalData,
  } = useAction();

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography color="general-mid" variant="h4" weight="medium">
          Lead Submit Summary
        </Typography>
        <IconButton className={classes.maximize} onClick={redirectToReport}>
          <Maximize />
        </IconButton>
      </div>
      <div className={classes.filter}>
        <DateRangePicker
          label="Date Submit"
          onChange={setFilterDateSubmit}
          value={filterDateSubmit}
        />
      </div>
      <Divider />
      <div className={classes.graph}>
        <Grid alignItems="center" container justifyContent="center" spacing={2}>
          <Grid item md="auto" style={{ padding: '0' }} xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                minWidth: 100,
              }}
            >
              <Typography color="general-mid" variant="caption">
                Total Submit
              </Typography>
              <Typography
                color="general-main"
                inline
                variant="h2"
                weight="bold"
              >
                {loading ? '0' : totalData}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={7} style={{ padding: '0' }} xs={12}>
            <PieChart
              arcLinkLabelsDiagonalLength={8}
              arcLinkLabelsStraightLength={8}
              arcLinkLabelsTextOffset={4}
              arcLinkLabelsThickness={2}
              data={data}
              height={240}
              indexBy="label"
              legends={false}
              loading={loading}
              margin={{
                top: 40,
                left: 64,
                right: 64,
                bottom: 40,
              }}
              theme={pieTheme}
            />
          </Grid>
          <Grid item md="auto" style={{ padding: '0' }} xs={12}>
            {data.map(({ label, color }) => (
              <Box key={label} mb={1}>
                <ChartLegend color={color} labelProps={{ weight: 'normal' }}>
                  {label}
                </ChartLegend>
              </Box>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Summary;
