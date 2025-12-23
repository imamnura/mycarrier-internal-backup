import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import Table from '@components/Table';
import Button from '@components/Button';
import ChevronRight from '@assets/icon-v2/ChevronRight';

const OrderItem = (props) => {
  const { schema, data, setModalOrderItem } = props;

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
              onClick={() => setModalOrderItem(true)}
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

OrderItem.defaultProps = {
  data: [],
  schema: [],
};

OrderItem.propTypes = {
  data: PropTypes.array,
  schema: PropTypes.array,
  setModalOrderItem: PropTypes.func.isRequired,
};

export default OrderItem;
