import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import datetime from '@__old/utils/datetime';
import Typography from '@components/Typography';
import useActions from './hooks/useActions';
import { isHaveAccess } from '@utils/common';
import { schema, statusLabel } from '../utils';
import { textLimit } from '@utils/text';

const ModificationOrderList = ({ feature }) => {
  const {
    filterCustomer,
    setFilterCustomer,
    filterCustomerOptions,
    filterStatus,
    setFilterStatus,
    filterProduct,
    setFilterProduct,
    filterProductOptions,
    list,
    page,
    loading,
    onPaginationChange,
    onClickDocument,
    onClickRowTable,
    search,
    setSearch,
    tab,
    setTab,
  } = useActions(feature);

  const tableData = list.data.map((data) => {
    let period = '';

    const documents = (
      <Typography
        color="primary-main"
        onClick={onClickDocument(data?.documents[0]?.fileUrl)}
        variant="subtitle2"
        weight="medium"
      >
        {textLimit(data?.documents[0]?.fileName, 24)}
      </Typography>
    );

    if (data.startDate && data.endDate) {
      period = `${datetime(data.startDate, 'period')} - ${datetime(
        data.endDate,
        'period',
      )}`;
    }
    return {
      ...data,
      documents: data?.documents[0]?.fileName ? documents : '-',
      status: statusLabel[data.status],
      period,
    };
  });

  const tabsProps = () => {
    let tabs = {
      options: [],
      value: tab,
      onChange: setTab,
    };

    if (isHaveAccess(feature, 'read_list_on_going_modification_order')) {
      tabs.options.push({ value: 'ongoing', label: 'On Going Modification' });
    }
    if (
      isHaveAccess(feature, 'read_list_upgrade_complete_modification_order')
    ) {
      tabs.options.push({ value: 'upgrade', label: 'Upgrade Complete' });
    }
    if (
      isHaveAccess(feature, 'read_list_downgrade_complete_modification_order')
    ) {
      tabs.options.push({ value: 'downgrade', label: 'Downgrade Complete' });
    }
    if (tab === '') setTab(tabs.options[0]?.value);

    return tabs;
  };

  const filter = () => {
    let filters = [];

    tab === 'ongoing' &&
      filters.push({
        onChange: setFilterStatus,
        options: [
          { label: 'All Status', value: '' },
          { label: 'Upgrade Request', value: 'Upgrade Request' },
          { label: 'Review BAKES', value: 'Review Bakes' },
          { label: 'Service Upgrading', value: 'Service Upgrading' },
          { label: 'BASO Sign', value: 'BASO Sign' },
          { label: 'Rejected', value: 'Rejected' },
          { label: 'Returned', value: 'Returned' },
        ],
        type: 'dropdown',
        value: filterStatus,
      });

    filters.push({
      isLoading: loading.filterProduct,
      isSearchable: true,
      maxWidth: 300,
      onChange: setFilterProduct,
      options: filterProductOptions,
      type: 'dropdown',
      value: filterProduct,
    });

    filters.push({
      isLoading: loading.filterCustomer,
      isSearchable: true,
      maxWidth: 300,
      onChange: setFilterCustomer,
      options: filterCustomerOptions,
      type: 'dropdown',
      value: filterCustomer,
    });

    return filters;
  };

  const listProps = {
    title: "Modification Order",
    breadcrumb: [{ label: 'MODIFICATION ORDER' }],
    filter: filter(),
    search: {
      placeholder: 'Search Order ID..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loading.tableRoot,
      loading: loading.tableRow,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: schema,
      onPaginationChange: onPaginationChange,
    },
    tabs: tabsProps(),
  };

  return <List {...listProps} />;
};

ModificationOrderList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default ModificationOrderList;
