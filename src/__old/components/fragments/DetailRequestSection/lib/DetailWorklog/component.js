import React from 'react';
import { Grid } from '@material-ui/core';
import Steppers from '../../../../elements/Steppers';
import SteppersVertical from '../../../../elements/SteppersVertical';
import Text from '../../../../elements/Text';
import PropTypes from 'prop-types';
import moment from 'moment';
import { noop, isRole } from '../../../../../utils/common';
import { capitalize } from '../../../../../../utils/text';

export default function Component(props) {
  const { stepperProps, classes, data, status, message, pickTitle } = props;
  const { customMo = false } = status;

  if (!stepperProps) return null;

  const worklog = (worklogData) => {
    return worklogData
      .filter((item) => item.dateTime)
      .map((item) => {
        const {
          status: worklogStatus,
          subStatus,
          activationStatus,
          note,
          description,
          dateTime,
          noteProgress,
        } = item;
        const customWorklogNote = (status, note) => {
          switch (status) {
            case 'returned':
              return `Request ${status}: ${note}`;
            case 'returned-updated':
              return `Request returned has been updated: ${note}`;
            case 'rejected':
              return `Request ${status}`;
            default:
              return (
                <div className={classes.textBox}>
                  <span>{note}</span>
                  <br />
                  <span>
                    {noteProgress === '' ||
                    noteProgress === undefined ||
                    noteProgress === null
                      ? null
                      : `Note: "${noteProgress}"`}
                  </span>
                </div>
              );
          }
        };

        const pickCaptionFrom = () => {
          if (status.custom(worklogStatus)?.note === 'createdBy') {
            const createdSplit = item.createdBy.split(' ').map(capitalize);
            if (createdSplit.length === 3)
              return `Submitted By ${createdSplit[0]} Approver ${createdSplit[2]}`;
            else
              return `Bakes Submitted to ${capitalize(
                worklogStatus.split(' ')[0],
              )}`;
          } else if (status.custom(worklogStatus)?.note) {
            return status.custom(worklogStatus).note;
          } else if (status.custom(subStatus)?.note) {
            if (status.custom(subStatus).note.toLowerCase().includes('claim')) {
              // return status.custom(
              //   subStatus,
              //   true,
              //   changeConstantStatus(),
              //   true
              // );
              return (
                <div>
                  {status.custom(subStatus, true, changeConstantStatus(), true)}
                  <br />
                  Note : {`"${changeConstantStatus()}"`}
                </div>
              );
            }
          } else if (worklogStatus) {
            return customWorklogNote(worklogStatus, note || description);
          } else if (activationStatus) {
            return customWorklogNote(activationStatus, note);
          } else {
            return '-';
          }
        };

        const changeConstantStatus = () => {
          if (status.customFunction) {
            return status.customFunction(item);
          }
        };

        return {
          title: !pickTitle
            ? status.custom(
                subStatus || worklogStatus || activationStatus,
                true,
                changeConstantStatus(),
              )
            : pickTitle(note),
          date: moment(dateTime).format('DD/MM/YYYY HH:mm:ss'),
          caption: pickCaptionFrom(),
        };
      });
  };

  const { stepperTitle } = stepperProps;

  const stepperHistory = (
    <Grid xs={12}>
      <Text className={classes.title} color="grey" variant="h4">
        {stepperTitle}
      </Text>
      <Steppers {...stepperProps} />
    </Grid>
  );

  let worklogField;
  if (data.historyWorklog || data.worklog) {
    worklogField = isRole('occ') ? data.historyWorklog : data.worklog;
  } else {
    worklogField = data;
  }

  const stepperWorklog = (
    <Grid xs={12}>
      <Text className={classes.title} color="grey" variant="h4">
        History Work Log
      </Text>
      {customMo ? (
        <SteppersVertical status={status.value} steps={data.worklog} />
      ) : (
        <SteppersVertical
          status={status.value}
          steps={worklog(worklogField).reverse()}
        />
      )}
    </Grid>
  );

  const { specialStatus } = status;

  if (
    [
      'rejected',
      'returned',
      'Rejected',
      'Returned To Customer',
      'Baso Rejected',
    ].includes(status.value) ||
    specialStatus
  ) {
    const pickStatus = specialStatus || status.value;
    return (
      <Grid className={classes.wrapper} container spacing={1}>
        <Grid xs={12}>
          <Text className={classes.capitalize} color="grey" variant="h4">
            Message {message[pickStatus].title}
          </Text>
          <div className={classes.box}>{message[pickStatus].note}</div>
        </Grid>
        {!(isRole('occ') && data.status === 'rejected') && (
          <>
            {stepperHistory}
            {stepperWorklog}
          </>
        )}
      </Grid>
    );
  }

  return (
    stepperProps && (
      <Grid className={classes.wrapper} container spacing={1}>
        {stepperHistory}
        {stepperWorklog}
      </Grid>
    )
  );
}

Component.defaultProps = {
  pickTitle: null,
  status: { value: '', custom: noop },
  stepperProps: null,
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  pickTitle: PropTypes.func,
  status: PropTypes.object,
  stepperProps: PropTypes.object,
};
