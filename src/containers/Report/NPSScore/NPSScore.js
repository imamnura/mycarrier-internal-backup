import Reload from '@assets/icon-v2/Reload';
import PropTypes from 'prop-types';
import { Box, Flex, Select, Text } from '@legion-ui/core';
import Tooltip from '@components/Tooltip';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import { textLimit } from '@utils/text';
import TrendChart from './elements/TrendChart';
import RefreshCcw from '@assets/Svg/RefreshCcw';
import Download from '@assets/icon-v2/Download';
import Filter from '@assets/icon-v2/Filter';
import Button from '@components/Button';
import Card from '@components/Card';
import HorizontalBarChart from '@components/HorizontalBarChart';
import SearchBox from '@components/SearchBox';
import Table from '@components/Table/Table';
import Tabs from '@components/Tabs';
import useNpsScore from './NPSScore.hook';
import { schemaDetailRootCause, tableHeader } from './constant';
import NpsMeter from './elements/NpsMeter';
import PopupCustomerSurvey from './elements/PopupCustomerSurvey';
import PopupFilter from './elements/PopupFilter';
import PopupUpdate from './elements/PopupUpdate';
import PopupWorklog from './elements/PopupWorklog';
import RespondentCategory from './elements/RespondentCategory';
import StatusSummary from './elements/StatusSummary';
import { normalizeTableNps } from './utils';
import Status from '@components/Status';
import moment from 'moment';
import PopupListRespondent from './elements/PopupListRespondent/PopupListRespondent';
import { dateFormat } from '@utils/parser';
import { useMemo } from 'react';
import { isHaveAccess } from '@utils/common';
import StateMessage from '@components/StateMessage/StateMessage';
import NoData from '@assets/ilustration-v2/NoData';
import NpsScoreSummary from './elements/NpsScoreSummary/NpsScoreSummary';
import TotalRespondent from './elements/TotalRespondent';
import Eye from '@assets/icon-v2/Eye';
import useNpsScoreStyles from './NPSScore.styles';

