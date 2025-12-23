import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Grid } from '@material-ui/core';
import Profile from '@assets/ilustration-v2/Profile';
import Typography from '@components/Typography';
import useStyles from './styles';
import { dateFormat } from '@utils/parser';

export default function Component(props) {
  const { name, parties, createdAt, comment } = props;

  const mode = {
    true: 'light',
    false: 'dark',
  }[parties?.toLowerCase().includes('mycarrier')];

  const classes = useStyles(mode);

  return (
    <Grid className={classes.wrapper} container>
      <Card className={classes.card}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Grid alignItems="center" container spacing={1}>
              <Grid item>
                <Profile className={classes.profileIllustration} />
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography
                      children={name}
                      className={classes.textPrimary}
                      variant="subtitle2"
                      weight="medium"
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      children={parties}
                      className={classes.textSecondary}
                      color="general-light"
                      variant="caption"
                      weight="regular"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              children={dateFormat({
                date: createdAt,
                type: 'date-time',
                empty: '-',
              })}
              className={classes.textSecondary}
              variant="overline"
              weight="regular"
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography
            children={comment}
            className={classes.textPrimary}
            variant="caption"
            weight="regular"
          />
        </Box>
      </Card>
    </Grid>
  );
}

Component.defaultProps = {
  name: '-',
  parties: '-',
  createdAt: '-',
  comment: '-',
};

Component.propTypes = {
  comment: PropTypes.string,
  createdAt: PropTypes.string,
  name: PropTypes.string,
  parties: PropTypes.string,
};
