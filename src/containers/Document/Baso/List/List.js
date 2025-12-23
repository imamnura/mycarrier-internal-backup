import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import useActions from './hooks/useActions';
import { schema, statusLabel } from '../utils';
import { textLimit } from '@utils/text';
import Typography from '@components/Typography';

const BasoList = (props) => {
  const {
    filterAm,
    filterAmOptions,
    filterCustomer,
    filterCustomerOptions,
    filterOrderType,
    filterProduct,
    filterProductOptions,
    filterSegment,
    filterSegmentOptions,
    filterStatus,
    list,
    page,
    loading,
    onPaginationChange,
    onClickDocument,
    onClickRowTable,
    search,
    setFilterAm,
    setFilterCustomer,
    setFilterOrderType,
    setFilterProduct,
    setFilterSegment,
    setFilterStatus,
    setSearch,
  } = useActions(props);

  const tableData = list.data.map((data) => {
    const document = data?.activationDoc && (
      <Typography
        color="primary-main"
        onClick={onClickDocument(data.activationDoc.fileUrl)}
        variant="subtitle2"
        weight="medium"
      >
        {textLimit(data.activationDoc.fileName, 24)}
      </Typography>
    );

    return {
      ...data,
      status: statusLabel[data.status],
      document: document,
      accountManager: data?.account_manager.fullName,
      segment: data?.account_manager.segment,
    };
  });

  const filter = () => {
    let filters = [];

    filters.push({
      onChange: setFilterStatus,
      maxWidth: 140,
      options: [
        { label: 'All Status', value: '' },
        { label: 'Customer Sign', value: 'NEED CUST SIGN' },
        { label: 'BASO Completed', value: 'BA COMPLETE' },
        { label: 'BASO Returned', value: 'RETURNED' },
        { label: 'BASO Rejected', value: 'REJECTED' },
      ],
      type: 'dropdown',
      value: filterStatus,
    });

    filters.push({
      isLoading: loading.filterProduct,
      isSearchable: true,
      maxWidth: 140,
      onChange: setFilterProduct,
      options: filterProductOptions,
      type: 'dropdown',
      value: filterProduct,
    });

    filters.push({
      isLoading: loading.filterOrderType,
      isSearchable: true,
      maxWidth: 170,
      onChange: setFilterOrderType,
      options: [
        { label: 'All Order Type', value: '' },
        { label: 'New Install', value: 'New Install' },
        { label: 'Modify', value: 'Modify' },
        { label: 'Disconnect', value: 'Disconnect' },
      ],
      type: 'dropdown',
      value: filterOrderType,
    });

    filters.push({
      isLoading: loading.filterCustomer,
      isSearchable: true,
      maxWidth: 150,
      onChange: setFilterCustomer,
      options: filterCustomerOptions,
      type: 'dropdown',
      value: filterCustomer,
    });

    filters.push({
      isLoading: loading.filterSegment,
      isSearchable: true,
      maxWidth: 150,
      onChange: setFilterSegment,
      options: filterSegmentOptions,
      type: 'dropdown',
      value: filterSegment,
    });

    filters.push({
      isLoading: loading.filterAm,
      isSearchable: true,
      maxWidth: 190,
      onChange: setFilterAm,
      options: filterAmOptions,
      type: 'dropdown',
      value: filterAm,
    });

    return filters;
  };

  const listProps = {
    title: 'BASO',
    breadcrumb: [{ label: 'BASO' }],
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
      schema: schema,
      onPaginationChange: onPaginationChange,
    },
  };

  return <List {...listProps} />;
};

BasoList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default BasoList;
