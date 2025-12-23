import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import useActions from './hooks/useActions';
import { schema, statusLabel } from './utils';
import { textLimit } from '@utils/text';
import Typography from '@components/Typography';
import { isHaveAccess } from '@utils/common';

const PurchaseOrderList = (props) => {
  const {
    filterCustomer,
    filterCustomerOptions,
    filterOrderType,
    filterProduct,
    filterProductOptions,
    filterStatus,
    list,
    page,
    loading,
    onPaginationChange,
    onClickDocument,
    onClickRowTable,
    onClickCreate,
    search,
    setFilterCustomer,
    setFilterOrderType,
    setFilterProduct,
    setFilterStatus,
    setSearch,
    orderBy,
    setOrderBy,
    sort,
    setSort,
  } = useActions(props);

  const tableData = list.data.map((data) => {
    const documents = data?.documentPO?.length && (
      <Typography
        color="primary-main"
        onClick={onClickDocument(data.documentPO[0].fileUrl)}
        variant="subtitle2"
        weight="medium"
      >
        {textLimit(data.documentPO[0].fileName, 24)}
      </Typography>
    );

    return {
      ...data,
      status: statusLabel[data.status],
      documents: documents,
    };
  });

  const actionButton = () => {
    let button = [];

    if (isHaveAccess(props.feature, 'create_order_byInternal')) {
      button.push({
        onClick: onClickCreate,
        children: 'New Order',
      });
    }

    return button;
  };

  const filter = () => {
    let filters = [];

    filters.push({
      onChange: setFilterStatus,
      options: [
        { label: 'All Status', value: '' },
        { label: 'Draft', value: 'draft' },
        { label: 'AM Approval', value: 'am approval' },
        { label: 'WDS Approval', value: 'wds approval' },
        { label: 'Segment Approval', value: 'segment approval' },
        { label: 'Delivery Approval', value: 'delivery approval' },
        { label: 'Delay Order', value: 'delay order' },
        { label: 'Operator Checking', value: 'operator checking' },
        { label: 'Customer Agreement', value: 'customer agreement' },
        { label: 'Operator Approval', value: 'operator approval' },
        { label: 'Provisioning', value: 'provisioning' },
        { label: 'BASO Signed', value: 'baso signed' },
        { label: 'Confirmation', value: 'confirmation' },
        { label: 'Returned', value: 'returned' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Failed', value: 'failed' },
        { label: 'Completed', value: 'completed' },
      ],
      type: 'dropdown',
      value: filterStatus,
    });

    filters.push({
      isLoading: loading.filterProduct,
      isSearchable: true,
      maxWidth: 200,
      onChange: setFilterProduct,
      options: filterProductOptions,
      type: 'dropdown',
      value: filterProduct,
    });

    filters.push({
      isLoading: loading.filterCustomer,
      isSearchable: true,
      maxWidth: 200,
      onChange: setFilterCustomer,
      options: filterCustomerOptions,
      type: 'dropdown',
      value: filterCustomer,
    });

    filters.push({
      isLoading: loading.filterOrderType,
      isSearchable: true,
      maxWidth: 300,
      onChange: setFilterOrderType,
      options: [
        { label: 'All Status', value: '' },
        { label: 'Modify', value: 'modify' },
        { label: 'New Order', value: 'New Order' },
        { label: 'Disconnect', value: 'disconnect' },
        { label: 'Trial', value: 'trial' },
        { label: 'Subscribe', value: 'subscribe' },
      ],
      type: 'dropdown',
      value: filterOrderType,
    });

    return filters;
  };

  const listProps = {
    action: actionButton(),
    title: 'Purchase Order',
    breadcrumb: [{ label: 'Purchase Order' }],
    filter: filter(),
    search: {
      placeholder: 'Search...',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loading.table,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      onPaginationChange: onPaginationChange,
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sort, setSort],
      schema: schema,
      emptyMessage: {
        description: 'The data will appear automatically if get an update',
        message: 'Data not found',
      },
    },
  };

  return <List {...listProps} />;
};

PurchaseOrderList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default PurchaseOrderList;
