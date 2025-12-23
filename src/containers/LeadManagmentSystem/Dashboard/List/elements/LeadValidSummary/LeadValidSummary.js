import Maximize from '@assets/icon-v2/Maximize';
import ChartLegend from '@components/ChartLegend';
import DateRangePicker from '@components/DateRangePicker';
import PieChart from '@components/PieChart';
import Typography from '@components/Typography';
import Tooltip from '@components/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Box, Divider, Grid, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles, { pieTheme } from './styles';

const LeadValidSummary = () => {
  const classes = useStyles();
  const {
    filterDateSubmit,
    setFilterDateSubmit,
    redirectToReport,
    data,
    loading,
    totalData,
    countSlider,
    dotsActive,
    setDotsActive,
    dateOn,
  } = useAction();

  const sectionGraph = (
    <div className={classes.graph}>
      <Grid alignItems="center" container justifyContent="center" spacing={2}>
        <Grid item md="auto" xs={12}>
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
              Total Valid
            </Typography>
            <Typography color="general-main" inline variant="h2" weight="bold">
              {loading ? '0' : totalData}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <PieChart
            arcLinkLabelsDiagonalLength={8}
            arcLinkLabelsStraightLength={8}
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
        <Grid item md="auto" xs={12}>
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
  );

  const sectionRevenue = (
    <div className={classes.revenue}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="general-general" variant="subtitle2" weight="medium">
          Data on {dateOn}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginTop: '27px',
        }}
      >
        <Box sx={{ display: 'grid', textAlign: 'center' }}>
          <Typography color="general-mid" variant="caption" weight="medium">
            Total Valid Agreement
          </Typography>
          <Typography
            color="general-general"
            style={{ marginTop: '14px' }}
            variant="h2"
            weight="bold"
          >
            {data?.totalValidAgreement || '0'}
          </Typography>
        </Box>
        <Box sx={{ marginTop: '12px' }}>
          <ArrowForwardIosIcon color="primary" />
        </Box>
        <Box sx={{ display: 'grid', textAlign: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="general-mid" variant="caption" weight="medium">
              Revenue Agreement
            </Typography>
            <Tooltip
              arrow
              placement="top"
              title={'Revenue agreement is estimated from the status quote'}
            >
              <span style={{ display: 'flex', margin: '0 5px' }}>
                <InfoOutlinedIcon fontSize="small" />
              </span>
            </Tooltip>
          </Box>
          <Typography
            color="general-general"
            style={{ marginTop: '14px' }}
            variant="h2"
            weight="bold"
          >
            {data?.revenueAgreement || '0M'}
          </Typography>
        </Box>
      </Box>
    </div>
  );

  return (
    <div className={classes.container} style={{ paddingBottom: '8px' }}>
      <div className={classes.title}>
        <Typography color="general-mid" variant="h4" weight="medium">
          Lead Valid Summary
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
      {dotsActive === 0 ? sectionGraph : sectionRevenue}
      <div className={classes.dotsContainer}>
        {countSlider.map((item, index) => (
          <div
            className={dotsActive === index ? classes.dotsActive : classes.dots}
            key={index}
            onClick={setDotsActive(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default LeadValidSummary;
