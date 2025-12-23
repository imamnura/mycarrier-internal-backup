import React, { Fragment } from 'react';
import PowerCapacity from '@assets/ilustration-v2/PowerCapacity';
import InstalledRack from '@assets/ilustration-v2/InstalledRack';
import List from '@fragments/List';
import useActions from './hooks/useActions';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import Reload from '../../../../assets/icon-v2/Reload';
import Card from '@containers/Neucentrix/AvailabilityRack/lib/Card';
import { Grid } from '@material-ui/core';
import { Box } from '@legion-ui/core';

function ListAvailabilityRack(props) {
  const {
    data,
    list,
    loading,
    loadingTable,
    onBottomPage,
    handleRefresh,
    setPage,
    page,
  } = useActions(props);

  const action = [
    {
      onClick: handleRefresh,
      children: 'Refresh',
      loading: loading.tableRoot,
      leftIcon: Reload,
    },
  ];

  const listProps = {
    onBottomPage: onBottomPage,
    title: 'Availability Rack',
    table: {
      page,
      data: list.data,
      loadingRoot: loadingTable.root,
      loading: loadingTable.row,
      meta: list.meta,
      schema: [
        {
          cellStyle: {
            minWidth: 80,
            width: 80,
          },
          label: 'Region',
          name: 'region',
        },
        {
          cellStyle: {
            minWidth: 320,
            width: 320,
          },
          label: 'Location Neucentrix',
          name: 'neucentrixLocation',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'Installed Rack',
          name: 'installedRack',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'Utilized Rack',
          name: 'utilizedRack',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'Ready for Sales',
          name: 'readyForSalesRack',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'Power Capacity',
          name: 'powerCapacity',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'Usage Capacity',
          name: 'usageCapacity',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'Power Available',
          name: 'powerAvailable',
        },
      ],
      onPaginationChange(_, newPage) {
        setPage(newPage);
      },
    },
  };

  const breadcrumb = [{ label: 'Availability Rack' }];

  return (
    <Fragment>
      <HeaderAndFilter action={action} breadcrumb={breadcrumb} />
      <Box padding="24px 40px 0px 40px">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card
              content={data?.installedRack?.total}
              icon={InstalledRack}
              labelDown="Ready for Sales"
              labelUp="Utilized Rack"
              percentageDown={data?.readyForSalesRack?.percent}
              percentageUp={data?.utilizedRack?.percent}
              title="Installed Rack"
              valueDown={data?.readyForSalesRack?.total}
              valueUp={data?.utilizedRack?.total}
              variant="general"
            />
          </Grid>
          <Grid item xs={6}>
            <Card
              content={data?.powerCapacity?.total}
              icon={PowerCapacity}
              labelDown="Usage Capacity"
              labelUp="Power Available"
              percentageDown={data?.usageCapacity?.percent}
              percentageUp={data?.powerAvailable?.percent}
              title="Power Capacity"
              valueDown={data?.usageCapacity?.total}
              valueUp={data?.powerAvailable?.total}
              variant="general"
            />
          </Grid>
        </Grid>
      </Box>
      <List {...listProps} />
    </Fragment>
  );
}

export default ListAvailabilityRack;
