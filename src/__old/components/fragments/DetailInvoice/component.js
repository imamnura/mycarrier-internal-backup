import React from 'react';
import { Grid } from '@material-ui/core';
import Breadcrumb from '../../elements/Breadcrumb';
import Divider from '../../elements/Divider';
import DetailInformation from './lib/DetailInformation';
import PropTypes from 'prop-types';

export default function Component(props) {
  const { breadcrumb, data, schema } = props;

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} xs={12}>
        <Grid alignItems="center" container spacing={2}>
          <Grid item>
            <Breadcrumb data={breadcrumb} />
          </Grid>
        </Grid>
      </Grid>
      <Grid align="right" item xs={12}>
        <Divider />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DetailInformation data={data} schema={schema} />
      </Grid>
    </Grid>
  );
}

Component.defaultProps = {
  data: {},
};

Component.propTypes = {
  breadcrumb: PropTypes.array.isRequired,
  data: PropTypes.object,
  schema: PropTypes.object.isRequired,
};
