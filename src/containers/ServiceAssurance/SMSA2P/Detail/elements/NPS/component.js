import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import Information from '@components/Information';

import clsx from 'clsx';

export default function Component(props) {
  const { classes, data } = props;

  const npsData = data.worklog.find(
    (w) => w.status === 'customerreview' && w.rating,
  );

  return (
    data.status === 'completed' && (
      <>
        {npsData && (
          <Grid container spacing={2} style={{ paddingTop: 8 }}>
            <Grid item style={{ lineHeight: 0 }}>
              <div>
                <Typography color="general-mid" variant="caption">
                  SCORE
                </Typography>
                <div
                  className={clsx(classes.boxNPS, {
                    [classes.boxNPSRed]: npsData.rating.value < 8,
                    [classes.boxNPSYellow]: npsData.rating.value === 8,
                    [classes.boxNPSYellow2]: npsData.rating.value === 9,
                    [classes.boxNPSGreen]: npsData.rating.value === 10,
                  })}
                >
                  <Typography color="white" variant="h3">
                    {npsData.rating.value}
                    <Typography color="white" variant="h5">
                      /10
                    </Typography>
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={9}>
              <Information
                label="Impressions"
                value={`"${npsData.rating.message[0] || '-'}"`}
              />
            </Grid>
            <Grid item xs={12}>
              <Information
                label="Comments"
                value={`"${npsData.rating.message[1] || '-'}"`}
              />
            </Grid>
          </Grid>
        )}
      </>
    )
  );
}

Component.defaultProps = {
  data: {},
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  schema: PropTypes.object.isRequired,
};
