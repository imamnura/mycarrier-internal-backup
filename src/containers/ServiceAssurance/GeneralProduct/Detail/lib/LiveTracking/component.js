import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Grid } from '@material-ui/core';
import Button from '@components/Button';
import Dialog from '@__old/components/elements/Dialog';
import Typography from '@components/Typography';
import NoData from '@assets/Svg/NoData';
import useActions from './hooks/useActions';
import { detailSchema } from './constant';

const Maps = dynamic(() => import('./lib/Map'), { ssr: false });

export default function Component(props) {
  const { modalLiveTracking } = props;

  const { trackingData, onClose } = useActions(props);

  const { latitude, longitude, latitudeCust, longitudeCust } = trackingData;

  return (
    <Dialog maxWidth="md" onClose={onClose} open={modalLiveTracking}>
      <Grid container spacing={3} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Typography variant="h5" weight="medium">
            Live Tracking Engineer
          </Typography>
        </Grid>
        <Grid align="center" item xs={12}>
          {trackingData.latitude ? (
            <div style={{ width: '100%', height: '314px' }}>
              <Maps
                lat={Number(latitude)}
                latCust={Number(latitudeCust)}
                lon={Number(longitude)}
                lonCust={Number(longitudeCust)}
                scroll={true}
                zoom={20}
              />
            </div>
          ) : (
            <Grid container spacing={2} style={{ padding: '40px' }}>
              <Grid align="center" item xs={12}>
                <NoData />
              </Grid>
              <Grid align="center" item xs={12}>
                <Typography variant="h4" weight="medium">
                  Sorry, we didn’t find any data for your search
                </Typography>
              </Grid>
              <Grid align="center" item xs={12}>
                <Typography variant="subtitle1">
                  Please try again later or contact your Account Manager for
                  more details.
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
        {trackingData.latitude && (
          <Grid item xs={12}>
            {detailSchema.map(({ label, name, grid }) => {
              return (
                <Grid
                  container
                  key={name}
                  spacing={1}
                  style={{ marginTop: '16px' }}
                >
                  <Grid item xs={grid}>
                    <Typography
                      children={label}
                      variant="subtitle2"
                      weight="light"
                    />
                  </Grid>
                  <Grid item xs={grid}>
                    <Typography
                      children={trackingData[name] || '-'}
                      variant="subtitle2"
                    />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        )}
        <Grid align="center" item xs={12}>
          <Button children="CLOSE" onClick={onClose} variant="ghost" />
        </Grid>
      </Grid>
    </Dialog>
  );
}

Component.defaultProps = {
  modalLiveTracking: false,
};

Component.propTypes = {
  modalLiveTracking: PropTypes.bool,
};
