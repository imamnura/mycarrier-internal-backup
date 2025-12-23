import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Grid } from '@material-ui/core';
import { schemaServiceList } from '../../utils';
import useActions from './hooks/useActions';
import Table from '@components/Table';
import Filter from '@fragments/Filter';
import useStyles from './ServiceList.styles';
import useResponsive from '@utils/hooks/useResponsive';
import CardInfo from '@components/CardInfo';
import { bgRevenueCard } from '@configs/image';

const ServiceList = (props) => {
  const {
    list,
    loading,
    page,
    onPaginationChange,
    filter,
    search,
    setSearch,
    summary,
    onClickRowTable,
    useOrderBy,
    useOrderDirection,
    onClickCard,
  } = useActions(props);

  const mobileClient = useResponsive('sm');
  const classes = useStyles({ mobileClient });

  const filterProps = () => {
    let res = [];

    res.push({
      ...filter.date,
      type: 'dateRange',
    });

    res.push({
      ...filter.status,
      maxWidth: 300,
      type: 'dropdown',
    });

    return res;
  };

  const listProps = {
    filter: filterProps(),
    search: {
      placeholder: 'Search by Service ID..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: list.data,
      loadingRoot: loading.root,
      loading: false,
      meta: list.meta,
      page,
      onPaginationChange: onPaginationChange,
      schema: schemaServiceList,
      emptyMessage: {
        description: 'The data will appear automatically if get an update',
        message: 'Data not found',
        size: 'small',
      },
      size: 10,
      customStyles: {
        pageInformation: {
          flexWrap: 'no-wrap',
        },
      },
      onClickRow: onClickRowTable,
      useOrderBy,
      useOrderDirection,
    },
  };

  const cardSchema = [
    {
      content: summary?.totalOrder ?? '-',
      title: 'Total Service',
      variant: 'illustration',
      value: '',
    },
    {
      content: summary?.totalSubmitted ?? '-',
      title: 'Submitted',
      value: 'Submitted',
      variant: 'information',
    },
    {
      content: summary?.totalInProgress ?? '-',
      title: 'In Progress',
      value: 'In Progress',
      variant: 'warning',
    },
    {
      content: summary?.totalPendingBaso ?? '-',
      title: 'Pending BASO',
      value: 'Pending BASO',
      variant: 'warning',
    },
    {
      content: summary?.totalPendingBillingApproval ?? '-',
      title: 'Pending Billing Approval',
      value: 'Pending Billing Approval',
      variant: 'warning',
    },
    {
      content: summary?.totalFailed ?? '-',
      title: 'Failed',
      value: 'Failed',
      variant: 'error',
    },
    {
      content: summary?.totalCompleted ?? '-',
      title: 'Completed',
      value: 'Completed',
      variant: 'success',
    },
    {
      content: summary?.totalCanceled ?? '-',
      title: 'Canceled',
      value: 'Canceled',
      variant: 'error',
    },
  ];

  return (
    <Box pt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.cardContainer}>
            {cardSchema.map((v) => (
              <CardInfo
                key={v.title}
                content={v.content}
                loading={loading.summary}
                title={v.title}
                variant={v.variant}
                minWidth={120}
                design="basic"
                illustration={bgRevenueCard}
                onClick={onClickCard(v.value)}
                isActive={filter.status.value.value === v.value}
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box mb="10px">
            <Filter filter={listProps?.filter} search={listProps?.search} />
          </Box>
          <Table {...listProps?.table} />
        </Grid>
      </Grid>
    </Box>
  );
};

ServiceList.defaultProps = {
  data: {},
};

ServiceList.propTypes = {
  data: PropTypes.object,
};

export default ServiceList;
