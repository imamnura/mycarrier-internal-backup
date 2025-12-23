import React from 'react';
import { Grid } from '@material-ui/core';
import Breadcrumb from '../../elements/Breadcrumb';
import Status from '../../elements/Status';
import Divider from '../../elements/Divider';
import DetailInformation from './lib/DetailInformation';
import DetailWorklog from './lib/DetailWorklog';
import PropTypes from 'prop-types';
import { noop } from '../../../utils/common';
import Text from '../../elements/Text';

export default function Component(props) {
  const {
    actionButton,
    additionalInformation,
    breadcrumb,
    data,
    schema,
    status,
    stepperProps,
    nps,
    errorMessage,
    pickTitle,
    serverStatus,
  } = props;

  const statusElement = status && status.custom !== noop && (
    <Status {...status.custom(status.value)} />
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={true}>
        <Grid alignItems="center" container spacing={2}>
          <Grid item>
            <Breadcrumb data={breadcrumb} />
          </Grid>
          <Grid item>{statusElement}</Grid>
        </Grid>
      </Grid>
      <Grid align="right" item md="auto" sm={12}>
        {actionButton}
      </Grid>
      {serverStatus && (
        <Grid item md={6} xs={12}>
          <Text variant="status">{`Status Server: ${serverStatus}`}</Text>
        </Grid>
      )}
      <Grid align="right" item xs={12}>
        <Divider />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DetailInformation data={data} schema={schema} />
        {additionalInformation.map((item) => item)}
      </Grid>
      <Grid item sm={6} xs={12}>
        {nps}
        <DetailWorklog
          data={status.data ? status.data : data}
          message={errorMessage}
          pickTitle={pickTitle}
          schema={schema}
          status={status}
          stepperProps={stepperProps}
        />
      </Grid>
    </Grid>
  );
}

Component.defaultProps = {
  actionButton: null,
  additionalInformation: [],
  data: {},
  nps: null,
  pickTitle: null,
  serverStatus: '',
  status: null,
};

Component.propTypes = {
  actionButton: PropTypes.node,
  additionalInformation: PropTypes.array,
  breadcrumb: PropTypes.array.isRequired,
  data: PropTypes.object,
  errorMessage: PropTypes.object.isRequired,
  nps: PropTypes.node,
  pickTitle: PropTypes.func,
  schema: PropTypes.object.isRequired,
  serverStatus: PropTypes.string,
  status: PropTypes.func,
  stepperProps: PropTypes.object.isRequired,
};
