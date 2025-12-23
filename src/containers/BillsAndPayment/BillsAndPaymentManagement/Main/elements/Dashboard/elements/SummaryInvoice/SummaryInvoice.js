import CardInfo from '@components/CardInfo';
import DatePicker from '@components/DatePicker';
import Dropdown from '@components/Dropdown';
import Skeleton from '@components/Skeleton/Skeleton';
import Typography from '@components/Typography';
import { Box, Text } from '@legion-ui/core';
import { ResponsivePie } from '@nivo/pie';
import useResponsive from '@utils/hooks/useResponsive';
import React from 'react';
import { LOCATOR } from '../../test-locator';
import useAction from './hooks/useAction';
import useStyles from './styles';

const testLocator = LOCATOR.sections.summaryInvoice;

const SummaryInvoice = React.forwardRef((props, ref) => {
  const {
    period,
    requestTime,
    setPeriod,
    setRequestTime,
    data,
    loading,
    onViewAll,
  } = useAction(props, ref);

  const mobileClient = useResponsive('sm');

  const classes = useStyles({ mobileClient });

  const gaugeData = [
    { value: data?.base?.totalFinish, color: '#52BD94' },
    { value: data?.base?.totalInitial, color: '#3366FF' },
    { value: data?.base?.totalInprogress, color: '#FFB020' },
  ];

  return (
    <Box
      background="white"
      padding="24px 32px"
      radius="8px"
      shadow="0px 6px 9px 0px rgba(46, 67, 77, 0.08)"
      id={testLocator.id}
    >
      <div className={classes.header}>
        <Text size="h6" weight="700" color="secondary500">
          Summary Invoice Document Status
        </Text>
        <div className={classes.headerAction}>
          <DatePicker
            format="MMMM YYYY"
            label="All Period"
            minDate="2020/01/01"
            onChange={setPeriod}
            openTo="month"
            value={period}
            views={['year', 'month']}
            id={testLocator.filters.period}
          />
          <Dropdown
            // noBorder
            onChange={setRequestTime}
            options={[
              { label: 'All Request Time', value: '' },
              { label: '> 15 Minutes', value: '>15' },
            ]}
            value={requestTime}
            id={testLocator.filters.requestTime}
          />
        </div>
      </div>
      <div className={classes.summaryContainer}>
        {loading ? (
          <Skeleton height={140} width={280} />
        ) : (
          <div className={classes.chartContainer} id={testLocator.all.id}>
            <ResponsivePie
              animate={false}
              colors={({ data: { color } }) => color}
              data={gaugeData}
              enableArcLabels={false}
              enableArcLinkLabels={false}
              endAngle={90}
              innerRadius={0.72}
              isInteractive={false}
              startAngle={-90}
            />
            <div>
              <Typography
                color="general-mid"
                variant="subtitle2"
                weight="medium"
              >
                Total Invoice
              </Typography>
              <Typography variant="h3" weight="medium">
                {data.all}
              </Typography>
              <Typography
                color="primary-main"
                onClick={onViewAll('all')}
                style={{ cursor: 'pointer' }}
                variant="caption"
                weight="bold"
                id={testLocator.all.viewAll}
              >
                VIEW ALL
              </Typography>
            </div>
          </div>
        )}
        <div className={classes.cardContainer}>
          <CardInfo
            content={data.requested}
            loading={loading}
            onClick={onViewAll('requested')}
            title="Requested"
            variant="information"
            actionLocator={testLocator.requested.viewAll}
            id={testLocator.requested.id}
          />
          <CardInfo
            content={data.inProgress}
            loading={loading}
            onClick={onViewAll('inProgress')}
            title="In Progress"
            variant="warning"
            actionLocator={testLocator.inProgress.viewAll}
            id={testLocator.inProgress.id}
          />
          <CardInfo
            content={data.completed}
            loading={loading}
            onClick={onViewAll('completed')}
            title="Completed"
            variant="success"
            actionLocator={testLocator.completed.viewAll}
            id={testLocator.completed.id}
          />
        </div>
      </div>
    </Box>
  );
});

export default SummaryInvoice;
