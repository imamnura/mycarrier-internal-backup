import React from 'react';
import BarChart from '@__old/components/elements/BarChart';
import LineChart from '@__old/components/elements/LineChart';
import Detail from '@fragments/Detail';
import Filter from '@fragments/Filter';
import useAction from './hooks/useActions';
import { LineChartProps, barChartProps } from './utils';
import { Grid } from '@material-ui/core';
import { Box } from '@legion-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import DownloadSenderReport from '@__old/components/forms/DownloadReport';

const ReportBulk = (props) => {
  const {
    action,
    dataGraph,
    chartType,
    tab,
    reportTime,
    tabsProps,
    filterProps,
    modalDownload,
    onClickModalDownload,
    optionsFilterCustomer,
    fetchDownload,
  } = useAction(props);

  const detailSchema = [
    {
      gridProps: { xs: 12 },
      content: [
        {
          type: 'custom',
          title: '',
          render: (
            <Grid container>
              <Grid xs={12}>
                <Box mt="16px" mb="10px" mx={5}>
                  <Filter filter={filterProps()} />
                </Box>
                {chartType.value === 'bar' ? (
                  <BarChart
                    data={dataGraph}
                    {...barChartProps(tab, reportTime.value)}
                  />
                ) : (
                  <LineChart
                    data={dataGraph}
                    {...LineChartProps(tab, reportTime.value)}
                  />
                )}
              </Grid>
            </Grid>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={[{ label: 'Bulk' }]}
        tabs={tabsProps()}
        loading={false}
        notFound={false}
        schema={detailSchema}
      />

      <Dialog
        maxWidth="xs"
        onClose={onClickModalDownload()}
        open={modalDownload}
      >
        <DownloadSenderReport
          id="submitdownload"
          onSubmit={fetchDownload}
          optionsCustomer={optionsFilterCustomer}
        />
      </Dialog>
    </>
  );
};

export default ReportBulk;