const ReportNPS = ({ feature }) => {
  const {
    filterPayload,
    filters,
    journey,
    npsCategory,
    npsCustomer,
    npsList,
    npsResult,
    npsScoreAllJourney,
    npsTotalRespondent,
    npsTrend,
    npsVOC,
    onClickDownload,
    onClickRefresh,
    openCustomerSurvey,
    openFilter,
    openPopupListRespondent,
    openPopupUpdate,
    totalFilter,
    summaryFollowUp,
    worklog,
    setFilters,
    setJourney,
    setOpenCustomerSurvey,
    setOpenFilter,
    setOpenPopupListRespondent,
    setOpenPopupUpdate,
    setPopupWorklog,
    onClickWorklog,
    smClient,
  } = useNpsScore();
  const classes = useNpsScoreStyles();

  const optionJourney = useMemo(() => {
    let opt = [];

    if (isHaveAccess(feature, 'read_npsscore_Alljourney')) {
      opt.push({ value: 'alljourney', label: 'All Journey' });
    }

    if (isHaveAccess(feature, 'read_npsscore_Explore')) {
      opt.push({ value: 'explore', label: 'Explore' });
    }

    if (isHaveAccess(feature, 'read_npsscore_Evaluate')) {
      opt.push({ value: 'evaluate', label: 'Evaluate' });
    }

    if (isHaveAccess(feature, 'read_npsscore_Activate')) {
      opt.push({ value: 'activate', label: 'Activate' });
    }

    if (isHaveAccess(feature, 'read_npsscore_Use')) {
      opt.push({ value: 'use', label: 'Use' });
    }

    if (isHaveAccess(feature, 'read_npsscore_getsupport')) {
      opt.push({ value: 'getsupport', label: 'Get Support' });
    }

    if (isHaveAccess(feature, 'read_npsscore_Pay')) {
      opt.push({ value: 'pay', label: 'Pay' });
    }

    return opt;
  }, [feature]);

  const actionProps = () => {
    let button = [
      {
        onClick: onClickRefresh,
        children: 'Refresh',
        leftIcon: Reload,
        variant: 'ghost',
      },
      {
        onClick: onClickDownload,
        children: 'Download',
        leftIcon: Download,
        hidden: !isHaveAccess(
          feature,
          `read_downloadDetaildata_${journey.value}`,
        ),
      },
    ];

    return button;
  };

  const tableData = normalizeTableNps(npsList.list?.data, journey.value)?.map(
    (d) => {
      // const tempDueDate = moment(d.dueDate,moment.defaultFormat).format('YYYY-MM-DD');
      // const tempDueDate = moment(d.dueDate).format('YYYY-MM-DD');
      const tempDueDate = dateFormat({
        date: d.dueDate,
        type: 'params',
      });
      const today = moment().format('YYYY-MM-DD');
      const isAfter = moment(today).isAfter(tempDueDate, 'days');
      return {
        ...d,
        noteImprovement:
          d.noteImprovement?.length > 100 ? (
            <Tooltip arrow title={d.noteImprovement}>
              <span>{textLimit(d.noteImprovement, 100)}</span>
            </Tooltip>
          ) : (
            d.noteImprovement
          ),
        invoiceNumber: d.invoiceNumber?.replaceAll(',', ', '),
        statusValidate:
          {
            onprogress: 'on progress',
            notyet: 'not yet',
          }[d?.statusValidate] || d?.statusValidate,
        npsDueDate:
          journey.value == 'alljourney' ? (
            <>
              <Box mr="2px">{d.npsDueDate}</Box>
              {isAfter && (
                <Tooltip placement="top" title={'Has passed the due date'}>
                  <span>
                    <Status children="!" variant="warning" rounded />
                  </span>
                </Tooltip>
              )}
            </>
          ) : (
            d.npsDueDate
          ),
        actionWorklog: (
          <Button
            variant="ghost"
            onClick={onClickWorklog(d.rateId)}
            leftIcon={Eye}
          />
        ),
      };
    },
  );

  if (optionJourney.length == 0) {
    return (
      <>
        <HeaderAndFilter breadcrumb={[{ label: 'NPS Score' }]} />
        <div style={{ padding: '24px 40px', paddingTop: 240 }}>
          <StateMessage
            message="Sorry, you're not authorized to access this page."
            ilustration={NoData}
          />
        </div>
      </>
    );
  }

  function getNiceTicks(data, segments = 4) {
    const maxValue = Math.max(...data.map((d) => d.value));

    const raw = maxValue / segments;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const r = raw / mag;

    // 1–2–2.5–5–10 nice steps
    const niceUnit = r <= 1 ? 1 : r <= 2 ? 2 : r <= 2.5 ? 2.5 : r <= 5 ? 5 : 10;

    const step = niceUnit * mag;
    const niceMax = step * segments;
    const ticks = Array.from({ length: segments + 1 }, (_, i) => i * step);

    return { ticks, niceMax, step };
  }

  const { ticks: ticksPromotors, niceMax: niceMaxPromotors } =
    npsVOC?.data?.promoters && npsVOC.data.promoters.length > 0
      ? getNiceTicks(npsVOC.data.promoters, 4)
      : { ticks: [0, 1, 2, 3, 4], niceMax: 4 };

  const { ticks: ticksPassive, niceMax: niceMaxPassive } =
    npsVOC?.data?.passives && npsVOC.data.passives.length > 0
      ? getNiceTicks(npsVOC.data.passives, 4)
      : { ticks: [0, 1, 2, 3, 4], niceMax: 4 };

  const { ticks: ticksDetractor, niceMax: niceMaxDetractor } =
    npsVOC?.data?.detractors && npsVOC.data.detractors.length > 0
      ? getNiceTicks(npsVOC.data.detractors, 4)
      : { ticks: [0, 1, 2, 3, 4], niceMax: 4 };

  return (
    <>
      <HeaderAndFilter
        action={actionProps()}
        breadcrumb={[{ label: 'NPS Score' }]}
        header={{
          child: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ minWidth: 180 }}>
                <Select
                  placeholder="All Journey"
                  value={[journey]}
                  onChange={setJourney}
                  options={optionJourney}
                />
              </div>
              <Button
                variant="outline"
                leftIcon={
                  totalFilter
                    ? () => (
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            border: '1px solid white',
                            boxSizing: 'border-box',
                            padding: 3,
                            background: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            fontSize: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            lineHeight: 18,
                          }}
                        >
                          {totalFilter}
                        </div>
                      )
                    : Filter
                }
                onClick={setOpenFilter(true)}
              >
                {smClient ? '' : 'FILTER'}
              </Button>
            </div>
          ),
        }}
      />
      <div className={classes.npsScore}>
        <Card
          title={`NPS ${journey.label}`}
          style={{ gridColumn: '1 / span 4' }}
          // className={classes.npsJourney}
        >
          <NpsMeter data={npsResult.data} loading={npsResult.loading} />
        </Card>
        <Card title="Trend NPS" style={{ gridColumn: '5 / span 8' }}>
          <TrendChart data={npsTrend.data} loading={npsTrend.loading} />
        </Card>
        {journey.value == 'alljourney' && (
          <Card title="Nps Score" style={{ gridColumn: '1 / span 12' }}>
            <NpsScoreSummary
              data={npsScoreAllJourney.data}
              loading={npsScoreAllJourney.loading}
            />
          </Card>
        )}
        {journey.value == 'alljourney' && (
          <Card title="Total Respondent" style={{ gridColumn: '1 / span 5' }}>
            <TotalRespondent
              setOpenPopupListRespondent={setOpenPopupListRespondent}
              data={npsTotalRespondent.data}
              loading={npsTotalRespondent.loading}
            />
          </Card>
        )}
        <Card
          title={`Valid Respondent (${
            npsCategory.data?.reduce(
              (accumulator, currentItem) => accumulator + currentItem.total,
              0,
            ) || 0
          })`}
          style={{
            gridColumn:
              journey.value === 'alljourney' ? '6 / span 7' : '1 / span 12',
          }}
        >
          <RespondentCategory
            data={npsCategory.data}
            loading={npsCategory.loading}
            setOpenPopupListRespondent={setOpenPopupListRespondent}
          />
        </Card>

        {journey.value != 'alljourney' && (
          <Card
            action={
              npsCustomer?.data?.top5 ? (
                <Button variant="ghost" onClick={setOpenCustomerSurvey(true)}>
                  View All
                </Button>
              ) : undefined
            }
            title="Top 5 Total Survey"
            style={{ gridColumn: '1 / span 12' }}
          >
            <HorizontalBarChart
              leftLabel="OLO NAME"
              data={npsCustomer?.data?.top5}
              loading={npsCustomer.loading}
              indexBy="name"
              maxLabel={smClient ? 5 : 25}
            />
          </Card>
        )}

        <>
          <Card
            title="Top 5 Voice of Customer - Promoters"
            style={{
              gridColumn: '1 / span 4',
              // justifyContent: 'space-between',
              padding: '0px 0px 24px 0px',
            }}
            isCustomStyleTitle={true}
          >
            <HorizontalBarChart
              // axisBottom={{
              //   tickValues: 5,
              // }}
              axisBottom={{
                tickValues: ticksPromotors,
                tickRotation: -30,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              // pastikan value scale mengikuti niceMax supaya tick & grid align
              valueScale={{ type: 'linear', min: 0, max: niceMaxPromotors }}
              // gridXValues={5}
              gridXValues={ticksPromotors} // garis vertikal persis di angka tick
              indexBy={'name'}
              data={npsVOC?.data?.promoters}
              loading={npsVOC.loading}
              maxLabel={smClient ? 5 : 25}
              maxLeftMargin={200}
              categorizeIndicator="_"
              tooltipTitleLimit={true}
            />
          </Card>
          <Card
            title="Top 5 Voice of Customer - Passive"
            style={{
              gridColumn: '5 / span 4',
              // justifyContent: 'space-between',
              padding: '0px 0px 24px 0px',
            }}
            isCustomStyleTitle={true}
          >
            <HorizontalBarChart
              // axisBottom={{
              //   tickValues: 5,
              // }}
              axisBottom={{
                tickValues: ticksPassive,
                tickRotation: -30,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              // pastikan value scale mengikuti niceMax supaya tick & grid align
              valueScale={{ type: 'linear', min: 0, max: niceMaxPassive }}
              // gridXValues={5}
              gridXValues={ticksPassive} // garis vertikal persis di angka tick
              colors="#F79009"
              // gridXValues={5}
              indexBy={'name'}
              data={npsVOC?.data?.passives}
              loading={npsVOC.loading}
              maxLabel={smClient ? 5 : 25}
              maxLeftMargin={200}
              categorizeIndicator="_"
              tooltipTitleLimit={true}
            />
          </Card>
          <Card
            title="Top 5 Voice of Customer - Detractor"
            style={{
              gridColumn: '9 / span 4',
              // justifyContent: 'space-between',
              padding: '0px 0px 24px 0px',
            }}
            isCustomStyleTitle={true}
          >
            <HorizontalBarChart
              // axisBottom={{
              //   tickValues: 5,
              // }}
              axisBottom={{
                tickValues: ticksDetractor,
                tickRotation: -30,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              // pastikan value scale mengikuti niceMax supaya tick & grid align
              valueScale={{ type: 'linear', min: 0, max: niceMaxDetractor }}
              // gridXValues={5}
              gridXValues={ticksDetractor} // garis vertikal persis di angka tick
              // gridXValues={5}
              colors="#DE1B1B"
              indexBy="name"
              data={npsVOC?.data?.detractors}
              loading={npsVOC.loading}
              maxLabel={smClient ? 5 : 25}
              maxLeftMargin={200}
              categorizeIndicator="_"
              tooltipTitleLimit={true}
            />
          </Card>
        </>

        {journey.value == 'alljourney' && (
          <Card title="Follow Up" style={{ gridColumn: '1 / span 12' }}>
            <Box my={1}>
              <StatusSummary {...summaryFollowUp} />
            </Box>
            <Box width="261px">
              <SearchBox
                onChange={npsList.setSearch}
                placeholder="Search..."
                value={npsList.search}
              />
            </Box>
            <Table
              data={tableData}
              loadingRoot={npsList.loadingTable.root}
              loading={npsList.loadingTable.row}
              maxHeight={640}
              meta={npsList.list.meta}
              numbering={false}
              onBottomPage={npsList.onBottomPage}
              schema={schemaDetailRootCause()}
              // schema={tableHeader('activate', false)}
            />
          </Card>
        )}

        {journey.value == 'alljourney' && (
          <Card
            action={
              npsCustomer?.data?.top5 ? (
                <Button variant="ghost" onClick={setOpenCustomerSurvey(true)}>
                  View All
                </Button>
              ) : undefined
            }
            title="Top 5 Total Survey"
            style={{ gridColumn: '1 / span 12' }}
          >
            <HorizontalBarChart
              leftLabel="OLO NAME"
              data={npsCustomer?.data?.top5}
              loading={npsCustomer.loading}
              indexBy="name"
              maxLabel={smClient ? 5 : 25}
            />
          </Card>
        )}

        {journey.value != 'alljourney' && (
          <>
            <Card title="Detail Data NPS" style={{ gridColumn: '1 / span 12' }}>
              <Tabs
                options={[
                  { value: 'needValidation', label: 'Need Validation' },
                  { value: 'valid', label: 'Valid' },
                  { value: 'invalid', label: 'Invalid' },
                ]}
                value={npsList.tab}
                onChange={npsList.setTab}
              />
              <Flex alignX="space-between" alignY="center">
                <Box width="261px">
                  <SearchBox
                    onChange={npsList.setSearch}
                    placeholder="Search..."
                    value={npsList.search}
                  />
                </Box>
                <Flex alignX="space-between" alignY="center">
                  <Text
                    size="14px"
                    weight="400"
                    color="secondary-500"
                    mr="10px"
                  >
                    {npsList.selectedRow.length} NPS Selected
                  </Text>
                  <Button
                    leftIcon={RefreshCcw}
                    children="Update"
                    disabled={npsList.selectedRow.length < 1}
                    onClick={setOpenPopupUpdate({
                      show: true,
                      edit: npsList.tab == 'needValidation' ? false : true,
                    })}
                  />
                </Flex>
              </Flex>
              <Table
                data={tableData}
                loadingRoot={npsList.loadingTable.root}
                loading={npsList.loadingTable.row}
                maxHeight={640}
                meta={npsList.list.meta}
                numbering={false}
                onBottomPage={npsList.onBottomPage}
                schema={tableHeader(journey.value, false, npsList.tab)}
                selectedRowKey="rateId"
                selectedRowSticky={true}
                useSelectedRow={npsList.useSelectedRow}
                selectWithRawData
              />
            </Card>
          </>
        )}
      </div>
      <PopupFilter
        filters={filters}
        onChangeFilter={setFilters}
        show={openFilter}
        onClose={setOpenFilter(false)}
        journey={journey.value}
        fetchNpsList={npsList.fetchNpsList}
      />
      <PopupUpdate
        tableData={npsList.selectedRow}
        show={openPopupUpdate.show}
        isEdit={openPopupUpdate.edit}
        onClose={setOpenPopupUpdate({ show: false, edit: false })}
        journey={journey.value}
        tab={npsList.tab}
        onSuccessUpdate={npsList.onSuccessUpdate}
        onClickWorklog={onClickWorklog}
      />
      <PopupCustomerSurvey
        show={openCustomerSurvey}
        data={npsCustomer?.data?.all}
        onClose={setOpenCustomerSurvey(false)}
      />
      <PopupListRespondent
        popupParam={openPopupListRespondent}
        journey={journey.value}
        onClose={setOpenPopupListRespondent(false)}
        filters={filterPayload}
        onClickWorklog={onClickWorklog}
      />
      <PopupWorklog
        data={worklog?.data ?? []}
        show={!!worklog?.data}
        onClose={setPopupWorklog(null)}
      />
    </>
  );
};

ReportNPS.propTypes = {
  feature: PropTypes.array,
};

export default ReportNPS;
