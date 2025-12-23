import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import Skeleton from '@components/Skeleton';
import useStyles from './styles';

const EstimateValue = (props) => {
  const { value, loading, variant } = props;

  const classes = useStyles(variant);

  const colorPicker = {
    primary: 'primary-main',
    success: 'green-main',
  };

  if (loading) {
    return (
      <Box className={classes.docValue}>
        <Skeleton height={27} variant="rect" width="100%" />
      </Box>
    );
  }

  return (
    <Box className={classes.docValue}>
      <Typography
        children={value}
        color={colorPicker[variant]}
        weight="medium"
      />
    </Box>
  );
};

EstimateValue.defaultProps = {
  caption: '',
  loading: false,
  value: '-',
  variant: 'primary',
};

EstimateValue.propTypes = {
  caption: PropTypes.string,
  loading: PropTypes.bool,
  value: PropTypes.string,
  variant: PropTypes.string,
};

export default EstimateValue;
