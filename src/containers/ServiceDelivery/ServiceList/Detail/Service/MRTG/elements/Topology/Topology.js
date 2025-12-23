import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import TopologyComponent from '@components/Topology';
// import SectionInformation from '@fragments/Detail/elements/SectionInformation';

const Topology = (props) => {
  const {
    // schema,
    data,
  } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box mt={1}>
          <TopologyComponent data={data?.topologyLog} />
        </Box>
      </Grid>
      {/* <Grid item xs={6}>
        <Box mt={2}>
          <SectionInformation data={data} schema={schema} />
        </Box>
      </Grid> */}
    </Grid>
  );
};

Topology.defaultProps = {
  data: null,
  schema: [],
};

Topology.propTypes = {
  data: PropTypes.object,
  schema: PropTypes.array,
};

export default Topology;
