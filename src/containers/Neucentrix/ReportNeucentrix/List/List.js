import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import { isHaveAccess } from '@utils/common';
import useActions from './hooks/useActions';

const ReportNeucentrix = (props) => {
  const {
    feature,
    filterStatus,
    list,
    loading,
    // onBottomPage,
    onClickUploadReport,
    onClickRowTable,
    search,
    setFilterStatus,
    setSearch,
    setPage,
    page,
  } = useActions(props);

  const action = () => {
    let actions = [];

    if (isHaveAccess(feature, 'create_report_ncx')) {
      actions.push({ children: 'Upload Report', onClick: onClickUploadReport });
    }

    return actions;
  };

  const filter = () => {
    let filters = [];

    filters.push({
      onChange: setFilterStatus,
      options: [
        { label: 'All Status', value: '' },
        { label: 'Forward to WDM', value: 'Forwarded to WDM' },
        { label: 'Send to Customer', value: 'Send to Customer' },
      ],
      type: 'dropdown',
      value: filterStatus,
    });

    return filters;
  };

  const listProps = {
    breadcrumb: [{ label: 'Report Neucentrix' }],
    // onBottomPage: onBottomPage,
    title: 'Report Neucentrix',
    action: action(),
    filter: filter(),
    search: {
      placeholder: 'Search Company, Report ID..',
      value: search,
      onChange: setSearch,
    },
    table: {
      page,
      data: list.data,
      loadingRoot: loading.tableRoot,
      loading: loading.tableRow,
      meta: list.meta,
      onClickRow: onClickRowTable,
      schema: [
        {
          cellStyle: {
            minWidth: 180,
            width: 180,
          },
          label: 'Report ID',
          name: 'reportId',
        },
        {
          cellStyle: {
            minWidth: 278,
          },
          label: 'Company Name',
          name: 'companyName',
        },
        {
          cellStyle: {
            minWidth: 150,
            width: 150,
          },
          formatDate: 'date-time',
          label: 'Upload Date',
          name: 'createdAt',
        },
        {
          cellStyle: {
            minWidth: 150,
            width: 150,
          },
          formatDate: 'date-time',
          label: 'Last Update',
          name: 'updatedAt',
        },
        {
          label: 'Status',
          name: 'status',
          schemaStatus: {
            'Forwarded to WDM': 'primary',
            'Send to Customer': 'success',
          },
        },
      ],
      onPaginationChange(_, newPage) {
        setPage(newPage);
      },
    },
  };

  return <List {...listProps} />;
};

ReportNeucentrix.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default ReportNeucentrix;
