import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import { Box, Grid } from '@material-ui/core';
import useStyles from './styles';
import Skeleton from '@components/Skeleton';
import ChartLegend from '@components/ChartLegend';

const TableLegends = (props) => {
  const { data, loading } = props;

  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Box width="424px">
        <Grid className={classes.tHead} container>
          <Grid className={classes.tCell} item xs={6}>
            <Typography children="STATUS" variant="caption" weight="bold" />
          </Grid>
          <Grid className={classes.tCell} item xs={3}>
            <Typography children="VALUE" variant="caption" weight="bold" />
          </Grid>
          <Grid className={classes.tCell} item xs={3}>
            <Typography children="%" variant="caption" weight="bold" />
          </Grid>
        </Grid>
        {loading ? (
          <>
            {new Array(8).fill(null).map((l, k) => (
              <Grid className={classes.tBody} container key={k}>
                <Grid className={classes.tCell} item xs={6}>
                  <Skeleton height={16} width="100%" />
                </Grid>
                <Grid className={classes.tCell} item xs={3}>
                  <Skeleton height={16} width="100%" />
                </Grid>
                <Grid className={classes.tCell} item xs={3}>
                  <Skeleton height={16} width="100%" />
                </Grid>
              </Grid>
            ))}
          </>
        ) : (
          <>
            {[...data]
              .sort((a, b) => b.value - a.value)
              .map(({ title, value, percentage, color }, i) => (
                <Grid className={classes.tBody} container key={`${value}-${i}`}>
                  <Grid className={classes.tCell} item xs={6}>
                    <ChartLegend children={title} color={color} />
                  </Grid>
                  <Grid className={classes.tCell} item xs={3}>
                    <Typography children={value} variant="caption" />
                  </Grid>
                  <Grid className={classes.tCell} item xs={3}>
                    <Typography children={percentage} variant="caption" />
                  </Grid>
                </Grid>
              ))}
          </>
        )}
      </Box>
    </Box>
  );
};

TableLegends.defaultProps = {
  data: [],
  loading: false,
};

TableLegends.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default TableLegends;
