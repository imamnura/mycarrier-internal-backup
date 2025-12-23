import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, capitalize, Grid } from '@material-ui/core';
import datetime from '../../../__old/utils/datetime';
import EstimateValue from './elements/EstimateValue';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import HorizontalBarChart from '@components/HorizontalBarChart';
import PieChart from '@components/PieChart';
import ModalDownload from './elements/ModalDownload';
import Reload from '@assets/icon-v2/Reload';
import Card from '@components/Card';
import Table from '@components/Table';
import TableLegends from './elements/TableLegends';
import VerticalBarChart from '@components/VerticalBarChart';
import { isWindowExist, titleCapitalize, isHaveAccess } from '@utils/common';
import { maskStatusTitle, tabText, normalizeDocumentValue } from './utils';
import { tableHeader, legendsBarTimeApprove, pickLabel } from './constant';
import useActions from './hooks/useActions';
import Tabs from '@components/Tabs/Tabs';
import Filter from '@fragments/Filter/Filter';
import { Flex } from '@legion-ui/core';
import useQueryParams from '@utils/hooks/useQueryParams';

const rawSize = isWindowExist()
  ? Math.ceil(document.documentElement.clientWidth / 150 - 1)
  : 0;
export const size = rawSize < 10 ? 10 : rawSize;

