import Typography from '@components/Typography';
import useStyles from './styles';
import { Box, Dialog } from '@material-ui/core';
import React from 'react';
import Table from '@components/Table';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import useAction from './hooks/useAction';
import SearchBox from '@components/SearchBox';

const PickupProductItems = (props) => {
  const classes = useStyles();

  const {
    optionProduct,
    open,
    onSubmit,
    // selectedProduct,
    // setSelectedProduct,
    onClosePickupProduct,
  } = useAction(props);

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogRoot }}
        maxWidth="lg"
        open={open}
        scroll="paper"
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography color="general-dark" inline variant="h5" weight="medium">
            Pick Product Items
          </Typography>
          <Typography color="general" inline variant="caption">
            Pick product that you want to create in one bundle SC Quote
          </Typography>
        </Box>
        <Box mt={3}>
          <SearchBox fullWidth placeholder="Search Product Name.." />
        </Box>
        <Box sx={{ mt: 2, maxHeight: 600, overflow: 'auto' }}>
          <Table
            data={optionProduct.option}
            loadingRoot={optionProduct.loading}
            numbering={false}
            // onClickRow={setSelectedProduct}
            // pickedRow={selectedProduct?.productId}
            pickedRowKey="productId"
            schema={[
              { name: 'productName', label: 'Product' },
              { name: 'productId', label: 'Product Type' },
              { name: 'part', label: 'Part' },
              { name: 'productDesc', label: 'Description' },
            ]}
          />
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button onClick={onClosePickupProduct} variant="ghost">
            Cancel
          </Button>
          <Button ml={16} onClick={onSubmit}>
            Create SC quote
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

PickupProductItems.defaultProps = {
  pickupProductModal: false,
};

PickupProductItems.propTypes = {
  onClosePickupProduct: PropTypes.func.isRequired,
  pickupProductModal: PropTypes.bool,
};

export default PickupProductItems;
