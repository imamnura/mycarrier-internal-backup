import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, CircularProgress } from '@material-ui/core';
import BaseDateRangePicker from '@components/DateRangePickerForm';
import LineChart from '@components/LineChart';
import Button from '@components/Button';
import ChevronRight from '@assets/icon-v2/ChevronRight';
import SectionInformation from '@fragments/Detail/elements/SectionInformation';
import useActions from './hooks/useActions';
import { schemaMRTG } from '../../utils';
import StateMessage from '@components/StateMessage';
import NoData from '@assets/ilustration-v2/NoData';
import ModalGraphMRTG from '../ModalGraphMRTG';

const GraphMRTG = (props) => {
  const {
    filterDateRange,
    setFilterDateRange,
    dataMRTGgraph,
    isLoading,
    modalGraphMRTG,
    setModalGraphMRTG,
  } = useActions(props);

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

  const renderContent = () => {
    if (isLoading) {
      return (
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '290px',
            }}
          >
            <CircularProgress style={{ color: '#DE1B1B' }} />
          </div>
        </Grid>
      );
    }

    if (!isLoading && !dataMRTGgraph?.length) {
      return (
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '290px',
            }}
          >
            <StateMessage
              description="The data will appear automatically if get an update."
              message="Data not found"
              ilustration={NoData}
              size="small"
            />
          </div>
        </Grid>
      );
    }

    return dataMRTGgraph.map((i, key) => (
      <>
        <Grid item key={`line-chart-${key}`} xs={12}>
          <LineChart
            {...lineProps(i.data, isLoading)}
            noScroll={true}
            height={300}
          />
        </Grid>
        <Grid item key={`information-${key}`} xs={12}>
          <SectionInformation data={i} schema={schemaMRTG} />
        </Grid>
        <Grid item key={`full-screen-view-${key}`} md={12} sm={12}>
          <Button
            boxProps={{
              width: '100%',
              justifyContent: 'space-between',
            }}
            children="Fullscreen view"
            onClick={() =>
              setModalGraphMRTG({
                open: true,
                data: i,
                isLoading,
                filterDateRange,
              })
            }
            rightIcon={ChevronRight}
            style={{ width: '100%', border: 'none', padding: '0px 8px' }}
            variant="secondary"
          />
        </Grid>
      </>
    ));
  };

  return (
    <>
      <Box pt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BaseDateRangePicker
              disableFuture
              endLabel="End Date"
              name="filterDate"
              onChange={setFilterDateRange}
              required
              startLabel="Start Date"
              value={filterDateRange}
            />
          </Grid>
          {renderContent()}
        </Grid>
      </Box>
      <ModalGraphMRTG
        modalGraphMRTG={modalGraphMRTG}
        setModalGraphMRTG={setModalGraphMRTG}
      />
    </>
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
