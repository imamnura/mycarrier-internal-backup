import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@assets/Svg/Delete';
import EditIcon from '@assets/Svg/Pencil';
import List from '@fragments/List';
import ShowIcon from './lib/ShowIcon';
import { isHaveAccess } from '@utils/common';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import { Box } from '@material-ui/core';

const ProductManagement = (props) => {
  const { feature } = props;
  const {
    list,
    onAddProduct,
    onDeleteProduct,
    onUpdateProduct,
    search,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
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
      category: item?.category?.length > 0 ? item.category[0].catName : null,
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
            id={item?.productId}
          />
          <Box
            id="updateProduct"
            onClick={() => onUpdateProduct(item?.productId)}
            style={{ lineHeight: 0 }}
          >
            <EditIcon />
          </Box>
          <Box
            id="deleteProduct"
            onClick={() => onDeleteProduct(item?.productId)}
            style={{ lineHeight: 0 }}
          >
            <DeleteIcon />
          </Box>
        </Box>
      ),
    };
  });

  const listProps = {
    title: 'Product Management',
    breadcrumb: [{ label: 'Product Management' }],
    action: actionButton(),
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
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sort, setSort],
      schema: tableHeader,
      onPaginationChange: onPaginationChange,
    },
  };

  return (
    <>
      <List {...listProps} />
    </>
  );
};

ProductManagement.propTypes = {
  feature: PropTypes.array,
};

ProductManagement.defaultProps = {
  feature: [''],
};

export default ProductManagement;
