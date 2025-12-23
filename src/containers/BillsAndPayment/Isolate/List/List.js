import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import useAction from './hooks/useAction';
import { dropdownValueParser } from '@utils/common';

const ListIsolate = (props) => {
  const {
    filterProduct,
    list,
    page,
    loadingTable,
    onPaginationChange,
    onClickRowTable,
    optionFilterProduct,
    search,
    setFilterProduct,
    setSearch,
  } = useAction(props);

  const filter = () => {
    let filters = [];

    const optionsFilterProduct = [
      { label: 'All Product & Services', value: '' },
      ...optionFilterProduct,
    ];

    filters.push({
      onChange: setFilterProduct,
      options: optionsFilterProduct,
      type: 'dropdown',
      value: dropdownValueParser(filterProduct, optionsFilterProduct),
      maxWidth: 240,
    });
    return filters;
  };

  const listProps = {
    title: 'Isolate',
    breadcrumb: [{ label: 'Isolate' }],
    filter: filter(),
    search: {
      placeholder: 'Search Service ID..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: list.data,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      onPaginationChange,
      schema: [
        {
          cellStyle: {
            minWidth: 200,
          },
          label: 'AM',
          name: 'am',
        },
        {
          cellStyle: {
            minWidth: 240,
            width: 240,
          },
          label: 'CUSTOMER',
          name: 'customer',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'REGIONAL',
          name: 'regional',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'SID',
          name: 'sid',
        },
        {
          cellStyle: {
            minWidth: 140,
          },
          label: 'PRODUCT',
          name: 'product',
        },
        {
          cellStyle: {
            minWidth: 140,
            width: 140,
          },
          label: 'BILLING',
          name: 'billing',
          currency: true,
        },
        {
          cellStyle: {
            minWidth: 280,
            width: 280,
          },
          label: 'SERVICE LOCATION',
          name: 'serviceLocation',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'ISOLATE BY',
          name: 'isolateBy',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          formatDate: 'date-time',
          label: 'DATE ISOLATE',
          name: 'isolateDate',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          formatDate: 'date-time',
          label: 'DATE SUBMIT',
          name: 'submitDate',
        },
        {
          cellStyle: {
            minWidth: 140,
            width: 140,
          },
          label: 'Status',
          name: 'status',
          schemaStatus: {
            'Request Open': 'warning',
            Isolated: 'danger',
          },
        },
      ],
    },
  };

  return <List {...listProps} />;
};

ListIsolate.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default ListIsolate;
