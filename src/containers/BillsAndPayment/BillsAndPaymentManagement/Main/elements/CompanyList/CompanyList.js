import ArrowKeyboardDown from '@assets/icon-v2/ArrowKeyboardDown';
import ArrowKeyboardUp from '@assets/icon-v2/ArrowKeyboardUp';
import Order from '@assets/icon-v2/Order';
import Reload from '@assets/icon-v2/Reload';
import Typography from '@components/Typography/Typography';
import useAction from './hooks/useAction';
import List from '@fragments/List';
import { Box } from '@material-ui/core';
import React from 'react';
import { tableHeader, optionsProfileByAssessment } from './constant';
import useStyles from './styles';
import { capitalize } from '@utils/text';

const BillAndPaymentCompanyList = (props) => {
  const {
    filterLastUpdate,
    filterProfileByAssessment,
    list,
    loadingTable,
    onClickRowTable,
    // onBottomPage,
    onPaginationChange,
    onRefresh,
    page,
    privilegesRefresh,
    search,
    setFilterLastUpdate,
    setFilterProfileByAssessment,
    setSearch,
    setTab,
    tab,
    testLocator,
  } = useAction(props);

  const classes = useStyles();

  const levelAssessment = (v) => {
    switch (capitalize(v)) {
      case 'Low Risk':
        return (
          <Box>
            <ArrowKeyboardDown className={classes.arrowDown} />
            <Typography
              children={capitalize(v)}
              color="green-main"
              variant="subtitle2"
              weight="medium"
            />
          </Box>
        );
      case 'Medium Risk':
        return (
          <Box>
            <Order className={classes.iconOrder} />
            <Typography
              children={capitalize(v)}
              color="yellow-main"
              variant="subtitle2"
              weight="medium"
            />
          </Box>
        );
      case 'High Risk':
        return (
          <Box>
            <ArrowKeyboardUp className={classes.arrowUp} />
            <Typography
              children={capitalize(v)}
              color="primary-main"
              variant="subtitle2"
              weight="medium"
            />
          </Box>
        );
      default:
        return '';
    }
  };

  const tableData = list.data.map((data) => {
    const temp = data.lastFetchInvoice?.split('-');
    return {
      ...data,
      // no: i + 1,
      invoiceClaimOnProgress:
        data.invoiceClaimOnProgress !== 0 ? (
          <Box className={classes.numberCircle}>
            <Typography
              children={data.invoiceClaimOnProgress}
              className={classes.number}
              color="white"
              variant="h5"
              weight="medium"
            />
          </Box>
        ) : (
          <div />
        ),
      lastFetchInvoice: temp ? `${temp[2]}/${temp[1]}/${temp[0]}` : '',
      profByAssessment: levelAssessment(data?.profByAssessment),
    };
  });

  const filterProps = () => {
    const filters = [];

    filters.push({
      onChange: setFilterLastUpdate,
      value: filterLastUpdate,
      type: 'dateRange',
      label: 'Last Update',
      id: testLocator.filters.lastUpdate,
    });

    filters.push({
      maxWidth: 250,
      onChange: setFilterProfileByAssessment,
      options: optionsProfileByAssessment,
      type: 'dropdown',
      value: filterProfileByAssessment,
      id: testLocator.filters.profile,
    });

    return filters;
  };

  const listProps = {
    id: testLocator.rootId,
    // onBottomPage: onBottomPage,
    breadcrumb: [{ label: 'Bills & Payment Management' }],
    tabs: {
      onChange: setTab,
      options: [
        {
          label: 'Dashboard',
          value: 'dashboard',
          id: testLocator.tab.dashboard,
        },
        {
          label: 'Company List',
          value: 'company-list',
          id: testLocator.tab.companyList,
        },
      ],
      value: tab,
    },
    action: privilegesRefresh && [
      {
        children: 'refresh',
        leftIcon: Reload,
        onClick: onRefresh,
        id: testLocator.refresh,
      },
    ],
    title: 'Company List',
    filter: filterProps(),
    search: {
      onChange: setSearch,
      placeholder: 'Search BP Number..',
      value: search,
      id: testLocator.search,
    },
    table: {
      data: tableData,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: tableHeader,
      numbering: false,
      onPaginationChange: onPaginationChange,
      id: testLocator.table,
    },
  };

  return <List {...listProps} />;
};

export default BillAndPaymentCompanyList;
