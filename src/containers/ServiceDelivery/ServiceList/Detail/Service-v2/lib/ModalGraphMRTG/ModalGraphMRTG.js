import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import BaseDateRangePicker from '@components/DateRangePickerForm';
import Typography from '@components/Typography';
import Button from '@components/Button';
import LineChart from '@components/LineChart';
import SectionInformation from '@fragments/Detail/elements/SectionInformation';
import { schemaMRTG } from '../../utils';

export default function ModalGraphMRTG(props) {
  const { modalGraphMRTG, setModalGraphMRTG } = props;

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
    <Dialog
      maxWidth="md"
      onClose={() => setModalGraphMRTG(null)}
      open={modalGraphMRTG?.open}
    >
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Typography variant="h5">MRTG</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box mt={1}>
            <BaseDateRangePicker
              endLabel="End Date"
              name="filterDate"
              onChange={() => {}}
              readOnly
              required
              startLabel="Start Date"
              value={modalGraphMRTG?.filterDateRange}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <LineChart
            {...lineProps(
              modalGraphMRTG?.data?.data,
              modalGraphMRTG?.isLoading,
            )}
            height={300}
            noScroll={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Box mt={1}>
            <SectionInformation
              data={modalGraphMRTG?.data}
              schema={schemaMRTG}
            />
          </Box>
        </Grid>
        <Grid align="center" item md={12} sm={12}>
          <Box mt={1}>
            <Button
              children="Close"
              onClick={() => setModalGraphMRTG(null)}
              variant="ghost"
            />
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}

ModalGraphMRTG.defaultProps = {
  modalGraph: null,
  setModalGraph: () => {},
};

ModalGraphMRTG.propTypes = {
  modalGraph: PropTypes.object,
  setModalGraph: PropTypes.func,
};
