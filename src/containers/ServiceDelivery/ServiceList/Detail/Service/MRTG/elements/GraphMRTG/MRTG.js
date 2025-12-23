import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import BaseDateRangePicker from '@components/DateRangePickerForm';
import Typography from '@components/Typography';
import LineChart from '@components/LineChart';
import Button from '@components/Button';
import Loading from '@components/Loading';
import ChevronRight from '@assets/icon-v2/ChevronRight';
import SectionInformation from '@fragments/Detail/elements/SectionInformation';
import useActions from './hooks/useActions';
import useStyles from './styles';

const GraphMRTG = (props) => {
  const { schema, setModalGraph } = props;

  const { dataMRTGgraph, isLoading, filterDateRange, setFilterDateRange } =
    useActions(props);

  const classes = useStyles();

  const lineProps = (_data, _loading) => {
    return {
      loading: _loading,
      data: _data,
      legends: true,
      leftLabel: 'Values (Mb)',
      enablePoints: false,
      enableGridX: false,
      noBottom: true,
    };
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        style={{ display: 'flex', justifyContent: 'space-between' }}
        xs={12}
      >
        <Box mt={1}>
          <Typography color="general-mid" variant="body2">
            Filter Graphic Monitoring by Date
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mt={1}>
          <BaseDateRangePicker
            disableFuture
            endLabel="End Date"
            name="filterDate"
            onChange={setFilterDateRange}
            required
            startLabel="Start Date"
            value={filterDateRange}
          />
        </Box>
      </Grid>
      {dataMRTGgraph.length > 0 ? (
        dataMRTGgraph.map((i, key) => (
          <Box key={`mrtg-graph-${key}`}>
            <Grid item key={`line-chart-${key}`} xs={12}>
              <LineChart {...lineProps(i.data, isLoading)} noScroll={true} />
            </Grid>
            <Grid item key={`information-${key}`} xs={12}>
              <Box mt={1}>
                <SectionInformation data={i} schema={schema} />
              </Box>
            </Grid>
            <Grid item key={`full-screen-view-${key}`} md={12} sm={12}>
              <Box mt={1}>
                <Button
                  boxProps={{
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                  children="Fullscreen view"
                  onClick={() =>
                    setModalGraph({
                      data: i,
                      isLoading,
                      schema: schema,
                      filterDateRange,
                    })
                  }
                  rightIcon={ChevronRight}
                  style={{ width: '100%', border: 'none' }}
                  variant="secondary"
                />
              </Box>
            </Grid>
          </Box>
        ))
      ) : (
        <Grid item xs={12}>
          <div className={classes.notFoundContainer}>
            {isLoading ? (
              <Loading color="primary" size="large" />
            ) : (
              <Typography
                children="Chart Not Found"
                color="general-mid"
                variant="body2"
              />
            )}
          </div>
        </Grid>
      )}
    </Grid>
  );
};

GraphMRTG.defaultProps = {
  data: null,
  schema: [],
};

GraphMRTG.propTypes = {
  data: PropTypes.object,
  schema: PropTypes.array,
  setModalGraph: PropTypes.func.isRequired,
};

export default GraphMRTG;
