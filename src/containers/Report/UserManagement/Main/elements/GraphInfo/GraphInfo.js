import React from 'react';
import LineChart from '@components/LineChart';
import Tabs from '@components/Tabs';
import Typography from '@components/Typography';
import PieChart from '@components/PieChart';
import useAction from './hooks/useAction';
import useStyles from './styles';
import VerticalBarChart from '@components/VerticalBarChart';
import { handlePaddingBarChart, formatPercentage } from '../../utils';
import { Box, Grid } from '@material-ui/core';
import ArrowRight from '@assets/icon-v2/ArrowRight';
import Card from '@components/Card';

const GraphInfo = (props) => {
  const { clickToAction, data, loading, optionsTab, setTab, tab, title } =
    useAction(props);

  const classes = useStyles();

  return (
    <Card title={title} style={{ marginBottom: 24 }}>
      <Tabs onChange={setTab} options={optionsTab} value={tab} />
      <Box mt={2} />
      <Grid container>
        <Grid item minWidth={600} sm={6} xs={12}>
          {tab === 'Registered' ? (
            <VerticalBarChart
              {...data[tab].bar}
              axisBottom={null}
              colors={({ data, id }) => data[`${id}Color`]}
              groupMode="grouped"
              height={530}
              isInteractive
              leftLabel={tab.toUpperCase()}
              loading={loading}
              margin={{ top: 40, right: 0, bottom: 10, left: 40 }}
              padding={handlePaddingBarChart(data[tab].bar.data)}
              tooltipLabel={({ id }) => id}
            />
          ) : (
            <LineChart
              animate
              data={data[tab]?.line}
              height={550}
              indexBy="id"
              leftLabel={tab.toUpperCase()}
              legends
              loading={loading}
            />
          )}
        </Grid>
        <Grid item sm={6} xs={12}>
          <PieChart
            animate
            arcLabel={(item) =>
              formatPercentage(item.value, data[tab].pie.totalData)
            }
            data={data[tab]?.pie?.data}
            height={540}
            // valueFormat: (item)=> formatPercentage(item, _data?.totalData),
            // height={304}
            loading={loading}
            tooltip={({ datum: { value, color, label } }) => (
              <Box
                sx={{
                  alignItems: 'center',
                  background: 'white',
                  borderRadius: 2,
                  boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
                  display: 'flex',
                  height: 30,
                  padding: '0px 8px',
                }}
              >
                <Box
                  sx={{
                    height: 16,
                    width: 16,
                    backgroundColor: color,
                    marginRight: 8,
                  }}
                />
                {label}: {formatPercentage(value, data[tab].pie.totalData)}
              </Box>
            )}
          />
        </Grid>
      </Grid>
      {!!clickToAction && (
        <div className={classes.clickToAction} onClick={clickToAction.onClick}>
          <Typography children={clickToAction.label} variant="body2" />
          <ArrowRight className={classes.ctaIcon} />
        </div>
      )}
    </Card>
  );
};

export default GraphInfo;
