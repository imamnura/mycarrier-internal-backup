import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import Table from '@components/Table';
import Button from '@components/Button';
import ChevronRight from '@assets/icon-v2/ChevronRight';

const SectionInformation = (props) => {
  const { schema, data, setModalMTTR } = props;

  return (
    <Grid container spacing={2}>
      <Grid item md={12} sm={12} xs={12}>
        <Box mt={2}>
          <Table data={data} meta={{ page: 0 }} schema={schema} />
        </Box>
      </Grid>
      {data.length > 0 && (
        <Grid item md={12} sm={12} xs={12}>
          <Box mt={1}>
            <Button
              boxProps={{
                width: '100%',
                justifyContent: 'space-between',
              }}
              children="View All"
              onClick={() => setModalMTTR(true)}
              rightIcon={ChevronRight}
              style={{ width: '100%', border: 'none' }}
              variant="secondary"
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

SectionInformation.defaultProps = {
  data: [],
  schema: [],
};

SectionInformation.propTypes = {
  data: PropTypes.array,
  schema: PropTypes.array,
  setModalMTTR: PropTypes.func.isRequired,
};

export default SectionInformation;
