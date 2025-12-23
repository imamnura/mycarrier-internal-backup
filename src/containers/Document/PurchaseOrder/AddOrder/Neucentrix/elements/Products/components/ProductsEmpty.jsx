import { Box } from '@material-ui/core';
import NoData from '@assets/ilustration-v2/NoData';
import React from 'react';
import useStyles from '../styles';
import Typography from '@components/Typography/Typography';

function ProductsEmpty() {
  const styles = useStyles();
  return (
    <Box className={styles.productsEmpty}>
      <NoData
        style={{
          fontSize: '5rem',
          marginBottom: '2rem',
        }}
      />
      <Box className={styles.productsEmptyMessage}>
        <Typography
          style={{ display: 'block', marginBottom: '1rem' }}
          variant="h5"
          weight="bold"
        >
          There is no Order Item
        </Typography>
        <Typography
          style={{ display: 'block' }}
          variant="body2"
          weight="regular"
        >
          Add order item by clicking add service button first
        </Typography>
      </Box>
    </Box>
  );
}

export default ProductsEmpty;
