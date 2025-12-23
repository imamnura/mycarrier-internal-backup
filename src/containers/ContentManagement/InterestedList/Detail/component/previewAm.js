import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import Text from '@__old/components/elements/Text';
import Skeleton from '@components/Skeleton';
import { dateFormat } from '@utils/parser';
import { CircularProgress, Grid } from '@material-ui/core';
import RedList from '@__old/components/elements/RedList';

const Component = ({
  classes,
  data,
  assignedBy,
  newDataAm,
  hasStatusEmailAndWA,
  statusEmailMailgun,
  statusWaMailgun,
  isDoneGetStatusWaAndEmailMailgun,
}) => {
  const content = (value) => {
    if (Object.keys(data).length === 0 || data.length < 1) {
      return <Skeleton />;
    } else {
      return <Text variant="subtitle1Bold">{!value ? '-' : value}</Text>;
    }
  };

  const profileSchema = newDataAm[0]?.nik
    ? [
        { name: 'fullName', label: 'NAME' },
        { name: 'nik', label: 'NIK' },
        { name: 'segment', label: 'SEGMENT' },
        { name: 'generalManager', label: 'GM SEGMENT' },
        { name: 'jobTitle', label: 'POSITION' },
        { name: '', label: '' },
        { name: 'phoneNumber', label: 'CONTACT NUMBER' },
        { name: 'email', label: 'EMAIL' },
        { name: 'statusEmailMailgun', label: 'STATUS EMAIL' },
        { name: 'statusWaMailgun', label: 'STATUS WHATSAPP' },
      ]
    : [
        { name: 'fullName', label: 'NAME' },
        { name: 'nik', label: 'NIK' },
        { name: 'segment', label: 'SEGMENT' },
        { name: 'generalManager', label: 'GM SEGMENT' },
        { name: 'jobTitle', label: 'POSITION' },
        { name: '', label: '' },
        { name: 'phoneNumber', label: 'CONTACT NUMBER' },
        { name: 'email', label: 'EMAIL' },
      ];

  const renderSchema = (item, schema) => {
    if (schema.name === '') {
      return '';
    } else if (item[schema.name]) {
      return (
        <Text variant="body2" weight="bold">
          {item[schema.name]}
        </Text>
      );
    } else {
      return (
        <Text variant="body2" weight="bold">
          {' '}
          -{' '}
        </Text>
      );
    }
  };

  const renderItem = (item) => (
    <Grid
      container
      direction="row"
      item
      justifyContent="flex-start"
      spacing={1}
    >
      {profileSchema.map((schema, index) => (
        <Grid item key={index} md={6} style={{ marginBottom: '10px' }} xs={12}>
          <Grid item md={6} xs={12}>
            <Text color="grey" variant="caption">
              {schema.label ? schema.label : ''}
            </Text>
          </Grid>
          <Grid item md={12} xs={12}>
            {renderSchema(item, schema)}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );

  const titleSectionSalesTeam = (
    <div className={classes.profileTitle}>
      <Text color="grey" variant="h4">
        Input Sales Team
      </Text>{' '}
      {/* AM Profile*/}
      <Text color="grey" style={{ lineHeight: '2.3em' }} variant="caption">
        Last Update:{' '}
        {dateFormat({ date: data?.updatedAt, type: 'date-month-year-time' }) ||
          '-'}
      </Text>
    </div>
  );

  const salesTeamDetail = isDoneGetStatusWaAndEmailMailgun ? (
    <>
      <div className={classes.subtitle} style={{ marginBottom: '10px' }}>
        {titleSectionSalesTeam}
      </div>
      <RedList
        child={renderItem}
        data={newDataAm.sort((a, b) => a.index - b.index)}
        id="redlist"
      />
    </>
  ) : (
    <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
      <CircularProgress style={{ color: '#DE1B1B' }} />
    </div>
  );

  const sendMappingDetail = (
    <>
      <div className={classes.subtitle}>
        <div className={classes.profileTitle}>
          <Text color="grey" variant="h4">
            Mapping
          </Text>
        </div>
      </div>
      <Grid container direction="row" item justifyContent="flex-start">
        <Grid item md={12} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              EMAIL
            </Text>
            {content(data?.sendEmail?.email)}
          </div>
        </Grid>
        {hasStatusEmailAndWA && (
          <>
            <Grid item md={12} xs={12}>
              <div className={classes.subitem}>
                <Text color="grey" variant="caption">
                  STATUS EMAIL
                </Text>
                {/* {content(data?.sendEmail?.statusEmail || 'Failed')} */}
                {statusEmailMailgun ? (
                  content(statusEmailMailgun)
                ) : (
                  <Skeleton />
                )}
              </div>
            </Grid>
            <Grid item md={12} xs={12}>
              <div className={classes.subitem}>
                <Text color="grey" variant="caption">
                  STATUS WHATSAPP
                </Text>
                {/* {content(data?.sendEmail?.statusWa || 'Failed')} */}
                {statusWaMailgun ? content(statusWaMailgun) : <Skeleton />}
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );

  return (
    <>
      {data?.amMapping && data?.amMapping[0]?.fullName && salesTeamDetail}
      {data?.sendEmail && assignedBy === 'sendEmail' && sendMappingDetail}
    </>
  );
};

Component.defaultProps = {
  assignedBy: '',
  classes: {},
  data: {},
  hasStatusEmailAndWA: false,
  isDoneGetStatusWaAndEmailMailgun: false,
  newDataAm: [],
  statusEmailMailgun: '',
  statusWaMailgun: '',
};

Component.propTypes = {
  assignedBy: PropTypes.string,
  classes: PropTypes.object,
  data: PropTypes.object,
  hasStatusEmailAndWA: PropTypes.bool,
  isDoneGetStatusWaAndEmailMailgun: PropTypes.bool,
  newDataAm: PropTypes.array,
  statusEmailMailgun: PropTypes.string,
  statusWaMailgun: PropTypes.string,
};

export default withStyles(styles)(Component);