const PerformanceReport = (props) => {
  const { feature } = props;

  const {
    content,
    setContent,
    chartData,
    filter,
    filterReportTime,
    list,
    loading,
    onClickDownload,
    onClickRefresh,
    tab,
    setTab,
    tabL2,
    setTabL2,
    validateBakesOfferingLetter,
    validateBakesOfferingLetterServiceAssurance,
    validatePoBasoVIsitNCX,
    validateProductPie,
    validateTimeApprove,
    loadingTable,
    onPaginationChange,
    page,
  } = useActions();

  const action = () => {
    let actions = [];

    actions.push({
      children: 'Refresh',
      leftIcon: Reload,
      loading: loading.chart,
      onClick: onClickRefresh,
    });

    const downloadPO =
      tabL2 === 'po' &&
      isHaveAccess(feature, 'read_downloaddetaildata_purchaseOrder');
    const downloadBaso =
      tabL2 === 'baso' && isHaveAccess(feature, 'read_downloaddetaildata_baso');
    const downloadSMSA2P =
      tabL2 === 'smsa2p' &&
      isHaveAccess(feature, 'read_download_performance_detail_data_smsa2p');
    const downloadVisitNCX =
      tabL2 === 'visitNCX' &&
      isHaveAccess(
        feature,
        'read_download_detail_data_neucentrix_visiting_performance',
      );
    const downloadtimeApproveVisit =
      tabL2 === 'timeApproveVisit' &&
      isHaveAccess(
        feature,
        'read_download_detail_data_neucentrix_time_to_approve_performance',
      );
    const downloadNeucloud =
      tabL2 === 'neucloud' &&
      isHaveAccess(feature, 'read_download_performance_detail_data_neucloud');
    const downloadGP =
      tabL2 === 'gp' &&
      isHaveAccess(
        feature,
        'read_download_performance_detail_data_general_product',
      );

    if (
      downloadBaso ||
      downloadPO ||
      downloadSMSA2P ||
      downloadNeucloud ||
      downloadGP ||
      downloadVisitNCX ||
      downloadtimeApproveVisit
    ) {
      actions.push({
        children: 'Download',
        onClick: onClickDownload,
        loading: loading.download,
      });
    }

    return actions;
  };

  const tabsProps = () => {
    let tabs = {
      options: [],
      value: tab,
      onChange: setTab,
    };

    if (
      isHaveAccess(feature, 'read_performance_purchaseOrder') ||
      isHaveAccess(feature, 'read_performance_baso') ||
      isHaveAccess(feature, 'read_offering_letter_performance') ||
      isHaveAccess(feature, 'read_performance_bakes')
    ) {
      tabs.options.push({ value: 'document', label: 'Document' });
    }

    if (
      isHaveAccess(feature, 'read_dashboard_neucentrix_visiting_performance') ||
      isHaveAccess(
        feature,
        'read_dashboard_neucentrix_time_to_approve_performance',
      )
    ) {
      tabs.options.push({ value: 'neucentrix', label: 'NeuCentrIX' });
    }

    if (
      isHaveAccess(feature, 'read_performance_smsa2p') ||
      isHaveAccess(feature, 'read_performance_neucloud') ||
      isHaveAccess(feature, 'read_performance_general_product')
    ) {
      tabs.options.push({
        value: 'serviceAssurance',
        label: 'Service Assurance',
      });
    }

    if (tab === '') setTab(tabs.options[0]?.value);

    return tabs;
  };

  const { queryParams, isReady } = useQueryParams();

  useEffect(() => {
    if (!queryParams.category && isReady) {
      setTab(tabsProps().options[0].value);
    }
  }, [queryParams.category]);

  const tabsL2Props = () => {
    let tabs = {
      options: [],
      value: tabL2,
      onChange: setTabL2,
    };

    if (tab === 'document') {
      if (isHaveAccess(feature, 'read_performance_purchaseOrder')) {
        tabs.options.push({ value: 'po', label: 'Purchase Order' });
      }

      if (isHaveAccess(feature, 'read_performance_baso')) {
        tabs.options.push({ value: 'baso', label: 'BASO' });
      }

      if (isHaveAccess(feature, 'read_offering_letter_performance')) {
        tabs.options.push({
          value: 'offeringLetter',
          label: 'Offering Letter',
        });
      }

      if (isHaveAccess(feature, 'read_performance_bakes')) {
        tabs.options.push({ value: 'bakes', label: 'BAKES' });
      }
    }

    if (tab === 'neucentrix') {
      if (
        isHaveAccess(feature, 'read_dashboard_neucentrix_visiting_performance')
      ) {
        tabs.options.push({ value: 'visitNCX', label: 'Visiting' });
      }

      if (
        isHaveAccess(
          feature,
          'read_dashboard_neucentrix_time_to_approve_performance',
        )
      ) {
        tabs.options.push({
          value: 'timeApproveVisit',
          label: 'Time to Approve',
        });
      }
    }

    if (tab === 'serviceAssurance') {
      if (isHaveAccess(feature, 'read_performance_smsa2p')) {
        tabs.options.push({ value: 'smsa2p', label: 'SMS A2P' });
      }

      if (isHaveAccess(feature, 'read_performance_neucloud')) {
        tabs.options.push({ value: 'neucloud', label: 'NeuCloud' });
      }

      if (isHaveAccess(feature, 'read_performance_general_product')) {
        tabs.options.push({ value: 'gp', label: 'General Product' });
      }
    }

    return tabs;
  };

  useEffect(() => {
    if (!tabL2 && tabsL2Props().options[0] && isReady) {
      setTabL2(tabsL2Props().options[0].value);
    }
  }, [tabsProps().value]);

  const tableData = list.data?.map((d) => {
    let others = {};

    if (d.startDate && d.endDate) {
      others.period = `${datetime(d.startDate, 'period')} - ${datetime(
        d.endDate,
        'period',
      )}`;
    }

    return {
      ...d,
      ...others,
      status: maskStatusTitle(d?.status?.toLowerCase(), tabL2),
      orderType: capitalize(d?.orderType ? d?.orderType : ''),
      customerType: titleCapitalize(d?.customerType ? d?.customerType : ''),
    };
  });

  const performanceChartData = {
    documentPie: !validateTimeApprove && {
      data: chartData.documentPie,
      legends: false,
      height: 400,
      title: tabText(tabL2) + ' ' + tabText(tab),
      loading: loading.chart,
    },
    orderTypePie: validatePoBasoVIsitNCX({
      title: tabText(tabL2, 'orderTypePie'),
      data: chartData.orderTypePie,
      loading: loading.chart,
    }),
    productPie: validateProductPie({
      title: tabText(tabL2, 'productPie'),
      data: chartData.productPie,
      loading: loading.chart,
    }),
    documentValue: validateBakesOfferingLetterServiceAssurance({
      ...normalizeDocumentValue(tabL2, chartData.documentValue),
      loading: loading.chart,
    }),
    customerBar: !validateTimeApprove &&
      chartData.customerBar && {
        title: 'Customer ' + tabText(tabL2),
        data: chartData.customerBar,
        indexBy: 'title',
        leftLabel: tabText(tabL2, 'customerBar'),
        loading: loading.chart,
      },
    performanceBar: validateBakesOfferingLetter({
      data: chartData.performanceBar,
      indexBy: 'title',
      leftLabel: 'ACCOUNT MANAGER',
      title: `AM ${tabText(tabL2)} Performance`,
      loading: loading.chart,
    }),
    timeBar: validateTimeApprove && {
      axisBottom: {
        ...(filterReportTime === 'weekly' && { tickRotation: 10 }),
      },
      data: chartData?.timeBar,
      leftLabel: 'HOUR',
      indexBy: 'id',
      isInteractive: true,
      groupMode: 'grouped',
      colors: ({ data, id }) => data[`${id}Color`],
      keys: ['approvalMyC', 'approvalVam', 'approvalTotal'],
      margin: { top: 40, right: 0, bottom: 40, left: 50 },
      padding: 0.7,
      tooltipLabel: ({ id, indexValue }) => `${pickLabel[id]} - ${indexValue}`,
      legends: legendsBarTimeApprove,
    },
    table: validatePoBasoVIsitNCX({
      data: tableData,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      schema: tableHeader(tabL2),
      onPaginationChange: onPaginationChange,
    }),
  };

  // window.onscroll = () => {
  //   const scroll =
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight - 40;
  //   if (scroll && window.scrollY > 0) onBottomPage();
  // };

  const {
    customerBar: _customerBar,
    documentPie: _documentPie,
    documentValue,
    orderTypePie: _orderTypePie,
    performanceBar: _performanceBar,
    productPie: _productPie,
    timeBar,
    table,
  } = performanceChartData;

  const { title: documentPieTitle, ...documentPie } = _documentPie || {};
  const { title: performanceBarTitle, ...performanceBar } =
    _performanceBar || {};
  const { title: customerBarTitle, ...customerBar } = _customerBar || {};
  const { title: productPieTitle, ...productPie } = _productPie || {};
  const { title: orderTypePieTitle, ...orderTypePie } = _orderTypePie || {};
  return (
    <>
      <HeaderAndFilter
        action={action()}
        breadcrumb={[{ label: 'Performance' }]}
        tabs={tabsProps()}
      />
      <div style={{ padding: '0px 40px 24px 40px' }}>
        <Card>
          <Tabs {...tabsL2Props()} />
          <Filter filter={filter()} />
          <Grid container spacing={3}>
            <Box component={Grid} item minWidth={600} sm={true} xs={12}>
              {!!_documentPie && (
                <Card title={documentPieTitle} border>
                  <PieChart {...documentPie} indexBy="title" />
                  <TableLegends
                    data={documentPie.data}
                    loading={documentPie.loading}
                  />
                </Card>
              )}
            </Box>
            <Box component={Grid} item minWidth={472} sm={true} xs={12}>
              <Flex direction="column" style={{ gap: 23 }}>
                {!!orderTypePieTitle && (
                  <Card border title={orderTypePieTitle}>
                    <PieChart {...orderTypePie} indexBy="title" legends />
                  </Card>
                )}
                {!!documentValue && (
                  <Card border title={documentValue.title}>
                    <EstimateValue
                      caption={documentValue.caption}
                      loading={documentValue.loading}
                      value={documentValue.value}
                      variant={documentValue.variant}
                    />
                  </Card>
                )}
                {!!_productPie && (
                  <Card border title={productPieTitle}>
                    <PieChart {...productPie} indexBy="title" legends />
                  </Card>
                )}
              </Flex>
            </Box>
            {!!_customerBar?.data && (
              <Grid item xs={12}>
                <Card border title={customerBarTitle}>
                  <HorizontalBarChart {...customerBar} />
                </Card>
              </Grid>
            )}
            {!!_performanceBar && (
              <Grid item xs={12}>
                <Card border title={performanceBarTitle}>
                  <HorizontalBarChart {...performanceBar} />
                </Card>
              </Grid>
            )}
            {!!table?.data?.length && (
              <Grid item xs={12}>
                <Card border title="Detail Data">
                  <Table size={size} {...table} />
                </Card>
              </Grid>
            )}
            {!!timeBar && (
              <Grid item xs={12}>
                <Box mb={3}>
                  <VerticalBarChart {...timeBar} />
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>
      </div>
      <ModalDownload {...content} setContent={setContent} />
    </>
  );
};

PerformanceReport.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default PerformanceReport;
