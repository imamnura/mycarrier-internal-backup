import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { route } from '@configs';
import { dateFormatConverter } from '@utils/converter';
import { statusLabel, tableHeader } from './constant';
import { isHaveAccess } from '@utils/common';
import Table from '@components/Table/Table';
import Filter from '@fragments/Filter/Filter';
import Tabs from '@components/Tabs/Tabs';
import { Box } from '@legion-ui/core';

const CustomerMRTGDetail = (props) => {
  const {
    data,
    loading,
    customerAccountNumber,
    search,
    setSearch,
    list,
    onClickRowTable,
    tab,
    setTab,
    filter,
    loadingTable,
    onPaginationChange,
    page,
  } = useAction(props);

  const breadcrumb = [
    { label: 'MRTG', url: route.mrtg('list') },
    { label: data?.customerAccountName || customerAccountNumber },
  ];

  const tabsProps = () => {
    let tabs = {
      options: [],
      value: tab,
      onChange: setTab,
    };

    if (isHaveAccess(props.feature, 'read_list_reqMrtg')) {
      tabs.options.push({ value: 'request-mrtg', label: 'MRTG Request' });
    }
    if (isHaveAccess(props.feature, 'read_detail_login_data')) {
      tabs.options.push({ value: 'login-data', label: 'Login Data' });
    }
    if (tab === '') setTab(tabs.options[0]?.value);

    return tabs;
  };

  const filterProps = () => {
    let res = [];

    if (tab) {
      res.push({
        ...filter.status,
        maxWidth: 300,
        type: 'dropdown',
      });
    }
    return res;
  };

  const tableData = list.data.map((item) => ({
    ...item,
    status: statusLabel[item?.status] || item?.status,
  }));

  const listProps = {
    filter: filterProps(),
    search: {
      placeholder: 'Search Request ID..',
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
      schema: tableHeader[tab],
      onPaginationChange: onPaginationChange,
    },
    tabs: tabsProps(),
    withTopDivider: false,
  };

  const detailSchema = (data) => [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Customer Detail',
          properties: {
            data: data,
            schema: [
              { name: 'customerAccountName', label: 'Customer', grid: 12 },
              {
                name: 'lastUpdate',
                label: 'Last Update',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
                grid: 12,
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'custom',
          title: 'MRTG',
          render: (
            <>
              <Tabs {...listProps.tabs} />
              <Box pt="8px" pb="8px">
                <Filter filter={listProps.filter} search={listProps.search} />
              </Box>
              <Table {...listProps.table} />
            </>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema(data)}
      />
    </>
  );
};

CustomerMRTGDetail.defaultProps = {
  feature: [],
};

CustomerMRTGDetail.propTypes = {
  feature: PropTypes.array,
};

export default CustomerMRTGDetail;
