import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import { schema } from './constant';
import useActions from './hooks/useActions';
import { IconButton } from '@material-ui/core';
import { Switch } from '@legion-ui/core';
import useListStyles from './List.styles';
import Trash from '@assets/icon-v2/Trash';
import Edit from '@assets/icon-v2/Edit';
import color from '@styles/color';

const POConfig = (props) => {
  const {
    action,
    filter,
    list,
    loadingTable,
    page,
    onPaginationChange,
    onDeleteProduct,
    onUpdateProduct,
    onBottomPage,
    search,
    setSearch,
    onShowHideProduct,
  } = useActions(props);

  const classes = useListStyles();

  const tableList = list.data.map((item) => {
    return {
      ...item,
      operations: (
        <div className={classes.operations}>
          <Switch
            onChange={onShowHideProduct({
              productId: item?.productId,
              isPublish: item?.isPublish,
              productName: item?.productName,
            })}
            checked={item?.isPublish}
            size="sm"
          />
          <IconButton
            onClick={onUpdateProduct(item?.productId)}
            size="small"
            style={{ color: color.yellow.main }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            onClick={onDeleteProduct(item?.productId)}
            size="small"
            disabled={!!item?.isPublish}
            style={{ color: !item?.isPublish && color.primary.main }}
          >
            <Trash fontSize="small" />
          </IconButton>
        </div>
      ),
    };
  });

  const filterProps = () => {
    let res = [];

    res.push({
      ...filter.category,
      maxWidth: 300,
      type: 'dropdown',
    });
    res.push({
      ...filter.status,
      maxWidth: 300,
      type: 'dropdown',
    });
    return res;
  };

  const listProps = {
    title: 'PO Config',
    breadcrumb: [{ label: 'PO Config' }],
    onBottomPage: onBottomPage,
    action: action(),
    filter: filterProps(),
    search: {
      placeholder: 'Search Product Name..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableList,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      schema: schema,
      onPaginationChange: onPaginationChange,
    },
  };

  return <List {...listProps} />;
};

POConfig.propTypes = {
  feature: PropTypes.array.isRequired,
  initialChooseContent: PropTypes.number,
};

POConfig.defaultProps = {
  initialChooseContent: 0,
};

export default POConfig;
