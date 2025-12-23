import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import Typography from '@components/Typography';
import Skeleton from '@components/Skeleton';
import { Grid, Box } from '@material-ui/core';

const Card = (props) => {
  const {
    icon: Icon,
    title,
    content,
    labelUp,
    labelDown,
    loading,
    percentageDown,
    percentageUp,
    valueDown,
    valueUp,
  } = props;

  const classes = useStyles(props);

  if (loading) {
    return <Skeleton className={classes.baseBox} height={96} width="100%" />;
  }

  return (
    <div className={classes.baseBox}>
      <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Icon className={classes.icon} />
      </Grid>
      <div className={classes.title}>
        <Typography variant="subtitle2" weight="medium">
          {title}
        </Typography>
      </div>
      <div className={classes.content}>
        <Typography color="primary-main" variant="h3" weight="medium">
          {content}
        </Typography>
      </div>
      <Box pb={2} px={3}>
        <Box className={classes.boxFlex} mb={1} sx={{ width: '100%' }}>
          <Typography color="general-mid" variant="body2" weight="regular">
            {labelUp}
          </Typography>
          <Box className={classes.boxFlex} sx={{ width: '20%' }}>
            <Typography color="general-dark" variant="body2" weight="regular">
              {valueUp}
            </Typography>
            <Typography color="general-dark" variant="body2" weight="regular">
              {percentageUp}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.boxFlex} mb={1} sx={{ width: '100%' }}>
          <Typography color="general-mid" variant="body2" weight="regular">
            {labelDown}
          </Typography>
          <Box className={classes.boxFlex} sx={{ width: '20%' }}>
            <Typography color="general-dark" variant="body2" weight="regular">
              {valueDown}
            </Typography>
            <Typography color="general-dark" variant="body2" weight="regular">
              {percentageDown}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

Card.defaultProps = {
  content: '',
  labelDown: '',
  labelUp: '',
  loading: false,
  onClick: null,
  percentageDown: '',
  percentageUp: '',
  title: '',
  valueDown: '',
  valueUp: '',
  variant: 'info',
};

Card.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.func.isRequired,
  labelDown: PropTypes.string,
  labelUp: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  percentageDown: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentageUp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  valueDown: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueUp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf([
    'info',
    'warning',
    'success',
    'alert',
    'danger',
    'general',
  ]),
};

export default Card;
