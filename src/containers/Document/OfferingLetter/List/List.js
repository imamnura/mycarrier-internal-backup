import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import { isHaveAccess } from '@utils/common';
import useActions from './hooks/useActions';

const OfferingLetterList = (props) => {
  const {
    feature,
    filterStatus,
    list,
    page,
    loading,
    search,
    manager,
    onPaginationChange,
    onClickNewOfferingLetter,
    onClickRowTable,
    setFilterStatus,
    setSearch,
  } = useActions(props);

  const action = () => {
    let actions = [];

    if (isHaveAccess(feature, 'create_new_offerinng_letter') && !manager) {
      actions.push({
        children: 'NEW OFFERING LETTER',
        onClick: onClickNewOfferingLetter,
      });
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
          { label: 'Telkom Approval', value: 'signing on progress' },
          { label: 'Approved', value: 'approved' },
        ],
        type: 'dropdown',
        value: filterStatus,
      });
    }

    return filters;
  };

  const listProps = {
    title: 'Offering Letter',
    breadcrumb: [{ label: 'Offering Letter' }],
    action: action(),
    filter: filter(),
    search: {
      placeholder: 'Search Company, Offering Letter ID..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: list.data,
      loadingRoot: loading,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: [
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: 'Offering Letter ID',
          name: 'offeringLetterId',
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
            minWidth: 180,
            width: 180,
          },
          formatDate: 'date-time',
          label: 'Ceated Date',
          name: 'createdAt',
        },
        {
          cellStyle: {
            minWidth: 180,
            width: 180,
          },
          formatDate: 'date-time',
          label: 'Updated Date',
          name: 'updatedAt',
        },
        {
          cellStyle: {
            minWidth: 180,
            width: 180,
          },
          label: 'Status',
          name: 'status',
          schemaStatus: {
            completed: 'success',
            approved: 'success',
            draft: 'primary',
            'signing on progress': 'success',
          },
        },
      ],
      onPaginationChange: onPaginationChange,
    },
  };

  return <List {...listProps} />;
};

OfferingLetterList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default OfferingLetterList;
