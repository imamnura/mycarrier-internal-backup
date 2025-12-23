import React from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer } from '@material-ui/core';
import Typography from '@components/Typography';
import Worklog from '@components/Worklog';
import useAction from './hooks/useAction';

const HistorySendLog = (props) => {
  const { data, onClose, open } = useAction(props);

  return (
    <Drawer anchor="right" onClose={onClose} open={open}>
      <Box sx={{ width: 462, padding: 40 }}>
        <Typography color="general-mid" variant="h4" weight="medium">
          History Send Log
        </Typography>
        <Box mt={2}>
          {data.length > 0 ? (
            <Worklog
              // data={data.reverse()} from be
              data={data}
              firstItemActive={false}
            />
          ) : (
            <Typography color="general-mid">
              You haven’t send any nofitication yet.
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

HistorySendLog.defaultProps = {
  data: [],
};

HistorySendLog.propTypes = {
  data: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default React.memo(HistorySendLog);
