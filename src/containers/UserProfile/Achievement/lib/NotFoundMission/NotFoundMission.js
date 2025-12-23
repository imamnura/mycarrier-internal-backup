import NoData from '@assets/ilustration-v2/NoData';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import React from 'react';

const NotFoundMission = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      mt="25vh"
    >
      <NoData style={{ height: '80px', width: '80px' }} />
      <Box pt={4}>
        <Typography color="general-dark" variant="h5" weight="medium">
          All missions have been completed
        </Typography>
      </Box>
      <Box pt={4}>
        <Typography color="general-mid" variant="body2" weight="regular">
          Check regularly to get new missions
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFoundMission;
