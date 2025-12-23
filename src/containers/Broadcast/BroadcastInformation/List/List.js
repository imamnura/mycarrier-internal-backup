import React from 'react';
import PropTypes from 'prop-types';
import useAction from './hooks/useAction';
import { dateFormat } from '@utils/parser';
import List from '@fragments/List';
import { isHaveAccess } from '@utils/common';

function ListBroadcastInformation(props) {
  const {
    feature,
    filterCreatedDate,
    filterStatus,
    list,
    onClickCreateBroadcast,
    onClickRowTable,
    search,
    setFilterCreatedDate,
    setFilterStatus,
    setSearch,
    loadingTable,
    onPaginationChange,
    page,
  } = useAction(props);

  const tableData = list.data.map((data) => {
    let createdDate = '';

    if (data.createdDate) {
      createdDate = dateFormat({ date: data.createdDate, type: 'date-time' });
    }
    return {
      ...data,
      status: data.status?.toLowerCase().replace('_', ' '),
      createdDate,
    };
  });

  const filter = () => {
    let filters = [];

    filters.push({
      type: 'dropdown',
      onChange: setFilterStatus,
      value: filterStatus,
      options: [
        { label: 'All Status', value: '' },
        { label: 'Preparation', value: 'preparation' },
        { label: 'Need Approval', value: 'need_approval' },
        { label: 'On Schedule', value: 'on_schedule' },
        { label: 'Finish', value: 'finish' },
        { label: 'Returned', value: 'returned' },
        { label: 'Rejected', value: 'rejected' },
      ],
    });

    filters.push({
      type: 'date',
      onChange: setFilterCreatedDate,
      label: 'Created Date',
      value: filterCreatedDate,
    });

    return filters;
  };

  const action = () => {
    let actions = [];

    if (isHaveAccess(feature, 'create_broadcast_information_cdm')) {
      actions.push({
        children: 'Create Broadcast',
        onClick: onClickCreateBroadcast,
      });
    }

    return actions;
  };

  const listProps = {
    title: 'Broadcast Information',
    breadcrumb: [{ label: 'Broadcast Information' }],
    action: action(),
    filter: filter(),
    search: {
      placeholder: 'Search Campaign Name..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      onPaginationChange: onPaginationChange,
      numbering: true,
      schema: [
        {
          cellStyle: {
            minWidth: 320,
            width: 320,
          },
          label: 'Broadcast Name',
          name: 'broadcastName',
        },
        {
          cellStyle: {
            minWidth: 320,
            width: 320,
          },
          label: 'Contact Group',
          name: 'contactGroup',
        },
        {
          cellStyle: {
            minWidth: 180,
            width: 180,
          },
          label: 'Created Date',
          name: 'createdDate',
        },
        {
          cellStyle: {
            minWidth: 180,
            width: 180,
          },
          label: 'Status',
          name: 'status',
          schemaStatus: {
            preparation: 'primary',
            'on schedule': 'warning',
            'need approval': 'warning',
            finish: 'success',
            returned: 'danger',
            rejected: 'danger',
          },
        },
      ],
    },
  };

  return <List {...listProps} />;
}

ListBroadcastInformation.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default ListBroadcastInformation;
