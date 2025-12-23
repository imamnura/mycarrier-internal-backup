import React from 'react';
import { isHaveAccess } from '@utils/common';
import { tableHeader } from './constant';
import useAction from './hooks/useAction';
import List from '@fragments/List';
import { dropdownValueParser } from '@utils/common';
import { dateFormat } from '@utils/parser';

const SettlementList = (props) => {
  const {
    feature,
    filterStatus,
    filterBillingType,
    filterPeriod,
    list,
    page,
    loadingTable,
    onPaginationChange,
    onClickRowTable,
    search,
    setFilterStatus,
    setFilterBillingType,
    setFilterPeriod,
    setSearch,
    setTab,
    tab,
  } = useAction(props);

  const filter = () => {
    let filters = [];

    if (tab === 'users') {
      const optionStatus = [
        { label: 'All Status', value: '' },
        { label: 'Active', value: 'active' },
        { label: 'Not Verified', value: 'not verified' },
        { label: 'Suspend', value: 'suspend' },
      ];
      filters.push({
        onChange: setFilterStatus,
        options: optionStatus,
        type: 'dropdown',
        value: dropdownValueParser(filterStatus, optionStatus),
      });

      const optionBillingType = [
        { label: 'All Billing Type', value: '' },
        { label: 'Postpaid', value: 'postpaid' },
        { label: 'Prepaid', value: 'prepaid' },
      ];
      filters.push({
        onChange: setFilterBillingType,
        options: optionBillingType,
        type: 'dropdown',
        value: dropdownValueParser(filterBillingType, optionBillingType),
      });
    }
    if (tab === 'settlement') {
      // filters.push({
      //   onChange: setFilterPeriod,
      //   label: 'All Period',
      //   type: 'date',
      //   value: filterPeriod
      // });
      filters.push({
        onChange: setFilterPeriod,
        label: 'All Period',
        type: 'date',
        value: filterPeriod,
        views: ['year', 'month'],
        openTo: 'month',
        format: 'MMMM YYYY',
      });

      const optionStatus = [
        { label: 'All Status', value: '' },
        { label: 'AM Send MOM', value: 'cdm_generate_settlement' },
        { label: 'Customer Approval', value: 'am_send_mom' },
        { label: 'Returned', value: 'customer_returned' },
        { label: 'AM Send NDE', value: 'customer_approved' },
        { label: 'Settlement Complete', value: 'am_approved' },
        { label: 'Completed', value: 'completed' },
        { label: 'Reviewer Approval', value: 'reviewer_approval' },
        { label: 'Reviewer Approved', value: 'reviewer_approved' },
        { label: 'NDE Returned', value: 'nde_returned' },
        { label: 'NDE Rejected', value: 'nde_rejected' },
      ];
      filters.push({
        onChange: setFilterStatus,
        options: optionStatus,
        type: 'dropdown',
        value: dropdownValueParser(filterStatus, optionStatus),
      });
    }

    return filters.reverse();
  };

  const tabsProps = () => {
    let tabs = {
      options: [],
      value: tab,
      onChange: setTab,
    };

    if (
      isHaveAccess(feature, 'read_list_user_settlement_am') ||
      isHaveAccess(feature, 'read_list_user_settlement_cdm')
    )
      tabs.options.push({ label: 'Users', value: 'users' });
    if (
      isHaveAccess(feature, 'read_settlement_list_am') ||
      isHaveAccess(feature, 'read_settlement_list_cdm')
    )
      tabs.options.push({ label: 'Settlement List', value: 'settlement' });

    const isAm =
      isHaveAccess(feature, 'read_list_user_settlement_am') ||
      isHaveAccess(feature, 'read_settlement_list_am');

    const validateTabs = {
      ...tabs,
      options: isAm ? tabs.options.reverse() : tabs.options,
    };

    if (!['settlement', 'users'].includes(tab))
      setTab(validateTabs.options[0]?.value);

    return validateTabs;
  };

  const normalizeStatus = (status) => {
    const label = {
      completed: 'COMPLETED',
      am_approved: 'SETTLEMENT COMPLETED',
      customer_approved: 'AM SEND NDE',
      customer_returned: 'RETURNED',
      am_send_mom: 'CUSTOMER APPROVAL',
      cdm_generate_settlement: 'AM SEND MOM',
      reviewer_approval: 'NDE APPROVAL',
      reviewer_approved: 'SETTLEMENT COMPLETED',
      nde_rejected: 'NDE REJECTED',
      nde_returned: 'NDE RETURNED',
    }[status];

    return label;
  };

  const tableData = list.data.map((item) => ({
    ...item,
    statusSettlement: normalizeStatus(item.status),
    periodSettlement: dateFormat({
      date: item.periode,
      type: 'period',
      empty: '-',
      pattern: 'MMYYYY',
    }),
  }));

  const listProps = {
    breadcrumb: [{ label: 'Settlement' }],
    title: 'Settlement',
    filter: filter(),
    search: {
      placeholder: 'Search...',
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
      schema: tableHeader(tab),
      onPaginationChange: onPaginationChange,
    },
    tabs: tabsProps(),
  };

  return <List {...listProps} />;
};

export default SettlementList;
