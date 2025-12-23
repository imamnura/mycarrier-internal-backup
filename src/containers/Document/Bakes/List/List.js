import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import { isHaveAccess } from '@utils/common';
import datetime from '@__old/utils/datetime';
import useActions from './hooks/useActions';

const BakesList = (props) => {
  const {
    feature,
    filterCompany,
    filterCompanyOptions,
    filterPeriod,
    filterStatus,
    list,
    page,
    loading,
    manager,
    onPaginationChange,
    onClickNewBakes,
    onClickRowTable,
    search,
    setFilterCompany,
    setFilterPeriod,
    setFilterStatus,
    setSearch,
  } = useActions(props);

  const tableData = list.data.map((data) => {
    let period = '';

    if (data.startDate && data.endDate) {
      period = `${datetime(data.startDate, 'period')} - ${datetime(
        data.endDate,
        'period',
      )}`;
    }
    return {
      ...data,
      period,
    };
  });

  const action = () => {
    let actions = [];

    if (isHaveAccess(feature, 'create_bakes')) {
      actions.push({ children: 'NEW BAKES', onClick: onClickNewBakes });
    }

    return actions;
  };

  const filter = () => {
    let filters = [];

    if (!manager) {
      filters.push({
        onChange: setFilterStatus,
        options: [
          { label: 'All Status', value: '' },
          { label: 'Draft', value: 'draft' },
          { label: 'Customer Approval', value: 'customer approval' },
          { label: 'Telkom Approval', value: 'telkom approval' },
          { label: 'Returned', value: 'returned' },
          { label: 'Rejected', value: 'rejected' },
          { label: 'Approved', value: 'approved' },
        ],
        type: 'dropdown',
        value: filterStatus,
      });
    }

    filters.push({
      isLoading: loading.filterCompany,
      isSearchable: true,
      maxWidth: 300,
      onChange: setFilterCompany,
      options: filterCompanyOptions,
      type: 'dropdown',
      value: filterCompany,
    });

    filters.push({
      onChange: setFilterPeriod,
      type: 'dateRange',
      value: filterPeriod,
    });

    return filters;
  };

  const listProps = {
    title: 'BAKES',
    breadcrumb: [{ label: 'BAKES' }],
    action: action(),
    filter: filter(),
    search: {
      placeholder: 'Search Company, BAKES ID..',
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
      schema: [
        {
          cellStyle: {
            minWidth: 180,
            width: 180,
          },
          label: 'Bakes ID',
          name: 'bakesId',
        },
        {
          cellStyle: {
            minWidth: 278,
          },
          label: 'Company',
          name: 'companyName',
        },
        {
          cellStyle: {
            minWidth: 252,
            width: 252,
          },
          label: 'Period (Start Date - End Date)',
          name: 'period',
        },
        {
          cellStyle: {
            minWidth: 150,
            width: 150,
          },
          formatDate: 'date-time',
          label: 'Ceated Date',
          name: 'createdAt',
        },
        {
          label: 'Status',
          name: 'status',
          schemaStatus: {
            approved: 'success',
            'customer approval': 'warning',
            draft: 'primary',
            rejected: 'danger',
            returned: 'danger',
            'telkom approval': 'warning',
          },
        },
      ],
      onPaginationChange: onPaginationChange,
    },
  };

  return <List {...listProps} />;
};

BakesList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default BakesList;
