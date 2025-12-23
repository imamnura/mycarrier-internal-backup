import React, { useMemo } from 'react';
import LeadsFollowUpDetail from '../../../LeadsFollowUpDetail';
import { Box } from '@material-ui/core';
import StateMessage from '@components/StateMessage';
import {
  noDataStageInformation,
  useDetailData,
} from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';
import PropTypes from 'prop-types';

const Qualify = (props) => {
  const { data } = useDetailData();
  const { initialState } = props;

  const stateProps =
    useMemo(() => {
      return noDataStageInformation(data.status, 'Qualify');
    }, [data.status]) || initialState;
  if (stateProps) {
    return (
      <Box py={4}>
        <StateMessage
          description={stateProps.description}
          ilustration={stateProps.ilustration}
          message={stateProps.message}
        />
      </Box>
    );
  }

  return (
    <Box pt={3}>
      <LeadsFollowUpDetail variant="qualify" />
    </Box>
  );
};

Qualify.defaultProps = {
  initialState: false,
};

Qualify.propTypes = {
  initialState: PropTypes.bool,
};

export default React.memo(Qualify);
