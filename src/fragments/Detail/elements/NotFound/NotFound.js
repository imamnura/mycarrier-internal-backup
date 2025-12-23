import Person404 from '@assets/ilustration-v2/Person404';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import React from 'react';

const NotFound = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      pt="25vh"
    >
      <Person404 style={{ height: 160, width: 'auto' }} />
      <Box pt={4}>
        <Typography variant="h3" weight="medium">
          Data Not Found
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
