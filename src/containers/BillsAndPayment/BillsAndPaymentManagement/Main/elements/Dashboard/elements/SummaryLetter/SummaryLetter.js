import Maximize from '@assets/icon-v2/Maximize';
import DatePicker from '@components/DatePicker';
import SingleStackedBarChart from '@components/SingleStackedBarChart/SingleStackedBarChart';
import Skeleton from '@components/Skeleton';
import Typography from '@components/Typography';
import { Box, Text } from '@legion-ui/core';
import useResponsive from '@utils/hooks/useResponsive';
import { maskLocatorLabel } from '@utils/test-locator';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';

const SummaryLetter = React.forwardRef((props, ref) => {
  const mobileClient = useResponsive('sm');

  const classes = useStyles({ mobileClient });

  const {
    locatorReminding,
    locatorThanks,
    onOpenReminder,
    onOpenThanks,
    reminderLetter,
    reminderPeriod,
    setReminderPeriod,
    setThanksPeriod,
    thanksLetter,
    thanksPeriod,
  } = useAction(props, ref);

  return (
    <div className={classes.root}>
      <Box
        width="100%"
        background="white"
        padding="24px 32px"
        radius="8px"
        shadow="0px 6px 9px 0px rgba(46, 67, 77, 0.08)"
        id={locatorReminding.id}
      >
        <div className={classes.container}>
          <div className={classes.header}>
            <Text size="h6" weight="700" color="secondary500">
              Summary Reminder Letter
            </Text>
            <div className={classes.headerAction}>
              <DatePicker
                format="MMMM YYYY"
                label="Invoice Period"
                minDate="2020/01/01"
                onChange={setReminderPeriod}
                openTo="month"
                value={reminderPeriod}
                views={['year', 'month']}
                id={locatorReminding.period}
              />
            </div>
          </div>
          {reminderLetter.loading ? (
            <div className={classes.container}>
              <Skeleton height={60} width={160} />
              <Skeleton height={8} />
              <Skeleton height={204} />
            </div>
          ) : (
            <>
              <div>
                <Typography
                  color="general-mid"
                  variant="subtitle2"
                  weight="medium"
                >
                  Total Billing Reminder
                </Typography>
                <div
                  className={classes.total}
                  onClick={onOpenReminder('all')}
                  id={locatorReminding.openDetail + 'total'}
                >
                  <Typography variant="h3" weight="small">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'decimal',
                    }).format(reminderLetter?.totalAll)}
                  </Typography>
                  <Maximize className={classes.maximizeIcon} />
                </div>
              </div>
              <SingleStackedBarChart
                all={reminderLetter.totalAll}
                data={reminderLetter.chart}
              />
              <Box>
                {reminderLetter?.chartUnSorted.map(
                  ({ label, value, color }) => (
                    <div className={classes.list} key={label}>
                      <div
                        className={classes.listAction}
                        onClick={onOpenReminder(label)}
                        id={
                          locatorReminding.openDetail + maskLocatorLabel(label)
                        }
                      >
                        <div
                          className={classes.circle}
                          style={{ background: color }}
                        />
                        <Typography
                          color="general-mid"
                          style={{ flexGrow: 1 }}
                          variant="subtitle2"
                          weight="medium"
                        >
                          {label}
                        </Typography>
                        <Typography
                          style={{ paddingRight: 4 }}
                          variant="subtitle1"
                          weight="bold"
                        >
                          {new Intl.NumberFormat('id-ID', {
                            style: 'decimal',
                          }).format(value)}
                        </Typography>
                        <Maximize className={classes.maximizeIcon} />
                      </div>
                    </div>
                  ),
                )}
              </Box>
            </>
          )}
        </div>
      </Box>
      <Box
        width="100%"
        background="white"
        padding="24px 32px"
        radius="8px"
        shadow="0px 6px 9px 0px rgba(46, 67, 77, 0.08)"
        id={locatorThanks.id}
      >
        <div className={classes.container}>
          <div className={classes.header}>
            <Text size="h6" weight="700" color="secondary500">
              Summary Thanks Letter
            </Text>
            <div className={classes.headerAction}>
              <DatePicker
                format="MMMM YYYY"
                label="Invoice Period"
                minDate="2020/01/01"
                onChange={setThanksPeriod}
                openTo="month"
                value={thanksPeriod}
                views={['year', 'month']}
                id={locatorThanks.period}
              />
            </div>
          </div>
          {thanksLetter.loading ? (
            <div className={classes.container}>
              <Skeleton height={60} width={160} />
              <Skeleton height={8} />
              <Skeleton height={204} />
            </div>
          ) : (
            <>
              <div>
                <Typography
                  color="general-mid"
                  variant="subtitle2"
                  weight="medium"
                >
                  Total Thanks Letter
                </Typography>
                <div
                  className={classes.total}
                  onClick={onOpenThanks('all')}
                  id={locatorThanks.openDetail + 'total'}
                >
                  <Typography variant="h3" weight="small">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'decimal',
                    }).format(thanksLetter?.totalAll)}
                  </Typography>
                  <Maximize className={classes.maximizeIcon} />
                </div>
              </div>
              <SingleStackedBarChart
                all={thanksLetter.totalAll}
                data={thanksLetter.chart}
              />
              <>
                {thanksLetter?.chartUnSorted.map(({ label, value, color }) => (
                  <div className={classes.list} key={label}>
                    <div
                      className={classes.listAction}
                      onClick={onOpenThanks(label)}
                      id={locatorThanks.openDetail + maskLocatorLabel(label)}
                    >
                      <div
                        className={classes.circle}
                        style={{ background: color }}
                      />
                      <Typography
                        color="general-mid"
                        style={{ flexGrow: 1 }}
                        variant="subtitle2"
                        weight="medium"
                      >
                        {label}
                      </Typography>
                      <Typography
                        style={{ paddingRight: 4 }}
                        variant="subtitle1"
                        weight="bold"
                      >
                        {new Intl.NumberFormat('id-ID', {
                          style: 'decimal',
                        }).format(value)}
                      </Typography>
                      <Maximize className={classes.maximizeIcon} />
                    </div>
                  </div>
                ))}
              </>
            </>
          )}
        </div>
      </Box>
    </div>
  );
});

export default SummaryLetter;
