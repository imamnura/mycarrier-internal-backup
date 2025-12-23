import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import BaseDateRangePicker from '@components/DateRangePickerForm';
import Typography from '@components/Typography';
import Button from '@components/Button';
import LineChart from '@components/LineChart';
import SectionInformation from '@fragments/Detail/elements/SectionInformation';
import { noop } from '@__old/utils/common';

export default function Component(props) {
  const { modalGraph, setModalGraph } = props;

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
    <Dialog maxWidth="md" onClose={() => setModalGraph(null)} open={modalGraph}>
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Typography variant="h5">MRTG</Typography>
        </Grid>
        <Grid
          item
          style={{ display: 'flex', justifyContent: 'space-between' }}
          xs={12}
        >
          <Typography color="general-mid" variant="body2">
            Filter Graphic Monitoring by Date
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box mt={1}>
            <BaseDateRangePicker
              endLabel="End Date"
              name="filterDate"
              onChange={noop}
              readOnly
              required
              startLabel="Start Date"
              value={modalGraph?.filterDateRange}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <LineChart
            {...lineProps(modalGraph?.data?.data, modalGraph?.isLoading)}
            noScroll={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Box mt={1}>
            <SectionInformation
              data={modalGraph?.data}
              schema={modalGraph?.schema}
            />
          </Box>
        </Grid>
        <Grid align="center" item md={12} sm={12}>
          <Box mt={1}>
            <Button
              children="Close"
              onClick={() => setModalGraph(null)}
              variant="ghost"
            />
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}

Component.defaultProps = {
  modalGraph: null,
  setModalGraph: () => {},
};

Component.propTypes = {
  modalGraph: PropTypes.object,
  setModalGraph: PropTypes.func,
};
