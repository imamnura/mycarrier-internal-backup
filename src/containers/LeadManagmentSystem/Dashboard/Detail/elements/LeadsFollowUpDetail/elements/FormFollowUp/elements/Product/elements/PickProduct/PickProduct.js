import Typography from '@components/Typography';
import useStyles from './styles';
import { Box, Dialog } from '@material-ui/core';
import React from 'react';
import ArrowDown from '@assets/icon-v2/ArrowDown';
import Table from '@components/Table';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import useAction from './hooks/useAction';
import SearchBox from '@components/SearchBox';

const PickProduct = (props) => {
  const classes = useStyles();
  const {
    onSubmit,
    open,
    optionProduct,
    setOpen,
    selectedProduct,
    setSeletedProduct,
    search,
    setSearch,
  } = useAction(props);

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography color="primary-main" variant="overline" weight="medium">
          *
        </Typography>
        <Typography color="general-mid" variant="overline" weight="medium">
          Product
        </Typography>
      </Box>
      <Box className={classes.chooseProduct} mt={0.5} onClick={setOpen(true)}>
        <Typography variant="subtitle1">
          {selectedProduct?.productName || 'Choose Product'}
        </Typography>
        <ArrowDown />
      </Box>
      <Typography
        children={props.error}
        color="primary-main"
        variant="caption"
      />
      <Dialog
        classes={{ paper: classes.dialogRoot }}
        maxWidth="lg"
        open={open}
        scroll="body"
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography color="general-dark" inline variant="h5" weight="medium">
            Pick Product
          </Typography>
        </Box>
        <Box mt={3}>
          <SearchBox
            fullWidth
            onChange={setSearch}
            placeholder="Search Product Name.."
            value={search}
          />
        </Box>
        <Box sx={{ mt: 2, maxHeight: 600, overflow: 'auto' }}>
          <Table
            data={optionProduct.option}
            loadingRoot={optionProduct.loading}
            meta={{ page: 0 }}
            numbering={false}
            onClickRow={setSeletedProduct}
            pickedRow={selectedProduct?.productId}
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
          <Button onClick={setOpen(false)} variant="ghost">
            Cancel
          </Button>
          <Button ml={16} onClick={onSubmit}>
            Pick Product
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

PickProduct.defaultProps = {
  error: '',
  value: null,
};

PickProduct.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.object,
};

export default React.memo(PickProduct);
