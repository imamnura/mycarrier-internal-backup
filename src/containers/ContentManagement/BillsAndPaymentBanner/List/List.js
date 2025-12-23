import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import { schema } from './constant';
import useActions from './hooks/useActions';
import { IconButton } from '@material-ui/core';
import ReorderBanner from '../lib/ReorderBanner';
import Trash from '@assets/icon-v2/Trash';
import Edit from '@assets/icon-v2/Edit';
import color from '@styles/color';
import useListStyles from './List.styles';
import SwitchStatusActive from '../lib/SwitchStatusActive';

const BillsPaymentBannerList = (props) => {
  const classes = useListStyles();
  const {
    action,
    filter,
    list,
    listBannerActive,
    listBannerHide,
    loadingTable,
    onDeleteBanner,
    onEditBanner,
    onChangeStatusBanner,
    onClickRowTable,
    openDialogReorder,
    setOpenDialogReorder,
    setListBannerActive,
    setListBannerHide,
    confirmSaveReorder,
    page,
    search,
    setSearch,
    onPaginationChange,
    locatorId,
  } = useActions(props);

  const tableList = list.data.map((item) => ({
    ...item,
    operations: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <SwitchStatusActive
          data={item}
          onChangeStatusBanner={onChangeStatusBanner({
            bannerId: item?.bannerId,
            isActive: item?.isActive,
            title: item?.title,
          })}
          size="sm"
          locatorId={locatorId}
        />
        <IconButton
          onClick={onEditBanner(item?.bannerId)}
          size="small"
          style={{ color: color.yellow.main }}
          id={locatorId?.action?.edit}
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          onClick={onDeleteBanner(item?.bannerId)}
          size="small"
          style={{ color: color.primary.main }}
          id={locatorId?.action?.delete}
        >
          <Trash fontSize="small" />
        </IconButton>
      </div>
    ),
  }));

  const filterProps = () => [
    {
      ...filter.status,
      maxwidth: 200,
      type: 'dropdown',
      id: locatorId?.filter?.status,
    },
    {
      ...filter.dateRange,
      type: 'dateRange',
      variant: 'secondary',
      label: 'Created Date',
      id: locatorId?.filter?.date,
    },
  ];

  const listProps = {
    title: 'Bills & Payment Banner',
    breadcrumb: [{ label: 'Bills & Payment Banner' }],
    action: action(),
    filter: filterProps(),
    search: {
      placeholder: 'Search Product ID..',
      value: search,
      onChange: setSearch,
      id: locatorId?.search,
    },
    table: {
      data: tableList,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      schema,
      onPaginationChange,
      onClickRow: onClickRowTable,
      id: locatorId?.tableRow,
    },
  };

  const orderProps = {
    listBannerActive,
    listBannerHide,
    setOpenDialogReorder,
    openDialogReorder,
    setListBannerActive,
    setListBannerHide,
    confirmSaveReorder,
    classes,
  };

  return (
    <>
      <List {...listProps} />
      <ReorderBanner {...orderProps} />
    </>
  );
};

BillsPaymentBannerList.defaultProps = {
  feature: [],
};

BillsPaymentBannerList.propTypes = {
  feature: PropTypes.array,
};

export default BillsPaymentBannerList;
