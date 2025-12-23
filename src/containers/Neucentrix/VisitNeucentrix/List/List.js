import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import { dateFormat } from '@utils/parser';
import useActions from './hooks/useActions';
import { isHaveAccess } from '@utils/common';
import { titleCapitalize } from '@utils/common';

const VisitNeucentrix = (props) => {
  const {
    error,
    filterStatus,
    filterVisitDate,
    filterOrderDate,
    filterLocation,
    list,
    loading,
    // onBottomPage,
    onClickRowTable,
    search,
    setFilterStatus,
    setFilterVisitDate,
    setFilterOrderDate,
    setFilterLocation,
    setSearch,
    optionsLocation,
    setPage,
    page,
  } = useActions(props);

  const { feature } = props;

  const tableData = list.data.map((data) => {
    const { visitStartDate, visitEndDate, status, customerType } = data;
    let period = '';

    if (visitStartDate && visitEndDate) {
      period = `${dateFormat({ date: visitStartDate, type: 'date-month' })} -
        ${dateFormat({ date: visitEndDate, type: 'full-string-date' })}`;
    }
    return {
      ...data,
      period,
      status: status === 'completed' ? 'visit completed' : status,
      customerType: titleCapitalize(customerType),
    };
  });

  const filter = () => {
    let filters = [];

    filters.push({
      onChange: setFilterStatus,
      options: [
        { label: 'All Status', value: '' },
        { label: 'Checking', value: 'checking' },
        { label: 'Approved', value: 'approved' },
        { label: 'Visiting', value: 'visiting' },
        { label: 'Visit Completed', value: 'completed' },
        { label: 'Not Visit', value: 'not visit' },
        { label: 'Rejected', value: 'rejected' },
      ],
      type: 'dropdown',
      value: filterStatus,
    });
    filters.push({
      onChange: setFilterVisitDate,
      label: 'Visit Date',
      type: 'date',
      value: filterVisitDate,
    });
    filters.push({
      onChange: setFilterOrderDate,
      label: 'Order Date',
      type: 'date',
      value: filterOrderDate,
    });
    filters.push({
      onChange: setFilterLocation,
      options: optionsLocation,
      type: 'dropdown',
      value: filterLocation,
      isLoading: loading.loadingLocation,
    });

    return filters;
  };

  const listProps = {
    title: 'Visit Neucentrix',
    breadcrumb: [{ label: 'Visit Neucentrix' }],
    filter: filter(),
    search: {
      placeholder: 'Search Company Name...',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      emptyMessage: error,
      loadingRoot: loading.tableRoot,
      loading: loading.tableRow,
      meta: list.meta,
      onClickRow: onClickRowTable,
      schema: [
        {
          cellStyle: {
            minWidth: 100,
            width: 180,
          },
          label: 'Visit ID',
          name: 'visitId',
        },
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'Company Name',
          name: 'companyName',
        },
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'PIC Visitor',
          name: 'picVisitorName',
        },
        ...(isHaveAccess(feature, 'read_list_visiting_neucentrix_am')
          ? [
              {
                cellStyle: {
                  minWidth: 180,
                },
                label: 'CUSTOMER TYPE',
                name: 'customerType',
              },
            ]
          : []),
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'Location',
          name: 'location',
        },
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'Visit Purpose',
          name: 'purpose',
        },
        {
          cellStyle: {
            minWidth: 150,
            width: 150,
          },
          formatDate: 'date-time',
          label: 'Order Date',
          name: 'orderDate',
        },
        {
          cellStyle: {
            minWidth: 150,
            width: 150,
          },
          label: 'Visit Date',
          name: 'period',
        },
        {
          label: 'Status',
          name: 'status',
          schemaStatus: {
            checking: 'warning',
            visiting: 'primary',
            'not visit': 'danger',
            'visit completed': 'success',
            approved: 'primary',
            rejected: 'danger',
          },
        },
      ],
      page,
      onPaginationChange(_, newPage) {
        setPage(newPage);
      },
    },
  };

  return <List {...listProps} />;
};

VisitNeucentrix.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default VisitNeucentrix;
