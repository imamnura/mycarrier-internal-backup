import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import Skeleton from '@components/Skeleton';
import useStyles from './styles';

const EstimateValue = (props) => {
  const { value, loading, variant, caption } = props;

  const classes = useStyles(variant);

  const colorPicker = {
    primary: 'primary-main',
    success: 'green-main',
  };

  if (loading) {
    return (
      <Box className={classes.docValue}>
        <Skeleton height={56} variant="rect" width="100%" />
        <Box mt={1}>
          <Skeleton height={27} variant="rect" width={108} />
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.docValue}>
      <Typography
        children={value}
        color={colorPicker[variant]}
        inline
        variant="h2"
        weight="medium"
      />
      <Box mt={1}>
        <Typography
          children={caption}
          color="general-main"
          variant="h4"
          weight="normal"
        />
      </Box>
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
