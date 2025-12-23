import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@assets/Svg/Delete';
import EditIcon from '@assets/Svg/Pencil';
import List from '@fragments/List';
import ShowIcon from './lib/ShowIcon';
import ModalChooseProduct from '../Fragment/ModalChooseProduct/ChooseProduct';
import { isHaveAccess } from '@utils/common';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import { Box } from '@material-ui/core';

const ProductManagement = (props) => {
  const { feature } = props;
  const {
    filter,
    list,
    onAddProduct,
    addProduct,
    onDeleteProduct,
    onUpdateProduct,
    onClickRowTable,
    search,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
    productTypeList,
    setChoosedContent,
    choosedContent,
    onCloseDialog,
    openDialog,
    loadingTable,
    onPaginationChange,
    page,
  } = useActions(props);

  const actionButton = () => {
    let button = [];

    if (isHaveAccess(feature, 'create_product')) {
      button.push({ children: 'ADD PRODUCT', onClick: onAddProduct });
    }

    return button;
  };

  const tableList = list.data.map((item) => {
    return {
      ...item,
      operations: (
        <Box
          sx={{
            '& svg': {
              color: '#2E434D',
              cursor: 'pointer',
              marginLeft: '12px',
            },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ShowIcon
            displayProduct={item.isDisplay}
            feature={feature}
            id={item.catId}
          />
          <Box
            id="updateProduct"
            onClick={(e) => onUpdateProduct(e, item.catId)}
            style={{ lineHeight: 0 }}
          >
            <EditIcon />
          </Box>
          <Box
            id="deleteProduct"
            onClick={(e) => onDeleteProduct(e, item.catId)}
            style={{ lineHeight: 0 }}
          >
            <DeleteIcon />
          </Box>
        </Box>
      ),
    };
  });

  const filterProps = () => {
    let res = [];

    res.push({
      ...filter.status,
      maxWidth: 300,
      type: 'dropdown',
    });
    res.push({
      ...filter.dateRange,
      label: 'Created Date',
      type: 'dateRange',
    });
    return res;
  };

  const listProps = {
    title: 'Product Management',
    breadcrumb: [{ label: 'Product Management' }],
    action: actionButton(),
    filter: filterProps(),
    search: {
      placeholder: 'Search Product Category..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableList,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sort, setSort],
      schema: tableHeader,
      onPaginationChange: onPaginationChange,
    },
  };

  return (
    <>
      <List {...listProps} />
      <ModalChooseProduct
        choosedContent={choosedContent}
        data={productTypeList}
        onClose={onCloseDialog}
        onSubmit={addProduct}
        open={openDialog}
        setChoosedContent={setChoosedContent}
      />
    </>
  );
};

ProductManagement.propTypes = {
  feature: PropTypes.array.isRequired,
  initialChooseContent: PropTypes.number,
};

ProductManagement.defaultProps = {
  initialChooseContent: 0,
};

export default ProductManagement;
