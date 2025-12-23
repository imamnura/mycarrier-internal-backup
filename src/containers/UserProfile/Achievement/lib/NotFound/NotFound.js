import React from 'react';
import PropTypes from 'prop-types';
import NoData from '@assets/ilustration-v2/NoData';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';

const NotFound = (props) => {
  const { title, description } = props;

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      mt="7vh"
    >
      <NoData style={{ height: '80px', width: '80px' }} />
      <Box pt={4}>
        <Typography color="general-dark" variant="h5" weight="medium">
          {title}
        </Typography>
      </Box>
      <Box pt={3}>
        <Typography color="general-mid" variant="body2" weight="regular">
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

NotFound.defaultProps = {
  description: '',
  title: '',
};

NotFound.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default NotFound;
