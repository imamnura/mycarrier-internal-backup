import React from 'react';
import List from '@fragments/List';
import useAction from './hooks/useAction';
import { dateFormat } from '@utils/parser';

const ListOfDetail = (props) => {
  const {
    filterLastUpdate,
    filterStatus,
    list,
    search,
    setFilterLastUpdate,
    setFilterStatus,
    setSearch,
    loadingTable,
    onPaginationChange,
    page,
  } = useAction(props);

  const filter = () => {
    let filters = [];

    filters.push({
      onChange: setFilterStatus,
      options: [
        { label: 'All Status', value: '' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Read', value: 'read' },
        { label: 'In Queue', value: 'inQueue' },
        { label: 'Failed', value: 'failed' },
        { label: 'Rejected', value: 'rejected' },
      ],
      type: 'dropdown',
      value: filterStatus,
    });

    filters.push({
      onChange: setFilterLastUpdate,
      type: 'date',
      label: 'Last Update',
      value: filterLastUpdate,
    });

    return filters;
  };

  const tableData = list.data.map(({ lastUpdate, ...d }) => ({
    ...d,
    lastUpdate: dateFormat({ date: lastUpdate, type: 'date-time' }),
  }));

  const listProps = {
    noPadding: true,
    noMargin: true,
    filter: filter(),
    search: {
      size: 'large',
      placeholder: 'Search Name..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      // meta: {
      //   page: 1,
      //   totalData: list?.data?.length,
      //   size: list?.data?.length > 0 ? list?.data?.length : 10,
      // },
      page,
      schema: [
        {
          cellStyle: {
            minWidth: 320,
            width: 320,
          },
          label: 'NAME',
          name: 'name',
        },
        {
          cellStyle: {
            minWidth: 320,
            width: 320,
          },
          label: 'COMPANY NAME',
          name: 'companyName',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 170,
          },
          label: 'PHONE NUMBER',
          name: 'phoneNumber',
        },
        {
          cellStyle: {
            minWidth: 140,
            width: 180,
          },
          label: 'LAST UPDATE',
          name: 'lastUpdate',
        },
        {
          cellStyle: {
            minWidth: 180,
            width: 180,
          },
          label: 'STATUS',
          name: 'status',
          schemaStatus: {
            read: 'success',
            'in queue': 'warning',
            submitted: 'primary',
            failed: 'danger',
            rejected: 'danger',
            delivered: 'alert',
          },
        },
      ],
      onPaginationChange: onPaginationChange,
    },
  };

  return <List {...listProps} />;
};

export default ListOfDetail;
